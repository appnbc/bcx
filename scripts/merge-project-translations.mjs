// One-off: merges scripts/translations-projects.mjs into src/data/projects.json as each record's `i18n` field.
// Safe to re-run; the translations file is the source and projects.json the result.
import { readFileSync, writeFileSync } from 'node:fs';
import translations from './translations-projects.mjs';

const file = 'src/data/projects.json';
const projects = JSON.parse(readFileSync(file, 'utf8'));
for (const p of projects) {
  const t = translations[p.id];
  if (!t) throw new Error(`No translation for ${p.id}`);
  p.i18n = { es: t.es, it: t.it };
}
const missing = Object.keys(translations).filter((id) => !projects.some((p) => p.id === id));
if (missing.length) throw new Error(`Translations for unknown ids: ${missing.join(', ')}`);
writeFileSync(file, JSON.stringify(projects, null, 2) + '\n');
console.log(`merged translations into ${projects.length} projects`);
