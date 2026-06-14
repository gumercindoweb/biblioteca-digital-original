// ============================================================
// SIDEBAR — Biblioteca Digital
// Diseño: Archivo Nocturno — navegación lateral persistente
// Categorías con numerales romanos + filtros por tipo
// ============================================================

import { useState } from "react";
import { categories, ResourceType, resourceTypeLabels } from "@/lib/data";
import { BookOpen, Headphones, Monitor, Youtube, Library, Search, X, Plus } from "lucide-react";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  libro: <BookOpen size={14} />,
  podcast: <Headphones size={14} />,
  plataforma: <Monitor size={14} />,
  youtube: <Youtube size={14} />,
};

interface SidebarProps {
  selectedCategory: string;
  selectedType: ResourceType | "todos";
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onTypeChange: (type: ResourceType | "todos") => void;
  onSearchChange: (q: string) => void;
  totalCount: number;
  onAddResource?: () => void;
}

export default function Sidebar({
  selectedCategory,
  selectedType,
  searchQuery,
  onCategoryChange,
  onTypeChange,
  onSearchChange,
  totalCount,
  onAddResource,
}: SidebarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  const allTypes: Array<{ id: ResourceType | "todos"; label: string }> = [
    { id: "todos", label: "Todos los tipos" },
    { id: "libro", label: "Libros" },
    { id: "podcast", label: "Podcasts" },
    { id: "plataforma", label: "Plataformas" },
    { id: "youtube", label: "YouTube" },
  ];

  return (
    <aside
      className="w-[220px] min-w-[220px] h-screen sticky top-0 flex flex-col overflow-y-auto"
      style={{
        background: "oklch(0.10 0.008 60)",
        borderRight: "1px solid oklch(0.20 0.008 60)",
      }}
    >
      {/* Logo + Nombre */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663762053854/aDtukih2ArR33vbrmSK4vF/biblioteca-logo-VLci4VmAnJ7BTo6JrEh2qR.webp"
            alt="Biblioteca Logo"
            className="w-8 h-8 object-contain"
          />
          <div>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C8922A", fontSize: "0.6rem" }}
            >
              Mi
            </p>
            <h1
              className="leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#F0E6D3",
              }}
            >
              Biblioteca
            </h1>
          </div>
        </div>
        <div className="amber-line-solid mt-3" />
      </div>

      {/* Buscador */}
      <div className="px-4 pb-4">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded"
          style={{
            background: "oklch(0.14 0.008 60)",
            border: `1px solid ${searchFocused ? "rgba(200,146,42,0.5)" : "oklch(0.22 0.008 60)"}`,
            transition: "border-color 180ms ease",
          }}
        >
          <Search size={13} style={{ color: "#8A7D6B" }} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#F0E6D3",
              fontSize: "0.8rem",
            }}
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")}>
              <X size={12} style={{ color: "#8A7D6B" }} />
            </button>
          )}
        </div>
      </div>

      {/* Categorías */}
      <nav className="flex-1 px-3">
        <p
          className="px-2 mb-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: "#8A7D6B",
            textTransform: "uppercase",
          }}
        >
          Estantes
        </p>

        <ul className="space-y-0.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => onCategoryChange(cat.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all"
                  style={{
                    background: isActive ? "rgba(200,146,42,0.10)" : "transparent",
                    borderLeft: isActive ? "2px solid #C8922A" : "2px solid transparent",
                    color: isActive ? "#C8922A" : "#8A7D6B",
                    fontSize: "0.82rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: isActive ? "#C8922A" : "oklch(0.38 0.008 60)",
                      minWidth: "16px",
                    }}
                  >
                    {cat.numeral}
                  </span>
                  <span className="truncate">{cat.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Separador */}
        <div className="amber-line-solid my-4" />

        {/* Filtro por tipo */}
        <p
          className="px-2 mb-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: "#8A7D6B",
            textTransform: "uppercase",
          }}
        >
          Tipo
        </p>

        <ul className="space-y-0.5">
          {allTypes.map((t) => {
            const isActive = selectedType === t.id;
            return (
              <li key={t.id}>
                <button
                  onClick={() => onTypeChange(t.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all"
                  style={{
                    background: isActive ? "rgba(200,146,42,0.10)" : "transparent",
                    borderLeft: isActive ? "2px solid #C8922A" : "2px solid transparent",
                    color: isActive ? "#C8922A" : "#8A7D6B",
                    fontSize: "0.8rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {t.id !== "todos" && (
                    <span style={{ color: isActive ? "#C8922A" : "#8A7D6B" }}>
                      {typeIcons[t.id as ResourceType]}
                    </span>
                  )}
                  {t.id === "todos" && (
                    <Library size={14} style={{ color: isActive ? "#C8922A" : "#8A7D6B" }} />
                  )}
                  <span>{t.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 mt-auto">
        <div className="amber-line-solid mb-3" />
        <button
          onClick={onAddResource}
          className="w-full flex items-center justify-center gap-2 py-2 rounded transition-all"
          style={{
            background: "rgba(200,146,42,0.10)",
            border: "1px solid rgba(200,146,42,0.3)",
            color: "#C8922A",
            fontSize: "0.78rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,146,42,0.18)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,146,42,0.10)";
          }}
        >
          <Plus size={14} />
          Agregar recurso
        </button>
        <p
          className="text-center mt-3"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "oklch(0.38 0.008 60)",
          }}
        >
          {totalCount} recursos en tu estante
        </p>
      </div>
    </aside>
  );
}
