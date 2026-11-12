# Setup — GitHub + Cloudflare

How this site is hosted, and how to change it.

## Current live site

**https://azola-krweqe.azola-krweqe.workers.dev**

- **GitHub repository:** <https://github.com/Oluhle96/azola-krweqe> (public)
- **Cloudflare Worker:** `azola-krweqe`
- **Cloudflare account ID:** `1c20fadb0f088dd3e8bbcfd2f7ca7e64`

## How deployment works

The repository is connected to **Cloudflare Workers Builds**. Every push to
`main` triggers a build on Cloudflare:

| Setting | Value |
| --- | --- |
| Repository | `Oluhle96/azola-krweqe` |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Node version | `NODE_VERSION=22` |

The build output is `dist/`, which `wrangler.jsonc` points at. The Worker name
in `wrangler.jsonc` must stay `azola-krweqe` so the URL and any future custom
domain keep working.

Builds and their logs are visible in the Cloudflare dashboard:

**Workers & Pages → azola-krweqe → Deployments**

## Day-to-day editing

### With Pages CMS (for Azola)

1. Install the Pages CMS GitHub app on the repository:
   <https://app.pagescms.org/>
2. Sign in and open `Oluhle96/azola-krweqe`.
3. The `.pages.yml` file defines two collections: **Projects** and **Writing**.
4. Edits are committed to `main`, which starts a Cloudflare build
   automatically.

Test the full flow with Azola before launch: add a project, replace an image,
change a caption, publish, and confirm the site updates after the build.

### Directly in the repository

- Projects: `src/content/projects/*.md`
- Writing: `src/content/writing/*.md`
- Images: `public/images/`
- Site details (email, social links): `src/data/site.ts`
- Design tokens and layout: `src/styles/global.css`

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # output in ./dist
npm run preview   # preview the build
```

To deploy manually from this machine (only needed for emergencies):

```bash
npx wrangler login
npm run deploy
```

## Custom domain (when the .co.za is registered)

1. Add the domain to Cloudflare (free plan) and change the nameservers at the
   registrar.
2. In `wrangler.jsonc`, add:

```jsonc
"routes": [{ "pattern": "azolakrweqe.co.za", "custom_domain": true }]
```

3. Update the site URL in three places:
   - `astro.config.mjs` → `site`
   - `src/data/site.ts` → `siteUrl`
   - `public/robots.txt` → `Sitemap`
4. Push. Cloudflare issues the certificate automatically.

## GitHub Actions (fallback, currently disabled)

`.github/workflows/deploy.yml` can deploy with `wrangler-action` instead of
Workers Builds. It is disabled because GitHub Actions is locked on this
account for a billing reason. Do not enable it while Workers Builds is active,
or every push will deploy twice.

If it is ever needed, add these repository secrets:

| Name | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | API token with **Account → Workers Scripts → Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | `1c20fadb0f088dd3e8bbcfd2f7ca7e64` |

Then enable the workflow and disable Workers Builds.

## Troubleshooting

- **Build fails on Cloudflare** — open the build log. The usual cause is a
  missing package in `package.json` or a content file that does not match the
  schema in `src/content.config.ts`.
- **Site shows old content** — wait for the build to finish, then hard-refresh.
- **404 on a route** — confirm `dist/<route>/index.html` exists after a local
  build and that `wrangler.jsonc` still points at `./dist`.
- **Images missing** — files must be in `public/images/` and referenced as
  `/images/filename.ext`.
