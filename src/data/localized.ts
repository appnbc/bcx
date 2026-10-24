import type { CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n/locales';

type Project = CollectionEntry<'projects'>['data'] & { roleLang?: Locale; yearsNoteLang?: Locale };

/** The lang attribute a title needs on a page in `lang`: only when it differs. */
export function titleLangAttr(p: Project, lang: Locale): string | undefined {
  return p.titleLang && p.titleLang !== lang ? p.titleLang : undefined;
}

/** A project's fields in the given language: English, or English overlaid with its translation. */
export function localized(entry: CollectionEntry<'projects'>, lang: Locale): Project {
  const p = entry.data;
  if (lang === 'en') return p;
  const t = p.i18n[lang];
  return {
    ...p,
    title: t.title ?? p.title,
    titleLang: t.title ? lang : p.titleLang,
    summary: t.summary,
    detail: t.detail ?? p.detail,
    role: t.role,
    roleLang: t.role === p.role ? defaultLocale : undefined,
    yearsNoteLang: t.yearsNote && t.yearsNote === p.yearsNote ? defaultLocale : undefined,
    context: t.context ?? p.context,
    yearsNote: t.yearsNote ?? p.yearsNote,
    notes: t.notes ?? p.notes,
    team: p.team?.map((m, i) => ({ name: m.name, role: t.teamRoles?.[i] ?? m.role })),
  };
}
