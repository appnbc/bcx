/**
 * The Burger Queen case study copy. The on-screen dialogue is an artifact and
 * stays in English in the template; step names and image descriptions are
 * translated. `steps` and `pictures` line up with the nine screens.
 */
const en = {
  context: {
    title: 'Context',
    p1: 'A multimodal assistant, voice plus screen, for Alexa devices in the rooms of a Las Vegas hotel. Guests could hear about the hotel’s restaurant, The Burger Queen, and order room service.',
    p2: 'The brief: a concierge with the feel of a luxury hotel, a consistent brand voice, a way to present the hotel’s other venues, and more revenue for the hotel.',
  },
  personas: {
    title: 'Personas',
    john: { status: 'Single', occupation: 'Tourist (marketer)', location: 'London, England', quote: 'I want the American experience in Las Vegas.' },
    miguel: { status: 'Married', occupation: 'High roller', location: 'Las Vegas, Nevada' },
  },
  conversation: {
    title: 'The conversation',
    kicker: 'Conversation design',
    p: 'Nine screens from the prototype, in order, from the welcome to the sign-off. Each shows what the assistant says on screen; the guest’s spoken replies aren’t part of the screens.',
    steps: ['Greeting', 'Venues', 'Hours', 'Menu', 'Order', 'Drink', 'Dessert', 'Confirmation', 'Sign-off'],
    pictures: [
      'the Welcome to Fabulous Las Vegas sign at night',
      'a burger and fries',
      'a burger and fries',
      'a stacked cheeseburger',
      'cola poured over ice',
      'cola poured over ice',
      'a cake topped with berries',
      'a smiling receptionist at the hotel reception desk',
      'a smiling receptionist at the hotel reception desk',
    ],
    screenAlt: (n: number, step: string, picture: string) => `Prototype screen ${n}, ${step.toLowerCase()}: on-screen text over ${picture}. Text transcribed alongside.`,
    screenShort: (n: number, step: string) => `Prototype screen ${n}, ${step.toLowerCase()}`,
    noteLabel: 'Images',
    note: 'The prototype uses stock photos for the food and the reception desk.',
  },
  changes: {
    title: 'What changed',
    p: 'Reviewing the app, we found three problems: it had no greeting, it didn’t show enough of the food on offer, and its branding wasn’t consistent with the hotel. Over iterations we:',
    greeting: { term: 'Added a personalized greeting.', rest: ' In these screens, for example, the assistant addresses the guest by name at the end (screen 9).' },
    menu: { term: 'Expanded the menu to drinks and desserts', rest: '; in these screens they’re offered as the order builds (screens 6 and 7).' },
    italics: { term: 'Set foreign terms in italics', before: ', like', and: 'and', after: '(screens 8 and 9).' },
    branding: { term: 'Made the branding consistent', rest: ' with the hotel’s identity.' },
  },
};

const es: typeof en = {
  context: {
    title: 'Contexto',
    p1: 'Un asistente multimodal, voz más pantalla, para los dispositivos Alexa de las habitaciones de un hotel de Las Vegas. Los huéspedes podían informarse sobre el restaurante del hotel, The Burger Queen, y pedir servicio de habitaciones.',
    p2: 'El encargo: un conserje con aire de hotel de lujo, una voz de marca coherente, una forma de presentar los demás locales del hotel y más ingresos para el hotel.',
  },
  personas: {
    title: 'Personas',
    john: { status: 'Soltero', occupation: 'Turista (profesional del marketing)', location: 'Londres, Inglaterra', quote: 'Quiero la experiencia estadounidense en Las Vegas.' },
    miguel: { status: 'Casado', occupation: 'Gran apostador', location: 'Las Vegas, Nevada' },
  },
  conversation: {
    title: 'La conversación',
    kicker: 'Diseño conversacional',
    p: 'Nueve pantallas del prototipo, en orden, de la bienvenida a la despedida. Cada una muestra lo que el asistente dice en pantalla, en inglés; las respuestas habladas del huésped no forman parte de las pantallas.',
    steps: ['Saludo', 'Locales', 'Horario', 'Menú', 'Pedido', 'Bebida', 'Postre', 'Confirmación', 'Despedida'],
    pictures: [
      'el letrero Welcome to Fabulous Las Vegas de noche',
      'una hamburguesa con patatas fritas',
      'una hamburguesa con patatas fritas',
      'una hamburguesa con queso de varios pisos',
      'refresco de cola servido sobre hielo',
      'refresco de cola servido sobre hielo',
      'una tarta cubierta de frutos rojos',
      'una persona sonriente en el mostrador de recepción del hotel',
      'una persona sonriente en el mostrador de recepción del hotel',
    ],
    screenAlt: (n, step, picture) => `Pantalla ${n} del prototipo, ${step.toLowerCase()}: texto en pantalla, en inglés, sobre ${picture}. El texto está transcrito al lado.`,
    screenShort: (n, step) => `Pantalla ${n} del prototipo, ${step.toLowerCase()}`,
    noteLabel: 'Imágenes',
    note: 'El prototipo usa fotos de archivo para la comida y el mostrador de recepción.',
  },
  changes: {
    title: 'Qué cambió',
    p: 'Al revisar la aplicación encontramos tres problemas: no tenía saludo, no mostraba suficiente oferta de comida y su imagen de marca no era coherente con la del hotel. A lo largo de varias iteraciones:',
    greeting: { term: 'Añadimos un saludo personalizado.', rest: ' En estas pantallas, por ejemplo, el asistente se dirige al huésped por su nombre al final (pantalla 9).' },
    menu: { term: 'Ampliamos el menú a bebidas y postres', rest: '; en estas pantallas se ofrecen a medida que se completa el pedido (pantallas 6 y 7).' },
    italics: { term: 'Pusimos en cursiva los términos ajenos al inglés de la interfaz', before: ', como', and: 'y', after: '(pantallas 8 y 9).' },
    branding: { term: 'Hicimos coherente la imagen de marca', rest: ' con la identidad del hotel.' },
  },
};

const it: typeof en = {
  context: {
    title: 'Contesto',
    p1: 'Un assistente multimodale, voce più schermo, per i dispositivi Alexa nelle camere di un hotel di Las Vegas. Gli ospiti potevano conoscere il ristorante dell’hotel, The Burger Queen, e ordinare il servizio in camera.',
    p2: 'Il brief: un concierge con l’atmosfera di un hotel di lusso, una voce di marca coerente, un modo per presentare gli altri locali dell’hotel e più ricavi per l’hotel.',
  },
  personas: {
    title: 'Personas',
    john: { status: 'Single', occupation: 'Turista (marketer)', location: 'Londra, Inghilterra', quote: 'Voglio l’esperienza americana a Las Vegas.' },
    miguel: { status: 'Sposato', occupation: 'Giocatore d’alto bordo', location: 'Las Vegas, Nevada' },
  },
  conversation: {
    title: 'La conversazione',
    kicker: 'Design conversazionale',
    p: 'Nove schermate del prototipo, in ordine, dal benvenuto al congedo. Ognuna mostra ciò che l’assistente dice sullo schermo, in inglese; le risposte a voce dell’ospite non fanno parte delle schermate.',
    steps: ['Saluto', 'Locali', 'Orari', 'Menu', 'Ordine', 'Bevanda', 'Dessert', 'Conferma', 'Congedo'],
    pictures: [
      'l’insegna Welcome to Fabulous Las Vegas di notte',
      'un hamburger con patatine fritte',
      'un hamburger con patatine fritte',
      'un cheeseburger a più strati',
      'cola versata sul ghiaccio',
      'cola versata sul ghiaccio',
      'una torta ricoperta di frutti di bosco',
      'una persona sorridente al bancone della reception',
      'una persona sorridente al bancone della reception',
    ],
    screenAlt: (n, step, picture) => `Schermata ${n} del prototipo, ${step.toLowerCase()}: testo sullo schermo, in inglese, sopra ${picture}. Il testo è trascritto accanto.`,
    screenShort: (n, step) => `Schermata ${n} del prototipo, ${step.toLowerCase()}`,
    noteLabel: 'Immagini',
    note: 'Il prototipo usa foto d’archivio per il cibo e per il bancone della reception.',
  },
  changes: {
    title: 'Cosa è cambiato',
    p: 'Rivedendo l’app abbiamo trovato tre problemi: non aveva un saluto, non mostrava abbastanza l’offerta di cibo e la sua immagine di marca non era coerente con l’hotel. Nel corso delle iterazioni abbiamo:',
    greeting: { term: 'Aggiunto un saluto personalizzato.', rest: ' In queste schermate, per esempio, l’assistente si rivolge all’ospite per nome alla fine (schermata 9).' },
    menu: { term: 'Esteso il menu a bevande e dessert', rest: '; in queste schermate vengono proposti mentre l’ordine prende forma (schermate 6 e 7).' },
    italics: { term: 'Messo in corsivo i termini estranei all’inglese dell’interfaccia', before: ', come', and: 'e', after: '(schermate 8 e 9).' },
    branding: { term: 'Reso coerente l’immagine di marca', rest: ' con l’identità dell’hotel.' },
  },
};

export const burgerCopy = { en, es, it };
