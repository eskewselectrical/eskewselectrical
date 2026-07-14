# Eskew's Electrical Service — eskewselectrical.com

Astro 5 + Tailwind 4 + Vercel + Resend + Cloudflare Turnstile. Same stack as
rameyplumb.com / malcolmflooring.com, but dark charcoal + cyan theme.

## Quick start

```bash
npm install
cp .env.example .env   # fill in keys (see below)
npm run dev            # http://localhost:4321
npm run build          # production build (verifies everything compiles)
```

## Adding / swapping photos (no code changes needed)

Images are **auto-discovered** at build time. Drop files in, rebuild, done.

### Hero background photo

Drop **one** image into:

```
src/images/hero/          ⬅️ EMPTY — drop your hero photo here
```

It becomes the homepage hero background automatically, with a dark
left-to-right gradient overlay so the headline stays readable (put the
interesting part of the photo on the **right side** — the left is covered by
text). If the folder is empty, the hero falls back to the circuit-trace
graphic. If several images are present, first alphabetically wins.
**Recommended:** landscape, at least 1920px wide, well-lit.

### Service photos

Each service has its own folder. Drop **one** photo per folder (if there are
several, the first alphabetically is used):

```
src/images/services/
├── residential/      ✅ has photo (fireplace living room)
├── commercial/       ✅ has photo (shop lighting)
├── troubleshooting/  ✅ has photo (kitchen lighting)
├── generators/       ⬅️ EMPTY — drop a generator install photo here
└── overhead-doors/   ⬅️ EMPTY — drop an overhead door photo here
```

Until a folder has a photo, the site shows a styled "photo coming soon"
placeholder. **Recommended size:** landscape, at least 1200px wide, 4:3-ish.
Accepted formats: `.jpg` `.jpeg` `.png` `.webp`. Astro optimizes and resizes
automatically — don't worry about file size, but keep originals under ~5MB.

### Gallery photos

Drop any number of photos into:

```
src/images/gallery/
```

They appear on the gallery page (masonry grid) and the first 4 (alphabetical)
appear on the homepage strip. **The filename becomes the alt text**:
`kitchen-lighting-install.jpg` → "Kitchen lighting install". Name files
descriptively with hyphens — it's free SEO.

To control homepage strip order, prefix filenames: `01-best-photo.jpg`,
`02-next.jpg`, etc.

### Logo

`src/images/logo.png` — transparent-background version derived from David's
provided logo (background stripped). To replace: overwrite that file, keep the
name.

## Environment variables

Local: copy `.env.example` → `.env`. Production: Vercel → Project → Settings →
Environment Variables. All five:

| Variable | What it is |
|---|---|
| `RESEND_API_KEY` | Resend dashboard → API Keys |
| `CONTACT_TO_EMAIL` | Where form submissions go (`business@eskewselectrical.com`) |
| `CONTACT_FROM_EMAIL` | Verified Resend sender, e.g. `Eskew's Website <quotes@eskewselectrical.com>` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare → Turnstile → widget site key (public, rendered in HTML) |
| `TURNSTILE_SECRET_KEY` | Same widget's secret key (server-side only) |

## Resend setup (one-time)

1. resend.com → Domains → Add `eskewselectrical.com`.
2. Add the DKIM/SPF DNS records Resend gives you in Cloudflare DNS.
3. Wait for "Verified", then create an API key.
4. The form sets `Reply-To` to the customer's email, so David can hit Reply
   in Zoho and it goes to the customer, not to the website.

Note: `CONTACT_TO_EMAIL` delivery depends on the Cloudflare → Zoho forwarding
being set up for `business@eskewselectrical.com` (you're handling that
separately). Test the form end-to-end after DNS settles.

## Turnstile setup (one-time)

1. Cloudflare dashboard → Turnstile → Add widget.
2. Hostname: `eskewselectrical.com` (add `localhost` for local testing, or use
   Cloudflare's always-pass test keys locally: site `1x00000000000000000000AA`,
   secret `1x0000000000000000000000000000000AA`).
3. Widget type: Managed. Copy both keys into env vars.

## Google Analytics

1. analytics.google.com → create a GA4 property for eskewselectrical.com →
   Web data stream → copy the Measurement ID (`G-XXXXXXXXXX`).
2. Open `src/layouts/BaseLayout.astro`, find the `GOOGLE ANALYTICS` comment in
   `<head>`, replace it with the gtag snippet GA gives you:

```html
<script is:inline async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

(`is:inline` matters — Astro will otherwise try to bundle it.)

## Deploy (Vercel)

1. Push this repo to GitHub as `eskews-electrical`.
2. vercel.com → Add New Project → import the repo. Astro is auto-detected
   (the `@astrojs/vercel` adapter is already configured).
3. Add the five environment variables (Production + Preview).
4. Deploy, then add the domain: Project → Settings → Domains →
   `www.eskewselectrical.com` (+ apex redirect). In Cloudflare DNS, add the
   CNAME Vercel shows you. **Set the Cloudflare proxy to DNS-only (gray
   cloud)** — same gotcha as the Ramey site.

## SEO checklist (post-launch)

- [ ] Google Search Console → verify domain → submit `sitemap-index.xml`
- [ ] Google Business Profile → service-area business, link the site
- [ ] Confirm JSON-LD renders: view-source, look for `application/ld+json`
      (Electrician schema with all 14 cities + 24/7 hours)
- [ ] Facebook group link in footer works

## Site structure

```
src/
├── data/site.ts          ⬅️ ALL business info, copy, cities, services — edit here
├── data/images.ts        image auto-discovery (don't touch)
├── layouts/BaseLayout.astro   meta tags, JSON-LD, GA slot
├── components/           Header, Footer, ContactForm, ServicePhoto, CircuitDivider
└── pages/
    ├── index.astro       home (hero, services, gallery strip, about, areas, contact)
    ├── services.astro    all 5 services, alternating photo/text
    ├── gallery.astro     full gallery
    ├── 404.astro
    └── api/contact.ts    Resend + Turnstile endpoint (server route)
```

Phone number, hours, Facebook URL, service copy, and the city list all live in
`src/data/site.ts` — change once, updates everywhere including schema and
footer.
