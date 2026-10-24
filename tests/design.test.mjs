import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page, inventory } from './helpers.mjs';

test('home headline highlights its key phrases in English, Spanish and Italian', () => {
  const h1 = page('/').match(/<h1[\s\S]*?<\/h1>/)[0];
  for (const lang of ['en', 'es', 'it']) {
    const start = h1.indexOf(`data-lang="${lang}"`);
    const version = start < 0 ? '' : h1.slice(start, h1.indexOf('</span>', start));
    assert.equal((version.match(/<mark\b/g) ?? []).length, 3, `${lang}: three highlighted phrases`);
  }
  assert.ok(!/mark-circle|mark-wavy|mark-insert/.test(h1), 'one kind of mark only');
});

test('generic template tells are gone from the home page', () => {
  assert.ok(!/→/.test(page('/')), 'no arrows appended to links');
});

test('inventory still complete', () => assert.equal(inventory().length, 23));
