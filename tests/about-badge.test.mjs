import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const badge = (html) => html.match(/<figure class="badge[\s\S]*?<\/figure>/)?.[0] ?? '';

test('About opens with a name badge: real photo, name, role, and a greeting in the page language', () => {
  const cases = { '': ['Hi!', 'UX designer and UX writer'], '/es': ['¡Hola!', 'diseñador UX y redactor UX'], '/it': ['Ciao!', 'UX designer e UX writer'] };
  for (const [prefix, [hello, role]] of Object.entries(cases)) {
    const b = badge(page(`${prefix}/about/`));
    assert.ok(b, `${prefix || '/'}: badge present`);
    assert.match(b, /<img[^>]*alt="Brian Contreras[^"]+"/, 'photo described');
    assert.ok(b.includes('>Brian Contreras<'), 'name');
    assert.ok(b.includes(`>${role}<`), 'role');
    assert.match(b, new RegExp(`<p class="badge__hello"[^>]*aria-hidden="true"[^>]*>${hello}</p>`), 'decorative greeting');
  }
});

test('the headshot is never served wider than the original file', () => {
  const b = badge(page('/about/'));
  const widths = [...b.matchAll(/ (\d+)w/g)].map((m) => +m[1]);
  assert.ok(widths.length && Math.max(...widths) <= 158, `widths ${widths}`);
});
