import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf-8");
const envVars = Object.fromEntries(
  env.split("\n").filter((l) => l.includes("=")).map((l) => {
    const idx = l.indexOf("=");
    return [l.slice(0, idx), l.slice(idx + 1)];
  })
);

const supabase = createClient(
  envVars["VITE_SUPABASE_URL"],
  envVars["VITE_SUPABASE_ANON_KEY"]
);

const dataPath = path.join(__dirname, "../client/src/lib/data.ts");
const resourcesJson = execSync(
  `node --input-type=module --no-warnings -e "import { resources } from '${dataPath}'; console.log(JSON.stringify(resources));"`,
  { encoding: "utf-8" }
);

const resources = JSON.parse(resourcesJson);
console.log(`Insertando ${resources.length} recursos...`);

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
  subscription_is_active: r.subscription?.isActive !== undefined ? r.subscription.isActive : null,
  modules: r.modules ? r.modules : null,
}));

const BATCH = 50;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const { error } = await supabase.from("resources").upsert(batch, { onConflict: "id" });
  if (error) {
    console.error(`Error en lote ${i}:`, error.message);
  } else {
    console.log(`✅ ${Math.min(i + BATCH, rows.length)}/${rows.length} recursos insertados`);
  }
}

console.log("\n🎉 Seed completado!");
