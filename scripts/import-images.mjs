// Copies source images from pics/ into src/assets/projects/<id>/, skipping byte-identical duplicates.
// Source files in pics/ are never modified. Safe to re-run.
import { readdirSync, readFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, extname } from 'node:path';

const SRC = 'pics';
const DEST = 'src/assets/projects';

const rules = [
  [/^sunnyvalecleanwater_/, 'sunnyvale-cleanwater'],
  [/^LA_WP_dept_/, 'ladwp-turf-replacement'],
  [/^Alexa_Hotel_/, 'the-burger-queen'],
  [/^VHL_GermanCovers/, 'mosaik'],
  [/^VHL_/, 'descubre'],
];

const byHash = new Map();
let copied = 0;
const files = readdirSync(SRC)
  .filter((f) => ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

for (const file of files) {
  const rule = rules.find(([re]) => re.test(file));
  if (!rule) {
    console.warn(`no project for ${file}; skipped`);
    continue;
  }
  const hash = createHash('sha1').update(readFileSync(join(SRC, file))).digest('hex');
  if (byHash.has(hash)) {
    console.log(`skipped duplicate ${file} (same as ${byHash.get(hash)})`);
    continue;
  }
  byHash.set(hash, file);
  const dir = join(DEST, rule[1]);
  mkdirSync(dir, { recursive: true });
  if (!existsSync(join(dir, file))) copyFileSync(join(SRC, file), join(dir, file));
  copied++;
}
console.log(`${copied} unique images in ${DEST}`);
