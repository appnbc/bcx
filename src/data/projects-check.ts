import type { CollectionEntry } from 'astro:content';
import inventory from './inventory.json';
import { withBase } from './url';

/** Throws at build time if the collection and the audited inventory disagree. */
export function assertInventory(entries: CollectionEntry<'projects'>[]): void {
  const ids = new Set(entries.map((e) => e.id));
  const missing = inventory.filter((id) => !ids.has(id));
  const extra = [...ids].filter((id) => !inventory.includes(id));
  if (missing.length || extra.length) {
    throw new Error(`Inventory mismatch: missing [${missing.join(', ')}] extra [${extra.join(', ')}]`);
  }
}

/** Collection entries in inventory order. */
export function inInventoryOrder(entries: CollectionEntry<'projects'>[]): CollectionEntry<'projects'>[] {
  return [...entries].sort((a, b) => inventory.indexOf(a.id) - inventory.indexOf(b.id));
}

/** Where a project lives: its case-study page, or its entry in the Index. */
export function projectHref(entry: CollectionEntry<'projects'>): string {
  return withBase(entry.data.form === 'page' ? `/work/${entry.id}/` : `/archive/#${entry.id}`);
}
