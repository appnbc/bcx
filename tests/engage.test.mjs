import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

test('case-study screenshots link to a full-size image', () => {
  const html = page('/work/sunnyvale-cleanwater/');
  const zooms = [...html.matchAll(/<a\b[^>]*class="[^"]*\bzoom\b[^"]*"[^>]*href="([^"]+)"/g)];
  assert.ok(zooms.length >= 8, `expected zoomable screenshots, found ${zooms.length}`);
  for (const [, href] of zooms) assert.match(href, /^\/_astro\/.+\.(webp|png|jpg)$/);
});

test('home selected-work screenshots are zoomable', () => {
  assert.match(page('/'), /class="[^"]*\bzoom\b/);
});

test('long case studies have an on-this-page nav listing every section', () => {
  const html = page('/work/sunnyvale-cleanwater/');
  const nav = html.match(/<nav[^>]*aria-label="On this page"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, 'nav present');
  for (const id of ['context', 'team', 'personas', 'microcopy', 'ia', 'navigation', 'layout', 'process', 'retrospective']) {
    assert.ok(nav.includes(`href="#${id}"`), `links to #${id}`);
  }
});

test('one-section pages skip the nav', () => {
  assert.ok(!/aria-label="On this page"/.test(page('/work/mosaik/')));
});

test('home has one selected-work section with a Design / Writing switch', () => {
  const html = page('/');
  assert.equal((html.match(/class="[^"]*\bselected\b[^"]*"/g) ?? []).filter((m) => /grid selected/.test(m)).length, 6, 'six selected projects');
  for (const label of ['All', 'Design', 'Writing']) {
    assert.match(html, new RegExp(`<button[^>]*data-show="[^"]*"[^>]*>${label}</button>`), `${label} switch`);
  }
  assert.ok(!/<h2[^>]*>Design<\/h2>/.test(html), 'no duplicate Design list');
});

test('contact is a big, centered email link with a copy button on every page', () => {
  for (const route of ['/', '/about/', '/work/descubre/']) {
    const footer = page(route).match(/<footer[\s\S]*?<\/footer>/)[0];
    assert.match(footer, /<a[^>]*class="[^"]*contact-big[^"]*"[^>]*href="mailto:brieducon@gmail\.com"|<a[^>]*href="mailto:brieducon@gmail\.com"[^>]*class="[^"]*contact-big/, `${route} big link`);
    assert.match(footer, /<button[^>]*data-copy="brieducon@gmail\.com"[^>]*>Copy email<\/button>/, `${route} copy button`);
  }
});

test('home hero has a decorative line illustration beside the headline', () => {
  const html = page('/');
  const intro = html.match(/<header class="grid intro[\s\S]*?<\/header>/)?.[0] ?? '';
  const art = intro.match(/<svg[^>]*class="[^"]*hero-art[^"]*"[^>]*>/)?.[0];
  assert.ok(art, 'illustration present in hero');
  assert.match(art, /aria-hidden="true"/, 'decorative: hidden from assistive tech');
  assert.ok(intro.includes('>Hello<') && intro.includes('>Hola<'), 'bilingual bubbles');
});

test('home headline and illustration include Italian', () => {
  const html = page('/');
  const h1 = html.match(/<h1[\s\S]*?<\/h1>/)[0];
  assert.match(h1, /<span[^>]*data-lang="it"[^>]*lang="it"[^>]*hidden/, 'Italian version, marked Italian, hidden by default');
  assert.ok(h1.includes('programmi pubblici') && h1.includes('apprendimento delle lingue'));
  assert.match(html, /<button[^>]*data-headline="it"[^>]*>Italiano<\/button>/, 'Italiano switch');
  assert.ok(html.includes('>Ciao<'), 'Ciao bubble');
});
