import { withBase } from '../data/url';

export const locales = ['en', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
};

/** Languages whose translation is still being reviewed; the switcher tags them "Beta". */
export const betaLocales: readonly Locale[] = ['it'];

/** "/work/x/" → "/es/work/x/" (English stays at the root). */
export function localePath(lang: Locale, path: string): string {
  return lang === defaultLocale ? path : `/${lang}${path}`;
}

/** Full href for an internal path in a language, including the site base path. */
export function href(lang: Locale, path: string): string {
  return withBase(localePath(lang, path));
}

/** Static paths for a page under src/pages/[...lang]/: English at the root, then /es/ and /it/. */
export function getLangPaths() {
  return locales.map((lang) => ({ params: { lang: lang === defaultLocale ? undefined : lang } }));
}

export function langOf(param: string | undefined): Locale {
  return (locales as readonly string[]).includes(param ?? '') ? (param as Locale) : defaultLocale;
}

/** The page's path with any language prefix removed, e.g. "/es/work/x/" → "/work/x/". */
export function stripLocale(pathname: string): string {
  return stripBase(pathname).replace(/^\/(es|it)(?=\/)/, '') || '/';
}

/** The language of the page being rendered, from its URL ("/es/…" → "es"). For components inside page content. */
export function langFromUrl(url: URL): Locale {
  const m = stripBase(url.pathname).match(/^\/(es|it)\//);
  return m ? (m[1] as Locale) : defaultLocale;
}

function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
}
