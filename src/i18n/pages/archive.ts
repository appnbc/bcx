const en = {
  title: 'Index',
  description: (n: number) => `All ${n} projects by Brian Contreras: UX design, UX writing, conversation design, research, and creative practice.`,
  intro: (n: number) => `All ${n} projects in one list: case studies, professional work, exhibitions, talks, and writing.`,
  legendPages: 'Case studies',
  legendPagesTail: 'open as their own pages; the rest',
  legendEntriesTail: 'expand in place.',
  groups: { d: 'Discipline', c: 'Capability', t: 'Type' },
  countOne: '1 project',
  countMany: '{n} projects',
  clear: 'Clear filters',
  oldest: 'Oldest first',
  empty: 'No projects match these filters. Try removing one.',
  columns: { year: 'Year', project: 'Project', discipline: 'Discipline', form: 'Form' },
};

const es: typeof en = {
  title: 'Índice',
  description: (n) => `Los ${n} proyectos de Brian Contreras: diseño UX, redacción UX, diseño conversacional, investigación y práctica creativa.`,
  intro: (n) => `Los ${n} proyectos en una sola lista: casos de estudio, trabajo profesional, exposiciones, charlas y textos.`,
  legendPages: 'Los casos de estudio',
  legendPagesTail: 'se abren en su propia página; el resto',
  legendEntriesTail: 'se despliega aquí mismo.',
  groups: { d: 'Disciplina', c: 'Capacidad', t: 'Tipo' },
  countOne: '1 proyecto',
  countMany: '{n} proyectos',
  clear: 'Quitar filtros',
  oldest: 'Más antiguos primero',
  empty: 'Ningún proyecto coincide con estos filtros. Intenta quitar uno.',
  columns: { year: 'Año', project: 'Proyecto', discipline: 'Disciplina', form: 'Formato' },
};

const it: typeof en = {
  title: 'Indice',
  description: (n) => `Tutti i ${n} progetti di Brian Contreras: UX design, UX writing, design conversazionale, ricerca e pratica artistica.`,
  intro: (n) => `Tutti i ${n} progetti in un’unica lista: casi di studio, lavoro professionale, mostre, interventi e scritti.`,
  legendPages: 'I casi di studio',
  legendPagesTail: 'si aprono in una pagina propria; gli altri',
  legendEntriesTail: 'si espandono qui.',
  groups: { d: 'Disciplina', c: 'Competenza', t: 'Tipo' },
  countOne: '1 progetto',
  countMany: '{n} progetti',
  clear: 'Rimuovi filtri',
  oldest: 'Prima i più vecchi',
  empty: 'Nessun progetto corrisponde a questi filtri. Prova a toglierne uno.',
  columns: { year: 'Anno', project: 'Progetto', discipline: 'Disciplina', form: 'Formato' },
};

export const archiveCopy = { en, es, it };
