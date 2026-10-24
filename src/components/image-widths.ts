import type { ImageMetadata } from 'astro';

/** Sharp's AVIF default (50) smears small interface text in screenshots. */
export const IMAGE_QUALITY = 80;

const MAX_WIDTH = 2400;

/**
 * Responsive widths for a source image: every step smaller than the original,
 * then the original itself (capped), so a browser never has to enlarge a
 * smaller copy when the real file would have been sharp.
 */
export function widthsFor(src: ImageMetadata, steps: number[] = [480, 800, 1200, 1600, 2400]): number[] {
  const top = Math.min(src.width, MAX_WIDTH);
  return [...steps.filter((w) => w < top), top];
}
