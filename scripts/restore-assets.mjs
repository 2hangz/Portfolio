// Recover portfolio-owned assets already tracked in the original deployment branch.
// Restored assets are committed once by the publish workflow so future builds are self-contained.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
const ref = '072f45c';
const required = ['public/demos/three-lab/index.html', 'public/demos/three-lab/assets/models/m3.glb', 'public/graphics/storytelling/Industry Brief_v6.png'];
if (required.every(existsSync)) process.exit(0);
const names = execFileSync('git', ['ls-tree', '-r', '--name-only', ref, 'demos/three-lab', 'graphics/storytelling'], { encoding: 'utf8' }).trim().split('\n');
if (!names.length || !names[0]) throw new Error('Original portfolio assets are not available in Git history.');
for (const name of names) {
  if (name.endsWith('.DS_Store')) continue;
  const target = join('public', name);
  if (existsSync(target)) continue;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, execFileSync('git', ['show', `${ref}:${name}`], { maxBuffer: 100 * 1024 * 1024 }));
}
console.log('Restored original demo and gallery assets.');
