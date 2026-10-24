import { test, expect } from '@playwright/test';

test('a case-study screenshot opens full-size and closes back to it', async ({ page }) => {
  await page.goto('/work/sunnyvale-cleanwater/');
  const zoom = page.locator('a.zoom').first();
  await zoom.click();
  const box = page.locator('dialog#lightbox');
  await expect(box).toHaveAttribute('open', '');
  await expect(box.locator('img')).toHaveAttribute('src', /\/_astro\//);
  expect(await box.locator('img').getAttribute('alt')).toBeTruthy();
  await page.keyboard.press('Escape');
  await expect(box).not.toHaveAttribute('open', '');
  await expect(zoom).toBeFocused();
});

test('the on-this-page nav marks the section you are reading', async ({ page }) => {
  await page.goto('/work/sunnyvale-cleanwater/');
  await page.locator('#navigation').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.getElementById('navigation')!.scrollIntoView({ block: 'start' }));
  await expect(page.locator('nav[aria-label="On this page"] a[href="#navigation"]')).toHaveAttribute('aria-current', 'true');
});

test('home switch shows only writing work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Writing', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Writing', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const visible = await page.locator('article.selected:visible h3').allTextContents();
  expect(visible.map((t) => t.trim()).sort()).toEqual(['Alfredo Voice Services', 'Descubre', 'LADWP Turf Replacement Design', 'Sunnyvale Cleanwater', 'The Burger Queen']);
});

test('home switch is hidden without JS and everything shows', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321/');
  await expect(page.locator('article.selected')).toHaveCount(6);
  await expect(page.locator('[data-switch]')).toBeHidden();
  await ctx.close();
});

test('headline switches to Spanish and back', async ({ page }) => {
  await page.goto('/');
  const h1 = page.locator('h1');
  await page.getByRole('button', { name: 'Español', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Español', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(h1).toContainText('Diseño y escribo');
  await expect(h1.locator('[data-lang="en"]')).toBeHidden();
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(h1).toContainText('I design and write');
  await expect(h1.locator('[data-lang="es"]')).toBeHidden();
});

test('without JS the English headline shows and the switch is hidden', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321/');
  await expect(page.locator('h1 [data-lang="en"]')).toBeVisible();
  await expect(page.locator('[data-headline-switch]')).toBeHidden();
  await ctx.close();
});

test('copy email button copies and confirms', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const btn = page.getByRole('button', { name: 'Copy email' });
  await btn.click();
  await expect(page.locator('[data-copy-status]')).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('brieducon@gmail.com');
});

test('the big contact link is centered', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('a.contact-big');
  const box = (await link.boundingBox())!;
  const vw = page.viewportSize()!.width;
  expect(Math.abs(box.x + box.width / 2 - vw / 2)).toBeLessThan(24);
});

test('home headline switches to Italian', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Italiano', exact: true }).click();
  await expect(page.locator('h1')).toContainText('Progetto e scrivo');
  await expect(page.locator('h1 [data-lang="en"]')).toBeHidden();
  await expect(page.locator('h1 [data-lang="es"]')).toBeHidden();
});
