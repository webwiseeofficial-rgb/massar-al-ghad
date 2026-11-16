-- Run in Supabase > SQL Editor
create table courses(id bigint generated always as identity primary key,cat text check(cat in('info','sec','ges','lan')),ico text,fr text,ar text,tools text,months int,sort int default 0);
create table registrations(id bigint generated always as identity primary key,created_at timestamptz default now(),name text not null,phone text not null,email text,course text,message text,lang text);
alter table courses enable row level security;
alter table registrations enable row level security;
create policy "public read courses" on courses for select using(true);
create policy "public can register" on registrations for insert with check(length(name)>1 and length(phone)>=8);
-- Registrations are only readable from the Supabase dashboard (no select policy for anon).
