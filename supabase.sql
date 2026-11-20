-- SCRIPT UNIQUE : fonctionne sur un projet neuf comme sur un projet déjà installé.
-- Il peut être relancé autant de fois que nécessaire, sans erreur et sans effacer de données.
-- Seule chose à changer : votre e-mail admin, à UN seul endroit (ligne 6).

create or replace function public.is_admin() returns boolean language sql stable as $$
  select lower(coalesce(auth.jwt()->>'email',''))=lower('admin@example.com')
$$;

create table if not exists courses(id bigint generated always as identity primary key,cat text check(cat in('info','sec','ges','lan')),ico text,img text,fr text,ar text,tools text,months int,sort int default 0,hidden boolean default false,video text,desc_fr text,desc_ar text,featured boolean default false);
create table if not exists registrations(id bigint generated always as identity primary key,created_at timestamptz default now(),name text not null,phone text not null,email text,course text,message text,lang text,birthdate date,status text default 'new' check(status in('new','called','ok')));
alter table courses add column if not exists hidden boolean default false;
alter table courses add column if not exists video text;
alter table courses add column if not exists desc_fr text;
alter table courses add column if not exists desc_ar text;
alter table courses add column if not exists featured boolean default false;
alter table registrations add column if not exists birthdate date;
alter table courses enable row level security;
alter table registrations enable row level security;

drop policy if exists "public read courses" on courses;
drop policy if exists "public can register" on registrations;
drop policy if exists "admin manages courses" on courses;
drop policy if exists "admin reads registrations" on registrations;
drop policy if exists "admin updates registrations" on registrations;
drop policy if exists "admin deletes registrations" on registrations;

create policy "public read courses" on courses for select using(not coalesce(hidden,false));
create policy "public can register" on registrations for insert to anon with check(length(name)>1 and length(phone)>=8 and status='new');
create policy "admin manages courses" on courses for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "admin reads registrations" on registrations for select to authenticated using(public.is_admin());
create policy "admin updates registrations" on registrations for update to authenticated using(public.is_admin());
create policy "admin deletes registrations" on registrations for delete to authenticated using(public.is_admin());

do $$ begin
  alter publication supabase_realtime add table registrations;
exception when duplicate_object then null; end $$;

insert into storage.buckets(id,name,public) values('course-images','course-images',true) on conflict do nothing;
drop policy if exists "public reads course images" on storage.objects;
drop policy if exists "admin uploads course images" on storage.objects;
drop policy if exists "admin updates course images" on storage.objects;
drop policy if exists "admin deletes course images" on storage.objects;
create policy "public reads course images" on storage.objects for select using(bucket_id='course-images');
create policy "admin uploads course images" on storage.objects for insert to authenticated with check(bucket_id='course-images' and public.is_admin());
create policy "admin updates course images" on storage.objects for update to authenticated using(bucket_id='course-images' and public.is_admin());
create policy "admin deletes course images" on storage.objects for delete to authenticated using(bucket_id='course-images' and public.is_admin());

-- Vidéos promotionnelles des formations (téléversement MP4, 50 Mo max)
insert into storage.buckets(id,name,public,file_size_limit) values('course-videos','course-videos',true,52428800) on conflict do nothing;
drop policy if exists "public reads course videos" on storage.objects;
drop policy if exists "admin uploads course videos" on storage.objects;
drop policy if exists "admin updates course videos" on storage.objects;
drop policy if exists "admin deletes course videos" on storage.objects;
create policy "public reads course videos" on storage.objects for select using(bucket_id='course-videos');
create policy "admin uploads course videos" on storage.objects for insert to authenticated with check(bucket_id='course-videos' and public.is_admin());
create policy "admin updates course videos" on storage.objects for update to authenticated using(bucket_id='course-videos' and public.is_admin());
create policy "admin deletes course videos" on storage.objects for delete to authenticated using(bucket_id='course-videos' and public.is_admin());

-- Rafraîchit le cache de Supabase pour qu'il voie les nouvelles colonnes
notify pgrst, 'reload schema';

-- Puis : Authentication > Users > Add user (cet e-mail + un mot de passe fort).
