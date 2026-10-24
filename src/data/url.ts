/** Prefixes a root-relative path ("/work/x/") with the site's base path, so links work from a subfolder. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
