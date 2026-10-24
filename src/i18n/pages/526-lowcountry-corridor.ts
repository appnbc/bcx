/**
 * 526 Lowcountry Corridor case study copy. Keep the claim boundary of the English:
 * four issues fixed, two presented as recommendations (see tests/claims.test.mjs).
 */
type Row = { issue: string; response: string };

const en = {
  role: {
    title: 'Role',
    p1: 'I was the UX designer for the 526 Lowcountry Corridor website, I built it in the content management system, and I led its accessibility work. I worked with Alyssa, the community manager, and Amy, the project manager. The site shipped and is still live.',
    p2: 'The project’s audience includes people for whom English isn’t a first language, so accessibility here meant language access as well as access for people with disabilities.',
  },
  persona: {
    title: 'Persona',
    daniel: {
      status: 'Single',
      occupation: 'Trucker',
      location: 'Charleston, South Carolina',
      bio: 'A Spanish speaker who isn’t proficient in English. He needs project information in straightforward Spanish, and a site he can navigate without hunting for a separate menu.',
    },
  },
  issues: {
    title: 'Accessibility issues and responses',
    kicker: 'Accessibility',
    p: 'Six issues shaped the work. The first four were fixed on the site; the last two are recommendations for what comes next.',
    caption: 'Issues found and what happened',
    headers: ['Issue', 'Response'] as [string, string],
    rows: [
      { issue: 'Color contrast in the brand palette', response: 'The site’s green and blue are part of its branding, but they didn’t contrast enough for people with low vision or color blindness to tell elements apart. The color scheme was improved for contrast while keeping the brand.' },
      { issue: 'Keyboard navigation and a separate Spanish menu', response: 'Keyboard users struggled to move through the menus, and a separate menu for Spanish speakers added confusion. Keyboard navigation was streamlined and language access made consistent across both menus.' },
      { issue: 'Missing alt text and video scripts', response: 'Images without alt text shut out screen reader users, and videos without scripts shut out people who are hard of hearing. Images got alt text and videos got scripts.' },
      { issue: 'Language barrier', response: 'For non-English speakers like Daniel, translation has to be straightforward, without idioms or slang. Language access was made consistent across the site.' },
      { issue: 'Unlabeled arrow icons', response: 'Arrows mark navigation, external links and downloads. The recommendation: give each one descriptive alt text, so everyone knows what it does.' },
      { issue: 'Limited testing with diverse users', response: 'Testing hadn’t covered a wide range of users, including people with disabilities. That’s the next step.' },
    ] as Row[],
  },
  retrospective: {
    title: 'Retrospective',
    p1: 'Fixing color contrast, keyboard navigation, the language menus, alt text and video scripts made the site easier to use for more people, especially those with visual or hearing impairments and Spanish speakers.',
    p2: 'The lesson I took from it: accessibility needs continued attention and testing with a genuinely diverse group of users, including people with disabilities.',
  },
};

const es: typeof en = {
  role: {
    title: 'Rol',
    p1: 'Me encargué del diseño UX del sitio web de 526 Lowcountry Corridor, lo construí en el gestor de contenidos y dirigí el trabajo de accesibilidad. Trabajé con Alyssa, responsable de comunidad, y con Amy, que dirigía el proyecto. El sitio se publicó y sigue en línea.',
    p2: 'El público del proyecto incluye a personas cuya primera lengua no es el inglés, así que aquí la accesibilidad significaba acceso lingüístico además de acceso para personas con discapacidad.',
  },
  persona: {
    title: 'Perfil de usuario',
    daniel: {
      status: 'Soltero',
      occupation: 'Camionero',
      location: 'Charleston, Carolina del Sur',
      bio: 'Hispanohablante sin dominio del inglés. Necesita la información del proyecto en un español sencillo, y un sitio por el que pueda moverse sin buscar un menú aparte.',
    },
  },
  issues: {
    title: 'Problemas de accesibilidad y respuestas',
    kicker: 'Accesibilidad',
    p: 'Seis problemas marcaron el trabajo. Los cuatro primeros se resolvieron en el sitio; los dos últimos son recomendaciones para los próximos pasos.',
    caption: 'Problemas detectados y qué se hizo',
    headers: ['Problema', 'Respuesta'],
    rows: [
      { issue: 'Contraste de color en la paleta de la marca', response: 'El verde y el azul del sitio forman parte de su marca, pero no contrastaban lo suficiente para que las personas con baja visión o daltonismo distinguieran los elementos. Se mejoró el contraste de la combinación de colores manteniendo la marca.' },
      { issue: 'Navegación con teclado y un menú aparte en español', response: 'A quienes usaban el teclado les costaba recorrer los menús, y un menú aparte para hispanohablantes añadía confusión. Se simplificó la navegación con teclado y se hizo coherente el acceso lingüístico en ambos menús.' },
      { issue: 'Falta de texto alternativo y de guiones para los videos', response: 'Las imágenes sin texto alternativo dejaban fuera a quienes usan lectores de pantalla, y los videos sin guion dejaban fuera a las personas con dificultades auditivas. Las imágenes recibieron texto alternativo y los videos, guiones.' },
      { issue: 'Barrera lingüística', response: 'Para quienes no hablan inglés, como Daniel, la traducción tiene que ser directa, sin modismos ni jerga. El acceso lingüístico se hizo coherente en todo el sitio.' },
      { issue: 'Iconos de flecha sin etiqueta', response: 'Las flechas señalan la navegación, los enlaces externos y las descargas. La recomendación: dar a cada una un texto alternativo descriptivo, para que todo el mundo sepa qué hace.' },
      { issue: 'Pocas pruebas con usuarios diversos', response: 'Las pruebas no habían abarcado una gama amplia de usuarios, incluidas personas con discapacidad. Ese es el siguiente paso.' },
    ],
  },
  retrospective: {
    title: 'Retrospectiva',
    p1: 'Resolver el contraste de color, la navegación con teclado, los menús de idioma, el texto alternativo y los guiones de video hizo el sitio más fácil de usar para más personas, sobre todo para quienes tienen discapacidad visual o auditiva y para los hispanohablantes.',
    p2: 'La lección que saqué: la accesibilidad necesita atención continua y pruebas con un grupo de usuarios realmente diverso, incluidas personas con discapacidad.',
  },
};

const it: typeof en = {
  role: {
    title: 'Ruolo',
    p1: 'Ho curato lo UX design del sito di 526 Lowcountry Corridor, l’ho realizzato nel sistema di gestione dei contenuti e ho guidato il lavoro sull’accessibilità. Ho lavorato con Alyssa, community manager, e con Amy, project manager. Il sito è stato pubblicato ed è ancora online.',
    p2: 'Il pubblico del progetto comprende persone la cui prima lingua non è l’inglese, quindi qui accessibilità voleva dire accesso linguistico oltre che accesso per le persone con disabilità.',
  },
  persona: {
    title: 'Profilo utente',
    daniel: {
      status: 'Single',
      occupation: 'Camionista',
      location: 'Charleston, Carolina del Sud',
      bio: 'Parla spagnolo e non padroneggia l’inglese. Ha bisogno delle informazioni sul progetto in uno spagnolo semplice e di un sito in cui muoversi senza cercare un menu a parte.',
    },
  },
  issues: {
    title: 'Problemi di accessibilità e risposte',
    kicker: 'Accessibilità',
    p: 'Sei problemi hanno guidato il lavoro. I primi quattro sono stati risolti sul sito; gli ultimi due sono raccomandazioni per i passi successivi.',
    caption: 'Problemi rilevati e cosa è stato fatto',
    headers: ['Problema', 'Risposta'],
    rows: [
      { issue: 'Contrasto dei colori nella palette del marchio', response: 'Il verde e il blu del sito fanno parte del marchio, ma non avevano abbastanza contrasto perché le persone ipovedenti o daltoniche distinguessero gli elementi. Il contrasto della combinazione di colori è stato migliorato mantenendo il marchio.' },
      { issue: 'Navigazione da tastiera e un menu separato in spagnolo', response: 'Chi usava la tastiera faticava a muoversi tra i menu, e un menu separato per chi parla spagnolo creava confusione. La navigazione da tastiera è stata semplificata e l’accesso linguistico reso coerente in entrambi i menu.' },
      { issue: 'Testo alternativo e script dei video mancanti', response: 'Le immagini senza testo alternativo escludevano chi usa uno screen reader, e i video senza script escludevano le persone con problemi di udito. Le immagini hanno ricevuto il testo alternativo e i video gli script.' },
      { issue: 'Barriera linguistica', response: 'Per chi non parla inglese, come Daniel, la traduzione deve essere diretta, senza modi di dire né gergo. L’accesso linguistico è stato reso coerente in tutto il sito.' },
      { issue: 'Icone a freccia senza etichetta', response: 'Le frecce indicano navigazione, link esterni e download. La raccomandazione: dare a ciascuna un testo alternativo descrittivo, così che tutti sappiano cosa fa.' },
      { issue: 'Pochi test con utenti eterogenei', response: 'I test non avevano coinvolto una gamma ampia di utenti, comprese le persone con disabilità. È il passo successivo.' },
    ],
  },
  retrospective: {
    title: 'Retrospettiva',
    p1: 'Risolvere contrasto dei colori, navigazione da tastiera, menu delle lingue, testo alternativo e script dei video ha reso il sito più facile da usare per più persone, soprattutto per chi ha disabilità visive o uditive e per chi parla spagnolo.',
    p2: 'La lezione che ne ho tratto: l’accessibilità richiede un’attenzione continua e test con un gruppo di utenti davvero eterogeneo, comprese le persone con disabilità.',
  },
};

export const lccCopy = { en, es, it };
