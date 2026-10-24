export interface Contact {
  email?: string;
  linkedin?: string;
  other?: { label: string; href: string }[];
}

/** Reads a build-time environment variable (config is only evaluated during the build). */
function buildEnv(name: string): string | undefined {
  return (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env[name];
}

export const site = {
  /**
   * Spanish and Italian pages are built and deployed, but stay unannounced (no switcher,
   * no hreflang, noindex) until this is true. LANGUAGES_PUBLIC=1 turns it on for one build.
   */
  languagesPublic: buildEnv('LANGUAGES_PUBLIC') === '1',
  name: 'Brian Contreras',
  statement:
    'I design and write interfaces for public programs, language learning and voice, in English and Spanish.',
  contact: {
    email: 'brieducon@gmail.com',
  } satisfies Contact as Contact,
};

export const hasContact = Boolean(
  site.contact.email || site.contact.linkedin || site.contact.other?.length,
);

if (!hasContact) {
  console.warn('[config] No contact details set: the Contact section will say "Contact details coming soon."');
}
