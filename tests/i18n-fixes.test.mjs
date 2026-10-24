import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { page } from './helpers.mjs';

const strip = (html) => html.replace(/\sdata-astro-cid-[\w-]+(="[^"]*")?/g, '');
const projects = JSON.parse(readFileSync(new URL('../src/data/projects.json', import.meta.url), 'utf8'));

test('English inside es/it text is marked lang="en"', () => {
  for (const lang of ['es', 'it']) {
    const sv = strip(page(`/${lang}/work/sunnyvale-cleanwater/`));
    for (const label of ['Contact Us', 'Updates', 'Get Involved', 'Back to Questions']) {
      assert.ok(sv.includes(`<span lang="en">${label}</span>`), `${lang} Sunnyvale: ${label}`);
    }
    const de = strip(page(`/${lang}/work/descubre/`));
    assert.match(de, /<span lang="en">Developmental Editor, World Languages/, `${lang} Descubre: job title in the facts`);
    const ar = strip(page(`/${lang}/archive/`));
    assert.match(ar, /<dd><span lang="en">AI UX Consultant<\/span><\/dd>/, `${lang} Index: job title`);
    assert.match(ar, /<span lang="en">Pokémon Phenomenon: Game Mechanics/, `${lang} Index: thesis title`);
  }
  assert.match(strip(page('/it/work/alfredo-voice-services/')), /<span lang="es">Mande texto<\/span>/, 'it Alfredo: Spanish fragment marked Spanish');
});

test('gender: Brian masculine, teammates by name', () => {
  assert.match(page('/es/'), /diseñador UX y redactor UX/, 'es tagline');
  const es = strip(page('/es/work/sunnyvale-cleanwater/'));
  assert.ok(es.includes('Diseñador UX y redactor UX'), 'es Sunnyvale role');
  assert.ok(es.includes('Erin, experta en la materia y científica del agua'), 'es Erin');
  assert.ok(strip(page('/es/work/ladwp-turf-replacement/')).includes('David, ingeniero civil'), 'es David');
  assert.ok(strip(page('/es/archive/')).includes('Codiseñador'), 'es Kynd role');
  assert.ok(strip(page('/it/archive/')).includes('Artista e ricercatore'), 'it Biella role');
});

test('coaching is not upgraded to directing', () => {
  assert.ok(!/dirig[íi](endo)? a los actores/.test(page('/es/work/alfredo-voice-services/')), 'es case study');
  assert.ok(!/dirig[íi] a los actores/.test(JSON.stringify(projects)), 'es summary');
  for (const route of ['/it/work/alfredo-voice-services/', '/it/archive/']) assert.ok(!page(route).includes('doppiatori'), route);
});

test('no provenance claim the English does not make', () => {
  assert.ok(!page('/es/work/descubre/').includes('son los del libro'));
  assert.ok(!page('/it/work/descubre/').includes('sono quelli del libro'));
});

test('accuracy fixes in translation', () => {
  assert.ok(!page('/es/archive/').includes('se proyectaban'), 'OF(F) THE GAZE: played, not projected');
  assert.ok(page('/es/work/ladwp-turf-replacement/').includes('Departamento de Agua y Energía de Los Ángeles'), 'LADWP official Spanish name');
});

test('translation source and projects.json stay in sync', async () => {
  const { default: source } = await import('../scripts/translations-projects.mjs');
  for (const p of projects) assert.deepEqual(p.i18n, { es: source[p.id].es, it: source[p.id].it }, p.id);
});

test('public mode: the 404 offers no switcher or alternates to pages that do not exist', { timeout: 240000 }, () => {
  const out = 'dist-public-404-test';
  rmSync(out, { recursive: true, force: true });
  execSync('npx astro build', { env: { ...process.env, LANGUAGES_PUBLIC: '1', OUT_DIR: out }, stdio: 'pipe' });
  try {
    const html = readFileSync(join(out, '404.html'), 'utf8');
    assert.ok(!/\/(es|it)\/404/.test(html), 'no /es/404 or /it/404 links');
    assert.ok(!html.includes('class="lang-switcher'), 'no switcher on the 404');
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

test('language markers never leak into pages', async () => {
  const { allPages } = await import('./helpers.mjs');
  for (const file of allPages()) assert.ok(!/[⟦⟧]/.test(readFileSync(file, 'utf8')), file);
});

test('Spanish pages use neutral Latin American Spanish', () => {
  const spainOnly = /\b(vídeos?|alumnado|profesorado|ordenador(es)?|patatas|tarta|máster|deberes|en remoto|pulsa[r]?)\b/i;
  for (const route of ['/es/', '/es/about/', '/es/archive/', '/es/work/descubre/', '/es/work/ladwp-turf-replacement/', '/es/work/the-burger-queen/', '/es/work/526-lowcountry-corridor/']) {
    const text = page(route).replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    assert.ok(!spainOnly.test(text), `${route}: ${text.match(spainOnly)?.[0]}`);
  }
});
