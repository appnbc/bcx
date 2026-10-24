import { test, expect, type Page } from '@playwright/test';

test('headline highlights sweep in once by default', async ({ page }) => {
  await page.goto('/');
  const name = await page.locator('h1 mark').first().evaluate((el) => getComputedStyle(el).animationName);
  expect(name).not.toBe('none');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('highlights and illustration appear without animation', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('h1 mark').first().evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    expect(await page.locator('.hero-art .bubble').first().evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  });
});

const anims = (page: Page, sel: string) => page.locator(sel).first().evaluate((el) => getComputedStyle(el).animationName);

test('after entering, the illustration keeps a slow ambient loop', async ({ page }) => {
  await page.goto('/');
  expect(await anims(page, '.hero-art .bubble--en')).toContain('float');
  expect(await anims(page, '.hero-art .flow path')).toContain('flow');
});

test('the hero wash stays still', async ({ page }) => {
  await page.goto('/');
  for (const pseudo of ['', '::before', '::after']) {
    expect(await page.locator('.hero-wash').evaluate((el, p) => getComputedStyle(el, p || null).animationName, pseudo)).toBe('none');
  }
});

test.describe('reduced motion, ambient', () => {
  test.use({ reducedMotion: 'reduce' });
  test('no ambient loops run', async ({ page }) => {
    await page.goto('/');
    expect(await anims(page, '.hero-art .flow path')).toBe('none');
  });
});

const header = (page: Page) => page.locator('.site-header').evaluate((el) => {
  const s = getComputedStyle(el);
  return { position: s.position, bg: s.backgroundColor, rule: s.borderBottomColor, top: Math.round(el.getBoundingClientRect().top) };
});

test('on the homepage the header blends into the hero, then turns solid and sticks on scroll', async ({ page }) => {
  await page.goto('/');
  const atTop = await header(page);
  expect(atTop.position).toBe('sticky');
  expect(atTop.bg).toBe('rgba(0, 0, 0, 0)');
  expect(atTop.rule).toBe('rgba(0, 0, 0, 0)');
  await page.mouse.wheel(0, 1500);
  await expect.poll(async () => (await header(page)).bg).toBe('rgb(252, 252, 250)');
  const scrolled = await header(page);
  expect(scrolled.top).toBe(0);
  expect(scrolled.rule).not.toBe('rgba(0, 0, 0, 0)');
});

test('inner pages keep a solid sticky header', async ({ page }) => {
  await page.goto('/about/');
  const h = await header(page);
  expect(h.position).toBe('sticky');
  expect(h.bg).toBe('rgb(252, 252, 250)');
});

test('jump links land below the sticky header', async ({ page }) => {
  await page.goto('/work/sunnyvale-cleanwater/');
  await page.locator('nav[aria-label="On this page"] a').nth(3).click();
  const id = (await page.locator('nav[aria-label="On this page"] a').nth(3).getAttribute('href'))!.slice(1);
  await page.waitForTimeout(800);
  const headerBottom = await page.locator('.site-header').evaluate((el) => el.getBoundingClientRect().bottom);
  const targetTop = await page.locator(`[id="${id}"]`).evaluate((el) => el.getBoundingClientRect().top);
  expect(targetTop).toBeGreaterThanOrEqual(headerBottom);
});
