-- Installation complète (nouveau projet). Supabase > SQL Editor.
-- Remplacez admin@example.com par VOTRE e-mail admin (à chaque occurrence).
-- Projet déjà installé ? Exécutez plutôt supabase-update.sql.

create table courses(id bigint generated always as identity primary key,cat text check(cat in('info','sec','ges','lan')),ico text,img text,fr text,ar text,tools text,months int,sort int default 0,hidden boolean default false);
create table registrations(id bigint generated always as identity primary key,created_at timestamptz default now(),name text not null,phone text not null,email text,course text,message text,lang text,status text default 'new' check(status in('new','called','ok')));
alter table courses enable row level security;
alter table registrations enable row level security;

-- Public : voir les formations visibles, s'inscrire
create policy "public read courses" on courses for select using(not coalesce(hidden,false));
create policy "public can register" on registrations for insert to anon with check(length(name)>1 and length(phone)>=8 and status='new');

-- Admin : tout gérer
create policy "admin manages courses" on courses for all to authenticated using((auth.jwt()->>'email')='admin@example.com') with check((auth.jwt()->>'email')='admin@example.com');
create policy "admin reads registrations" on registrations for select to authenticated using((auth.jwt()->>'email')='admin@example.com');
create policy "admin updates registrations" on registrations for update to authenticated using((auth.jwt()->>'email')='admin@example.com');
create policy "admin deletes registrations" on registrations for delete to authenticated using((auth.jwt()->>'email')='admin@example.com');

-- Nouvelles inscriptions en direct dans l'admin
alter publication supabase_realtime add table registrations;

-- Images des formations (téléversement depuis l'admin)
insert into storage.buckets(id,name,public) values('course-images','course-images',true) on conflict do nothing;
create policy "public reads course images" on storage.objects for select using(bucket_id='course-images');
create policy "admin uploads course images" on storage.objects for insert to authenticated with check(bucket_id='course-images' and (auth.jwt()->>'email')='admin@example.com');
create policy "admin updates course images" on storage.objects for update to authenticated using(bucket_id='course-images' and (auth.jwt()->>'email')='admin@example.com');
create policy "admin deletes course images" on storage.objects for delete to authenticated using(bucket_id='course-images' and (auth.jwt()->>'email')='admin@example.com');

-- Puis : Authentication > Users > Add user (cet e-mail + un mot de passe fort).
