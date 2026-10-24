export interface Contact {
  email?: string;
  linkedin?: string;
  other?: { label: string; href: string }[];
}

export const site = {
  name: 'Brian Contreras',
  role: 'UX designer and UX writer',
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
