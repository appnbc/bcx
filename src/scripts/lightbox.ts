/**
 * Opens any a.zoom link's image in the shared #lightbox dialog.
 * Without JS the link simply opens the full-size image.
 */
export function initLightbox(): void {
  const box = document.querySelector<HTMLDialogElement>('dialog#lightbox');
  if (!box || box.dataset.ready) return;
  box.dataset.ready = 'true';
  const caption = box.querySelector('figcaption')!;
  // Created on open so the page never ships an empty <img>.
  const image = document.createElement('img');
  let opener: HTMLElement | null = null;

  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>('a.zoom');
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.dataset.alt ?? '';
    caption.textContent = link.dataset.caption || link.dataset.alt || '';
    caption.before(image);
    box.showModal();
  });

  box.querySelector('[data-close]')!.addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => {
    if (e.target !== box) return;
    const r = box.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) box.close();
  });
  box.addEventListener('close', () => {
    image.remove();
    image.removeAttribute('src');
    opener?.focus();
  });
}
