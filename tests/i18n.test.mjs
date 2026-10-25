import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { DIST, allPages, page } from './helpers.mjs';

const pageIds = ['sunnyvale-cleanwater', 'ladwp-turf-replacement', 'descubre', 'alfredo-voice-services', '526-lowcountry-corridor', 'the-burger-queen', 'mosaik'];
export const routes = ['/', '/archive/', '/about/', ...pageIds.map((id) => `/work/${id}/`)];
const langs = ['', '/es', '/it'];
const langOfFile = (file) => {
  const rel = file.slice(DIST.length).replace(/\\/g, '/').replace(/^\//, '');
  return rel.startsWith('es/') ? 'es' : rel.startsWith('it/') ? 'it' : 'en';
};

test('every page exists in all three languages', () => {
  for (const lang of langs) for (const r of routes) assert.ok(existsSync(join(DIST, `${lang}${r}`, 'index.html')), `${lang}${r}`);
});

test('html lang matches the locale', () => {
  for (const [prefix, lang] of [['', 'en'], ['/es', 'es'], ['/it', 'it']]) {
    for (const r of routes) assert.match(page(`${prefix}${r}`), new RegExp(`<html[^>]*lang="${lang}"`), `${prefix}${r}`);
  }
});

test('private mode: es/it are noindex; no hreflang or switcher anywhere', () => {
  for (const file of allPages()) {
    const html = readFileSync(file, 'utf8');
    assert.ok(!html.includes('hreflang='), `${file} has hreflang`);
    assert.ok(!html.includes('class="lang-switcher'), `${file} has a switcher`);
    if (langOfFile(file) !== 'en') assert.ok(html.includes('name="robots" content="noindex"'), `${file} indexable`);
  }
});

test('english pages never link into /es/ or /it/', () => {
  for (const file of allPages().filter((f) => langOfFile(f) === 'en')) {
    const html = readFileSync(file, 'utf8');
    assert.ok(!/href="\/(es|it)\//.test(html), `${file} links into a translation`);
  }
});

test('internal links on es/it pages stay in their language', () => {
  for (const file of allPages().filter((f) => langOfFile(f) !== 'en')) {
    const lang = langOfFile(file);
    const html = readFileSync(file, 'utf8');
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)) {
      if (href.startsWith('/_astro/') || href === '/favicon.svg') continue;
      assert.ok(href.startsWith(`/${lang}/`), `${file}: ${href}`);
    }
  }
});

test('switcher and hreflang render when languages are public', { timeout: 240000 }, () => {
  const out = 'dist-public-test';
  rmSync(out, { recursive: true, force: true });
  execSync('npx astro build', { env: { ...process.env, LANGUAGES_PUBLIC: '1', OUT_DIR: out, SITE_URL: 'https://example.org' }, stdio: 'pipe' });
  try {
    const html = readFileSync(join(out, 'work', 'descubre', 'index.html'), 'utf8');
    assert.ok(html.includes('class="lang-switcher'), 'switcher');
    assert.equal(html.match(/class="lang-switcher__beta"/g)?.length, 1, 'exactly one language tagged Beta');
    assert.match(html, /hreflang="it"[^>]*>(?:(?!<\/a>).)*lang-switcher__beta/, 'the Beta tag is on Italian');
    assert.match(html, /hreflang="es"[^>]*href="https:\/\/example\.org\/es\/work\/descubre\/"/, 'hreflang es is an absolute URL');
    assert.match(html, /hreflang="x-default"[^>]*href="https:\/\/example\.org\/work\/descubre\/"/, 'x-default is an absolute URL');
    assert.ok(!readFileSync(join(out, 'es', 'index.html'), 'utf8').includes('content="noindex"'), 'es indexable when public');
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});
