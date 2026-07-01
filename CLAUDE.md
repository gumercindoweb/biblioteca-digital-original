# Biblioteca Digital — Guía para Claude Code

Biblioteca personal de recursos de aprendizaje de Gumercindo Jiménez (libros, podcasts, audiolibros, documentales, plataformas, canales de YouTube y cursos), con branding editorial "GJ".

## Stack

- **Frontend:** React 19 + Vite + TypeScript (carpeta `client/`)
- **Backend:** Express (carpeta `server/`) — mínimo; la app es sobre todo cliente
- **Datos:** Supabase (Postgres + Auth) leído EN VIVO desde el cliente
- **Gestor de paquetes:** pnpm
- **Hosting:** Vercel

## Comandos

```bash
pnpm dev        # servidor de desarrollo (vite --host)
pnpm build      # build de producción (vite build + esbuild del server)
pnpm check      # type-check (tsc --noEmit) — correr antes de commitear
pnpm format     # prettier
```

## Deploy

**El deploy es por integración Git: `git push` a la rama `main` → Vercel auto-deploya a producción.**

- Producción: **`biblioteca-digital-original.vercel.app`**
- NO se necesita el CLI de Vercel. Solo commit + push a `main`.
- Un push a una rama que no sea `main` genera solo un *preview*, no actualiza producción.
- Las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` están configuradas como env vars en el proyecto Vercel (no en el repo). Localmente van en `.env.local` (ignorado por git).

## Arquitectura de datos (Supabase)

- La app carga los recursos desde la tabla `resources` de Supabase **en vivo** (ver `client/src/pages/Home.tsx`). `client/src/lib/data.ts` es solo **fallback** si Supabase no responde.
- **Agregar/editar recursos NO requiere rebuild** — es un cambio en la base de datos y aparece al instante.
- **RLS (Row Level Security):** la anon key solo puede **leer**. La **escritura** (insert/update/delete) está permitida únicamente al usuario administrador, identificado por su email en la política `admin_write_resources`.

## Autenticación de admin

- Solo el dueño puede escribir. `ADMIN_EMAIL` está en `client/src/contexts/AuthContext.tsx` y debe coincidir con la política RLS y con el usuario en Supabase Auth.
- Login desde el frontend: botón discreto **"Acceso administrador"** al pie del Sidebar → `LoginModal`.
- Como admin: cada tarjeta muestra botón **editar** (lápiz) y **eliminar** (papelera), siempre visibles; el Sidebar muestra **"Agregar recurso"**. `AddResourceModal` cubre agregar y editar. El CRUD escribe directo a Supabase.

## Persistencia local

Las **notas de aprendizaje** y los **estados de lectura** se guardan en `localStorage` (claves `gj-notes` y `gj-statuses`), así que sobreviven al refresh. Contextos: `client/src/contexts/NotesContext.tsx` y `StatusContext.tsx`. (Mejora futura posible: migrarlas a Supabase por-usuario.)

## Branding GJ

Design system en `design-handoff/`. Tokens principales:

- Marfil (fondo): `#F8F5EE` · Verde (marca): `#11503D` · Sidebar: `#0E3B2E` · Gold (detalle): `#B89455`
- Tipografía: Cormorant Garamond (display), Spectral (cuerpo), Hanken Grotesk (UI/labels)
- Logos en `client/public/brand/logo/`

Usar siempre estos tokens antes de agregar estilos nuevos, para mantener coherencia.

## Convenciones

- Correr `pnpm check` antes de commitear.
- Mensajes de commit y comentarios en español (coherente con el resto del repo).
