-- Mise à jour d'un projet DÉJÀ installé avec l'ancien supabase.sql.
-- Remplacez admin@example.com par VOTRE e-mail admin (à chaque occurrence).
-- Si une ligne répond « already exists », ignorez-la et passez à la suivante.

-- 1) Formations : colonne « masquée » + le public ne voit que les formations visibles
alter table courses add column if not exists hidden boolean default false;
drop policy if exists "public read courses" on courses;
create policy "public read courses" on courses for select using(not coalesce(hidden,false));

-- 2) Supprimer des inscriptions depuis l'admin
create policy "admin deletes registrations" on registrations for delete to authenticated using((auth.jwt()->>'email')='admin@example.com');

-- 3) Nouvelles inscriptions en direct
alter publication supabase_realtime add table registrations;

-- 4) Images des formations (téléversement)
insert into storage.buckets(id,name,public) values('course-images','course-images',true) on conflict do nothing;
create policy "public reads course images" on storage.objects for select using(bucket_id='course-images');
create policy "admin uploads course images" on storage.objects for insert to authenticated with check(bucket_id='course-images' and (auth.jwt()->>'email')='admin@example.com');
create policy "admin updates course images" on storage.objects for update to authenticated using(bucket_id='course-images' and (auth.jwt()->>'email')='admin@example.com');
create policy "admin deletes course images" on storage.objects for delete to authenticated using(bucket_id='course-images' and (auth.jwt()->>'email')='admin@example.com');
