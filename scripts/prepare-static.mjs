// Optimise the exported asset only; preserve the original source model.
import { readFile, writeFile, readdir, stat, rename, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const limit = 25 * 1024 * 1024;
const root = 'out/demos/three-lab/assets';
for (const name of await readdir(root + '/models')) {
  if (!name.endsWith('.glb')) continue;
  const modelPath = root + '/models/' + name;
  const original = await readFile(modelPath);
  if (original.readUInt32LE(0) !== 0x46546c67 || original.readUInt32LE(4) !== 2) throw new Error('Expected a glTF 2.0 binary model');
  const jsonLength = original.readUInt32LE(12);
  const gltf = JSON.parse(original.subarray(20, 20 + jsonLength).toString());
  const binOffset = 20 + jsonLength;
  const bin = original.subarray(binOffset + 8, binOffset + 8 + original.readUInt32LE(binOffset));
  const replacements = new Map();
  const imageIndices = new Set((gltf.materials ?? []).map(m => m.pbrMetallicRoughness?.baseColorTexture?.index)
    .filter(i => i !== undefined).map(i => gltf.textures[i].source));
  for (let index = 0; index < (gltf.images ?? []).length; index++) {
    const image = gltf.images[index];
    if (image.bufferView === undefined) continue;
    const view = gltf.bufferViews[image.bufferView];
    const bytes = bin.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
    const metadata = await sharp(bytes).metadata();
    const asJpeg = imageIndices.has(index) && !metadata.hasAlpha;
    const resized = sharp(bytes).resize({ width: 1024, height: 1024, fit: 'inside', withoutEnlargement: true });
    const jpeg = await (asJpeg ? resized.jpeg({ quality: 88, chromaSubsampling: '4:4:4' }) : resized.png({ compressionLevel: 9 })).toBuffer();
    if (jpeg.length >= bytes.length) continue;
    replacements.set(image.bufferView, jpeg);
    image.mimeType = asJpeg ? 'image/jpeg' : 'image/png';
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
  console.log(`${name}: ${(original.length / 1024 / 1024).toFixed(1)} -> ${(optimised.length / 1024 / 1024).toFixed(1)} MiB; geometry and animations preserved.`);
}
for (const name of await readdir(root + '/textures')) {
  if (!/\.jpg$/i.test(name)) continue;
  const path = root + '/textures/' + name;
  const original = await readFile(path);
  const compressed = await sharp(original).resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
  if (compressed.length < original.length) await writeFile(path, compressed);
  console.log(`${name}: ${(original.length / 1024 / 1024).toFixed(2)} -> ${(Math.min(compressed.length, original.length) / 1024 / 1024).toFixed(2)} MiB`);
}
const video = root + '/videos/dance.mp4';
const temporaryVideo = root + '/videos/dance-web.mp4';
const originalVideo = await stat(video);
execFileSync(require('@ffmpeg-installer/ffmpeg').path, ['-hide_banner', '-loglevel', 'error', '-y', '-i', video,
  '-vf', "scale='min(1280,iw)':-2", '-c:v', 'libx264', '-preset', 'medium', '-crf', '27',
  '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', temporaryVideo]);
if ((await stat(temporaryVideo)).size < originalVideo.size) await rename(temporaryVideo, video);
else await unlink(temporaryVideo);
console.log(`dance.mp4: ${(originalVideo.size / 1024 / 1024).toFixed(2)} -> ${((await stat(video)).size / 1024 / 1024).toFixed(2)} MiB; complete video retained`);
// Fingerprint every scene asset so browsers cannot mix a fresh page with cached scripts/assets.
const sceneRoot = 'out/demos/three-lab';
const digest = bytes => createHash('sha256').update(bytes).digest('hex').slice(0, 12);
const versions = {};
async function fingerprintAssets(directory, prefix = 'assets') {
  for (const name of await readdir(directory)) {
    const path = join(directory, name);
    const relative = prefix + '/' + name;
    if ((await stat(path)).isDirectory()) await fingerprintAssets(path, relative);
    else versions[relative] = digest(await readFile(path));
  }
}
await fingerprintAssets(root);
let main = await readFile(sceneRoot + '/main.js', 'utf8');
for (const [path, version] of Object.entries(versions)) {
  main = main.replaceAll("'" + path + "'", "'" + path + '?v=' + version + "'");
}
const loadingVersion = digest(await readFile(sceneRoot + '/loading.js'));
main = main.replace("'./loading.js'", "'./loading.js?v=" + loadingVersion + "'");
await writeFile(sceneRoot + '/main.js', main);
let bootstrap = await readFile(sceneRoot + '/bootstrap.js', 'utf8');
bootstrap = bootstrap.replace("'./main.js'", "'./main.js?v=" + digest(main) + "'");
await writeFile(sceneRoot + '/bootstrap.js', bootstrap);
let html = await readFile(sceneRoot + '/index.html', 'utf8');
html = html.replace('src="bootstrap.js"', 'src="bootstrap.js?v=' + digest(bootstrap) + '"');
await writeFile(sceneRoot + '/index.html', html);
await writeFile(sceneRoot + '/asset-manifest.json', JSON.stringify(versions, null, 2) + '\n');
console.log('Versioned all WebGL models, textures, media and entry scripts.');
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
