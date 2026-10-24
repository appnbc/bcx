import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { allPages, page, DIST } from './helpers.mjs';
import { join } from 'node:path';

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

// Wording about the portfolio's own paperwork that would make a visitor go "huh?".
const behindTheScenes = [
  /Résumé only/i,
  /\bEvidence\b/,
  /\bSource:/,
  /write-up/i,
  /my notes/i,
  /source material/i,
  /not recorded/i,
  /Set in Newsreader/i,
  /when documented/i,
  /Transcribed from/i,
];

test('no behind-the-scenes wording on any page', () => {
  for (const file of allPages()) {
    const text = visibleText(readFileSync(file, 'utf8'));
    for (const re of behindTheScenes) assert.ok(!re.test(text), `${file}: "${text.match(re)?.[0]}"`);
  }
});

test('preview page is gone and the calm homepage is live at /', () => {
  assert.ok(!existsSync(join(DIST, 'preview')), 'no /preview/ route');
  const html = page('/');
  assert.match(html, /class="[^"]*hero-art/, 'illustration on the homepage');
  assert.ok(!/name="robots" content="noindex"/.test(html), 'homepage is indexable');
});

test('a 404 page exists', () => {
  assert.ok(existsSync(join(DIST, '404.html')), 'dist/404.html');
  const html = readFileSync(join(DIST, '404.html'), 'utf8');
  assert.match(html, /href="\/"/, 'links home');
  assert.match(html, /href="\/archive\/"/, 'links to the Index');
});

test('pages carry share-preview tags', () => {
  for (const route of ['/', '/work/descubre/']) {
    const html = page(route);
    assert.match(html, /<meta property="og:title" content="[^"]+"/, `${route} og:title`);
    assert.match(html, /<meta property="og:description" content="[^"]+"/, `${route} og:description`);
  }
});

test('case-study headers share one style: no per-project color bands', () => {
  const html = page('/work/sunnyvale-cleanwater/');
  assert.ok(!/--accent:\s*#/i.test(html), 'no inline project accent');
});
