# Enactus ISEAHZ — official website

A production-ready, bilingual (EN/FR) website for **Enactus ISEAHZ** (Higher
Institute of Applied Studies in Humanities of Zaghouan, Tunisia), built with
Next.js + TypeScript + Tailwind + Framer Motion, backed by Supabase
(database, auth, storage), with a password-protected admin dashboard so the
club can edit every section of the site without touching code.

No fake content: projects, sponsors, achievements and rituals are **not**
invented anywhere in this codebase — content that isn't confirmed yet ships
as clean, editable placeholders (see `src/lib/content/defaults.ts`).

---

## 1. Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| Backend    | Supabase (Postgres + Auth + Storage), all accessed via the official Node.js SDK (`@supabase/supabase-js`, `@supabase/ssr`) |
| Hosting    | Vercel (recommended) |
| Runtime    | Node.js everywhere — no other language/runtime is involved |

---

## 2. Project structure

```
src/
  app/
    [locale]/                 # everything is routed under /en or /fr
      page.tsx                # homepage — assembles every section
      layout.tsx              # root <html>/<body>, fonts, nav, footer, SEO
      events/page.tsx         # full event calendar
      gallery/page.tsx        # full photo gallery
      privacy/, terms/        # placeholder legal pages
      admin/                  # password-protected dashboard
        login/page.tsx
        <section>/page.tsx    # one page per editable section
    globals.css
    sitemap.ts, robots.ts
  components/
    intro/IntroSequence.tsx   # cinematic opening animation
    nav/, footer/             # Navbar, Footer, language switcher
    home/                     # one component per homepage section
    events/, gallery/         # shared event card + lightbox gallery
    admin/                    # generic JSON block editor + CRUD editors
    ui/                       # Button, Container, Reveal, Counter, Logo…
  lib/
    content/                  # defaults.ts (fallback copy) + Supabase fetchers
    i18n/                     # locale config + static UI dictionary (EN/FR)
    supabase/                 # browser / server / admin Supabase clients
    admin/jsonPath.ts         # immutable deep-set used by the generic editor
  types/                      # content.ts (app-facing types), database.ts (DB rows)
  middleware.ts                # locale redirect + /admin auth gate
supabase/
  migrations/0001_init.sql    # schema + RLS policies + storage bucket
  migrations/0002_seed.sql    # the club's real initial content (no placeholders)
scripts/
  create-admin.ts             # bootstraps the first admin user
public/
  brand/logo.jpg              # the official Enactus ISEAHZ logo (untouched)
```

### Content model

Two kinds of editable content:

1. **Fixed-shape sections** (hero, about, vision, SDGs, stats, …) — stored as
   a single JSON document per section in the `content_blocks` table. The
   admin dashboard renders a generic recursive form for these
   (`src/components/admin/JsonField.tsx`), so every bilingual field shows an
   EN/FR pair automatically.
2. **Growing collections** (team, events, gallery, competition photos,
   partners) — real Postgres tables with full add/edit/delete, image upload
   to Supabase Storage, and (where relevant) manual ordering.

If Supabase isn't configured yet, every page falls back to the bundled
content in `src/lib/content/defaults.ts` — the site never shows a broken
page during setup.

---

## 3. Local setup

### 3.1 Install dependencies

```bash
npm install
```

### 3.2 Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Once created, open **Project Settings → API** and note:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep this secret — server-only)

### 3.3 Set environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://enactusiseahz.tn
ADMIN_BOOTSTRAP_EMAIL=admin@enactusiseahz.tn
ADMIN_BOOTSTRAP_PASSWORD=choose-a-strong-password
```

### 3.4 Create the database tables

In the Supabase dashboard → **SQL Editor**, run the two files in order:

1. `supabase/migrations/0001_init.sql` — creates every table, Row Level
   Security policy, and the `media` storage bucket.
2. `supabase/migrations/0002_seed.sql` — inserts the club's real initial
   content (mission, vision, SDGs, Ranim Sari as Team Leader, etc.).

(Alternatively, if you use the Supabase CLI: `supabase db push`.)

### 3.5 Create the first admin account

```bash
npm run create-admin
```

This uses `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` from
`.env.local` and the service role key to create a confirmed user directly —
no email step needed. You can add more admin accounts later from the
Supabase dashboard (Authentication → Users → Add user).

### 3.6 Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` (redirects to `/en`). Admin dashboard:
`http://localhost:3000/en/admin/login`.

---

## 4. Deploying to Vercel

1. Push this repository to GitHub.
2. In [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Add the same environment variables from `.env.local` in Vercel's
   **Settings → Environment Variables** (all of them, including the service
   role key — it's only ever read server-side).
4. Deploy.

### Connecting `enactusiseahz.tn`

1. In the Vercel project → **Settings → Domains**, add `enactusiseahz.tn`
   (and `www.enactusiseahz.tn` if desired).
2. Vercel shows the DNS records to add (usually an `A` record to Vercel's IP
   and/or a `CNAME` for `www`). Add those records with your domain registrar.
3. HTTPS is issued automatically by Vercel once DNS propagates — no extra
   setup needed.

---

## 5. Editing content (no code required)

Sign in at `/en/admin` (or `/fr/admin`). The sidebar covers every section:

| Section | What it edits |
|---|---|
| General | Club name, institution name, location, logo, favicon, site title |
| Hero | Homepage headline + the "Become a Member" recruitment link |
| Vision & Ambition | Annual vision paragraph, ambition statement, year |
| About & Culture | Mission, values, Why Join cards, club culture, local impact |
| What is Enactus | The official E-A-US explainer |
| Statistics | Club and network numbers, with a visibility toggle per stat |
| SDGs | The 4 sustainability cards |
| Team | Add/edit/remove team members, upload photos, reorder |
| Events & Calendar | Add/edit events; toggle "Featured" to show one on the homepage |
| Gallery | Upload photos, caption, categorize, reorder |
| Competition | Competition text + a photo gallery for competition moments |
| Partners | Add real partners only — the site shows an elegant "Partnership opportunities" message while empty |
| Social Media | Instagram / Facebook / TikTok / LinkedIn links |
| Contact | Professional email + location |
| SEO | Page title, meta description, social sharing image |

Every text field has separate **EN** and **FR** inputs side by side — never
auto-translated, so the French copy always reads naturally.

### Uploading images

Any image field (logo, favicon, team photo, event image, gallery photo,
competition photo, partner logo) has a file picker that uploads straight to
the `media` bucket in Supabase Storage and fills in the public URL — no
manual hosting needed.

### Swapping the logo

The official logo ships at `public/brand/logo.jpg`. To replace it with a
different export of the same logo, just overwrite that file (same rules
apply: no redesigning, recoloring, or distorting it) — or upload a new one
from **Admin → General → Logo**, which overrides the local file.

---

## 6. A note on accuracy

Per the club's instructions, this codebase deliberately does **not** invent:

- projects (there is intentionally no "Projects" section)
- past sponsors or partners
- awards or competition results
- fixed team rituals (only editable placeholders)
- historical statistics beyond what was provided

The Zaghouan map (`src/components/home/ZaghouanMap.tsx`) traces the real
Tunisia mainland outline and the actual Zaghouan governorate boundary, sourced
from [geoBoundaries](https://www.geoboundaries.org) (OpenStreetMap-derived,
ODbL-licensed open administrative boundary data), simplified for a clean
decorative rendering. Offshore islands are omitted for simplicity — it's a
decorative illustration, not a navigational reference map.

---

## 7. Scripts

```bash
npm run dev         # local dev server
npm run build        # production build
npm run start         # run the production build
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run create-admin  # bootstrap the first admin user (see 3.5)
```
