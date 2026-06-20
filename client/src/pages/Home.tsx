// ============================================================
// HOME — Gumercindo Jiménez Brand System
// Editorial luxury: ivory page · deep green header · brass detail
// ============================================================

import { useState, useMemo, useCallback } from "react";
import { resources as initialResources, categories, Resource, ResourceType, Category, Status, statusLabels, statusColors, podcastTemas, PodcastTema } from "@/lib/data";
import { useStatus } from "@/contexts/StatusContext";
import Sidebar from "@/components/Sidebar";
import ResourceCard from "@/components/ResourceCard";
import AddResourceModal from "@/components/AddResourceModal";
import { BookOpen, Headphones, Monitor, Youtube, Grid3X3, List, Star, Volume2, Film } from "lucide-react";
import { nanoid } from "nanoid";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  libro:      <BookOpen size={14} />,
  podcast:    <Headphones size={14} />,
  audiolibro: <Volume2 size={14} />,
  documental: <Film size={14} />,
  plataforma: <Monitor size={14} />,
  youtube:    <Youtube size={14} />,
};

const bookStatusLabels: Record<Status, string> = {
  "en-cola": "Por leer",
  "leyendo": "Leyendo",
  "completado": "Leído",
};

/* ---- tokens ---- */
const FONT_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
const FONT_UI      = "'Hanken Grotesk', system-ui, sans-serif";
const FONT_SERIF   = "'Spectral', Georgia, serif";
const IVORY        = "#F8F5EE";
const INK          = "#221F17";
const EARTH        = "#897F66";
const KHAKI        = "#B2A789";
const SAND         = "#E5DDCC";
const GOLD         = "#B89455";
const GREEN        = "#11503D";
const GREEN_HOVER  = "#166B4F";

export default function Home() {
  const { resourceStatuses } = useStatus();
  const [allResources, setAllResources]     = useState<Resource[]>(initialResources);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedType, setSelectedType]     = useState<ResourceType | "todos">("todos");
  const [selectedStatus, setSelectedStatus] = useState<Status | "todos">("todos");
  const [searchQuery, setSearchQuery]       = useState("");
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [viewMode, setViewMode]             = useState<"grid" | "list">("grid");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [selectedTema, setSelectedTema] = useState<PodcastTema | "todos">("todos");

  // Reset tema filter when leaving podcast view
  const handleTypeChange = useCallback((type: ResourceType | "todos") => {
    setSelectedType(type);
    if (type !== "podcast") setSelectedTema("todos");
  }, []);

  const filteredResources = useMemo(() => {
    return allResources.filter((r) => {
      const matchCat    = selectedCategory === "todos" || r.category === selectedCategory;
      const matchType   = selectedType === "todos" || r.type === selectedType;
      const currentStatus = resourceStatuses[r.id] || r.status;
      const matchStatus = selectedStatus === "todos" || currentStatus === selectedStatus;
      const matchSearch = !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.author?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (r.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);
      const matchFeatured = !showOnlyFeatured || r.featured;
      const matchTema = selectedTema === "todos" || r.tema === selectedTema;
      return matchCat && matchType && matchStatus && matchSearch && matchFeatured && matchTema;
    });
  }, [allResources, selectedCategory, selectedType, selectedStatus, searchQuery, resourceStatuses, showOnlyFeatured, selectedTema]);

  const activeCat: Category | undefined = categories.find((c) => c.id === selectedCategory);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { libro: 0, podcast: 0, audiolibro: 0, documental: 0, plataforma: 0, youtube: 0 };
    filteredResources.forEach((r) => { counts[r.type] = (counts[r.type] || 0) + 1; });
    return counts;
  }, [filteredResources]);

  const handleAddResource = useCallback(
    (data: Omit<Resource, "id">) => {
      const newResource: Resource = { ...data, id: nanoid(), status: data.status || "en-cola" };
      setAllResources((prev) => [...prev, newResource]);
    },
    []
  );

  return (
    <div className="flex min-h-screen" style={{ background: IVORY }}>

      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onTypeChange={handleTypeChange}
        onSearchChange={setSearchQuery}
        totalCount={allResources.length}
        onAddResource={() => setIsModalOpen(true)}
      />

      {/* Área principal */}
      <main className="flex-1 min-w-0 flex flex-col">

        {/* ── Header editorial ── */}
        <div
          className="relative px-8 pt-10 pb-7 overflow-hidden"
          style={{
            background: "#FFFFFF",
            borderBottom: `1px solid ${SAND}`,
          }}
        >
          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span style={{ width: 26, height: 2, background: GOLD, opacity: 0.65, flex: "none" }} />
              <p style={{
                fontFamily: FONT_UI,
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: GOLD,
              }}>
                {activeCat?.numeral} — Estante
              </p>
            </div>

            {/* Título de categoría */}
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "2.4rem",
              fontWeight: 600,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}>
              {activeCat?.name || "Todos los recursos"}
            </h2>

            {/* Regla brass */}
            <div className="gold-rule mb-5" style={{ width: "80px" }} />

            {/* Badge "en recopilación" — categoría o tipo documental */}
            {(activeCat?.note || selectedType === "documental") && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded mb-4"
                style={{
                  background: "rgba(91,74,138,0.08)",
                  border: "1px solid rgba(91,74,138,0.35)",
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#5B4A8A", flex: "none",
                  animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                }} />
                <span style={{
                  fontFamily: FONT_UI,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#5B4A8A",
                }}>
                  {activeCat?.note ?? "En recopilación — sumando material a medida que lo descubro"}
                </span>
              </div>
            )}

            {/* Contadores por tipo */}
            <div className="flex flex-wrap gap-5 mb-5">
              {(Object.entries(typeCounts) as [ResourceType, number][])
                .filter(([, count]) => count > 0)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <span style={{ color: GOLD }}>{typeIcons[type]}</span>
                    <span style={{
                      fontFamily: FONT_UI,
                      fontSize: "0.7rem",
                      color: EARTH,
                      letterSpacing: "0.02em",
                    }}>
                      {count} {type === "libro" ? "libros"
                        : type === "podcast" ? "podcasts"
                        : type === "audiolibro" ? "audiolibros"
                        : type === "documental" ? "documentales"
                        : type === "plataforma" ? "plataformas"
                        : "canales"}
                    </span>
                  </div>
                ))}
              {filteredResources.length === 0 && (
                <span style={{ fontFamily: FONT_SERIF, fontSize: "0.82rem", fontStyle: "italic", color: KHAKI }}>
                  Sin resultados
                </span>
              )}
            </div>

            {/* Aviso informativo — solo plataformas */}
            {selectedType === "plataforma" && (
              <div className="flex items-start gap-3 mb-4 px-3 py-2.5 rounded" style={{
                background: "rgba(166,132,63,0.06)",
                border: "1px solid rgba(166,132,63,0.22)",
              }}>
                <span style={{ color: GOLD, marginTop: 1, flex: "none" }}>
                  <Monitor size={13} />
                </span>
                <div>
                  <p style={{
                    fontFamily: FONT_UI, fontSize: "0.67rem", fontWeight: 600,
                    color: GOLD, letterSpacing: "0.06em", textTransform: "uppercase",
                    marginBottom: 3,
                  }}>
                    Acceso por suscripción
                  </p>
                  <p style={{
                    fontFamily: FONT_SERIF, fontSize: "0.75rem", color: EARTH, lineHeight: 1.55,
                  }}>
                    Estas plataformas requieren suscripción mensual, anual o acceso vitalicio (pago único). Los recursos marcados como <strong style={{ fontStyle: "normal", color: GOLD }}>Enlace de afiliado</strong> incluyen mi código de referido. Si te suscribís a través de estos enlaces, yo recibo una comisión sin costo adicional para vos — algunos pueden incluir descuentos especiales para vos como beneficio extra.
                  </p>
                </div>
              </div>
            )}

            {/* Filtro por estado — oculto en plataformas */}
            {selectedType !== "plataforma" && (
            <div className="flex flex-wrap gap-2 mb-3">
              {(["todos", "en-cola", "leyendo", "completado"] as (Status | "todos")[]).map((status) => {
                const active = selectedStatus === status;
                const color  = status === "todos" ? GREEN : statusColors[status as Status];
                const label = status === "todos"
                  ? "Todos"
                  : selectedType === "libro"
                    ? bookStatusLabels[status as Status]
                    : statusLabels[status as Status];
                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status as Status | "todos")}
                    className="px-3 py-1.5 rounded-full text-xs transition-all"
                    style={{
                      fontFamily: FONT_UI,
                      fontWeight: active ? 600 : 500,
                      fontSize: "0.68rem",
                      letterSpacing: "0.04em",
                      backgroundColor: active ? `${color}12` : "transparent",
                      color: active ? color : KHAKI,
                      border: `1px solid ${active ? `${color}50` : `${SAND}`}`,
                      transition: "all 160ms ease",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            )}

            {/* Filtro de temas — solo visible en Podcasts */}
            {selectedType === "podcast" && (
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={() => setSelectedTema("todos")}
                  className="px-3 py-1 rounded-full text-xs transition-all"
                  style={{
                    fontFamily: FONT_UI,
                    fontWeight: selectedTema === "todos" ? 600 : 500,
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    backgroundColor: selectedTema === "todos" ? `${EARTH}18` : "transparent",
                    color: selectedTema === "todos" ? EARTH : KHAKI,
                    border: `1px solid ${selectedTema === "todos" ? `${EARTH}50` : SAND}`,
                  }}
                >
                  Todos los temas
                </button>
                {podcastTemas.map((t) => {
                  const active = selectedTema === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTema(active ? "todos" : t.id)}
                      className="px-3 py-1 rounded-full text-xs transition-all"
                      style={{
                        fontFamily: FONT_UI,
                        fontWeight: active ? 600 : 500,
                        fontSize: "0.65rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        backgroundColor: active ? `${t.color}15` : "transparent",
                        color: active ? t.color : KHAKI,
                        border: `1px solid ${active ? `${t.color}55` : SAND}`,
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Filtro destacados */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all"
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: showOnlyFeatured ? 600 : 500,
                  fontSize: "0.68rem",
                  letterSpacing: "0.04em",
                  backgroundColor: showOnlyFeatured ? `${GOLD}12` : "transparent",
                  color: showOnlyFeatured ? GOLD : KHAKI,
                  border: `1px solid ${showOnlyFeatured ? `${GOLD}50` : SAND}`,
                }}
              >
                <Star size={11} fill={showOnlyFeatured ? "currentColor" : "none"} />
                Destacados
              </button>
            </div>
          </div>

          {/* Controles de vista */}
          <div className="absolute right-8 bottom-6 flex items-center gap-1.5">
            <button
              onClick={() => setViewMode("grid")}
              className="p-1.5 rounded transition-colors"
              style={{ color: viewMode === "grid" ? GREEN : KHAKI }}
            >
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-1.5 rounded transition-colors"
              style={{ color: viewMode === "list" ? GREEN : KHAKI }}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* ── Grid de tarjetas ── */}
        <div className="flex-1 p-8" style={{ background: IVORY }}>
          {filteredResources.length > 0 ? (
            <div
              className={viewMode === "grid" ? "grid gap-4" : "flex flex-col gap-3"}
              style={viewMode === "grid"
                ? { gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))" }
                : {}}
            >
              {filteredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          ) : (
            /* ── Estado vacío ── */
            <div className="flex flex-col items-center justify-center py-28">
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#EAF2EE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}>
                <BookOpen size={28} style={{ color: GREEN, opacity: 0.5 }} />
              </div>
              <p style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: KHAKI,
                marginBottom: "8px",
              }}>
                Este estante está vacío
              </p>
              <p style={{
                fontFamily: FONT_UI,
                fontSize: "0.75rem",
                color: KHAKI,
                letterSpacing: "0.02em",
                marginBottom: "24px",
              }}>
                Agrega tu primer recurso a esta categoría
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 rounded transition-all"
                style={{
                  background: GREEN,
                  border: `1px solid ${GREEN}`,
                  color: IVORY,
                  fontFamily: FONT_UI,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = GREEN_HOVER)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = GREEN)}
              >
                Agregar recurso
              </button>
            </div>
          )}
        </div>
      </main>

      <AddResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddResource}
      />
    </div>
  );
}
