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

- **Paper and ink.** White paper, blue-black ink. Dark mode swaps to ink-blue paper.
- **One mark: the highlighter.** Yellow marks what matters: headline phrases, inserted copy, active filters, links that lead somewhere. Red appears only on deleted copy.
- **One shape rule.** Screenshots and panels are square-cornered with a thin border. Rounded pills are only for things you click.
- **One label style.** Small, semibold, sans-serif, muted ink.
- **Sections open the same way.** A thick ink rule, then the title.
