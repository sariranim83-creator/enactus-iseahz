-- Enactus ISEAHZ — initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

-- === Fixed-shape content sections ===
-- Each "section" of the site (hero, about, vision, etc.) is stored as one
-- JSON blob keyed by a stable string. This keeps the admin dashboard simple:
-- one generic get/set per section, typed on the app side via src/types/content.ts.
create table if not exists content_blocks (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- === Dynamic collections (real rows: add / edit / delete / reorder) ===

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position_en text not null,
  position_fr text not null,
  photo_url text,
  bio_en text not null default '',
  bio_fr text not null default '',
  social_links jsonb not null default '{}'::jsonb,
  "order" integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_fr text not null,
  date date not null,
  time text,
  location text not null default '',
  description_en text not null default '',
  description_fr text not null default '',
  image_url text,
  category text not null default 'other' check (category in ('workshop','competition','community','meeting','other')),
  registration_url text,
  status text not null default 'upcoming' check (status in ('upcoming','past','cancelled')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption_en text not null default '',
  caption_fr text not null default '',
  date date,
  category text not null default 'events' check (category in ('events','workshops','team','competition','community','campus')),
  "order" integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists competition_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption_en text not null default '',
  caption_fr text not null default '',
  event_name text not null default '',
  date date,
  "order" integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  logo_url text not null,
  organization_name text not null,
  website text,
  description_en text not null default '',
  description_fr text not null default '',
  partnership_type text not null default 'other' check (partnership_type in ('sponsor','academic','community','media','other')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- === Row Level Security ===
-- Public (anon) visitors can read everything. Only authenticated users
-- (the club's admin dashboard users) can write. Create admin accounts via
-- Supabase Auth (Dashboard > Authentication > Users, or scripts/create-admin.ts).

alter table content_blocks enable row level security;
alter table team_members enable row level security;
alter table events enable row level security;
alter table gallery_photos enable row level security;
alter table competition_photos enable row level security;
alter table partners enable row level security;

create policy "public read content_blocks" on content_blocks for select using (true);
create policy "public read team_members" on team_members for select using (true);
create policy "public read events" on events for select using (true);
create policy "public read gallery_photos" on gallery_photos for select using (true);
create policy "public read competition_photos" on competition_photos for select using (true);
create policy "public read partners" on partners for select using (true);

create policy "admin write content_blocks" on content_blocks for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write team_members" on team_members for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write events" on events for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write gallery_photos" on gallery_photos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write competition_photos" on competition_photos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write partners" on partners for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- === Storage bucket for all uploaded media (logo, favicon, photos) ===
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin write media" on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin update media" on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin delete media" on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
