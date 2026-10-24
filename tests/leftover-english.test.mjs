import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { allPages, DIST } from './helpers.mjs';

// Visible text of a page, skipping scripts, styles and any element marked as English
// (lang="en") or as an untranslated artifact (data-verbatim).
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
export function translatedText(html) {
  const body = html.slice(html.indexOf('<body'));
  const out = [];
  let skipDepth = 0;
  const stack = [];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)([^>]*)>|([^<]+)/g;
  for (const m of body.matchAll(re)) {
    const [, closing, tag, attrs, text] = m;
    if (text !== undefined) {
      if (!skipDepth) out.push(text);
      continue;
    }
    if (!tag) continue;
    const name = tag.toLowerCase();
    if (closing) {
      while (stack.length) {
        const top = stack.pop();
        if (top.skip) skipDepth--;
        if (top.name === name) break;
      }
      continue;
    }
    if (VOID.has(name) || attrs.trim().endsWith('/')) continue;
    const skip = name === 'script' || name === 'style' || /\slang="en"/.test(attrs) || /\sdata-verbatim/.test(attrs);
    stack.push({ name, skip });
    if (skip) skipDepth++;
  }
  return out.join(' ').replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/\s+/g, ' ');
}

// English function words that don't double as common Spanish or Italian words.
const STOP = new Set('the and of to for with that is was on it as by this from at are be you your we our they their not have has were which what who would there here'.split(' '));
const UI_PHRASES = ['Read the case study', 'Selected work', 'See all', 'Copy email', 'Before launch', 'Skip to content', 'Details in the Index', 'Clear filters', 'Oldest first', 'Research areas', 'Pain points', 'User persona'];

export function englishRuns(text) {
  const words = text.toLowerCase().match(/[a-z’']+/g) ?? [];
  const hits = [];
  for (let i = 0; i + 5 <= words.length; i++) {
    const window = words.slice(i, i + 5);
    if (window.filter((w) => STOP.has(w)).length >= 3) hits.push(window.join(' '));
  }
  return [...new Set(hits)];
}

for (const lang of ['es', 'it']) {
  test(`${lang}: no English left in translated text`, () => {
    const problems = [];
    for (const file of allPages().filter((f) => f.slice(DIST.length).replace(/\\/g, '/').startsWith(`/${lang}/`) || f.slice(DIST.length).replace(/\\/g, '/').startsWith(`${lang}/`))) {
      const text = translatedText(readFileSync(file, 'utf8'));
      const where = file.slice(DIST.length);
      for (const run of englishRuns(text)) problems.push(`${where}: “…${run}…”`);
      for (const phrase of UI_PHRASES) if (text.includes(phrase)) problems.push(`${where}: UI text “${phrase}”`);
    }
    assert.deepEqual(problems.slice(0, 40), []);
  });
}

test('the scanner catches English (sanity check)', () => {
  assert.ok(englishRuns('Esto es una prueba and this is the kind of text that should be caught').length > 0);
  assert.equal(translatedText('<body><p>Hola</p><p lang="en">The thing is that it was here</p></body>').trim(), 'Hola');
});

test('on-this-page bar is translated', async () => {
  const { page } = await import('./helpers.mjs');
  assert.match(page('/es/work/sunnyvale-cleanwater/'), /aria-label="En esta página"/);
  assert.match(page('/it/work/sunnyvale-cleanwater/'), /aria-label="In questa pagina"/);
});
