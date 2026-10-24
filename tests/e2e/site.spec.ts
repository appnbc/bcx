import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/', '/archive/', '/about/',
  '/work/sunnyvale-cleanwater/', '/work/ladwp-turf-replacement/', '/work/descubre/', '/work/alfredo-voice-services/',
  '/work/526-lowcountry-corridor/', '/work/the-burger-queen/', '/work/mosaik/', '/404.html',
];
const widths = [360, 768, 1280, 1600];
const slug = (r: string) => (r === '/' ? 'home' : r.replace(/^\/|\/$/g, '').replace(/\//g, '-'));

for (const route of routes) {
  for (const width of widths) {
    test(`${route} @${width}: no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      await page.screenshot({ path: `test-results/screens/${slug(route)}-${width}.png`, fullPage: true });
    });
  }

  test(`${route}: axe has no serious or critical violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).analyze();
    const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')}`)).toEqual([]);
  });

  test(`${route}: first Tab reaches skip link, which moves focus to main`, async ({ page }) => {
    await page.goto(route);
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });
}

test.describe('dark mode', () => {
  test.use({ colorScheme: 'dark' });
  for (const route of ['/', '/work/descubre/', '/archive/']) {
    test(`${route}: dark contrast is clean`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      const results = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
      const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(', ')}`)).toEqual([]);
    });
  }
});
