// ============================================================
// RESOURCE CARD — Biblioteca Digital
// Diseño: Archivo Nocturno
// Tarjeta individual para libros, podcasts, YouTube, plataformas
// ============================================================

import { Resource, ResourceType, statusColors, statusLabels } from "@/lib/data";
import { BookOpen, Headphones, Monitor, Youtube, ExternalLink, Tag, FileText, Clock } from "lucide-react";
import { useNotes } from "@/contexts/NotesContext";
import { useStatus } from "@/contexts/StatusContext";
import { StatusSelector } from "./StatusSelector";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  libro: <BookOpen size={13} />,
  podcast: <Headphones size={13} />,
  plataforma: <Monitor size={13} />,
  youtube: <Youtube size={13} />,
};

const typeColors: Record<ResourceType, string> = {
  libro: "#C8922A",
  podcast: "#7B9E87",
  plataforma: "#6B8E9E",
  youtube: "#C0392B",
};

const typeBg: Record<ResourceType, string> = {
  libro: "rgba(200,146,42,0.12)",
  podcast: "rgba(123,158,135,0.12)",
  plataforma: "rgba(107,142,158,0.12)",
  youtube: "rgba(192,57,43,0.12)",
};

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export default function ResourceCard({ resource, index }: ResourceCardProps) {
  const { setSelectedResource, getResourceNotes } = useNotes();
  const { getResourceStatus } = useStatus();
  const notes = getResourceNotes(resource.id);
  const currentStatus = getResourceStatus(resource.id, resource.status);
  const hasNotes = notes.length > 0;
  const color = typeColors[resource.type];
  const bg = typeBg[resource.type];

  // Calcular estado de suscripción
  const getSubscriptionStatus = () => {
    if (!resource.subscription) return null;
    if (resource.subscription.expiresAt === "evergreen") return "evergreen";
    if (!resource.subscription.expiresAt) return null;
    
    const expiryDate = new Date(resource.subscription.expiresAt);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return "expired";
    if (daysUntilExpiry <= 30) return "expiring-soon";
    return "active";
  };

  const subscriptionStatus = getSubscriptionStatus();

  return (
    <div
      className="resource-card p-4 animate-fade-slide-up cursor-pointer transition-all hover:shadow-lg hover:border-amber-600/50"
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={() => setSelectedResource(resource)}
    >
      {/* Indicadores de notas y suscripción */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {hasNotes && (
          <div className="flex items-center gap-1 text-amber-600">
            <FileText size={13} />
            <span className="text-xs font-medium">{notes.length} nota{notes.length > 1 ? "s" : ""}</span>
          </div>
        )}
        {subscriptionStatus && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            subscriptionStatus === "evergreen" ? "text-green-600" :
            subscriptionStatus === "expiring-soon" ? "text-orange-500" :
            subscriptionStatus === "expired" ? "text-red-500" : "text-blue-500"
          }`}>
            <Clock size={13} />
            {subscriptionStatus === "evergreen" ? "Acceso ilimitado" :
             subscriptionStatus === "expiring-soon" ? `Vence: ${resource.subscription?.expiresAt}` :
             subscriptionStatus === "expired" ? "Vencida" : "Activa"}
          </div>
        )}
      </div>

      {/* Header de la tarjeta */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Badge de tipo */}
          <span
            className="type-badge flex items-center gap-1"
            style={{
              color,
              borderColor: `${color}40`,
              background: bg,
            }}
          >
            {typeIcons[resource.type]}
            {resource.type === "libro"
              ? "Libro"
              : resource.type === "podcast"
              ? "Podcast"
              : resource.type === "plataforma"
              ? "Plataforma"
              : "YouTube"}
          </span>

          {/* Selector de estado */}
          <div onClick={(e) => e.stopPropagation()}>
            <StatusSelector resourceId={resource.id} currentStatus={currentStatus} />
          </div>
        </div>

        {/* Enlace externo */}
        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-1 rounded transition-colors"
            style={{ color: "#8A7D6B" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#C8922A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8A7D6B")}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Título */}
      <h3
        className="mb-1 leading-snug"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#F0E6D3",
          lineHeight: 1.3,
        }}
      >
        {resource.title}
      </h3>

      {/* Autor */}
      {resource.author && (
        <p
          className="mb-2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            color: "#C8922A",
            fontStyle: "italic",
          }}
        >
          {resource.author}
        </p>
      )}

      {/* Descripción */}
      {resource.description && (
        <p
          className="mb-3 leading-relaxed"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "#8A7D6B",
            lineHeight: 1.55,
          }}
        >
          {resource.description}
        </p>
      )}

      {/* Tags */}
      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2" style={{ borderTop: "1px solid oklch(0.18 0.008 60)" }}>
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                color: "oklch(0.45 0.008 60)",
                letterSpacing: "0.04em",
              }}
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
