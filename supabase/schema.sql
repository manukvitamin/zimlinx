-- EndorseHub real account profile table.
-- Run this in Supabase SQL Editor after creating the project.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('brand','creator')),
  full_name text not null,
  whatsapp text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id);

-- Optional trigger: creates an empty profile row when an auth user is created.
-- The frontend also inserts the profile, so do not enable this trigger unless desired.
