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

test('images fill their slot, and only a full original is ever stretched', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ['/', '/work/sunnyvale-cleanwater/', '/work/ladwp-turf-replacement/', '/work/the-burger-queen/', '/work/descubre/']) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } });
    const bad = await page.evaluate(async () => {
      const out: string[] = [];
      for (const img of [...document.querySelectorAll('main img')] as HTMLImageElement[]) {
        const shown = img.getBoundingClientRect().width;
        if (!shown || !img.currentSrc) continue;
        const name = img.currentSrc.split('/').pop();
        const px = await new Promise<number>((res) => { const im = new Image(); im.onload = () => res(im.naturalWidth); im.src = img.currentSrc; });
        // On a panel, work is shown at its real size or smaller, never stretched.
        if (img.closest('.mat')) {
          // offsetWidth: piled screens are rotated, which widens their bounding box.
          if (px < img.offsetWidth * 0.98) out.push(`${name}: ${px}px file stretched to ${img.offsetWidth}px on a panel`);
          continue;
        }
        const slot = (img.closest('picture') ?? img).parentElement!.getBoundingClientRect().width;
        if (shown < slot * 0.98) out.push(`${name}: ${Math.round(shown)}px in a ${Math.round(slot)}px slot`);
        const sets = [img.srcset, ...[...(img.closest('picture')?.querySelectorAll('source') ?? [])].map((s) => s.srcset)];
        const largest = Math.max(0, ...sets.flatMap((s) => [...(s || '').matchAll(/ (\d+)w/g)].map((m) => Number(m[1]))));
        if (px < shown * 0.98 && px < largest) out.push(`${name}: ${px}px file shown at ${Math.round(shown)}px though ${largest}px exists`);
      }
      return out;
    });
    expect(bad, route).toEqual([]);
  }
});
