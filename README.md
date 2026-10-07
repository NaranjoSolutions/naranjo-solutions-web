# Naranjo Solutions

An English portfolio and consulting website for Alonso Villanueva, Senior Software Engineer & Team Lead. Built with Astro, TypeScript, and plain CSS, with a featured Orthopedic Spine clinic platform case study.

## Local development

Use Node.js 22.12 or newer; Node.js 24 LTS is recommended and specified in `.nvmrc`.

```sh
npm ci
npm run dev
```

The local website is served at `http://127.0.0.1:4321`. No external services or environment variables are required to preview it.

## Verification

```sh
npm run check
npm run build
npm run preview
```

`check` validates Astro and TypeScript. `build` produces static HTML and assets in `dist/`. `preview` serves that production output locally.

There is no dedicated test runner, formatter, or lint configuration. Verify the homepage, case study, 404 page, mobile layouts, keyboard navigation, and reduced-motion behavior in a browser alongside the check and build commands.

## Updating content

- Edit brand, biography, services, and contact settings in `src/config/site.ts`.
- Add case studies as Markdown files in `src/content/work/`; their filenames become `/work/<filename>/` routes.
- Set `featured: true` to include a case study on the homepage. The existing clinic illustration appears only for Orthopedic Spine; add project-specific artwork to the homepage and case-study template when adding other projects.
- Edit design tokens and responsive styles in `src/styles/global.css`.

The clinic artwork is a labeled illustration, not a screenshot. Public project descriptions contain no patient data or private repository links.

## Before publication

The contact section provides email (`mailto:`) and phone (`tel:`) links alongside the personal site at `https://alonsovndev.com/`. Contact details are maintained in `src/config/site.ts`. The personal site’s availability is currently unverified; confirm that it is reachable before publication.

The deployment provider and this website’s public origin are **TBD**. Once the origin is known, set `SITE_URL` to its full HTTPS URL during the build to generate canonical and Open Graph URLs. Configure a sitemap against that same origin before publication; no placeholder domain or sitemap is emitted.

Example after selecting the real origin:

```sh
SITE_URL=https://your-real-domain.example npm run build
```

The domain above is illustrative; do not publish with it. Deployment, analytics, inquiry forms, and client authentication are not configured.
