import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { DIST, allPages } from './helpers.mjs';

const routeOf = (file) => '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '');
const fileOf = (route) => join(DIST, route.replace(/^\//, ''), route.endsWith('/') || route === '' ? 'index.html' : '');
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

test('every internal link and fragment resolves', () => {
  const external = new Set();
  const broken = [];
  for (const file of allPages()) {
    const html = readFileSync(file, 'utf8');
    const from = routeOf(file);
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
      if (/^(https?:|mailto:)/.test(href)) { if (href.startsWith('http')) external.add(href); continue; }
      const [path, hash] = href.split('#');
      const route = path === '' ? from : path;
      const target = fileOf(route);
      if (!existsSync(target)) { broken.push(`${from} → ${href} (no page)`); continue; }
      if (hash && !ids(readFileSync(target, 'utf8')).has(hash)) broken.push(`${from} → ${href} (no #${hash})`);
    }
  }
  console.log(`external links to check by hand:\n  ${[...external].sort().join('\n  ')}`);
  assert.deepEqual(broken, []);
});
