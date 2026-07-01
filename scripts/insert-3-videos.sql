-- Insertar los 3 videos nuevos en Supabase
-- Pegá esto en: Supabase Dashboard → SQL Editor → Run
-- Idempotente: si el id ya existe, actualiza en vez de duplicar.

insert into resources (id, title, author, description, type, category, status, url, tags, tema, featured, affiliate)
values
  (
    'podcast-marisa-peer-3-pasos-pensamientos-negativos',
    '3 Pasos para Eliminar tus Pensamientos Negativos — Marisa Peer',
    'The Diary Of A CEO',
    'La terapeuta más reconocida del mundo comparte tres herramientas concretas para reprogramar el diálogo interno y erradicar los pensamientos que sabotean tu vida.',
    'podcast',
    'psicologia',
    'en-cola',
    'https://youtu.be/bzilnhq3Mkg',
    '["pensamientos","psicología","mentalidad","terapia","reprogramación"]'::jsonb,
    'mentalidad',
    false,
    false
  ),
  (
    'podcast-robert-greene-manipulacion-influencia',
    'El Experto en Manipulación — Robert Greene',
    'The Diary Of A CEO',
    'Robert Greene, autor de Las 48 Leyes del Poder, expone cómo funciona la manipulación humana y qué estrategias usan quienes ejercen influencia sobre los demás.',
    'podcast',
    'psicologia',
    'en-cola',
    'https://youtu.be/yrwSOMFZvHY',
    '["manipulación","influencia","poder","psicología","Robert Greene"]'::jsonb,
    'mentalidad',
    false,
    false
  ),
  (
    'podcast-hormozi-robbins-game-of-life',
    'Alex Hormozi × Tony Robbins — Una Conversación Brutalmente Honesta Sobre el Juego de la Vida',
    'Alex Hormozi & Tony Robbins',
    'Dos de las mentes más influyentes en negocios y desarrollo personal conversan sin filtros sobre el éxito, el dinero, la mentalidad y las reglas no escritas del juego de la vida.',
    'podcast',
    'negocios',
    'en-cola',
    'https://youtu.be/u1Aam_1NlRs',
    '["Alex Hormozi","Tony Robbins","mentalidad","éxito","negocios"]'::jsonb,
    'mentalidad',
    false,
    false
  )
on conflict (id) do update set
  title       = excluded.title,
  author      = excluded.author,
  description = excluded.description,
  type        = excluded.type,
  category    = excluded.category,
  url         = excluded.url,
  tags        = excluded.tags,
  tema        = excluded.tema;
