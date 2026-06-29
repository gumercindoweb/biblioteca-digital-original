// ============================================================
// RESOURCE CARD — Gumercindo Jiménez Brand System
// Con miniaturas: YouTube (directo) · Canales · Plataformas
// ============================================================

import { useState } from "react";
import { Resource, ResourceType, statusColors, statusLabels, resourceTypeLabels } from "@/lib/data";
import {
  BookOpen, Headphones, Monitor, Youtube,
  ExternalLink, Tag, FileText, Clock, Star, Play, X, Link, GraduationCap, Layers,
} from "lucide-react";
import { useNotes } from "@/contexts/NotesContext";
import { useStatus } from "@/contexts/StatusContext";
import { StatusSelector } from "./StatusSelector";
import { useThumbnail } from "@/hooks/useThumbnail";

/* ── helpers ─────────────────────────────────────────────── */
function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return m?.[1] ?? null;
}

function isYouTubeChannel(url?: string): boolean {
  if (!url) return false;
  return /youtube\.com\/(@|c\/|channel\/|user\/)/.test(url);
}

/* ── mini video modal ─────────────────────────────────────── */
function VideoModal({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,46,37,0.70)", backdropFilter: "blur(4px)" }}
      />
      <div
        className="relative z-10 w-full max-w-2xl mx-4 rounded overflow-hidden"
        style={{ border: "1px solid #E5DDCC", boxShadow: "0 40px 90px -30px rgba(10,46,37,0.45)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#0A2E25", borderBottom: "1px solid rgba(248,245,238,0.12)" }}
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span style={{ width: 16, height: 1.5, background: "#B89455", opacity: 0.65, flex: "none" }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#F8F5EE",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {title}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ color: "rgba(248,245,238,0.45)", marginLeft: 10, flex: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#B89455")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(248,245,238,0.45)")}
          >
            <X size={18} />
          </button>
        </div>
        <div style={{ background: "#000", paddingBottom: "56.25%", height: 0, position: "relative" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── thumbnail section ─────────────────────────────────────── */
function CardThumbnail({ resource, onPlayClick }: { resource: Resource; onPlayClick: () => void }) {
  const [thumbError, setThumbError] = useState(false);

  const videoId = (resource.type === "podcast" || resource.type === "audiolibro" || resource.type === "documental")
    ? getYouTubeId(resource.url)
    : resource.type === "curso" && resource.modules && resource.modules.length > 0
    ? resource.modules[0].videoId
    : null;

  // For YouTube channels and platforms, fetch og:image via server proxy
  const needsProxy = !videoId && (resource.type === "youtube" || resource.type === "plataforma");
  const { thumbnail: ogImage, loading } = useThumbnail(needsProxy ? resource.url : undefined);

  /* — Podcast: YouTube video thumbnail — */
  if (videoId) {
    const ytThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return (
      <div
        className="relative overflow-hidden group"
        style={{ height: 160, background: "#0A2E25", marginBottom: 0 }}
      >
        {!thumbError ? (
          <img
            src={ytThumb}
            alt="Miniatura del video"
            onError={() => setThumbError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Youtube size={32} style={{ color: "rgba(248,245,238,0.25)" }} />
          </div>
        )}
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,46,37,0.55) 0%, transparent 55%)" }}
        />
        {/* Módulos badge — solo para cursos */}
        {resource.type === "curso" && resource.modules && (
          <div style={{
            position: "absolute", top: 8, right: 8,
            background: "rgba(10,46,37,0.80)",
            backdropFilter: "blur(4px)",
            borderRadius: 999,
            padding: "3px 10px",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <Layers size={10} style={{ color: "#B89455" }} />
            <span style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "0.6rem", fontWeight: 600,
              color: "#F8F5EE", letterSpacing: "0.05em",
            }}>
              {resource.modules.length} módulos
            </span>
          </div>
        )}
        {/* Play button — abre modal de notas directamente */}
        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onPlayClick(); }}
        >
          <div style={{
            width: 44, height: 44,
            borderRadius: "50%",
            background: "rgba(184,148,85,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            transition: "transform 150ms ease",
          }}>
            <Play size={18} fill="#F8F5EE" style={{ color: "#F8F5EE", marginLeft: 2 }} />
          </div>
        </button>
      </div>
    );
  }

  /* — Libro con portada — */
  if ((resource.type === "libro" || resource.type === "audiolibro") && resource.coverUrl) {
    return (
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: 180, background: "#0E3B2E", marginBottom: 0 }}
      >
        <img
          src={resource.coverUrl}
          alt={`Portada de ${resource.title}`}
          style={{
            height: "100%",
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
          }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,46,37,0.4) 0%, transparent 60%)" }}
        />
      </div>
    );
  }

  /* — YouTube channel — */
  if (resource.type === "youtube") {
    return (
      <div
        className="relative overflow-hidden flex items-center gap-3 px-4"
        style={{ height: 72, background: "#0E3B2E", marginBottom: 0 }}
      >
        {/* og:image de fondo si existe */}
        {ogImage && !loading && (
          <img
            src={ogImage}
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: 0.18,
            }}
            onError={() => {}}
          />
        )}
        {/* Loading shimmer */}
        {loading && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 25%, rgba(248,245,238,0.04) 50%, transparent 75%)",
            animation: "shimmer 1.4s infinite",
            backgroundSize: "200% 100%",
          }} />
        )}
        <div
          className="relative flex items-center justify-center flex-shrink-0"
          style={{
            width: 38, height: 38,
            borderRadius: "50%",
            background: "rgba(184,148,85,0.15)",
            border: "1px solid rgba(184,148,85,0.3)",
          }}
        >
          {ogImage && !loading ? (
            <img
              src={ogImage}
              alt=""
              style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <Youtube size={18} style={{ color: "#B89455" }} />
          )}
        </div>
        <div className="relative min-w-0">
          <p style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#B89455",
            marginBottom: 2,
          }}>
            Canal de YouTube
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "#F8F5EE",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {resource.title}
          </p>
        </div>
      </div>
    );
  }

  /* — Plataforma: og:image o favicon — */
  if (resource.type === "plataforma" && resource.url) {
    let domain = "";
    try {
      const hostname = new URL(resource.url).hostname;
      const parts = hostname.split(".");
      domain = parts.length > 2 ? parts.slice(-2).join(".") : hostname;
    } catch {}
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    return (
      <div
        className="relative overflow-hidden"
        style={{ height: 110, background: "#EAF2EE", marginBottom: 0 }}
      >
        {loading ? (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, #EAF2EE 25%, #D8EBE2 50%, #EAF2EE 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }} />
        ) : ogImage ? (
          <>
            <img
              src={ogImage}
              alt={`Vista previa de ${resource.title}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(17,80,61,0.35) 0%, transparent 60%)",
            }} />
          </>
        ) : (
          /* Fallback: favicon + domain */
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <img
              src={faviconUrl}
              alt=""
              style={{ width: 32, height: 32, borderRadius: 6 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
            />
            <span style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "0.65rem",
              color: "#897F66",
              letterSpacing: "0.06em",
            }}>
              {domain}
            </span>
          </div>
        )}

        {/* Badge de suscripción encima de la imagen */}
        {resource.subscription && (
          <div style={{
            position: "absolute",
            bottom: 8, left: 10,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <img
              src={faviconUrl}
              alt=""
              style={{ width: 18, height: 18, borderRadius: 4, border: "1px solid rgba(255,255,255,0.5)" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <span style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#F8F5EE",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              background: "rgba(17,80,61,0.65)",
              padding: "2px 7px",
              borderRadius: 999,
            }}>
              {resource.subscription.expiresAt === "evergreen" ? "Acceso vitalicio" : `Suscripción`}
            </span>
          </div>
        )}
      </div>
    );
  }

  return null;
}

/* ── GJ tokens ─────────────────────────────────────────────── */
const FONT_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
const FONT_SERIF   = "'Spectral', Georgia, serif";
const FONT_UI      = "'Hanken Grotesk', system-ui, sans-serif";
const INK          = "#221F17";
const EARTH        = "#897F66";
const KHAKI        = "#B2A789";
const SAND         = "#E5DDCC";
const GOLD         = "#B89455";
const GREEN        = "#11503D";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  libro:      <BookOpen size={12} />,
  podcast:    <Headphones size={12} />,
  plataforma: <Monitor size={12} />,
  youtube:    <Youtube size={12} />,
  audiolibro: <Headphones size={12} />,
  documental: <Youtube size={12} />,
  curso:      <GraduationCap size={12} />,
};

const typeColors: Record<ResourceType, string> = {
  libro:      "#11503D",
  podcast:    "#AB4A40",
  audiolibro: "#5B4A8A",
  documental: "#2C6E8A",
  plataforma: "#A6843F",
  youtube:    "#8F3B36",
  curso:      "#2E6B4F",
};

const typeBg: Record<ResourceType, string> = {
  libro:      "rgba(17,80,61,0.08)",
  podcast:    "rgba(171,74,64,0.08)",
  audiolibro: "rgba(91,74,138,0.09)",
  documental: "rgba(44,110,138,0.09)",
  plataforma: "rgba(166,132,63,0.09)",
  youtube:    "rgba(143,59,54,0.08)",
  curso:      "rgba(46,107,79,0.09)",
};

/* ── ResourceCard ─────────────────────────────────────────── */
interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export default function ResourceCard({ resource, index }: ResourceCardProps) {
  const { setSelectedResource, getResourceNotes } = useNotes();
  const { getResourceStatus } = useStatus();
  const notes         = getResourceNotes(resource.id);
  const currentStatus = getResourceStatus(resource.id, resource.status);
  const hasNotes      = notes.length > 0;
  const typeColor     = typeColors[resource.type];
  const typeBgColor   = typeBg[resource.type];

  const getSubscriptionStatus = () => {
    if (!resource.subscription) return null;
    if (resource.subscription.expiresAt === "evergreen") return "evergreen";
    if (!resource.subscription.expiresAt) return null;
    const days = Math.ceil(
      (new Date(resource.subscription.expiresAt).getTime() - Date.now()) / 86400000
    );
    if (days < 0) return "expired";
    if (days <= 30) return "expiring-soon";
    return "active";
  };

  const subscriptionStatus = getSubscriptionStatus();
  const hasThumbnail = (resource.type !== "libro" && !(resource.type === "curso" && (!resource.modules || resource.modules.length === 0))) || !!(resource.coverUrl);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div
        className="resource-card animate-fade-slide-up cursor-pointer overflow-hidden"
        style={{ animationDelay: `${index * 35}ms` }}
        onClick={() => setSelectedResource(resource)}
      >
        {/* ── Thumbnail ── */}
        {hasThumbnail && <CardThumbnail resource={resource} onPlayClick={() => setSelectedResource(resource)} />}

        {/* ── Cuerpo de la tarjeta ── */}
        <div className="p-5">
          {/* Indicadores: afiliado, destacado, notas, tipo de acceso */}
          {(resource.affiliate || resource.featured || hasNotes || subscriptionStatus) && (
            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
              {resource.affiliate && resource.type === "plataforma" && (
                <span className="flex items-center gap-1" style={{
                  fontFamily: FONT_UI, fontSize: "0.58rem", fontWeight: 600,
                  color: "#A6843F",
                  background: "rgba(166,132,63,0.10)",
                  border: "1px solid rgba(166,132,63,0.28)",
                  padding: "2px 7px", borderRadius: 999,
                  letterSpacing: "0.05em",
                }}>
                  <Link size={9} />
                  Enlace de afiliado
                </span>
              )}
              {resource.featured && (
                <span className="flex items-center gap-1" style={{
                  fontFamily: FONT_UI, fontSize: "0.6rem", fontWeight: 600,
                  color: GOLD, letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  <Star size={10} fill="currentColor" />
                  Destacado
                </span>
              )}
              {hasNotes && (
                <span className="flex items-center gap-1" style={{
                  fontFamily: FONT_UI, fontSize: "0.6rem", fontWeight: 600,
                  color: GREEN, letterSpacing: "0.04em",
                }}>
                  <FileText size={10} />
                  {notes.length} nota{notes.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}

          {/* Badge tipo + Estado + Enlace — ocultar "PLATAFORMA" en tarjetas de plataforma */}
          {resource.type !== "plataforma" && (
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="type-badge"
                style={{ color: typeColor, borderColor: `${typeColor}35`, background: typeBgColor }}>
                {typeIcons[resource.type]}
                {resourceTypeLabels[resource.type]}
              </span>
              <div onClick={(e) => e.stopPropagation()}>
                <StatusSelector resourceId={resource.id} currentStatus={currentStatus} resourceType={resource.type} />
              </div>
            </div>
            {resource.url && (
              <a
                href={resource.url} target="_blank" rel="noopener noreferrer"
                className="shrink-0 p-1 rounded transition-colors"
                style={{ color: KHAKI }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = GOLD)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = KHAKI)}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
          )}

          {/* Para plataforma: solo enlace externo */}
          {resource.type === "plataforma" && resource.url && (
          <div className="flex justify-end mb-3">
            <a
              href={resource.url} target="_blank" rel="noopener noreferrer"
              className="shrink-0 p-1 rounded transition-colors"
              style={{ color: KHAKI }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = GOLD)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = KHAKI)}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} />
            </a>
          </div>
          )}

          {/* Para youtube/plataforma el título ya aparece en el thumbnail, lo mostramos más pequeño */}
          <h3 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: hasThumbnail ? "0.95rem" : "1.05rem",
            fontWeight: 600,
            color: INK,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            marginBottom: resource.author ? "4px" : "8px",
          }}>
            {resource.title}
          </h3>

          {resource.author && (
            <p style={{
              fontFamily: FONT_SERIF, fontSize: "0.78rem",
              fontStyle: "italic", color: GREEN, marginBottom: "8px",
            }}>
              {resource.author}
            </p>
          )}

          {resource.description && (
            <p style={{
              fontFamily: FONT_SERIF, fontSize: "0.8rem",
              color: EARTH, lineHeight: 1.6, marginBottom: "12px",
            }}>
              {resource.description}
            </p>
          )}

          {(resource.tags && resource.tags.length > 0 || (subscriptionStatus && resource.type === "plataforma")) && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-3 justify-between items-end"
              style={{ borderTop: `1px solid ${SAND}` }}>
              <div className="flex flex-wrap gap-1.5">
                {resource.tags && resource.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1" style={{
                    fontFamily: FONT_UI, fontSize: "0.58rem", fontWeight: 500,
                    color: KHAKI, letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>
                    <Tag size={8} />
                    {tag}
                  </span>
                ))}
              </div>
              {subscriptionStatus && resource.type === "plataforma" && (
                <span className="flex items-center gap-1 text-xs" style={{
                  fontFamily: FONT_UI, fontSize: "0.6rem", fontWeight: 500,
                  color: subscriptionStatus === "evergreen" ? GREEN
                    : subscriptionStatus === "expiring-soon" ? "#AB4A40"
                    : subscriptionStatus === "expired" ? "#9E3B33" : EARTH,
                }}>
                  <Clock size={10} />
                  {subscriptionStatus === "evergreen" ? "Acceso vitalicio"
                    : subscriptionStatus === "expiring-soon" ? "Vence pronto"
                    : subscriptionStatus === "expired" ? "Vencida"
                    : "Activa"}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
