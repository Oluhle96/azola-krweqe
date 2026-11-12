# Setup — GitHub + Cloudflare

One-time steps. Everything after this is `git push`.

## 1. Create the GitHub repository

1. Go to <https://github.com/new>.
2. Name it `azola-krweqe` (private or public — either works).
3. Do **not** add a README, `.gitignore` or licence; the repo already has them.
4. Create the repository, then push this folder:

```bash
cd ~/projects/azola-website
git remote add origin https://github.com/<your-username>/azola-krweqe.git
git branch -M main
git push -u origin main
```

If you use the GitHub CLI instead:

```bash
gh repo create azola-krweqe --private --source=. --remote=origin --push
```

## 2. Create a Cloudflare API token

1. Open <https://dash.cloudflare.com/profile/api-tokens>.
2. **Create Token** → use the **Edit Cloudflare Workers** template.
3. Permissions should include:
   - Account → Workers Scripts → Edit
   - Account → Workers KV Storage → Edit (only if we add KV later)
   - Zone → Workers Routes → Edit (only when a custom domain is attached)
4. Scope it to your account. Copy the token — it is shown once.

## 3. Find your Account ID

Cloudflare dashboard → **Workers & Pages** → the Account ID is in the right-hand
sidebar, or on the dashboard home under **Account ID**.

## 4. Add both as GitHub secrets

Repository → **Settings** → **Secrets and variables** → **Actions** →
**New repository secret**:

| Name | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | the token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | the account ID from step 3 |

## 5. Deploy

Push to `main` (or run the workflow manually from the **Actions** tab). The
workflow builds the site and runs `wrangler deploy`.

The first deploy prints a URL like:

```
https://azola-krweqe.<your-subdomain>.workers.dev
```

That is the live site. HTTPS is automatic.

## 6. Custom domain (when the .co.za is registered)

1. Add the domain to Cloudflare (free plan) and change the nameservers at the
   registrar.
2. In `wrangler.jsonc`, add a route or custom domain:

```jsonc
"routes": [{ "pattern": "azolakrweqe.co.za", "custom_domain": true }]
```

3. Update the `site` value in `astro.config.mjs` and the URLs in
   `public/robots.txt` and `src/data/site.ts`.
4. Push. Cloudflare issues the certificate automatically.

## 7. Editing with Pages CMS

1. Install the Pages CMS GitHub app on the repository:
   <https://app.pagescms.org/>
2. Sign in at <https://app.pagescms.org/> and open the repository.
3. The `.pages.yml` file defines two collections: **Projects** and **Writing**.
4. Test the editing flow with Azola before launch: add a project, replace an
   image, edit a caption, publish, and confirm the change appears after the
   Action finishes.

## Local deploy (optional)

```bash
npx wrangler login
npm run deploy
```

`npm run deploy` builds the site and runs `wrangler deploy` from your machine.
Useful for testing before wiring GitHub Actions.

## Troubleshooting

- **`npm ci` fails in Actions** — the lockfile is out of date. Run
  `npm install` locally and commit `package-lock.json`.
- **401 from Cloudflare** — the API token is wrong, expired, or scoped to the
  wrong account.
- **404 on a route** — check that the build produced `dist/<route>/index.html`
  and that `wrangler.jsonc` points at `./dist`.
- **Old page after deploy** — Cloudflare caches static assets. Hard-refresh, or
  check the deployment in the Cloudflare dashboard.
