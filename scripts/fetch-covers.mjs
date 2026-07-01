// Busca portadas en Open Library API con validación de coincidencia
// Uso: node scripts/fetch-covers.mjs
// Imprime SQL UPDATE statements — ejecutarlos en Supabase vía MCP o SQL Editor

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const env = readFileSync(path.join(__dirname, "../.env.local"), "utf-8");
const envVars = Object.fromEntries(
  env.split("\n").filter((l) => l.includes("=")).map((l) => {
    const idx = l.indexOf("=");
    return [l.slice(0, idx), l.slice(idx + 1).trim()];
  })
);

const supabase = createClient(
  envVars["VITE_SUPABASE_URL"],
  envVars["VITE_SUPABASE_ANON_KEY"]
);

// Títulos en inglés para libros publicados originalmente en inglés
const TITLE_OVERRIDES = {
  "influencia":                                   { title: "Influence",                         author: "Robert Cialdini" },
  "mindset":                                      { title: "Mindset",                           author: "Carol Dweck" },
  "oversubscribed":                               { title: "Oversubscribed",                    author: "Daniel Priestley" },
  "12-reglas-vida":                               { title: "12 Rules for Life",                 author: "Jordan Peterson" },
  "generacion-dopamina":                          { title: "Dopamine Nation",                   author: "Anna Lembke" },
  "estrategia-conflicto":                         { title: "The Strategy of Conflict",          author: "Thomas Schelling" },
  "fiesta-cocteles":                              { title: "The 2-Hour Cocktail Party",         author: "Nick Gray" },
  "disena-tu-vida":                               { title: "Designing Your Life",               author: "Bill Burnett" },
  "montana-eres-tu":                              { title: "The Mountain Is You",               author: "Brianna Wiest" },
  "hombre-simbolos":                              { title: "Man and His Symbols",               author: "Carl Jung" },
  "cabala-mistica":                               { title: "The Mystical Qabalah",              author: "Dion Fortune" },
  "quien-no-como":                                { title: "Who Not How",                       author: "Dan Sullivan" },
  "10-es-mas-facil-que-2":                        { title: "10x Is Easier Than 2x",            author: "Dan Sullivan" },
  "puedes-negociar-cualquier-cosa":               { title: "You Can Negotiate Anything",        author: "Herb Cohen" },
  "secretos-mente-millonaria":                    { title: "Secrets of the Millionaire Mind",  author: "T. Harv Eker" },
  "problema-dinero-eres-tu":                      { title: "You Are a Badass at Making Money", author: "Jen Sincero" },
  "zonas-erroneas":                               { title: "Your Erroneous Zones",             author: "Wayne Dyer" },
  "juego-vida-como-jugarlo":                      { title: "The Game of Life",                  author: "Florence Scovel Shinn" },
  "piense-hagase-rico":                           { title: "Think and Grow Rich",               author: "Napoleon Hill" },
  "placebo-eres-tu":                              { title: "You Are the Placebo",               author: "Joe Dispenza" },
  "corpus-hermeticum":                            { title: "Corpus Hermeticum",                 author: "Hermes Trismegistus" },
  "poder-conciencia":                             { title: "The Power of Awareness",            author: "Neville Goddard" },
  "poder-mente-subconsciente":                    { title: "The Power of Your Subconscious Mind", author: "Joseph Murphy" },
  "fe-es-tu-fortuna":                             { title: "Your Faith Is Your Fortune",        author: "Neville Goddard" },
  "kybalion":                                     { title: "The Kybalion",                      author: "Three Initiates" },
  "podcast-napoleon-hill-burlando-diablo":        { title: "Outwitting the Devil",              author: "Napoleon Hill" },
  "audiolibro-rick-rubin-acto-de-crear":          { title: "The Creative Act",                  author: "Rick Rubin" },
  "audiolibro-malcolm-gladwell-inteligencia-intuitiva": { title: "Blink",                       author: "Malcolm Gladwell" },
  "audiolibro-brian-tracy-tragese-el-sapo":       { title: "Eat That Frog",                     author: "Brian Tracy" },
  "audiolibro-simon-sinek-empieza-con-el-porque": { title: "Start With Why",                    author: "Simon Sinek" },
  "audiolibro-kahneman-pensar-rapido-despacio":   { title: "Thinking Fast and Slow",            author: "Daniel Kahneman" },
  "audiolibro-como-argumentar-como-abogado":      { title: "Thank You for Arguing",             author: "Jay Heinrichs" },
  "aprendiendo-mejores":                          { title: "Aprendiendo de los mejores",        author: "Francisco Alcaide" },
  "21-creencias-amargan-vida":                    { title: "21 creencias que te amargan la vida", author: "Rafael Santandreu" },
};

// --- helpers de validación ---

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // quita acentos
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set(["the","a","an","of","and","in","is","to","for","its","de","la","el","y","en","un","una","lo","las","los","que"]);

function keywords(str) {
  return normalize(str).split(" ").filter(w => w.length > 2 && !STOPWORDS.has(w));
}

function titleScore(searchTitle, resultTitle) {
  const sk = keywords(searchTitle);
  if (sk.length === 0) return 1;
  const rn = normalize(resultTitle);
  const hits = sk.filter(w => rn.includes(w)).length;
  return hits / sk.length;
}

function authorScore(searchAuthor, resultAuthors) {
  if (!searchAuthor) return 1;
  const sa = normalize(searchAuthor).split(" ").filter(w => w.length > 2);
  if (sa.length === 0) return 1;
  const pool = (resultAuthors || []).map(a => normalize(a)).join(" ");
  const hits = sa.filter(w => pool.includes(w)).length;
  return hits / sa.length;
}

function isGoodMatch(searchTitle, searchAuthor, doc) {
  const ts = titleScore(searchTitle, doc.title || "");
  const as = authorScore(searchAuthor, doc.author_name);
  return ts >= 0.5 && as >= 0.5;
}

// --- fetch ---

async function fetchCover(id, title, author) {
  const override = TITLE_OVERRIDES[id];
  const searchTitle = override?.title ?? title;
  const searchAuthor = override?.author ?? author ?? "";

  const params = new URLSearchParams({
    title: searchTitle,
    limit: "5",
    fields: "cover_i,title,author_name",
  });
  if (searchAuthor) params.set("author", searchAuthor);

  try {
    const res = await fetch(`https://openlibrary.org/search.json?${params}`);
    const data = await res.json();

    for (const doc of data.docs ?? []) {
      if (!doc.cover_i) continue;
      if (isGoodMatch(searchTitle, searchAuthor, doc)) {
        return {
          url: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
          matchedTitle: doc.title,
          matchedAuthor: (doc.author_name || []).join(", "),
        };
      }
    }
    return null;
  } catch (e) {
    console.error(`  Error: ${e.message}`);
    return null;
  }
}

// --- main ---

const { data: resources, error } = await supabase
  .from("resources")
  .select("id, title, author, type, cover_url")
  .in("type", ["libro", "audiolibro"])
  .order("type");

if (error) { console.error(error); process.exit(1); }

console.log(`📚 Procesando ${resources.length} libros/audiolibros...\n`);

const sqlLines = [];
let found = 0, skipped = 0, missing = 0;

for (const r of resources) {
  if (r.cover_url) {
    console.log(`⏭  [ya tiene] ${r.title}`);
    skipped++;
    continue;
  }

  process.stdout.write(`🔍 ${r.title}... `);
  const result = await fetchCover(r.id, r.title, r.author);

  if (result) {
    console.log(`✅  → "${result.matchedTitle}" / ${result.matchedAuthor}`);
    sqlLines.push(`UPDATE resources SET cover_url = '${result.url}' WHERE id = '${r.id}';  -- ${r.title}`);
    found++;
  } else {
    console.log(`⚠️  no encontrada`);
    missing++;
  }

  await new Promise((res) => setTimeout(res, 300));
}

console.log(`\n✅ Encontradas: ${found}  ⏭  Ya tenían: ${skipped}  ⚠️  Sin portada: ${missing}`);

if (sqlLines.length > 0) {
  console.log("\n\n══════════════════════════════════════════════════");
  console.log("SQL — ejecutar en Supabase via MCP execute_sql");
  console.log("══════════════════════════════════════════════════\n");
  console.log(sqlLines.join("\n"));
}
