import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { disciplines, capabilities, types } from './data/taxonomy';

const translation = z.object({
  title: z.string().optional(),
  summary: z.string(),
  detail: z.string().optional(),
  role: z.string(),
  context: z.string().optional(),
  yearsNote: z.string().optional(),
  notes: z.array(z.string()).optional(),
  teamRoles: z.array(z.string()).optional(),
});

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
      /** Language of the title as written, when the title isn't translated (e.g. a work's name). */
      titleLang: z.string().optional(),
      form: z.enum(['page', 'entry']),
      weight: z.enum(['major', 'medium', 'short', 'entry']),
      org: z.string(),
      context: z.string().optional(),
      years: z.string(),
      yearsNote: z.string().optional(),
      disciplines: z.array(z.enum(disciplines)).min(1),
      capabilities: z.array(z.enum(capabilities)),
      type: z.enum(types),
      role: z.string(),
      team: z.array(z.object({ name: z.string(), role: z.string() })).optional(),
      summary: z.string(),
      detail: z.string().optional(),
      sources: z.array(z.string()).min(1),
      evidence: z.string(),
      notes: z.array(z.string()).optional(),
      featured: z.enum(['selected', 'practice']).optional(),
      liveUrl: z.array(z.string().url()).optional(),
      sortYear: z.number().int(),
      i18n: z.object({ es: translation, it: translation }),
    })
    .superRefine((p, ctx) => {
      if (p.form === 'page' && p.weight === 'entry') {
        ctx.addIssue({ code: 'custom', message: `${p.id}: a page cannot have weight "entry"` });
      }
      for (const lang of ['es', 'it'] as const) {
        const t = p.i18n[lang];
        if (p.detail && !t.detail) ctx.addIssue({ code: 'custom', message: `${p.id}: ${lang} translation needs detail` });
        if (p.context && !t.context) ctx.addIssue({ code: 'custom', message: `${p.id}: ${lang} translation needs context` });
        if (p.yearsNote && !t.yearsNote) ctx.addIssue({ code: 'custom', message: `${p.id}: ${lang} translation needs yearsNote` });
        if ((p.notes?.length ?? 0) !== (t.notes?.length ?? 0)) ctx.addIssue({ code: 'custom', message: `${p.id}: ${lang} notes count differs` });
        if (p.team && t.teamRoles?.length !== p.team.length) ctx.addIssue({ code: 'custom', message: `${p.id}: ${lang} needs one team role per member` });
      }
      if (p.form === 'entry' && !p.detail) {
        ctx.addIssue({ code: 'custom', message: `${p.id}: entries need a "detail" paragraph` });
      }
    }),
});

export const collections = { projects };
