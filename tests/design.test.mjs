import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page, inventory } from './helpers.mjs';

test('each homepage highlights three key phrases in its own language', () => {
  for (const prefix of ['', '/es', '/it']) {
    const h1 = page(`${prefix}/`).match(/<h1[^>]*>[\s\S]*?<\/h1>/)[0];
    assert.equal((h1.match(/<mark\b/g) ?? []).length, 3, `${prefix || '/'}: three highlighted phrases`);
    assert.ok(!/mark-circle|mark-wavy|mark-insert|data-lang=/.test(h1), `${prefix || '/'}: one kind of mark, one language`);
  }
});

test('generic template tells are gone from the home page', () => {
  assert.ok(!/→/.test(page('/')), 'no arrows appended to links');
});

test('inventory still complete', () => assert.equal(inventory().length, 23));
