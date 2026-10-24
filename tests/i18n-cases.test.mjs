import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';
import { del, ins } from './cases.test.mjs';

const h2s = (html) => [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');

export function parity(id) {
  const en = h2s(page(`/work/${id}/`));
  for (const lang of ['es', 'it']) {
    const t = h2s(page(`/${lang}/work/${id}/`));
    assert.equal(t.length, en.length, `${lang} ${id}: ${t.length} sections vs ${en.length}`);
    assert.notDeepEqual(t.slice(0, -1), en.slice(0, -1), `${lang} ${id}: headings not translated`);
  }
}

for (const id of ['sunnyvale-cleanwater', 'ladwp-turf-replacement', 'descubre', 'mosaik']) {
  test(`${id}: same sections in every language, headings translated`, () => parity(id));
}

test('Sunnyvale: the subtitle edit stays verbatim English in every language', () => {
  for (const prefix of ['', '/es', '/it']) {
    const html = page(`${prefix}/work/sunnyvale-cleanwater/`);
    assert.ok(del(html, 'now') || del(html, 'now'.normalize()), `${prefix}: now`);
    assert.ok(/\bnow\b/.test(html) && /\btoday\b/.test(html) && /\bour\b/.test(html), `${prefix}: edit words present`);
    if (prefix) assert.match(html, /<figure[^>]*data-verbatim[^>]*>|<p[^>]*lang="en"[^>]*>Meeting /, `${prefix}: edit marked as English`);
  }
  assert.ok(h2s(page('/es/work/sunnyvale-cleanwater/')).includes('Arquitectura de la información'));
  assert.ok(h2s(page('/it/work/sunnyvale-cleanwater/')).includes('Architettura dell’informazione'));
});

test('LADWP: subject line and troubleshooting tip stay verbatim English', () => {
  for (const prefix of ['/es', '/it']) {
    const html = page(`${prefix}/work/ladwp-turf-replacement/`);
    assert.ok(html.includes('If trouble still persists, please open'), `${prefix}: tip`);
    assert.match(html, /<blockquote[^>]*lang="en"/, `${prefix}: tip marked English`);
    assert.ok(visible(html).includes('Application in Review'), `${prefix}: subject line`);
  }
});

test('Descubre: Spanish examples kept; glosses and prose translated', () => {
  for (const prefix of ['', '/es', '/it']) {
    const html = page(`${prefix}/work/descubre/`);
    assert.ok(html.includes('librería'), `${prefix}: librería`);
    assert.ok(del(html, 'circle') && ins(html, 'select'), `${prefix}: circle → select stays English`);
  }
  assert.ok(page('/es/work/descubre/').includes('Pautas editoriales'));
  assert.ok(page('/it/work/descubre/').includes('Linee guida editoriali'));
});

for (const id of ['alfredo-voice-services', '526-lowcountry-corridor', 'the-burger-queen']) {
  test(`${id}: same sections in every language, headings translated`, () => parity(id));
}

test('Alfredo: style guide examples and SMS edits stay as written', () => {
  for (const prefix of ['', '/es', '/it']) {
    const html = page(`${prefix}/work/alfredo-voice-services/`);
    assert.ok(html.includes('Son las diez de la mañana.'), `${prefix}: correct Spanish example`);
    assert.ok(del(html, 'vinculo') && ins(html, 'enlace'), `${prefix}: vinculo → enlace`);
    assert.equal((html.match(/<img\b/g) ?? []).length, 0, `${prefix}: no images`);
  }
});

test('526 LCC: six issues in every language', () => {
  for (const prefix of ['', '/es', '/it']) {
    assert.equal((page(`${prefix}/work/526-lowcountry-corridor/`).match(/class="ledger__n"/g) ?? []).length, 6, prefix);
  }
});

test('Burger Queen: nine verbatim English transcripts in every language', () => {
  for (const prefix of ['/es', '/it']) {
    const html = page(`${prefix}/work/the-burger-queen/`);
    const transcripts = html.match(/<div[^>]*class="screen__transcript"[^>]*>/g) ?? [];
    assert.equal(transcripts.length, 9, `${prefix}: nine transcripts`);
    for (const t of transcripts) assert.match(t, /data-verbatim/, `${prefix}: transcript marked verbatim`);
    assert.ok(html.includes('Welcome to Las Vegas!'), `${prefix}: dialogue kept`);
  }
});
