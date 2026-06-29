// Script para sembrar Supabase con todos los recursos de data.ts
// Uso: node scripts/seed-supabase.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Leer .env.local manualmente
const envPath = path.join(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf-8");
const envVars = Object.fromEntries(
  env.split("\n").filter(Boolean).map((l) => l.split("="))
);

const supabase = createClient(
  envVars["VITE_SUPABASE_URL"],
  envVars["VITE_SUPABASE_ANON_KEY"]
);

// Importar recursos desde data.ts compilado (leer como texto y evaluar)
const dataPath = path.join(__dirname, "../client/src/lib/data.ts");
let dataContent = readFileSync(dataPath, "utf-8");

// Extraer el array de resources usando regex
const match = dataContent.match(/export const resources: Resource\[\] = (\[[\s\S]*?\])\s*;?\s*$/m);

if (!match) {
  console.error("No se pudo extraer resources de data.ts");
  process.exit(1);
}

// Usamos dynamic import con vite bundle en su lugar — mejor hacer un JSON export
console.log("Leyendo recursos desde data.ts...");

// Parsear usando el CLI de node con tsx
import { execSync } from "child_process";

const resourcesJson = execSync(
  `node --input-type=module --no-warnings <<'NODEEOF'
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import { resources } from '${path.join(__dirname, "../client/src/lib/data.ts")}';
console.log(JSON.stringify(resources));
NODEEOF`,
  { encoding: "utf-8" }
);

const resources = JSON.parse(resourcesJson);
console.log(`Total recursos a insertar: ${resources.length}`);

// Mapear recursos al formato de la tabla
const rows = resources.map((r) => ({
  id: r.id,
  title: r.title,
  author: r.author || null,
  description: r.description || null,
  type: r.type,
  category: r.category,
  status: r.status,
  url: r.url || null,
  tags: r.tags || [],
  featured: r.featured || false,
  tema: r.tema || null,
  affiliate: r.affiliate || false,
  platform_type: r.platformType || null,
  subscription_expires_at: r.subscription?.expiresAt || null,
  subscription_is_active: r.subscription?.isActive || null,
  modules: r.modules ? JSON.stringify(r.modules) : null,
}));

// Insertar en lotes de 50
const BATCH = 50;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const { error } = await supabase
    .from("resources")
    .upsert(batch, { onConflict: "id" });

  if (error) {
    console.error(`Error en batch ${i}-${i + BATCH}:`, error.message);
  } else {
    console.log(`✅ Insertados ${Math.min(i + BATCH, rows.length)}/${rows.length}`);
  }
}

console.log("\n🎉 Seed completado!");
