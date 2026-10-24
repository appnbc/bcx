import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../src/assets/projects/', import.meta.url);
const folders = ['sunnyvale-cleanwater', 'ladwp-turf-replacement', 'descubre', 'mosaik', 'the-burger-queen'];

test('imported images exist per project with no byte-identical duplicates', () => {
  const seen = new Map();
  for (const f of folders) {
    const dir = new URL(`${f}/`, root);
    assert.ok(existsSync(dir), `missing folder ${f}`);
    const files = readdirSync(dir);
    assert.ok(files.length > 0, `${f} is empty`);
    for (const file of files) {
      const hash = createHash('sha1').update(readFileSync(new URL(file, dir))).digest('hex');
      assert.ok(!seen.has(hash), `${f}/${file} duplicates ${seen.get(hash)}`);
      seen.set(hash, `${f}/${file}`);
    }
  }
  assert.equal(readdirSync(new URL('the-burger-queen/', root)).length, 9);
});
