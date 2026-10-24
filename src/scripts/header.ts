/**
 * Sticky header: publishes its height as --header-h (so jump links land below
 * it) and marks it as scrolled once the page moves, which turns the homepage's
 * transparent header solid.
 */
export function initHeader() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  const root = document.documentElement;
  new ResizeObserver(() => root.style.setProperty('--header-h', `${header.offsetHeight}px`)).observe(header);
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}
