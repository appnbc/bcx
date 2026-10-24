import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const h2s = (html) => [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim());

const home = {
  es: { headline: 'Diseño y escribo interfaces', h2: ['Trabajos seleccionados', 'Investigación y práctica', 'Sobre mí'] },
  it: { headline: 'Progetto e scrivo interfacce', h2: ['Lavori selezionati', 'Ricerca e pratica', 'Chi sono'] },
};
const about = {
  es: ['Experiencia', 'Formación académica', 'Charlas y textos', 'Docencia y jurado', 'Reconocimientos', 'Formación continua', 'Métodos y herramientas', 'Idiomas'],
  it: ['Esperienza', 'Istruzione', 'Interventi e scritti', 'Insegnamento e giurie', 'Riconoscimenti', 'Formazione continua', 'Metodi e strumenti', 'Lingue'],
};
const facts = { es: ['Rol', 'Dónde', 'Cuándo', 'Equipo'], it: ['Ruolo', 'Dove', 'Quando', 'Team'] };

for (const lang of ['es', 'it']) {
  test(`${lang} home: translated headline with three marks and translated sections`, () => {
    const html = page(`/${lang}/`);
    const h1 = html.match(/<h1[\s\S]*?<\/h1>/)[0];
    assert.ok(h1.includes(home[lang].headline), 'headline');
    assert.equal((h1.match(/<mark\b/g) ?? []).length, 3, 'three highlighted phrases');
    assert.ok(!/data-lang="en"/.test(h1), 'only the page language is rendered');
    for (const h of home[lang].h2) assert.ok(h2s(html).includes(h), `h2 ${h}`);
  });

  test(`${lang} About: every CV section heading translated`, () => {
    const found = h2s(page(`/${lang}/about/`));
    for (const h of about[lang]) assert.ok(found.includes(h), `${h} (found: ${found.join(' | ')})`);
  });

  test(`${lang} case header labels translated`, () => {
    const html = page(`/${lang}/work/sunnyvale-cleanwater/`);
    for (const label of facts[lang]) assert.match(html, new RegExp(`<dt[^>]*>${label}</dt>`), label);
  });
}

test('official grade names stay in English, marked as English, on translated About pages', () => {
  for (const lang of ['es', 'it']) {
    const html = page(`/${lang}/about/`);
    assert.match(html, /<span lang="en">Very Good<\/span>/, lang);
    assert.ok(!html.includes('⟦'), `${lang}: no raw markers`);
  }
});
