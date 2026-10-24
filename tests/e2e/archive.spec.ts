import { test, expect } from '@playwright/test';

const rows = (page) => page.locator('.archive-row:visible');

test('filters by discipline and syncs URL and count', async ({ page }) => {
  await page.goto('/archive/');
  const btn = page.getByRole('button', { name: 'UX Writing', exact: true });
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await expect(page).toHaveURL(/\?d=UX\+Writing/);
  const n = await rows(page).count();
  expect(n).toBeGreaterThan(0);
  expect(n).toBeLessThan(23);
  for (const d of await rows(page).evaluateAll((els) => els.map((e) => e.getAttribute('data-d')))) {
    expect(d).toContain('UX Writing');
  }
  await expect(page.locator('[data-result-count]')).toHaveText(`${n} projects`);
});

test('bad query shows everything', async ({ page }) => {
  await page.goto('/archive/?d=nonsense');
  await expect(rows(page)).toHaveCount(23);
});

test('no-JS shows everything and hides filters', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321/archive/');
  await expect(page.locator('.archive-row')).toHaveCount(23);
  await expect(page.locator('.archive-filters')).toBeHidden();
  await ctx.close();
});

test('zero results shows message and clear restores all', async ({ page }) => {
  await page.goto('/archive/?d=Creative+Practice&c=Localization');
  await expect(rows(page)).toHaveCount(0);
  await expect(page.getByText('No projects match these filters')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(rows(page)).toHaveCount(23);
  await expect(page).toHaveURL(/\/archive\/$/);
});

test('deep link opens entry', async ({ page }) => {
  await page.goto('/archive/#kynd');
  await expect(page.locator('#kynd details')).toHaveAttribute('open', '');
});

test('filters are keyboard operable', async ({ page }) => {
  await page.goto('/archive/');
  await page.getByRole('button', { name: 'Talk & writing', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(rows(page)).toHaveCount(3);
});

test('deep link with a query keeps the hash and opens the entry', async ({ page }) => {
  await page.goto('/archive/?t=exhibition#kynd');
  await expect(page.locator('#kynd details')).toHaveAttribute('open', '');
  await expect(page).toHaveURL(/\?t=exhibition#kynd$/);
});

test('clicking a filter keeps the hash', async ({ page }) => {
  await page.goto('/archive/#kynd');
  await page.getByRole('button', { name: 'Creative Practice', exact: true }).click();
  await expect(page).toHaveURL(/#kynd$/);
});
