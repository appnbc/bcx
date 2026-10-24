import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

export function page(route) {
  const file = join(DIST, route.replace(/^\//, ''), route.endsWith('.html') ? '' : 'index.html');
  if (!existsSync(file)) throw new Error(`Missing built page: ${route} (${file})`);
  return readFileSync(file, 'utf8');
}

export function inventory() {
  return JSON.parse(readFileSync(new URL('../src/data/inventory.json', import.meta.url), 'utf8'));
}

export function body(html) {
  return html.slice(html.indexOf('<body'));
}

export function allPages(dir = DIST) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...allPages(p));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}
