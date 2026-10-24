/**
 * LADWP Turf Replacement case study copy. The troubleshooting tip and the email
 * subject line are Brian's artifacts and stay in English (see the template).
 */
type Row = { issue: string; response: string };
type Shot = { alt: string; caption: string };

const en = {
  context: {
    title: 'Context',
    p1: 'Water is limited in Los Angeles, and a lot of it goes on lawns of plants that aren’t native to California. The Los Angeles Department of Water and Power (LADWP) wants to reduce that.',
    p2: 'The Turf Replacement Design website lets residents sign up for help replacing their lawns with California-native plants, which naturally need less water.',
    noteLabel: 'Before launch',
    note: 'I worked on the site before it launched. Some content on the live site has changed since.',
  },
  persona: {
    title: 'Persona',
    monica: {
      status: 'Married',
      occupation: 'Visual artist',
      location: 'Los Angeles, California',
      quote: 'I love it when I just sign up and I’m done! The process already started.',
      bio: 'Loves color. Works from home often and looks after her garden. Wants to keep costs down while keeping a house as artistic as she is.',
      needs: 'A professional designer who can suggest native plants without lowering her standards for how the garden looks.',
      pains: 'Conflicting information: one process on the website, another in a pamphlet, a third on another site. She doesn’t want to chase it down.',
    },
    connectionLabel: 'Connection',
    connection: 'Monica’s pain point lines up with one of the changes below: on the Program Steps page I removed information that was already elsewhere on the site or in the application.',
  },
  global: {
    title: 'Global updates',
    p: 'The site started from a template built for a similar purpose. When I got to work on the site and its updates, I made these changes across all of it.',
    caption: 'Changes made across the whole site',
    headers: ['Area', 'What I changed'] as [string, string],
    rows: [
      { issue: 'Hierarchy', response: 'Headings in the HTML didn’t follow an order. I set each heading level by importance, position and size, which also helps screen readers.' },
      { issue: 'Bullet points', response: 'Some “bullets” were characters typed inside a paragraph. I rebuilt them as real list items.' },
      { issue: 'Style', response: 'Some styles were inconsistent; the ® symbol, for example, wasn’t superscripted everywhere. I made them consistent.' },
      { issue: 'Banner', response: 'The hero banner now states the program’s purpose on the homepage, and names the current page everywhere else.' },
      { issue: 'Images', response: 'Images no longer clash with the text, and they show what the program is for.' },
      { issue: 'Alternate text', response: 'Every image has alt text, for screen readers and for when images fail to load.' },
      { issue: 'Localization', response: 'I added a full Spanish version of the site, reachable from a button in the header, an English–Spanish toggle on every page, and the footer.' },
    ] as Row[],
  },
  hyperlinking: {
    title: 'Hyperlinking',
    p: 'Many sentences linked only one to three words, usually a noun. I extended each link across the whole phrase. A longer link tells you why you’re being sent somewhere, and it’s easier to click.',
  },
  steps: {
    title: 'Program steps',
    p1: 'Program Steps is where people learn what applying looks like and how the garden design process unfolds. Over several iterations the team reduced the number of steps, which made the process simpler for everyone.',
    p2: 'I added a link to a video and gave it the center of the page, in larger text. I removed information that already lived elsewhere on the site or in the application, gave the step titles one consistent format, and used images and white space so the steps read as a sequence.',
    alt: 'Program Steps page: 1) Submit Your Application, 2) Receive Approval and Request for Design Preferences, 3) Meet with the Designer, 4) Receive the Design Plans, each with a short paragraph and a garden photo.',
  },
  application: {
    title: 'Application',
    p1: 'As a team we went through the application asking what was truly needed to complete it. It went from five pages to four, and most pages got shorter. I added photos that show which kinds of lawn qualify.',
    p2: 'I also wrote alert messages that tell people why they can’t continue: a question left blank, an answer in the wrong format, or an answer that makes them ineligible.',
    galleryLabel: 'Application screens',
    shots: [
      { alt: 'Application page: terms to agree to, then "What does your Turf Area look like?" with two photo choices, green grass and bare dirt.', caption: 'Photo choices show which lawns qualify.' },
      { alt: 'Application page "Provide Contact Information" with name, phone, email and address fields.', caption: 'Contact information page.' },
      { alt: 'A variant of the contact information page with the same fields.', caption: 'Contact information, variant.' },
    ] as Shot[],
  },
  troubleshooting: {
    title: 'Troubleshooting',
    p: 'The application is embedded in the site as a widget, and that caused problems for some people. I added a tip before the Apply button and above the application itself. It recommends Chrome, links to Chrome’s instructions for clearing the cache, and links to the form in its own window.',
    caption: 'The tip, with its links underlined.',
  },
  email: {
    title: 'Confirmation email',
    kicker: 'Writing · HTML',
    p: 'After applying, people get an email with their confirmation number and a copy of their answers. It was plain text. I rebuilt it in HTML and changed the subject line.',
    subjectCaption: 'Subject line, with a test applicant',
    subjectNote: 'The applicant’s name and confirmation number now come before the program name, so they’re visible sooner in an inbox.',
    before: { label: 'Before: plain text', alt: 'Plain-text confirmation email: paragraphs of text followed by the applicant’s answers as unformatted lines like "Are you an LADWP customer? yes".' },
    after: { label: 'After: HTML', alt: 'HTML confirmation email: LADWP logo, "Application Confirmation Receipt" heading, then contact details and questionnaire answers in two-column tables with alternating row shading.' },
    changes: [
      { term: 'Bold', rest: ' for titles and for the questions the applicant answered.' },
      { term: 'A two-column table', rest: ', question and answer, with alternating row colors for legibility.' },
      { term: 'Dividers', rest: ' between header, tables and footer.' },
      { term: 'The logo', rest: ' in the header and a website link in the footer, so people know who sent it and can click through.' },
    ],
  },
  retrospective: {
    title: 'Retrospective',
    p1: 'Getting people to follow instructions was a challenge, and ongoing changes kept requiring updates across the whole site. I would have liked to write the program’s social media too. Still, people signed up for the garden redesign, and they liked that it was straightforward and mostly in one place.',
    p2: 'I enjoyed the localization; I’m always happy to work on translation and on the needs of people from other cultures. I also enjoyed the HTML and CSS work, especially the before and after of the confirmation email, where markup made a real difference to the people receiving it.',
  },
};

const es: typeof en = {
  context: {
    title: 'Contexto',
    p1: 'El agua escasea en Los Ángeles, y buena parte se destina a céspedes de plantas que no son nativas de California. El Departamento de Agua y Energía de Los Ángeles (LADWP) quiere reducirlo.',
    p2: 'El sitio web Turf Replacement Design permite a los residentes inscribirse para recibir ayuda y sustituir su césped por plantas nativas de California, que de forma natural necesitan menos agua.',
    noteLabel: 'Antes del lanzamiento',
    note: 'Trabajé en el sitio antes de su lanzamiento. Parte del contenido del sitio en línea ha cambiado desde entonces.',
  },
  persona: {
    title: 'Persona',
    monica: {
      status: 'Casada',
      occupation: 'Artista visual',
      location: 'Los Ángeles, California',
      quote: '¡Me encanta inscribirme y ya está! El proceso ya ha empezado.',
      bio: 'Le encanta el color. Trabaja a menudo desde casa y cuida su jardín. Quiere mantener los gastos bajos con una casa tan artística como ella.',
      needs: 'Una persona experta en diseño que le sugiera plantas nativas sin rebajar sus exigencias sobre el aspecto del jardín.',
      pains: 'La información contradictoria: un proceso en el sitio web, otro en un folleto y un tercero en otro sitio. No quiere ir detrás de la información.',
    },
    connectionLabel: 'Relación',
    connection: 'El problema de Monica coincide con uno de los cambios de abajo: en la página ⟦Program Steps⟧ eliminé información que ya estaba en otra parte del sitio o en la solicitud.',
  },
  global: {
    title: 'Cambios generales',
    p: 'El sitio partía de una plantilla creada para un fin similar. Cuando empecé a trabajar en el sitio y sus actualizaciones, hice estos cambios en todo él.',
    caption: 'Cambios aplicados en todo el sitio',
    headers: ['Aspecto', 'Qué cambié'],
    rows: [
      { issue: 'Jerarquía', response: 'Los encabezados del HTML no seguían un orden. Asigné a cada encabezado su nivel según su importancia, posición y tamaño, lo que además ayuda a los lectores de pantalla.' },
      { issue: 'Viñetas', response: 'Algunas “viñetas” eran caracteres escritos dentro de un párrafo. Las rehíce como elementos de lista reales.' },
      { issue: 'Estilo', response: 'Algunos estilos eran incoherentes; el símbolo ®, por ejemplo, no estaba en superíndice en todas partes. Los unifiqué.' },
      { issue: 'Banner', response: 'El banner principal ahora indica el propósito del programa en la página de inicio y, en las demás, el nombre de la página en la que se está.' },
      { issue: 'Imágenes', response: 'Las imágenes ya no chocan con el texto y muestran para qué sirve el programa.' },
      { issue: 'Texto alternativo', response: 'Todas las imágenes tienen texto alternativo, para los lectores de pantalla y para cuando las imágenes no cargan.' },
      { issue: 'Localización', response: 'Añadí una versión completa del sitio en español, accesible desde un botón en la cabecera, un selector inglés–español en cada página y el pie de página.' },
    ],
  },
  hyperlinking: {
    title: 'Enlaces',
    p: 'Muchas frases enlazaban solo de una a tres palabras, normalmente un sustantivo. Extendí cada enlace a toda la frase. Un enlace más largo explica por qué se te envía a otra página y es más fácil de pulsar.',
  },
  steps: {
    title: 'Pasos del programa',
    p1: '⟦Program Steps⟧ es donde la gente descubre en qué consiste solicitar y cómo se desarrolla el proceso de diseño del jardín. En varias iteraciones, el equipo redujo el número de pasos, lo que simplificó el proceso para todos.',
    p2: 'Añadí un enlace a un vídeo y le di el centro de la página, con un texto más grande. Eliminé la información que ya estaba en otras partes del sitio o en la solicitud, di a los títulos de los pasos un formato uniforme y usé imágenes y espacio en blanco para que los pasos se leyeran como una secuencia.',
    alt: 'Página Program Steps, en inglés: 1) Submit Your Application, 2) Receive Approval and Request for Design Preferences, 3) Meet with the Designer, 4) Receive the Design Plans, cada uno con un párrafo breve y una foto de jardín.',
  },
  application: {
    title: 'Solicitud',
    p1: 'En equipo revisamos la solicitud preguntándonos qué hacía falta de verdad para completarla. Pasó de cinco páginas a cuatro, y la mayoría se acortaron. Añadí fotos que muestran qué tipos de césped cumplen los requisitos.',
    p2: 'También escribí mensajes de alerta que explican por qué no se puede continuar: una pregunta sin responder, una respuesta con un formato incorrecto o una respuesta que deja a la persona sin derecho a participar.',
    galleryLabel: 'Pantallas de la solicitud',
    shots: [
      { alt: 'Página de la solicitud, en inglés: condiciones que aceptar y la pregunta "What does your Turf Area look like?" con dos fotos para elegir, césped verde y tierra desnuda.', caption: 'Las fotos muestran qué céspedes cumplen los requisitos.' },
      { alt: 'Página de la solicitud "Provide Contact Information" con campos de nombre, teléfono, correo electrónico y dirección.', caption: 'Página de datos de contacto.' },
      { alt: 'Una variante de la página de datos de contacto con los mismos campos.', caption: 'Datos de contacto, variante.' },
    ],
  },
  troubleshooting: {
    title: 'Solución de problemas',
    p: 'La solicitud está incrustada en el sitio como un widget, y eso causaba problemas a algunas personas. Añadí un consejo antes del botón ⟦Apply⟧ y encima de la propia solicitud. Recomienda Chrome, enlaza a las instrucciones de Chrome para borrar la caché y enlaza al formulario en su propia ventana.',
    caption: 'El consejo, en inglés, con sus enlaces subrayados.',
  },
  email: {
    title: 'Correo de confirmación',
    kicker: 'Escritura · HTML',
    p: 'Tras enviar la solicitud, la persona recibe un correo con su número de confirmación y una copia de sus respuestas. Era texto plano. Lo rehíce en HTML y cambié el asunto.',
    subjectCaption: 'Asunto, en inglés, con una persona solicitante de prueba',
    subjectNote: 'El nombre de la persona solicitante y su número de confirmación aparecen ahora antes del nombre del programa, para que se vean antes en la bandeja de entrada.',
    before: { label: 'Antes: texto plano', alt: 'Correo de confirmación en texto plano: párrafos seguidos de las respuestas en líneas sin formato como "Are you an LADWP customer? yes".' },
    after: { label: 'Después: HTML', alt: 'Correo de confirmación en HTML: logotipo de LADWP, encabezado "Application Confirmation Receipt" y luego datos de contacto y respuestas en tablas de dos columnas con filas sombreadas alternas.' },
    changes: [
      { term: 'Negrita', rest: ' para los títulos y para las preguntas respondidas.' },
      { term: 'Una tabla de dos columnas', rest: ', pregunta y respuesta, con filas de colores alternos para facilitar la lectura.' },
      { term: 'Separadores', rest: ' entre la cabecera, las tablas y el pie.' },
      { term: 'El logotipo', rest: ' en la cabecera y un enlace al sitio en el pie, para que se sepa quién lo envía y se pueda acceder al sitio.' },
    ],
  },
  retrospective: {
    title: 'Retrospectiva',
    p1: 'Conseguir que la gente siguiera las instrucciones fue un reto, y los cambios continuos obligaban a actualizar todo el sitio. Me habría gustado escribir también las redes sociales del programa. Aun así, la gente se inscribió para el rediseño de su jardín y valoró que fuera sencillo y estuviera casi todo en un mismo lugar.',
    p2: 'Disfruté con la localización; siempre trabajo a gusto en traducción y en las necesidades de personas de otras culturas. También disfruté del trabajo en HTML y CSS, sobre todo del antes y después del correo de confirmación, donde el marcado cambió de verdad la experiencia de quien lo recibe.',
  },
};

const it: typeof en = {
  context: {
    title: 'Contesto',
    p1: 'A Los Angeles l’acqua è scarsa, e molta finisce su prati di piante non native della California. Il Dipartimento dell’Acqua e dell’Energia di Los Angeles (LADWP) vuole ridurre questo consumo.',
    p2: 'Il sito Turf Replacement Design permette ai residenti di iscriversi per ricevere aiuto nel sostituire il prato con piante native della California, che per natura richiedono meno acqua.',
    noteLabel: 'Prima del lancio',
    note: 'Ho lavorato al sito prima del lancio. Da allora parte dei contenuti online è cambiata.',
  },
  persona: {
    title: 'Persona',
    monica: {
      status: 'Sposata',
      occupation: 'Artista visiva',
      location: 'Los Angeles, California',
      quote: 'Adoro quando mi iscrivo e ho finito! Il processo è già partito.',
      bio: 'Ama il colore. Lavora spesso da casa e si prende cura del suo giardino. Vuole contenere le spese mantenendo una casa artistica quanto lei.',
      needs: 'Una persona esperta di design che le suggerisca piante native senza abbassare i suoi standard estetici per il giardino.',
      pains: 'Le informazioni contraddittorie: un processo sul sito, un altro su un opuscolo, un terzo su un altro sito. Non vuole rincorrere le informazioni.',
    },
    connectionLabel: 'Collegamento',
    connection: 'Il problema di Monica corrisponde a una delle modifiche qui sotto: nella pagina ⟦Program Steps⟧ ho tolto le informazioni che erano già altrove nel sito o nella domanda.',
  },
  global: {
    title: 'Modifiche generali',
    p: 'Il sito partiva da un modello creato per uno scopo simile. Quando ho iniziato a lavorare al sito e ai suoi aggiornamenti, ho fatto queste modifiche in tutto il sito.',
    caption: 'Modifiche applicate a tutto il sito',
    headers: ['Ambito', 'Cosa ho cambiato'],
    rows: [
      { issue: 'Gerarchia', response: 'I titoli nell’HTML non seguivano un ordine. Ho assegnato a ogni titolo il livello giusto per importanza, posizione e dimensione, cosa che aiuta anche gli screen reader.' },
      { issue: 'Elenchi puntati', response: 'Alcuni “punti elenco” erano caratteri digitati dentro un paragrafo. Li ho rifatti come veri elementi di elenco.' },
      { issue: 'Stile', response: 'Alcuni stili erano incoerenti; il simbolo ®, per esempio, non era in apice ovunque. Li ho uniformati.' },
      { issue: 'Banner', response: 'Il banner principale ora indica lo scopo del programma nella home e, altrove, il nome della pagina in cui ci si trova.' },
      { issue: 'Immagini', response: 'Le immagini non stridono più con il testo e mostrano a cosa serve il programma.' },
      { issue: 'Testo alternativo', response: 'Ogni immagine ha un testo alternativo, per gli screen reader e per quando le immagini non si caricano.' },
      { issue: 'Localizzazione', response: 'Ho aggiunto una versione completa del sito in spagnolo, raggiungibile da un pulsante nell’intestazione, da un selettore inglese–spagnolo in ogni pagina e dal piè di pagina.' },
    ],
  },
  hyperlinking: {
    title: 'Link',
    p: 'Molte frasi collegavano solo da una a tre parole, di solito un sostantivo. Ho esteso ogni link all’intera frase. Un link più lungo spiega perché si viene mandati altrove ed è più facile da cliccare.',
  },
  steps: {
    title: 'Fasi del programma',
    p1: '⟦Program Steps⟧ è la pagina in cui si scopre come funziona la domanda e come si svolge il processo di progettazione del giardino. In diverse iterazioni il team ha ridotto il numero di fasi, semplificando il processo per tutti.',
    p2: 'Ho aggiunto un link a un video e gli ho dato il centro della pagina, con un testo più grande. Ho tolto le informazioni già presenti altrove nel sito o nella domanda, ho dato ai titoli delle fasi un formato uniforme e ho usato immagini e spazio bianco perché le fasi si leggessero come una sequenza.',
    alt: 'Pagina Program Steps, in inglese: 1) Submit Your Application, 2) Receive Approval and Request for Design Preferences, 3) Meet with the Designer, 4) Receive the Design Plans, ognuna con un breve paragrafo e una foto di giardino.',
  },
  application: {
    title: 'Domanda',
    p1: 'Come team abbiamo rivisto la domanda chiedendoci cosa servisse davvero per completarla. È passata da cinque pagine a quattro, e quasi tutte si sono accorciate. Ho aggiunto foto che mostrano quali prati hanno i requisiti.',
    p2: 'Ho anche scritto messaggi di avviso che spiegano perché non si può proseguire: una domanda senza risposta, una risposta nel formato sbagliato o una risposta che esclude dalla partecipazione.',
    galleryLabel: 'Schermate della domanda',
    shots: [
      { alt: 'Pagina della domanda, in inglese: condizioni da accettare e la domanda "What does your Turf Area look like?" con due foto tra cui scegliere, prato verde e terra nuda.', caption: 'Le foto mostrano quali prati hanno i requisiti.' },
      { alt: 'Pagina della domanda "Provide Contact Information" con campi per nome, telefono, email e indirizzo.', caption: 'Pagina dei dati di contatto.' },
      { alt: 'Una variante della pagina dei dati di contatto con gli stessi campi.', caption: 'Dati di contatto, variante.' },
    ],
  },
  troubleshooting: {
    title: 'Risoluzione dei problemi',
    p: 'La domanda è incorporata nel sito come widget, e questo creava problemi ad alcune persone. Ho aggiunto un suggerimento prima del pulsante ⟦Apply⟧ e sopra la domanda stessa. Consiglia Chrome, rimanda alle istruzioni di Chrome per svuotare la cache e al modulo in una finestra a parte.',
    caption: 'Il suggerimento, in inglese, con i link sottolineati.',
  },
  email: {
    title: 'Email di conferma',
    kicker: 'Scrittura · HTML',
    p: 'Dopo aver inviato la domanda, si riceve un’email con il numero di conferma e una copia delle risposte. Era in testo semplice. L’ho rifatta in HTML e ho cambiato l’oggetto.',
    subjectCaption: 'Oggetto, in inglese, con una persona di prova',
    subjectNote: 'Il nome di chi fa domanda e il numero di conferma ora vengono prima del nome del programma, così si vedono prima nella casella di posta.',
    before: { label: 'Prima: testo semplice', alt: 'Email di conferma in testo semplice: paragrafi seguiti dalle risposte in righe non formattate come "Are you an LADWP customer? yes".' },
    after: { label: 'Dopo: HTML', alt: 'Email di conferma in HTML: logo di LADWP, titolo "Application Confirmation Receipt", poi dati di contatto e risposte in tabelle a due colonne con righe a sfondo alternato.' },
    changes: [
      { term: 'Grassetto', rest: ' per i titoli e per le domande a cui si è risposto.' },
      { term: 'Una tabella a due colonne', rest: ', domanda e risposta, con righe di colori alternati per la leggibilità.' },
      { term: 'Separatori', rest: ' tra intestazione, tabelle e piè di pagina.' },
      { term: 'Il logo', rest: ' nell’intestazione e un link al sito nel piè di pagina, così si sa chi l’ha inviata e si può raggiungere il sito.' },
    ],
  },
  retrospective: {
    title: 'Retrospettiva',
    p1: 'Far seguire le istruzioni alle persone è stata una sfida, e i cambiamenti continui richiedevano aggiornamenti su tutto il sito. Mi sarebbe piaciuto scrivere anche i social del programma. Comunque le persone si sono iscritte per riprogettare il giardino e hanno apprezzato che fosse semplice e quasi tutto in un unico posto.',
    p2: 'Mi è piaciuta la localizzazione; lavoro sempre volentieri sulla traduzione e sui bisogni di persone di altre culture. Mi è piaciuto anche il lavoro su HTML e CSS, soprattutto il prima e dopo dell’email di conferma, dove il markup ha davvero cambiato l’esperienza di chi la riceve.',
  },
};

export const ladwpCopy = { en, es, it };
