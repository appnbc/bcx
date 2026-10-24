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



test('copy email button copies and confirms', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const btn = page.getByRole('button', { name: 'Copy email' });
  await btn.click();
  await expect(page.locator('[data-copy-status]')).toHaveText('Copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('brieducon@gmail.com');
});

test('contact bookends the hero: same wash, left-aligned, email in a speech bubble', async ({ page }) => {
  await page.goto('/about/');
  const footer = page.locator('.site-footer');
  expect(await footer.evaluate((el) => getComputedStyle(el).backgroundImage)).toContain('radial-gradient');
  await expect(page.locator('.contact__lead mark')).toHaveText('Write to me.');
  const bubble = (await page.locator('.contact__bubble').boundingBox())!;
  const lead = (await page.locator('.contact__lead').boundingBox())!;
  expect(Math.abs(bubble.x - lead.x)).toBeLessThan(2);
  await expect(page.locator('.contact__bubble a.contact-big')).toHaveAttribute('href', 'mailto:brieducon@gmail.com');
});

