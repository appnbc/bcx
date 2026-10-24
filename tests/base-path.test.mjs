import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

// GitHub Pages serves a project repo from /<repo-name>/. Build as if the site lived at /portfolio/
// and check that nothing points outside it.
const OUT = 'dist-base-test';
const BASE = '/portfolio';

const pages = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? pages(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  );

test('a subfolder build keeps every internal link, image and script inside the base path', { timeout: 180000 }, () => {
  rmSync(OUT, { recursive: true, force: true });
  execSync('npx astro build', { env: { ...process.env, BASE_PATH: BASE, OUT_DIR: OUT }, stdio: 'pipe' });
  try {
    const bad = [];
    for (const file of pages(OUT)) {
      const html = readFileSync(file, 'utf8');
      for (const [, attr, url] of html.matchAll(/\s(href|src|srcset|content)="(\/[^"]*)"/g)) {
        if (url.startsWith('//')) continue;
        for (const part of url.split(/,\s*/)) {
          const u = part.trim().split(' ')[0];
          if (u.startsWith('/') && !u.startsWith(`${BASE}/`)) bad.push(`${file.slice(OUT.length)}: ${attr}="${u}"`);
        }
      }
    }
    assert.deepEqual([...new Set(bad)].slice(0, 20), []);
  } finally {
    rmSync(OUT, { recursive: true, force: true });
  }
});
