import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { widthsFor, IMAGE_QUALITY } from '../src/components/image-widths.ts';

const meta = (width) => ({ src: '', width, height: 100, format: 'png' });

test('the source width is always a candidate, so a 571px original is never served at 480', () => {
  assert.deepEqual(widthsFor(meta(571)), [480, 571]);
  assert.deepEqual(widthsFor(meta(388)), [388]);
});

test('large originals get 2x-screen candidates, capped at 2400', () => {
  assert.deepEqual(widthsFor(meta(1666)), [480, 800, 1200, 1600, 1666]);
  assert.deepEqual(widthsFor(meta(4100)), [480, 800, 1200, 1600, 2400]);
  assert.deepEqual(widthsFor(meta(1200)), [480, 800, 1200]);
});

test('a custom list still ends at the source width', () => {
  assert.deepEqual(widthsFor(meta(515), [320, 640]), [320, 515]);
});

test('screenshots are encoded above the soft AVIF default', () => assert.ok(IMAGE_QUALITY >= 75));

test('no component hand-rolls its own width list', () => {
  const files = ['src/components/Figure.astro', 'src/components/Gallery.astro', 'src/components/Compare.astro', 'src/pages/[...lang]/index.astro', 'src/pages/[...lang]/work/the-burger-queen.astro'];
  for (const f of files) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
    assert.ok(!/widths=\{\[/.test(src) && !/\[480, 800/.test(src), `${f} uses widthsFor`);
    for (const tag of src.match(/<Picture\b[\s\S]*?\/>/g) ?? []) assert.match(tag, /quality=\{IMAGE_QUALITY\}/, `${f}: Picture sets quality`);
  }
});
