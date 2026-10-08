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

## Theme preference

The header's Theme selector offers System, Light, and Dark. System follows the device setting, including changes while the page is open. Explicit Light or Dark choices are saved under `naranjo-theme` in localStorage and apply across pages and reloads; selecting System removes the saved override.

The theme is applied before page content renders. Without JavaScript, the site follows the device setting and hides the selector. If storage is unavailable, switching still works for the current page. The logo, hero artwork, and light clinic illustration panel retain their original colors.

When verifying themes, check all three page types in light and dark at desktop and 320px mobile widths. Exercise each choice, reloads, navigation, live device-setting changes, keyboard focus, and reduced motion. Also check an invalid saved preference, blocked storage, and JavaScript disabled; inspect initial rendering with a saved dark preference and text contrast, including button hover states.

## Continuous integration

The [CI workflow](.github/workflows/ci.yml) runs on pull requests targeting `dev` or `main`, pushes to either branch, and manual dispatches from GitHub Actions. Its **Check and build** job uses Node.js 24 from `.nvmrc`, installs the lockfile with `npm ci`, then runs `npm run check` and `npm run build`.

The workflow needs only read access to repository contents and no secrets. It caches npm downloads using `package-lock.json` and cancels superseded runs for the same branch or pull request.

## Vercel deployment

The site is configured for Vercel's Git integration. `main` is the production branch; `dev` and feature branches receive preview deployments. The static Astro build needs no Vercel adapter or deployment token in GitHub.

To connect the project:

1. Ensure `main` contains the website and deployment configuration before importing. At setup time, the website is on `dev` and `main` contains only the initial commit; promote the reviewed changes through the repository's pull-request flow first.
2. In Vercel, import `NaranjoSolutions/naranjo-solutions-web` into your account with project name `naranjo-solutions-web` and the repository root as the root directory.
3. Select the Astro framework preset and Node.js 24.x. The [Vercel configuration](vercel.json) sets `npm ci` as the install command, `npm run check && npm run build` as the build command, and `dist` as the output directory.
4. Set the production branch to `main`, keep automatic Git deployments enabled, and enable system environment variables in the project's environment-variable settings.
5. Record the generated production domain and verify the first deployment. The Vercel project and production URL are **TBD** until the repository is imported.

Vercel runs its own type-check and build before publishing. It does not wait for the GitHub CI result. A failed Vercel check or build prevents that deployment from publishing.

### Site origin

The build uses `SITE_URL` when supplied. Otherwise, it uses `https://` plus Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, which points to production even during preview builds. Local builds without either variable omit canonical and Open Graph URLs.

For a future custom domain, set `SITE_URL` to its full HTTPS origin in both Production and Preview environments and redeploy. Configure a sitemap against the same origin when adding one; no sitemap is currently generated.

### Deployment verification

Confirm CI passes on a pull request and Vercel supplies a preview URL. After promotion to `main`, verify the production homepage, `/work/orthopedic-spine/`, favicon, and generated hero images. An unknown route must return HTTP 404 and display the custom 404 page. Check that canonical and Open Graph URLs use the production origin, including on preview pages.

## Updating content

- Edit brand, biography, services, and contact settings in `src/config/site.ts`.
- Add case studies as Markdown files in `src/content/work/`; their filenames become `/work/<filename>/` routes.
- Set `featured: true` to include a case study on the homepage. The existing clinic illustration appears only for Orthopedic Spine; add project-specific artwork to the homepage and case-study template when adding other projects.
- Edit design tokens and responsive styles in `src/styles/global.css`.

The clinic artwork is a labeled illustration, not a screenshot. Public project descriptions contain no patient data or private repository links.

## Brand assets

`public/favicon.svg` is the folded N mark used in the header, footer, browser icon, and hero illustration. The wordmark remains live text.

The hero artwork is stored in `src/assets/engineering-workshop.png` and rendered through Astro’s `Image` component as responsive WebP assets. The SVG mark is overlaid on its central card so the logo stays consistent. Its generation prompt is preserved in `src/assets/engineering-workshop.prompt.txt`; the image was created with the built-in image generation tool using the supplied brand and illustration references.

## Before publication

The contact section provides email (`mailto:`) and phone (`tel:`) links alongside the personal site at `https://alonsovndev.com/`. Contact details are maintained in `src/config/site.ts`. The personal site’s availability is currently unverified; confirm that it is reachable before publication.

Complete the Vercel setup and deployment verification above before publication. Analytics, inquiry forms, and client authentication are not configured.
