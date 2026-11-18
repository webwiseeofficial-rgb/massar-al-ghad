-- Supabase > SQL Editor. Replace admin@example.com with YOUR admin e-mail (twice below).
create table courses(id bigint generated always as identity primary key,cat text check(cat in('info','sec','ges','lan')),ico text,img text,fr text,ar text,tools text,months int,sort int default 0);
create table registrations(id bigint generated always as identity primary key,created_at timestamptz default now(),name text not null,phone text not null,email text,course text,message text,lang text,status text default 'new' check(status in('new','called','ok')));
alter table courses enable row level security;
alter table registrations enable row level security;
create policy "public read courses" on courses for select using(true);
create policy "public can register" on registrations for insert to anon with check(length(name)>1 and length(phone)>=8 and status='new');
create policy "admin reads registrations" on registrations for select to authenticated using((auth.jwt()->>'email')='admin@example.com');
create policy "admin updates registrations" on registrations for update to authenticated using((auth.jwt()->>'email')='admin@example.com');
create policy "admin manages courses" on courses for all to authenticated using((auth.jwt()->>'email')='admin@example.com') with check((auth.jwt()->>'email')='admin@example.com');
-- Then: Authentication > Users > Add user (that e-mail + a strong password).

-- ===== Admin plein écran (à exécuter si les tables existent déjà) =====
-- Suppression d'inscriptions depuis l'admin :
create policy "admin deletes registrations" on registrations for delete to authenticated using((auth.jwt()->>'email')='admin@example.com');
-- Mise à jour en direct : une nouvelle inscription apparaît sans recharger la page :
alter publication supabase_realtime add table registrations;
