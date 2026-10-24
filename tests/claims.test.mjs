import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

// Phrases the final review found going beyond the sources. Each must stay out of the built site.
const unsupported = [
  ['/', 'plain-language Spanish', '526: retrospective confirms only "consistent language accessibility"'],
  ['/work/526-lowcountry-corridor/', 'in plain language', '526: plain-language translation is a stated need, not a confirmed fix'],
  ['/', 'instead of on-screen prompts', 'Kynd: résumé makes no such contrast'],
  ['/archive/', 'instead of on-screen prompts', 'Kynd: résumé makes no such contrast'],
  ['/work/ladwp-turf-replacement/', 'took over', 'LADWP: PDF says "When I got to work on the website"'],
  ['/work/ladwp-turf-replacement/', 'as shipped', 'LADWP: worked before launch; tip is from a screenshot'],
  ['/work/descubre/', 'for each lesson', 'Descubre: PDF says chats "relevant to the lessons"'],
  ['/about/', 'designed a Spanish phone system', 'Alfredo: one of two voice UX designers'],
  ['/about/', 'Since 2022 my practice has widened', 'AR Neighborhood dates from 2017'],
  ['/work/the-burger-queen/', 'give only these details', 'Burger Queen: spreadsheet also gives ages'],
  ['/archive/', 'overhead', 'OF(F) THE GAZE: résumé says "mounted under scaffolding"'],
  ['/archive/', 'hashtags', 'Touch Grass: résumé says "social-media metadata tags"'],
  ['/archive/', 'where they happened', 'AR Neighborhood: résumé says "physical urban coordinates"'],
];

for (const [route, phrase, why] of unsupported) {
  test(`${route} avoids "${phrase}"`, () => {
    assert.ok(!page(route).includes(phrase), why);
  });
}

test('Alfredo: the moved name is not marked as an insertion', () => {
  const html = page('/work/alfredo-voice-services/').replace(/\sdata-astro-cid-[\w-]+/g, '');
  assert.ok(!html.includes('<ins><span class="visually-hidden">inserted: </span>JUAN</ins>'));
});

// The same unsupported claims must not reappear in translation.
const unsupportedTranslated = [
  ['/es/', 'español en lenguaje claro', '526: only consistent language access is confirmed'],
  ['/it/', 'spagnolo in linguaggio semplice', '526: only consistent language access is confirmed'],
  ['/es/work/526-lowcountry-corridor/', 'en lenguaje claro', '526: plain-language translation is a stated need'],
  ['/it/work/526-lowcountry-corridor/', 'in linguaggio semplice', '526: plain-language translation is a stated need'],
  ['/es/archive/', 'indicaciones en pantalla', 'Kynd: résumé makes no such contrast'],
  ['/it/archive/', 'indicazioni sullo schermo', 'Kynd: résumé makes no such contrast'],
];
for (const [route, phrase, why] of unsupportedTranslated) {
  test(`${route} avoids "${phrase}"`, () => {
    assert.ok(!page(route).includes(phrase), why);
  });
}
