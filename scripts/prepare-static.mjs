// Optimise the exported asset only; preserve the original source model.
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const limit = 25 * 1024 * 1024;
const modelPath = 'out/demos/three-lab/assets/models/m3.glb';
const original = await readFile(modelPath);
if (original.length > limit) {
  if (original.readUInt32LE(0) !== 0x46546c67 || original.readUInt32LE(4) !== 2) throw new Error('Expected a glTF 2.0 binary model');
  const jsonLength = original.readUInt32LE(12);
  const gltf = JSON.parse(original.subarray(20, 20 + jsonLength).toString());
  const binOffset = 20 + jsonLength;
  const bin = original.subarray(binOffset + 8, binOffset + 8 + original.readUInt32LE(binOffset));
  const replacements = new Map();
  const imageIndices = new Set((gltf.materials ?? []).map(m => m.pbrMetallicRoughness?.baseColorTexture?.index)
    .filter(i => i !== undefined).map(i => gltf.textures[i].source));
  for (const index of imageIndices) {
    const image = gltf.images[index];
    if (image.bufferView === undefined) continue;
    const view = gltf.bufferViews[image.bufferView];
    const bytes = bin.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
    const metadata = await sharp(bytes).metadata();
    if (metadata.hasAlpha) continue;
    const jpeg = await sharp(bytes).jpeg({ quality: 94, chromaSubsampling: '4:4:4' }).toBuffer();
    if (jpeg.length >= bytes.length) continue;
    replacements.set(image.bufferView, jpeg);
    image.mimeType = 'image/jpeg';
  }
  let cursor = 0;
  const chunks = [];
  for (let index = 0; index < gltf.bufferViews.length; index++) {
    const view = gltf.bufferViews[index];
    if (view.buffer !== 0) throw new Error('Expected a single embedded GLB buffer');
    const bytes = replacements.get(index) ?? bin.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
    view.byteOffset = cursor;
    view.byteLength = bytes.length;
    chunks.push(bytes);
    cursor += bytes.length;
    const padding = (4 - cursor % 4) % 4;
    if (padding) { chunks.push(Buffer.alloc(padding)); cursor += padding; }
  }
  gltf.buffers[0].byteLength = cursor;
  let json = Buffer.from(JSON.stringify(gltf));
  json = Buffer.concat([json, Buffer.alloc((4 - json.length % 4) % 4, 0x20)]);
  const newBin = Buffer.concat(chunks);
  const total = 12 + 8 + json.length + 8 + newBin.length;
  const header = Buffer.alloc(20);
  header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(total, 8);
  header.writeUInt32LE(json.length, 12); header.writeUInt32LE(0x4e4f534a, 16);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(newBin.length, 0); binHeader.writeUInt32LE(0x004e4942, 4);
  const optimised = Buffer.concat([header, json, binHeader, newBin]);
  if (optimised.length > limit) throw new Error('Optimised model still exceeds the Cloudflare Pages limit');
  await writeFile(modelPath, optimised);
  console.log(`Deployment model: ${(original.length / 1024 / 1024).toFixed(1)} -> ${(optimised.length / 1024 / 1024).toFixed(1)} MiB; geometry and animations preserved.`);
}
async function checkSizes(directory) {
  for (const name of await readdir(directory)) {
    const path = join(directory, name);
    const info = await stat(path);
    if (info.isDirectory()) await checkSizes(path);
    else if (info.size > limit) throw new Error(`Asset exceeds 25 MiB: ${path}`);
  }
}
await checkSizes('out');
console.log('Static export satisfies the Cloudflare Pages per-file limit.');
