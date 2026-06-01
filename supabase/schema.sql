-- Ejecutar en Supabase SQL Editor

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  start timestamptz not null,
  "end" timestamptz,
  location text default '',
  category text default 'culto',
  created_at timestamptz default now()
);

create table if not exists songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  lyrics text not null,
  key text default 'C',
  author text default '',
  chords text,
  category text not null,
  audio_url text,
  youtube_url text,
  created_at timestamptz default now()
);

create table if not exists prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  request text not null,
  is_anonymous boolean default false,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  type text default 'image',
  category text default 'cultos',
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  active boolean default true,
  expires_at timestamptz,
  created_at timestamptz default now()
);

alter table events enable row level security;
alter table songs enable row level security;
alter table prayer_requests enable row level security;
alter table gallery enable row level security;
alter table contact_messages enable row level security;
alter table announcements enable row level security;

create policy "Public read events" on events for select using (true);
create policy "Public read songs" on songs for select using (true);
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read announcements" on announcements for select using (true);

create policy "Insert prayer" on prayer_requests for insert with check (true);
create policy "Insert contact" on contact_messages for insert with check (true);

-- Admin: usar service role o políticas con auth; para demo, permitir insert en events con anon key restringido en producción
