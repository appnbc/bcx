/** Accessible lightbox for [data-gallery] blocks using the native <dialog>. */
export function initGalleries(): void {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = 'true';

    const dialog = root.querySelector<HTMLDialogElement>('dialog')!;
    const thumbs = [...root.querySelectorAll<HTMLButtonElement>('.gallery-thumb')];
    const items = [...dialog.querySelectorAll<HTMLElement>('[data-item]')];
    const count = dialog.querySelector<HTMLElement>('[data-count]')!;
    let current = 0;
    let opener: HTMLButtonElement | null = null;

    const show = (i: number) => {
      current = (i + items.length) % items.length;
      items.forEach((el, n) => (el.hidden = n !== current));
      count.textContent = String(current + 1);
    };

    thumbs.forEach((thumb) =>
      thumb.addEventListener('click', () => {
        opener = thumb;
        show(Number(thumb.dataset.index));
        dialog.showModal();
      }),
    );

    dialog.querySelector('[data-prev]')!.addEventListener('click', () => show(current - 1));
    dialog.querySelector('[data-next]')!.addEventListener('click', () => show(current + 1));
    dialog.querySelector('[data-close]')!.addEventListener('click', () => dialog.close());

    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'ArrowLeft') show(current - 1);
    });

    // A click whose target is the dialog element itself landed on the backdrop.
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', () => opener?.focus());
  });
}
