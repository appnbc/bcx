import { test, expect, type Page } from '@playwright/test';

test('edit view exposes deletions and insertions to AT', async ({ page }) => {
  await page.goto('/work/sunnyvale-cleanwater/');
  await expect(page.locator('.edit-view del').first()).toContainText('deleted:');
  await expect(page.locator('.edit-view ins').first()).toContainText('inserted:');
});

async function openSecond(page: Page) {
  await page.goto('/work/descubre/');
  const gallery = page.locator('[data-gallery]').first();
  const thumbs = gallery.locator('.gallery-thumb');
  await thumbs.nth(1).click();
  const dialog = gallery.locator('dialog.gallery-dialog');
  await expect(dialog).toHaveAttribute('open', '');
  return { thumbs, dialog };
}

test('gallery opens, navigates, closes with Escape, restores focus', async ({ page }) => {
  const { thumbs, dialog } = await openSecond(page);
  await expect(dialog.locator('[data-count]')).toHaveText('2');
  await expect(dialog.locator('figure:not([hidden])')).toHaveCount(1);
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-count]')).toHaveText('3');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toHaveAttribute('open', '');
  await expect(thumbs.nth(1)).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden');
});

test('gallery closes on backdrop click', async ({ page }) => {
  const { thumbs, dialog } = await openSecond(page);
  await page.mouse.click(5, 5);
  await expect(dialog).not.toHaveAttribute('open', '');
  await expect(thumbs.nth(1)).toBeFocused();
});
