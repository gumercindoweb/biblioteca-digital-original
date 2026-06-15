// ============================================================
// HOME — Biblioteca Digital
// Diseño: Archivo Nocturno
// Layout: Sidebar fijo + área principal con grid de tarjetas
// ============================================================

import { useState, useMemo, useCallback } from "react";
import { resources as initialResources, categories, Resource, ResourceType, Category, Status, statusLabels, statusColors } from "@/lib/data";
import { useStatus } from "@/contexts/StatusContext";
import Sidebar from "@/components/Sidebar";
import ResourceCard from "@/components/ResourceCard";
import AddResourceModal from "@/components/AddResourceModal";
import { BookOpen, Headphones, Monitor, Youtube, Grid3X3, List, Star } from "lucide-react";
import { nanoid } from "nanoid";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  libro: <BookOpen size={16} />,
  podcast: <Headphones size={16} />,
  plataforma: <Monitor size={16} />,
  youtube: <Youtube size={16} />,
};

export default function Home() {
  const { resourceStatuses } = useStatus();
  const [allResources, setAllResources] = useState<Resource[]>(initialResources);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedType, setSelectedType] = useState<ResourceType | "todos">("todos");
  const [selectedStatus, setSelectedStatus] = useState<Status | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  // Filtrado de recursos
  const filteredResources = useMemo(() => {
    return allResources.filter((r) => {
      const matchCat = selectedCategory === "todos" || r.category === selectedCategory;
      const matchType = selectedType === "todos" || r.type === selectedType;
      const currentStatus = resourceStatuses[r.id] || r.status;
      const matchStatus = selectedStatus === "todos" || currentStatus === selectedStatus;
      const matchSearch =
        !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.author?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (r.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (r.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);
      const matchFeatured = !showOnlyFeatured || r.featured;
      return matchCat && matchType && matchStatus && matchSearch && matchFeatured;
    });
  }, [allResources, selectedCategory, selectedType, selectedStatus, searchQuery, resourceStatuses, showOnlyFeatured]);

  // Categoría activa
  const activeCat: Category | undefined = categories.find((c) => c.id === selectedCategory);

  // Conteo por tipo en la vista actual
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { libro: 0, podcast: 0, plataforma: 0, youtube: 0 };
    filteredResources.forEach((r) => { counts[r.type] = (counts[r.type] || 0) + 1; });
    return counts;
  }, [filteredResources]);

  const handleAddResource = useCallback(
    (data: Omit<Resource, "id">) => {
      const newResource: Resource = {
        ...data,
        id: nanoid(),
        status: data.status || "en-cola",
      };
      setAllResources((prev) => [...prev, newResource]);
    },
    []
  );

  return (
    <div className="flex min-h-screen" style={{ background: "oklch(0.09 0.008 60)" }}>
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchQuery}
        totalCount={allResources.length}
        onAddResource={() => setIsModalOpen(true)}
      />

      {/* Área principal */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Hero header con imagen de fondo */}
        <div
          className="relative px-8 pt-10 pb-8 overflow-hidden"
          style={{
            background: "oklch(0.10 0.008 60)",
            borderBottom: "1px solid oklch(0.18 0.008 60)",
          }}
        >
          {/* Imagen decorativa de fondo */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663762053854/aDtukih2ArR33vbrmSK4vF/biblioteca-hero-Q2NQkM5SLCUAuUzGUUHmCu.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div className="relative z-10">
            {/* Numeral de categoría */}
            <p
              className="mb-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#C8922A",
                textTransform: "uppercase",
              }}
            >
              {activeCat?.numeral} — Estante
            </p>

            {/* Título de categoría */}
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.2rem",
                fontWeight: 700,
                color: "#F0E6D3",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {activeCat?.name || "Todos los recursos"}
            </h2>

            {/* Línea dorada */}
            <div className="amber-line mt-3 mb-4" style={{ width: "120px" }} />

            {/* Contadores por tipo */}
            <div className="flex flex-wrap gap-4 mb-4">
              {(Object.entries(typeCounts) as [ResourceType, number][])
                .filter(([, count]) => count > 0)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <span style={{ color: "#C8922A" }}>{typeIcons[type]}</span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        color: "#8A7D6B",
                      }}
                    >
                      {count} {type === "libro" ? "libros" : type === "podcast" ? "podcasts" : type === "plataforma" ? "plataformas" : "canales"}
                    </span>
                  </div>
                ))}
              {filteredResources.length === 0 && (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#8A7D6B" }}>
                  Sin resultados
                </span>
              )}
            </div>

            {/* Filtro por estado */}
            <div className="flex flex-wrap gap-2 mb-3">
              {(["todos", "en-cola", "leyendo", "completado"] as (Status | "todos")[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status as Status | "todos")}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                  style={{
                    backgroundColor: selectedStatus === status ? `${status === "todos" ? "#C8922A" : statusColors[status as Status]}20` : "transparent",
                    color: selectedStatus === status ? (status === "todos" ? "#C8922A" : statusColors[status as Status]) : "#8A7D6B",
                    border: `1px solid ${selectedStatus === status ? (status === "todos" ? "#C8922A" : statusColors[status as Status]) : "#8A7D6B"}40`,
                  }}
                >
                  {status === "todos" ? "Todos" : statusLabels[status as Status]}
                </button>
              ))}
            </div>

            {/* Filtro de destacados */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                  backgroundColor: showOnlyFeatured ? "#FFD70020" : "transparent",
                  color: showOnlyFeatured ? "#FFD700" : "#8A7D6B",
                  border: `1px solid ${showOnlyFeatured ? "#FFD700" : "#8A7D6B"}40`,
                }}
              >
                <Star size={13} fill={showOnlyFeatured ? "currentColor" : "none"} />
                Destacados
              </button>
            </div>
          </div>

          {/* Controles de vista */}
          <div className="absolute right-8 bottom-6 flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className="p-1.5 rounded transition-colors"
              style={{ color: viewMode === "grid" ? "#C8922A" : "#8A7D6B" }}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-1.5 rounded transition-colors"
              style={{ color: viewMode === "list" ? "#C8922A" : "#8A7D6B" }}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Contenido: Grid de tarjetas */}
        <div className="flex-1 p-8">
          {filteredResources.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-4"
                  : "flex flex-col gap-3"
              }
              style={
                viewMode === "grid"
                  ? { gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }
                  : {}
              }
            >
              {filteredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          ) : (
            /* Estado vacío */
            <div className="flex flex-col items-center justify-center py-24">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663762053854/aDtukih2ArR33vbrmSK4vF/biblioteca-books-Mat7A32KUfYudumFjXDnaR.webp"
                alt="Estante vacío"
                className="w-32 h-24 object-cover rounded mb-6 opacity-30"
                style={{ filter: "grayscale(0.5)" }}
              />
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "oklch(0.38 0.008 60)",
                  fontStyle: "italic",
                }}
              >
                Este estante está vacío
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "oklch(0.32 0.008 60)",
                  marginTop: "8px",
                }}
              >
                Agrega tu primer recurso a esta categoría
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 px-5 py-2.5 rounded transition-all"
                style={{
                  background: "rgba(200,146,42,0.12)",
                  border: "1px solid rgba(200,146,42,0.3)",
                  color: "#C8922A",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                }}
              >
                Agregar recurso
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal para agregar recursos */}
      <AddResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddResource}
      />
    </div>
  );
}
