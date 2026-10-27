import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page, inventory } from './helpers.mjs';

test('each homepage highlights three key phrases in its own language', () => {
  for (const prefix of ['', '/es', '/it']) {
    const h1 = page(`${prefix}/`).match(/<h1[^>]*>[\s\S]*?<\/h1>/)[0];
    assert.equal((h1.match(/<mark\b/g) ?? []).length, 3, `${prefix || '/'}: three highlighted phrases`);
    assert.ok(!/mark-circle|mark-wavy|mark-insert|data-lang=/.test(h1), `${prefix || '/'}: one kind of mark, one language`);
  }
});

test('generic template tells are gone from the home page', () => {
  assert.ok(!/→/.test(page('/')), 'no arrows appended to links');
});

test('inventory still complete', () => assert.equal(inventory().length, 23));

test('only the homepage hero gets the soft colour wash, hidden from assistive tech', () => {
  for (const prefix of ['', '/es', '/it']) assert.match(page(`${prefix}/`), /<div class="hero-wash"[^>]*aria-hidden="true"/, `${prefix || '/'} wash`);
  assert.ok(!/hero-wash/.test(page('/about/')), 'not on inner pages');
});

test('graphite, porcelain and teal palette, with no trace of the old navy, yellow, forest, peach or lime', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const tokens = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  for (const v of ['--graphite: #171B22', '--porcelain: #F4F2EC', '--slate: #68716D', '--fine-rule: #D9DCD5', '--teal: #59C3BD', '--teal-ink: #176B66', '--paper: var(--porcelain)', '--ink: var(--graphite)', '--highlight: var(--teal)']) assert.ok(tokens.includes(v), v);
  for (const v of ['--cobalt: #5B7CFA', '--coral: #E07A6F', '--violet: #A48BEE', '--gold: #E3B75A', '--terracotta: #DF6B5C', '--sage: #88AA85']) assert.ok(tokens.includes(v), v);
  const files = (dir) => readdirSync(new URL(dir, import.meta.url), { recursive: true }).filter((f) => /\.(css|astro|svg|ts)$/.test(f)).map((f) => new URL(`${dir}${f.replace(/\\/g, '/')}`, import.meta.url));
  for (const f of [...files('../src/'), ...files('../public/')]) {
    assert.ok(!/1D2B53|FFE45C|0F1830|255 228 92|29 43 83|15 24 48|1B1A17|15392F|FFC9B5|FCFCFA|9 26 21|21 57 47|D9F277|--lime/i.test(readFileSync(f, 'utf8')), `${f.pathname} still uses an old colour`);
  }
});

test('dark is the default theme, whatever the system setting; light is opt-in', async () => {
  const { readFileSync } = await import('node:fs');
  const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  assert.ok(!css.includes('prefers-color-scheme'), 'the system setting plays no part');
  const dark = css.match(/\n:root:not\(\[data-theme='light'\]\) \{([^}]*)\}/);
  assert.ok(dark, 'a top-level dark block that applies unless light is chosen');
  for (const v of ['color-scheme: dark', '--paper: var(--graphite)', '--ink: var(--porcelain)']) assert.ok(dark[1].includes(v), v);
  assert.match(css, /:root\[data-theme='light'\] \{ color-scheme: light; \}/);
});

// WCAG contrast ratio between two #RRGGBB colours.
const contrast = (a, b) => {
  const lum = (h) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test('text and indicator tokens meet WCAG 2.2 AA on the surfaces they sit on', async () => {
  const { readFileSync } = await import('node:fs');
  const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
  const [light, dark] = css.split(":root:not([data-theme='light']) {");
  // A token's hex value in a block, following var() references back to the light block.
  const hex = (block, name) => {
    const m = block.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6}|var\\(--[a-z-]+\\))`));
    assert.ok(m, `${name} defined`);
    return m[1].startsWith('var(') ? hex(light, m[1].slice(4, -1)) : m[1];
  };
  const P = hex(light, '--porcelain');
  const G = hex(light, '--graphite');
  for (const t of ['--ink', '--ink-muted', '--ink-muted-on-wash']) assert.ok(contrast(hex(light, t), P) >= 4.5, `light ${t}`);
  assert.ok(contrast(hex(light, '--ink-muted'), hex(light, '--paper-sunk')) >= 4.5, 'light --ink-muted on --paper-sunk');
  for (const t of ['--ink-muted', '--ink-muted-on-wash']) assert.ok(contrast(hex(dark, t), G) >= 4.5, `dark ${t}`);
  assert.ok(contrast(hex(dark, '--ink-muted'), hex(dark, '--paper-sunk')) >= 4.5, 'dark --ink-muted on --paper-sunk');
  // Companions read as text on porcelain; the originals read as text on graphite.
  for (const c of ['cobalt', 'coral', 'violet', 'gold', 'terracotta', 'sage']) {
    assert.ok(contrast(hex(light, `--${c}-ink`), P) >= 4.5, `--${c}-ink on porcelain`);
    assert.ok(contrast(hex(light, `--${c}`), G) >= 4.5, `--${c} on graphite`);
  }
  // The shared pink and yellow signals: their companions on porcelain, the originals on graphite.
  for (const c of ['pink', 'yellow']) {
    assert.ok(contrast(hex(light, `--${c}-ink`), P) >= 4.5, `--${c}-ink on porcelain`);
    assert.ok(contrast(hex(light, `--${c}`), G) >= 4.5, `--${c} on graphite`);
  }
  // Selected chips, and control boundaries at 3:1.
  assert.ok(contrast(hex(light, '--teal'), G) >= 4.5, 'teal and graphite chip');
  // Teal lines and marks: the deep companion on porcelain, the signal teal on graphite.
  assert.ok(contrast(hex(light, '--signal-ink'), P) >= 4.5, 'light --signal-ink on porcelain');
  assert.ok(contrast(hex(dark, '--signal-ink'), G) >= 4.5, 'dark --signal-ink on graphite');
  assert.ok(contrast(hex(light, '--indicator'), P) >= 3, 'light --indicator');
  assert.ok(contrast(hex(dark, '--indicator'), G) >= 3, 'dark --indicator');
  assert.ok(contrast(hex(light, '--selected-fg'), hex(light, '--selected-bg')) >= 4.5, 'light selected chip');
  assert.ok(contrast(hex(dark, '--selected-fg'), hex(dark, '--selected-bg')) >= 4.5, 'dark selected chip');
  assert.ok(contrast(hex(light, '--rule-strong'), P) >= 3, 'light --rule-strong');
  assert.ok(contrast(hex(dark, '--rule-strong'), G) >= 3, 'dark --rule-strong');
});

test('the favicon is the graphite B mark with a teal point', async () => {
  const { readFileSync } = await import('node:fs');
  const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
  assert.match(svg, /<rect[^>]*fill="#171B22"/, 'graphite tile');
  assert.match(svg, /stroke="#F4F2EC"/, 'porcelain B');
  assert.match(svg, /<circle[^>]*fill="#59C3BD"/, 'teal point');
});

test('the maker’s mark signs the footer, the About page, and the end of each case study, always hidden from assistive tech', () => {
  const marks = (html) => html.match(/<svg[^>]*class="[^"]*maker-mark[^"]*"[^>]*>/g) ?? [];
  for (const prefix of ['', '/es', '/it']) {
    for (const route of ['/', '/about/', '/archive/', '/work/descubre/']) {
      const found = marks(page(`${prefix}${route}`));
      assert.ok(found.length >= 1, `${prefix}${route}: footer mark`);
      for (const m of found) assert.match(m, /aria-hidden="true"/, `${prefix}${route}: decorative`);
    }
    assert.equal(marks(page(`${prefix}/`)).length, 1, `${prefix}/: once on the homepage`);
    assert.equal(marks(page(`${prefix}/about/`)).length, 2, `${prefix}/about/: signature and footer`);
    assert.equal(marks(page(`${prefix}/work/descubre/`)).length, 2, `${prefix}/work/descubre/: end mark and footer`);
  }
});

test('the homepage signal thread is decorative', () => {
  for (const prefix of ['', '/es', '/it']) assert.match(page(`${prefix}/`), /<div class="thread"[^>]*aria-hidden="true"/, `${prefix || '/'} thread`);
});
