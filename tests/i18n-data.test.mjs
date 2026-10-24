import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { page, inventory } from './helpers.mjs';

const projects = JSON.parse(readFileSync(new URL('../src/data/projects.json', import.meta.url), 'utf8'));
const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

for (const lang of ['es', 'it']) {
  test(`${lang} Index lists all 23 projects with translated summaries`, () => {
    const html = page(`/${lang}/archive/`);
    for (const id of inventory()) assert.equal(html.split(`id="${id}"`).length - 1, 1, `${lang}: ${id}`);
    for (const p of projects) {
      const row = html.slice(html.indexOf(`id="${p.id}"`));
      const rowEnd = row.indexOf('</li>');
      const rowText = text(row.slice(0, rowEnd));
      assert.ok(!rowText.includes(p.summary.slice(0, 40)), `${lang}: ${p.id} still shows the English summary`);
    }
  });

  test(`${lang} every project has a complete translation`, () => {
    for (const p of projects) {
      const t = p.i18n?.[lang];
      assert.ok(t && t.summary && t.role, `${lang}: ${p.id} missing summary or role`);
      if (p.detail) assert.ok(t.detail, `${lang}: ${p.id} missing detail`);
      if (p.team) assert.equal(t.teamRoles?.length, p.team.length, `${lang}: ${p.id} team roles`);
    }
  });
}

test('filter buttons are translated but keep canonical values', () => {
  const es = page('/es/archive/');
  assert.match(es, /<button[^>]*data-value="UX Writing"[^>]*>Escritura UX<\/button>/);
  const it = page('/it/archive/');
  assert.match(it, /<button[^>]*data-value="Accessibility"[^>]*>Accessibilità<\/button>/);
});
