// Busca portadas en Open Library API y las guarda en Supabase
// Uso: node scripts/fetch-covers.mjs

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

// Títulos alternativos en inglés para libros que pueden no estar en español en Open Library
const TITLE_OVERRIDES = {
  "influencia": { title: "Influence", author: "Robert Cialdini" },
  "mindset": { title: "Mindset", author: "Carol Dweck" },
  "oversubscribed": { title: "Oversubscribed", author: "Daniel Priestley" },
  "12-reglas-vida": { title: "12 Rules for Life", author: "Jordan Peterson" },
  "generacion-dopamina": { title: "Dopamine Nation", author: "Anna Lembke" },
  "estrategia-conflicto": { title: "The Strategy of Conflict", author: "Thomas Schelling" },
  "fiesta-cocteles": { title: "The 2-Hour Cocktail Party", author: "Nick Gray" },
  "disena-tu-vida": { title: "Designing Your Life", author: "Dave Evans Bill Burnett" },
  "montana-eres-tu": { title: "The Mountain Is You", author: "Brianna Wiest" },
  "hombre-simbolos": { title: "Man and His Symbols", author: "Carl Jung" },
  "audiolibro-rick-rubin-acto-de-crear": { title: "The Creative Act", author: "Rick Rubin" },
  "audiolibro-malcolm-gladwell-inteligencia-intuitiva": { title: "Blink", author: "Malcolm Gladwell" },
  "audiolibro-brian-tracy-tragese-el-sapo": { title: "Eat That Frog", author: "Brian Tracy" },
  "audiolibro-simon-sinek-empieza-con-el-porque": { title: "Start With Why", author: "Simon Sinek" },
  "audiolibro-kahneman-pensar-rapido-despacio": { title: "Thinking Fast and Slow", author: "Daniel Kahneman" },
  "quien-no-como": { title: "Who Not How", author: "Dan Sullivan" },
  "10-es-mas-facil-que-2": { title: "10x Is Easier Than 2x", author: "Dan Sullivan" },
  "podcast-napoleon-hill-burlando-diablo": { title: "Outwitting the Devil", author: "Napoleon Hill" },
  "audiolibro-como-argumentar-como-abogado": { title: "Thank You for Arguing", author: "Jay Heinrichs" },
  "cabala-mistica": { title: "The Mystical Qabalah", author: "Dion Fortune" },
  "hiperdexconexion": { title: "Hiperdexconexion", author: "Marta Romo" },
  "puedes-negociar-cualquier-cosa": { title: "You Can Negotiate Anything", author: "Herb Cohen" },
  "secretos-mente-millonaria": { title: "Secrets of the Millionaire Mind", author: "T. Harv Eker" },
  "problema-dinero-eres-tu": { title: "You Are a Badass at Making Money", author: "Jen Sincero" },
  "aprendiendo-mejores": { title: "Aprendiendo de los mejores", author: "Francisco Alcaide" },
  "zonas-erroneas": { title: "Your Erroneous Zones", author: "Wayne Dyer" },
  "21-creencias-amargan-vida": { title: "21 creencias que te amargan la vida", author: "Rafael Santandreu" },
};

async function fetchCover(id, title, author) {
  const override = TITLE_OVERRIDES[id];
  const searchTitle = override?.title ?? title;
  const searchAuthor = override?.author ?? author ?? "";

  const params = new URLSearchParams({
    title: searchTitle,
    limit: "1",
    fields: "cover_i,title,author_name",
  });
  if (searchAuthor) params.set("author", searchAuthor);

  try {
    const res = await fetch(`https://openlibrary.org/search.json?${params}`);
    const data = await res.json();
    const doc = data.docs?.[0];
    if (!doc?.cover_i) return null;
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
  } catch (e) {
    console.error(`  Error: ${e.message}`);
    return null;
  }
}

const { data: resources, error } = await supabase
  .from("resources")
  .select("id, title, author, type, cover_url")
  .in("type", ["libro", "audiolibro"])
  .order("type");

if (error) { console.error(error); process.exit(1); }

console.log(`📚 Buscando portadas para ${resources.length} recursos...\n`);

let found = 0, missing = 0;

for (const r of resources) {
  if (r.cover_url) {
    console.log(`⏭  ${r.title} — ya tiene portada`);
    continue;
  }

  process.stdout.write(`🔍 ${r.title}... `);
  const coverUrl = await fetchCover(r.id, r.title, r.author);

  if (coverUrl) {
    const { error: updateError } = await supabase
      .from("resources")
      .update({ cover_url: coverUrl })
      .eq("id", r.id);

    if (updateError) {
      console.log(`❌ ${updateError.message}`);
    } else {
      console.log(`✅`);
      found++;
    }
  } else {
    console.log(`⚠️  No encontrada`);
    missing++;
  }

  await new Promise((r) => setTimeout(r, 200));
}

console.log(`\n✅ Portadas encontradas: ${found}`);
console.log(`⚠️  Sin portada: ${missing}`);
