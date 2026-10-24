/**
 * Index filters. Without JS the full list shows and the filter bar stays hidden.
 * State lives in the URL (?d=…&c=…&t=…); unknown values are ignored.
 */
type Key = 'd' | 'c' | 't';
const KEYS: Key[] = ['d', 'c', 't'];

export function initArchiveFilter(): void {
  const bar = document.querySelector<HTMLElement>('[data-filters]');
  const list = document.querySelector<HTMLOListElement>('[data-list]');
  if (!bar || !list) return;

  const rows = [...list.querySelectorAll<HTMLLIElement>('.archive-row')];
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('button[data-key]')];
  const count = bar.querySelector<HTMLElement>('[data-result-count]')!;
  const clear = bar.querySelector<HTMLButtonElement>('[data-clear]')!;
  const sort = bar.querySelector<HTMLButtonElement>('[data-sort]')!;
  const empty = document.querySelector<HTMLElement>('[data-empty]')!;

  const valid = (key: Key, value: string | null) =>
    value !== null && buttons.some((b) => b.dataset.key === key && b.dataset.value === value);

  const state: Record<Key, string | null> = { d: null, c: null, t: null };
  const params = new URLSearchParams(location.search);
  for (const k of KEYS) state[k] = valid(k, params.get(k)) ? params.get(k) : null;

  const render = (updateUrl: boolean) => {
    let visible = 0;
    for (const row of rows) {
      const match = KEYS.every((k) => !state[k] || (row.dataset[k] ?? '').split('|').includes(state[k]!));
      row.hidden = !match;
      if (match) visible++;
    }
    for (const b of buttons) b.setAttribute('aria-pressed', String(state[b.dataset.key as Key] === b.dataset.value));
    const active = KEYS.some((k) => state[k]);
    clear.hidden = !active;
    empty.hidden = visible > 0;
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;

    if (updateUrl) {
      const q = new URLSearchParams();
      for (const k of KEYS) if (state[k]) q.set(k, state[k]!);
      const qs = q.toString();
      history.replaceState(null, '', `${location.pathname}${qs ? `?${qs}` : ''}${location.hash}`);
    }
  };

  for (const b of buttons) {
    b.addEventListener('click', () => {
      const k = b.dataset.key as Key;
      state[k] = state[k] === b.dataset.value ? null : b.dataset.value!;
      render(true);
    });
  }

  clear.addEventListener('click', () => {
    for (const k of KEYS) state[k] = null;
    render(true);
    buttons[0]?.focus();
  });

  sort.addEventListener('click', () => {
    const oldest = sort.getAttribute('aria-pressed') !== 'true';
    sort.setAttribute('aria-pressed', String(oldest));
    rows
      .slice()
      .sort((a, b) => (Number(a.dataset.year) - Number(b.dataset.year)) * (oldest ? 1 : -1))
      .forEach((row) => list.append(row));
  });

  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const row = id ? document.getElementById(id) : null;
    const details = row?.querySelector('details');
    if (!row || !details) return;
    if (row.hidden) {
      for (const k of KEYS) state[k] = null;
      render(true);
    }
    details.open = true;
  };

  render(KEYS.some((k) => params.has(k)));
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
}
