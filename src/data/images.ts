import type { ImageMetadata } from 'astro';

/*
 * What each imported image shows (from viewing every file). Assign images from this list, not from filenames.
 *
 * sunnyvale-cleanwater/
 *   sunnyvalecleanwater_1.png   Master Plan documents, ORIGINAL: one long single-column list of links.
 *   sunnyvalecleanwater_2.png   Master Plan documents, REDESIGN: two columns, section titles in body color, file sizes e.g. "(47.4 MB)", "Return to Top".
 *   sunnyvalecleanwater_3.png   FAQ, EARLY: plain list of questions with answers below each.
 *   sunnyvalecleanwater_4.png   FAQ, FINAL: "On this page" list of linked questions beside a photo of a scientist.
 *   sunnyvalecleanwater_5.png   IA tree, EXISTING site (1/2): Home → Why the Community Needs This Program, About the Existing Plant, Master Plan, PEIR, News, Projects.
 *   sunnyvalecleanwater_6.png   IA tree, NEW site (2/2): Home → Learn More, Get Involved, Program Info, Updates, Contact Us, Contractors.
 *   sunnyvalecleanwater_7.png   Nav dropdown BEFORE (small crop): Get Involved → "Updates" above "Contact Us" (green panel).
 *   sunnyvalecleanwater_8.png   Nav dropdown AFTER: Get Involved → "Contact Us" above "Updates" (purple panel).
 *   sunnyvalecleanwater_9.png   Active Projects page: list of project links beside a construction photo.
 *   sunnyvalecleanwater_10.png  FAQ answer with an inline photo (digested sludge pipe) and "Back to Questions" link.
 *   sunnyvalecleanwater_11.png  Overview teaser with the "Learn More →" button style (arrow shows where the link goes).
 *   sunnyvalecleanwater_15.png  Nav dropdown BEFORE (wide crop): "Updates" above "Contact Us" (green panel).
 *   sunnyvalecleanwater_18.png  Header subtitle DRAFT 1: "Providing reliable service for residents and businesses 24/7".
 *   sunnyvalecleanwater_19.png  Header subtitle DRAFT 2: "Ensuring that wastewater is not wasted".
 *   sunnyvalecleanwater_20.png  Header subtitle DRAFT 3: "Meeting Service and Environment Goals now and for the future".
 *   sunnyvalecleanwater_21.png  Header subtitle SELECTED: "Meeting service and environment goals today and for our future".
 *   sunnyvalecleanwater_22.jpg  Photo: purple-painted pumps and pipes at the plant.
 *   sunnyvalecleanwater_23.png  Sunnyvale logo on purple.
 *
 * ladwp-turf-replacement/
 *   LA_WP_dept_1.png    Program Steps page: 1) Submit Your Application 2) Receive Approval… 3) Meet with the Designer 4) Receive the Design Plans, with photos.
 *   LA_WP_dept_2.png    Application page "Provide Contact Information" (form fields, page 1 of 4).
 *   LA_WP_dept_3.png    Application page with photo choices: "What does your Turf Area look like?" (green grass vs. dirt), page 1 of 4.
 *   LA_WP_dept_6.png    Confirmation email BEFORE: plain text. Subject "LADWP Turf Replacement Design Services - John Test 51 - Application in Review".
 *   LA_WP_dept_7.png    Confirmation email AFTER: HTML, logo header, bold questions, two-column tables. Subject "LADWP – John Test 51 - Turf Replacement Design Services - Application in Review".
 *   LA_WP_dept_8.png    Confirmation email AFTER, variant of _7 (same layout, slightly different subject spacing).
 *   LA_WP_dept_9.png    Confirmation email BEFORE, variant of _6.
 *   LA_WP_dept_10.png   Troubleshooting tip (transcribed): "It's recommended to use the Chrome browser to access the form. If you have problems accessing the form, please disable your ad blockers and clear your cache. If trouble still persists, please open the form in its own window."
 *   LA_WP_dept_11.png   Application contact-information page, variant of _2.
 *   LA_WP_dept_14.jpg   Photo: red lantana flowers.
 *   LA_WP_dept_15.png   LADWP logo.
 *
 * descubre/
 *   VHL_1.png   Document: "GLOBAL CONTENT GUIDELINES" — Use what students know; Cognates (gloss rules).
 *   VHL_2.png   Document: "Standard formatting guidelines for transforming textbook readings into html readings".
 *   VHL_3.png   Annotated screen: "Listening practice: La familia" family tree activity; magenta boxes mark title, instructions, due date, next activity.
 *   VHL_4.png   Annotated screen: "Emparejar" — instruction line, reference links, attempts remaining.
 *   VHL_5.png   Annotated screen: graded answers (✓/✗) and the score with accept / re-try buttons.
 *   VHL_6.png   Annotated screen: browser dialog warning that accepting the 90% grade gives up remaining attempts.
 *   VHL_7.png   Annotated screen: "Results finalized" banner with practice / next activity.
 *   VHL_8.png   Annotated screen: teacher view, "Add content → New activity" menu with Composition, Partner Chat, Student Recording, Video.
 *   VHL_9.png   Annotated screen: activity authoring form (title, direction line, reference materials, question prompt).
 *   VHL_10.png  Screen: "Entrevista" partner chat — choose a partner, live video.
 *   VHL_11.png  Screen: virtual chat "Answer Juan Pablo's questions" with a Start button and recording note.
 *   VHL_12.png  Screen: reading by María Úrsula Echevarría with audio button and highlighted passage.
 *   VHL_13.png  Screen: interactive map (Islas Galápagos, Colombia, Quito) with tabs Mapa / Cifras / ¡Increíble pero cierto! / Notas culturales.
 *   VHL_14.png  Print spread: "panorama — Ecuador", El país en cifras, map.
 *   VHL_15.png  Lesson opener: "Las relaciones personales" (lesson 1), contents list, photo including a wheelchair user.
 *   VHL_16.png  Lesson opener: "La tecnología y la ciencia" (lesson 7).
 *   VHL_SpanishCovers.png  Descubre 1A, 1B, 1, 2, 3 covers.
 *   VHL_SpanishTitle.png   Wordmark: "DESCUBRE — Lengua y cultura del mundo hispánico".
 *
 * mosaik/
 *   VHL_GermanCovers.png   Mosaik 1, 2, 3 covers.
 *
 * the-burger-queen/   (dialogue transcribed in src/pages/work/the-burger-queen.astro)
 *   Alexa_Hotel_10 … _18   Nine screens in order: welcome → restaurant choice → hours → menu → order → drink → dessert → confirmation → sign-off.
 */

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*/*.{png,jpg}', { eager: true });

export function img(id: string, file: string): ImageMetadata {
  const mod = files[`../assets/projects/${id}/${file}`];
  if (!mod) throw new Error(`Missing image ${id}/${file}`);
  return mod.default;
}
