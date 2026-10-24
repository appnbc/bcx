# Brian Contreras — portfolio

A static portfolio site for Brian Contreras's UX design and UX writing work, built with [Astro](https://astro.build). It outputs plain HTML and CSS with a little JavaScript (Index filters, the screenshot viewer, the homepage switches). Every interactive feature still works, or degrades to a plain link or list, when JavaScript is off.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:4321, reloads as you edit
```

To see exactly what will be published:

```bash
npm run build        # writes the site to dist/
npm run preview      # serves dist/ at http://localhost:4321
```

## Tests

```bash
npx playwright install chromium   # first time only
npm run build
npm test             # content checks on dist/: every project present, links resolve, alt text, wording
npm run e2e          # browser checks: no horizontal scroll at 360–1600px, accessibility (axe), keyboard use
```

## Editing content

| What | Where |
|---|---|
| Name, one-line statement, contact email | `src/config.ts` |
| All 23 projects (titles, roles, dates, summaries, Index entries) | `src/data/projects.json` |
| The list every project must appear in (the build fails if one is missing) | `src/data/inventory.json` |
| Case-study pages | `src/pages/work/<project-id>.astro` |
| Homepage, Index, About | `src/pages/index.astro`, `archive.astro`, `about.astro` |
| Colors and type scale | `src/styles/tokens.css` |

Case-study images live in `src/assets/projects/<project-id>/`. To re-import from the original `pics/` folder (duplicates are skipped):

```bash
npm run images
```

## Spanish and Italian

Every page also exists at `/es/…` and `/it/…` (for example `/es/work/descubre/`). The deployed site has them **public**: the deploy workflow sets `LANGUAGES_PUBLIC: '1'`, which shows the English | Español | Italiano switcher, adds absolute `hreflang` links and lets search engines index them. Local builds and `npm test` keep the private default (no switcher, `noindex`). The Spanish is neutral Latin American Spanish.

- **Where the copy lives:** UI text in `src/i18n/ui.ts`; each page's copy in `src/i18n/pages/<page>.ts` (English, Spanish and Italian side by side); project summaries and roles under `i18n` in `src/data/projects.json` (edit `scripts/translations-projects.mjs` and run `node scripts/merge-project-translations.mjs`). A missing or misshapen translation fails `npm test`.
- **What stays in English:** Brian's own artifacts (interface copy, email subject lines, the Burger Queen dialogue, style-guide originals), titles of works, and official job titles. They are marked `lang="en"` so screen readers pronounce them correctly.
- **Taking them private again:** remove `LANGUAGES_PUBLIC` from the deploy workflow's build step.

## Deploying to GitHub Pages

The repository includes a workflow (`.github/workflows/deploy.yml`) that tests, builds and publishes the site on every push to `main`. It works with any repository name: a repository called `<username>.github.io` is served at that address; any other name is served at `<username>.github.io/<repo-name>/`, and the workflow sets the base path automatically.

One-time setup:

1. In the repository on GitHub, open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The site is live a minute or two later; the address appears on the Pages settings screen and in the workflow run.

On a free GitHub account, Pages requires the repository to be public.

Other static hosts (Netlify, Vercel, Cloudflare Pages) also work: build command `npm run build`, output folder `dist`.

To test a subfolder build locally: `BASE_PATH=/portfolio npm run build` (in Git Bash on Windows, prefix with `MSYS_NO_PATHCONV=1`).

## Design rules

The look follows a small set of rules; keep to them when adding pages.

- **Paper and ink.** Off-white paper, deep green ink. Dark mode swaps to deep green paper with pale ink.
- **One mark: the highlighter.** Peach marks what matters: headline phrases, inserted copy, active filters, links that lead somewhere. Red appears only on deleted copy.
- **One shape rule.** Screenshots and panels are square-cornered with a thin border. Rounded pills are only for things you click.
- **Work sits on panels.** On the homepage each selected project sits on a sage or peach panel, shown no larger than its real file. Small originals can be piled two deep, like papers on a desk.
- **One label style.** Small, semibold, sans-serif, muted ink.
- **Sections open the same way.** A thick ink rule, then the title.
