import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { disciplines, capabilities, types } from './data/taxonomy';

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z
    .object({
      id: z.string(),
      title: z.string(),
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
    })
    .superRefine((p, ctx) => {
      if (p.form === 'page' && p.weight === 'entry') {
        ctx.addIssue({ code: 'custom', message: `${p.id}: a page cannot have weight "entry"` });
      }
      if (p.form === 'entry' && !p.detail) {
        ctx.addIssue({ code: 'custom', message: `${p.id}: entries need a "detail" paragraph` });
      }
    }),
});

export const collections = { projects };
