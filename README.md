# Azola Krweqe — website

The website for Azola Krweqe's artistic and curatorial practice, built as a
static site with Astro and deployed to Cloudflare Workers from GitHub.

## Stack

- **Astro 7** — static site generation
- **GitHub** — source of truth, version history and deployment trigger
- **Cloudflare Workers** — hosting, SSL and the `workers.dev` address
- **Pages CMS** — browser editing for projects and writing (`.pages.yml`)
- **Cloudflare Workers Builds** — build and deploy on every push to `main`

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # output in ./dist
npm run preview   # preview the build
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: statement, featured projects, current exhibition, writing |
| `/about` | Biography, CV request, selected exhibitions and projects |
| `/projects` | Project index |
| `/projects/[slug]` | Project detail, gallery, credits, video |
| `/exhibitions` | Exhibition index |
| `/exhibitions/[slug]` | Exhibition detail: dates, venue, programme, artists, gallery |
| `/writing` | Substack essays and newsletter sign-up |
| `/contact` | Email, enquiries, support |
| `/404` | Not found |

## Content

Projects live in `src/content/projects/*.md`, exhibitions in
`src/content/exhibitions/*.md`, and writing in `src/content/writing/*.md`.
All are plain Markdown with a frontmatter block, so they can be edited in Pages
CMS or directly in the repository.

Page copy also lives in editable JSON files under `src/data/pages/` (home,
projects, exhibitions, about, contact, writing), plus `src/data/settings.json`
for contact details, social links, navigation labels, footer text, subscribe
label, CV and the footer credit. These appear in Pages CMS as **Home page**,
**Projects page**, **Exhibitions page**, **About page**, **Contact page**,
**Writing page** and **Site settings**.

To add a project or exhibition, copy an existing file, change the frontmatter,
and add images to `public/images/`. The `cover` field is the card and hero
image; `gallery` takes an array of images with alt text and captions.
Exhibitions also carry dates, venue, programme, artists and supporters. Old
`/home-affairs` and `/projects/home-affairs` URLs redirect to
`/exhibitions/home-affairs` via `public/_redirects`.

## Deployment

The repository is connected to **Cloudflare Workers Builds**. Every push to
`main` builds the site with `npm run build` and deploys `./dist` to the
`azola-krweqe` Worker. See `SETUP.md` for the build settings and the one-time
setup.

The GitHub Actions workflow in `.github/workflows/deploy.yml` is kept as a
fallback but is disabled. Workers Builds is the active pipeline.

## Design

The visual direction takes cues from MOWAA (wearemowaa.org) and MBR Projects
(mbrprojects.co.za): warm grey paper, classic black type, a full-bleed image
hero with an overlaid transparent header, serif display type, thin rules,
oversized imagery and mono labels. The palette is deliberately monochrome —
light greys, mid-grey accents and black bands — with no colour accent. It is
not a reproduction — the type, layout system and content model are original.

## Placeholders to replace before launch

- **Contact details** in `src/data/settings.json`: email, Substack, Instagram,
  footer credit and CV (also editable in Pages CMS under **Site settings**)
- **Domain** in `astro.config.mjs`, `public/robots.txt` and `src/data/site.ts`
  (currently the `workers.dev` address; change these three when
  `azolakrweqe.co.za` is registered and attached)
- **Images**: all `public/images/plate-*.svg`, `hero.svg` and `portrait.svg`
  are temporary graphic placeholders. Replace with approved artwork and
  photography, and update the alt text.
- **Sample copy**: the three projects and three writing entries are drafts for
  layout purposes. Replace with Azola's approved text, credits and links.
- **Home Affairs details**: dates, venue, access, programme, artists and
  supporters are marked "to be confirmed".
- **CV**: currently a "request by email" button. Upload a PDF under **Site
  settings → CV file** in Pages CMS to switch it to a download.
- **Footer credit**: "Site by [studio]", editable under **Site settings → Footer
  credit**.

## Accessibility

Skip link, keyboard focus states, reduced-motion support, descriptive alt text,
semantic headings, 44px-ish tap targets and a mobile menu with `aria-expanded`.
Test with a keyboard and a phone before launch.
