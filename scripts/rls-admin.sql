-- ============================================================
-- FASE 3 — Políticas RLS: lectura pública + escritura solo admin
-- Pegá esto en: Supabase Dashboard → SQL Editor → Run
-- ============================================================
-- La lectura pública (anon) ya funciona. Esto SOLO agrega permiso
-- de escritura (insert/update/delete) para el usuario administrador,
-- identificado por su email. No toca la política de lectura existente.

-- Asegura que RLS está activa (no hace daño si ya lo está)
alter table resources enable row level security;

-- (Re)crea la política de escritura del admin de forma idempotente
drop policy if exists "admin_write_resources" on resources;
create policy "admin_write_resources" on resources
  for all
  to authenticated
  using      ((auth.jwt() ->> 'email') = 'gumercindoweb.edu@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'gumercindoweb.edu@gmail.com');

-- ============================================================
-- IMPORTANTE: crear el usuario administrador
-- ------------------------------------------------------------
-- Supabase Dashboard → Authentication → Users → Add user
--   Email:    gumercindoweb.edu@gmail.com
--   Password: (la que elijas)
--   ✅ Marcar "Auto Confirm User"
--
-- Ese email DEBE coincidir con el de arriba y con ADMIN_EMAIL
-- en client/src/contexts/AuthContext.tsx
-- ============================================================
