import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './helpers.mjs';

const visuals = (html) => [...html.matchAll(/<div class="selected__visual[^"]*"[\s\S]*?<\/div>\s*<div class="selected__text/g)].map((m) => m[0]);

test('every selected project shows its visual on a tinted panel', () => {
  for (const prefix of ['', '/es', '/it']) {
    const v = visuals(page(`${prefix}/`));
    assert.equal(v.length, 6, `${prefix || '/'}: six visuals`);
    for (const x of v) assert.match(x, /class="selected__visual mat mat--(a|b)/);
  }
});

test('LADWP and The Burger Queen show a pile of two real screens; only the front one is described', () => {
  const v = visuals(page('/'));
  for (const i of [1, 5]) {
    assert.match(v[i], /mat__stack/, `visual ${i} is a stack`);
    const alts = [...v[i].matchAll(/<img[^>]*?\salt(?:="([^"]*)")?[\s>]/g)].map((m) => m[1] ?? '');
    assert.equal(alts.length, 2, `visual ${i}: two images`);
    assert.equal(alts.filter((a) => a === '').length, 1, `visual ${i}: back image is decorative`);
  }
});

const strip = (html) => html.match(/<section[^>]*aria-labelledby="samples-title"[\s\S]*?<\/section>/)?.[0] ?? '';

test('a before-and-after strip shows three real edits, linked to their case studies', () => {
  const titles = { '': 'Before and after', '/es': 'Antes y después', '/it': 'Prima e dopo' };
  for (const [prefix, title] of Object.entries(titles)) {
    const s = strip(page(`${prefix}/`));
    assert.ok(s.includes(`>${title}</h2>`), `${prefix || '/'}: heading`);
    assert.equal((s.match(/class="edit-view /g) ?? []).length, 3, 'three edits');
    for (const anchor of ['sunnyvale-cleanwater/#microcopy', 'descubre/#digital', 'alfredo-voice-services/#sms']) {
      assert.ok(s.includes(`${prefix}/work/${anchor}`), `${prefix || '/'}: links to ${anchor}`);
    }
    for (const verbatim of ['Service and Environment Goals', '>circle<', '>STOP<']) assert.ok(s.includes(verbatim), `keeps ${verbatim} verbatim`);
  }
});
