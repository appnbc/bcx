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

test('only the homepage hero gets the soft colour wash, hidden from assistive tech', () => {
  for (const prefix of ['', '/es', '/it']) assert.match(page(`${prefix}/`), /<div class="hero-wash"[^>]*aria-hidden="true"/, `${prefix || '/'} wash`);
  assert.ok(!/hero-wash/.test(page('/about/')), 'not on inner pages');
});

test('forest-and-peach palette, with no trace of the old navy and yellow', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const tokens = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  for (const v of ['--ink: #15392F', '--highlight: #FFC9B5', '--paper: #FCFCFA']) assert.ok(tokens.includes(v), v);
  const files = (dir) => readdirSync(new URL(dir, import.meta.url), { recursive: true }).filter((f) => /\.(css|astro|svg|ts)$/.test(f)).map((f) => new URL(`${dir}${f.replace(/\\/g, '/')}`, import.meta.url));
  for (const f of [...files('../src/'), ...files('../public/')]) {
    assert.ok(!/1D2B53|FFE45C|0F1830|255 228 92|29 43 83|15 24 48|1B1A17/i.test(readFileSync(f, 'utf8')), `${f.pathname} still uses an old colour`);
  }
});
