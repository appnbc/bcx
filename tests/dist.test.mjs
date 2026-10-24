import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { page, body, inventory, allPages } from './helpers.mjs';

test('home has lang, title, skip link, nav', () => {
  const html = page('/');
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<title>[^<]+<\/title>/);
  const firstLink = body(html).match(/<a\b[^>]*href="([^"]+)"/);
  assert.equal(firstLink?.[1], '#main', 'first link in body is the skip link');
  const nav = html.slice(html.indexOf("<nav"), html.indexOf("</nav>"));
  for (const href of ["/archive/", "/about/", "#contact"]) {
    assert.ok(nav.includes(`href="${href}"`), `nav links to ${href}`);
  }
});

test('archive lists every inventory id exactly once', () => {
  const html = page('/archive/');
  const ids = inventory();
  assert.equal(ids.length, 23);
  for (const id of ids) {
    const count = html.split(`id="${id}"`).length - 1;
    assert.equal(count, 1, `${id} appears ${count} times`);
  }
});

test('home shows both disciplines, selected work, practice, index route', () => {
  const html = page('/');
  // Design and Writing are equally visible as switches over one set of selected work.
  assert.match(html, /<button[^>]*data-show="design"[^>]*>Design<\/button>/);
  assert.match(html, /<button[^>]*data-show="writing"[^>]*>Writing<\/button>/);
  for (const id of ['sunnyvale-cleanwater', 'ladwp-turf-replacement', 'alfredo-voice-services', 'descubre', '526-lowcountry-corridor']) {
    assert.ok(html.includes(`href="/work/${id}/"`), `links to ${id}`);
  }
  for (const id of ['kynd', 'off-the-gaze', 'the-agent']) {
    assert.ok(html.includes(`href="/archive/#${id}"`), `links to entry ${id}`);
  }
  assert.match(html, /<a[^>]*href="\/archive\/"[^>]*>[^<]*all 23/i);
});

test('about has CV sections', () => {
  const html = page('/about/');
  for (const h of ['Experience', 'Education', 'Talks &amp; writing', 'Teaching &amp; jury', 'Honors', 'Training', 'Languages']) {
    assert.match(html, new RegExp(`<h2[^>]*>${h}</h2>`), `has h2 ${h}`);
  }
  for (const s of ['Versay Solutions', 'CDM Smith', 'Pompeu Fabra']) assert.ok(html.includes(s), `mentions ${s}`);
});

test('no empty contact links or blank contact section', () => {
  for (const file of allPages()) {
    const html = readFileSync(file, 'utf8');
    assert.ok(!/href="mailto:"/.test(html), `${file} has an empty mailto`);
    const contact = html.match(/id="contact"[\s\S]*?<\/footer>/)?.[0] ?? '';
    assert.ok(/<a\b|coming soon/.test(contact.replace(/<h2[\s\S]*?<\/h2>/, '')), `${file} contact section is empty`);
  }
});
