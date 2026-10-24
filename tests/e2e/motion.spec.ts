import { test, expect } from '@playwright/test';

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
