# m3etis.is-a.dev

Personal site and résumé of Vladislav Li. Astro, static output, RU by default and `/en/`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | Astro + TypeScript diagnostics |
| `npm run check:contrast` | WCAG contrast of the tokens in light, dark and the dark "stage" surface (fails under 4.5:1) |
| `npm run assets` | Regenerates OG images, touch icon, portrait (needs `CHROME_PATH`) |
| `npm run cv:pdf` | Prints `/cv/` and `/en/cv/` to `public/cv/*.pdf` against a running server (needs `CHROME_PATH`) |

`CHROME_PATH` is the path to any Chrome or Chromium binary.

## Where things live

- Content: `src/i18n/ui.ts` (interface copy), `src/data/` (projects, experience, skills, contacts).
- Design tokens ("Clarity"): `src/styles/tokens.css`; reset, layout and shared motion: `src/styles/base.css`.
  A section switches to the dark showcase surface with `data-surface="stage"`.
- Components: `src/components/` (interface illustrations in `src/components/previews/`); page sections: `src/sections/`.
- Local design drafts and archived components live in `design/`; the folder is git-ignored and not published.
- Fonts: system stack only (SF Pro / Segoe UI / Roboto), no web fonts.
- Unconfirmed facts are written as `TODO: подтвердить — …`; they render with a dashed outline and are left out of the PDF.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.
The custom domain comes from `public/CNAME`.
