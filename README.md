# Naranjo Solutions

An English and Spanish portfolio and consulting website for Alonso Villanueva, Senior Software Engineer. Built with Astro, TypeScript, and plain CSS, with a featured Orthopedic Spine clinic platform case study.

## Local development

Use Node.js 22.12 or newer; Node.js 24 LTS is recommended and specified in `.nvmrc`.

```sh
npm ci
npm run dev
```

The local website is served at `http://127.0.0.1:4321`. No external services or environment variables are required to preview it.

## Verification

```sh
npm run test:i18n
npm run check
npm run build
npm run preview
```

`check` validates Astro and TypeScript. `build` produces static HTML and assets in `dist/`. `preview` serves that production output locally.

`test:i18n` uses Node’s built-in test runner to validate language resolution, navigation, persistence, blocked storage, and 404 localization. There is no browser test runner, formatter, or lint configuration. Verify both languages on the homepage, case study, and 404 page, including mobile layouts, keyboard navigation, and reduced-motion behavior alongside the check and build commands.

## Language preference

English pages use `/` and `/work/<projectId>/`; Spanish equivalents use `/es/` and `/es/work/<projectId>/`. The header’s ES/EN pill highlights the current language. Selecting a segment saves `en` or `es` under `naranjo-language` in localStorage. The browser preference applies until the visitor selects ES or EN; clearing the saved preference restores automatic selection.

On an unprefixed page, the site uses a valid saved choice first, otherwise the first English or Spanish entry in `navigator.languages`, including regional variants such as `es-CR`. Unsupported preferences fall back to English. Explicit `/es/` visits always show Spanish and do not change the saved preference. Automatic selection uses an early browser redirect; the static server itself serves the URL’s language.

Switching preserves the current page, query parameters, and section anchor. If storage is unavailable, the reserved `_lang=en` or `_lang=es` query parameter carries an explicit choice through reloads and internal links. Without JavaScript, ES/EN remains usable as ordinary links and content stays in the URL’s language.

When switching in the current tab, the site uses the section actually being read instead of an outdated URL anchor. A one-use `naranjo-language-scroll` record in sessionStorage restores progress within that section after the translated page loads, including case-study headings whose translated IDs differ. If session storage is blocked, the site falls back to the current section’s anchor when available.

The shared 404 response translates in place, preserving the requested URL and HTTP 404 status. Spanish paths show Spanish; other paths use the saved/browser preference. Recovery links, metadata, navigation, theme labels, and the language pill update together. Manual error-page choices use `_lang` to persist across reloads without changing the error path. Without JavaScript, the error page includes recovery links in both languages.

When verifying languages, check fresh English/Spanish browser preferences, unsupported languages, saved and invalid choices, direct Spanish links, switching and persistence, reloads, case-study navigation, query parameters and anchors, blocked storage, and JavaScript disabled. Check both themes at 320, 640, 960, and 1440px, including keyboard focus, active segments, localized theme labels, and unknown English/Spanish routes.

## Theme preference

The header’s sun/moon button switches between light and dark. It shows a moon to switch to dark mode and a sun to switch to light mode. The site follows the device setting, including changes while the page is open, until the visitor clicks the button. That explicit choice is saved under `naranjo-theme` in localStorage and applies across pages and reloads. Clear that saved preference to follow the device setting again.

The theme is applied before page content renders. Without JavaScript, the site follows the device setting and hides the button. If storage is unavailable, switching still works for the current page. The logo, hero artwork, and light clinic illustration panel retain their original colors.

When verifying themes, check all three page types in light and dark at desktop and 320px mobile widths. Check the button's top-right position, icon and accessible-label updates, clicks, Enter/Space activation, reloads, navigation, live device-setting changes before and after clicking, keyboard focus, and reduced motion. Also check an invalid saved preference, blocked storage, and JavaScript disabled; inspect initial rendering with a saved dark preference and text contrast, including button hover states.

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

- Edit shared brand, owner name, and contact details in `src/config/site.ts`. Edit translated UI copy, biography, services, and labels in `src/i18n/translations.ts`; Spanish uses neutral Latin American wording.
- Add paired English and Spanish Markdown case studies in `src/content/work/` and `src/content/work/es/`. Each needs a `locale` (`en` or `es`) and the same stable `projectId`; that identity becomes `/work/<projectId>/` and `/es/work/<projectId>/`. The build rejects missing or duplicate language versions. Capabilities use `{ id, label }` entries: preserve IDs between translations and translate labels. The clinic IDs are `website`, `booking`, `dashboard`, and `database`.
- Set `featured: true` to include a case study on the homepage. The existing clinic illustration appears only for Orthopedic Spine; add project-specific artwork to the homepage and case-study template when adding other projects.
- Edit design tokens and responsive styles in `src/styles/global.css`.

The clinic artwork is a labeled illustration, not a screenshot. Public project descriptions contain no patient data or private repository links.

The Orthopedic Spine homepage section and case study share `ClinicOverview.astro`, a light artwork panel with static website, booking, and dashboard previews. Their controls are decorative and their data is synthetic. `ClinicCapabilities.astro` presents the four existing delivered capabilities on both pages. Project-specific styles live in `src/styles/clinic.css`; the surrounding content follows the selected theme.

Verify both project views in light and dark at 320, 640, 960, 1100, and 1440px. Check preview stacking, image loading, readable labels, heading order, focus, internal navigation, reduced motion, and no-JavaScript rendering alongside `npm run check` and `npm run build`.

## Brand assets

`public/favicon.svg` is the folded N mark used in the header, footer, browser icon, and hero illustration. The wordmark remains live text.

The hero artwork is stored in `src/assets/engineering-workshop.png` and rendered through Astro’s `Image` component as responsive WebP assets. The SVG mark is overlaid on its central card so the logo stays consistent. Its generation prompt is preserved in `src/assets/engineering-workshop.prompt.txt`; the image was created with the built-in image generation tool using the supplied brand and illustration references.

The decorative spine artwork is stored in `src/assets/orthopedic-spine.png`, with its generation prompt in `src/assets/orthopedic-spine.prompt.txt`. It was created with the built-in image generation tool using the supplied project-section reference, then rendered as responsive WebP assets through Astro’s `Image` component. It is marketing artwork, not a diagnostic medical diagram. Text, preview interfaces, labels, and icons are rendered in HTML/CSS and SVG.

## Before publication

The contact section provides email (`mailto:`) and phone (`tel:`) links alongside the personal site at `https://alonsovndev.com/`. Contact details are maintained in `src/config/site.ts`. The personal site’s availability is currently unverified; confirm that it is reachable before publication.

Complete the Vercel setup and deployment verification above before publication. Analytics, inquiry forms, and client authentication are not configured.
