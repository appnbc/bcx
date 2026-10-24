export const disciplines = [
  'UX Design',
  'UX Writing',
  'Content Strategy',
  'Conversation & Voice',
  'Research',
  'Creative Practice',
] as const;

export const capabilities = [
  'Localization',
  'Accessibility',
  'Information Architecture',
  'Editorial',
  'Front-end',
  'AR & Spatial',
  'Data & NLU',
] as const;

export const types = ['case-study', 'professional', 'exhibition', 'talk-writing'] as const;

export const typeLabels: Record<(typeof types)[number], string> = {
  'case-study': 'Case study',
  professional: 'Professional work',
  exhibition: 'Exhibition & practice',
  'talk-writing': 'Talk & writing',
};

export type Discipline = (typeof disciplines)[number];
export type Capability = (typeof capabilities)[number];
export type ProjectType = (typeof types)[number];
