import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const text = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const h2s = (html) => [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]).replace(/&amp;/g, '&'));

export function checkCase(route, headings) {
  const html = page(route);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'exactly one h1');
  const found = h2s(html);
  for (const h of headings) assert.ok(found.includes(h), `missing h2 "${h}" (found: ${found.join(' | ')})`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const alt = m[0].match(/\salt(?:="([^"]*)")?(?=[\s>/])/);
    assert.ok(alt, `img with no alt attribute: ${m[0].slice(0, 120)}`);
    assert.ok((alt[1] ?? '').trim() || isThumb(html, m.index), `img with empty alt outside a labeled thumbnail: ${m[0].slice(0, 120)}`);
  }
  return html;
}

// Gallery thumbnails are inside a labeled button whose caption names the image.
function isThumb(html, index) {
  const before = html.slice(Math.max(0, index - 3000), index);
  return before.lastIndexOf('class="gallery-thumb"') > before.lastIndexOf('</button>');
}

// Matches <del>/<ins> from EditView (and struck EnFace cells), tolerating Astro's scoped-style attributes.
const strip = (html) => html.replace(/\sdata-astro-cid-[\w-]+(="[^"]*")?/g, '');
// The hidden label is in the page language (deleted: / eliminado: / eliminato:).
const labels = { deleted: ['deleted', 'eliminado', 'eliminato'], inserted: ['inserted', 'insertado', 'inserito'], avoid: ['avoid', 'evitar', 'da evitare'] };
const mark = (tag, kind) => (html, s) =>
  labels[kind].some((label) => strip(html).includes(`<${tag}><span class="visually-hidden">${label}: </span>${s}</${tag}>`));
export const del = mark('del', 'deleted');
export const ins = mark('ins', 'inserted');
export const avoid = mark('del', 'avoid');

test('sunnyvale case study', () => {
  const html = checkCase('/work/sunnyvale-cleanwater/', ['Context', 'Team', 'Personas', 'Microcopy', 'Information architecture', 'Navigation', 'Content layout', 'Process simplification', 'Retrospective']);
  assert.ok(del(html, 'now') && ins(html, 'today'), 'now → today');
  assert.ok(del(html, 'the') && ins(html, 'our'), 'the → our');
  assert.ok(html.includes('href="https://sunnyvalecleanwater.com"'));
});

test('ladwp case study', () => {
  const html = checkCase('/work/ladwp-turf-replacement/', ['Context', 'Persona', 'Global updates', 'Hyperlinking', 'Program steps', 'Application', 'Troubleshooting', 'Confirmation email', 'Retrospective']);
  const ledgerRows = html.match(/class="ledger__n"/g) ?? [];
  assert.equal(ledgerRows.length, 7, 'global updates ledger has 7 rows');
  assert.ok(html.includes('If trouble still persists, please open'), 'troubleshooting tip transcribed');
});

test('descubre case study', () => {
  const html = checkCase('/work/descubre/', ['Context', 'Team', 'Persona', 'Editorial guidelines', 'Diversity and inclusion', 'Digital integration', 'Conversations', 'Retrospective']);
  assert.ok(html.includes('librería') && html.includes('bookstore') && avoid(html, 'library'), 'librería → bookstore, avoid library');
  assert.ok(del(html, 'circle') && ins(html, 'select'), 'circle → select');
  assert.ok(html.includes('href="/work/mosaik/"'));
  assert.ok(/lang="es"/.test(html));
});

test('mosaik case study', () => {
  const html = checkCase('/work/mosaik/', []);
  assert.match(html, /<h1[^>]*>Mosaik<\/h1>/);
  assert.ok(html.includes('href="/work/descubre/"'));
});

test('alfredo case study', () => {
  const html = checkCase('/work/alfredo-voice-services/', ['Context', 'Personas', 'Brainstorming', 'Voice and tone', 'Style guide', 'SMS', 'Retrospective']);
  assert.equal((html.match(/<img\b/g) ?? []).length, 0, 'audio product: no images');
  assert.ok(html.includes('Son las diez de la mañana.') && avoid(html, 'Son las diez a.m.'), 'time style rule');
  assert.ok(del(html, 'vinculo') && ins(html, 'enlace'), 'vinculo → enlace');
  assert.ok(html.includes('href="/archive/#talk-chatbot-summit"'));
});

test('526 lowcountry corridor case study', () => {
  const html = checkCase('/work/526-lowcountry-corridor/', ['Role', 'Persona', 'Accessibility issues and responses', 'Retrospective']);
  assert.equal((html.match(/class="ledger__n"/g) ?? []).length, 6, 'six issues');
  for (const u of ['https://www.526lowcountrycorridor.com/east/', 'https://526lcc.com/']) assert.ok(html.includes(`href="${u}"`), u);
});

test('burger queen case study', () => {
  const html = checkCase('/work/the-burger-queen/', ['Context', 'Personas', 'The conversation', 'What changed']);
  assert.equal((html.match(/class="screen"/g) ?? []).length, 9, 'nine screens');
  assert.equal((html.match(/class="screen__transcript"/g) ?? []).length, 9, 'each screen transcribed');
  assert.ok(html.includes('UX Writer'));
  assert.ok(!/survey|we can use/i.test(html), 'no speculative process claims');
});
