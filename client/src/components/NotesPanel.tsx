import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, BookOpen, ExternalLink, Clock, Play, Youtube, ChevronRight } from "lucide-react";
import { useNotes } from "@/contexts/NotesContext";
import { Note, NoteType, CourseModule } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { nanoid } from "nanoid";

/* ---- GJ tokens ---- */
const FONT_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
const FONT_UI      = "'Hanken Grotesk', system-ui, sans-serif";
const FONT_SERIF   = "'Spectral', Georgia, serif";
const IVORY     = "#F8F5EE";
const BONE      = "#F1ECE0";
const SAND      = "#E5DDCC";
const INK       = "#221F17";
const EARTH     = "#897F66";
const KHAKI     = "#B2A789";
const GREEN_900 = "#0A2E25";
const GREEN_800 = "#0E3B2E";
const GREEN     = "#11503D";
const GOLD      = "#B89455";
const CLAY      = "#AB4A40";

const noteTypeConfig: Record<NoteType, { label: string; desc: string; color: string; bg: string }> = {
  aprendizaje: { label: "Aprendizaje", desc: "Ideas y conceptos clave",  color: GREEN, bg: "rgba(17,80,61,0.07)"   },
  semilla:     { label: "Semilla",     desc: "Preguntas a explorar",      color: GOLD,  bg: "rgba(184,148,85,0.09)" },
  conexion:    { label: "Conexión",    desc: "Vínculos con otros temas",  color: CLAY,  bg: "rgba(171,74,64,0.07)"  },
};

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match?.[1] ?? null;
}

function getPlaylistId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/[?&]list=([^&\n?#]+)/);
  return match?.[1] ?? null;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function InlineVideoPlayer({ videoId, title, youtubeUrl }: { videoId: string; title: string; youtubeUrl: string }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const playlistId = getPlaylistId(youtubeUrl);
  const embedUrl = playlistId
    ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}&listType=playlist&modestbranding=1&rel=0&autoplay=1`
    : `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=1`;

  return (
    <div style={{ flexShrink: 0 }}>
      {/* Área de video */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#111" }}>
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <div
            style={{ position: "absolute", inset: 0, cursor: "pointer" }}
            onClick={() => setPlaying(true)}
          >
            <img
              src={thumbUrl}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,46,37,0.28)" }} />

            {/* Botón Play */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div
                style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(255,255,255,0.93)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
                  transition: "transform 160ms ease, box-shadow 160ms ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.45)";
                }}
              >
                <Play size={24} fill={GREEN_900} color={GREEN_900} style={{ marginLeft: 4 }} />
              </div>
            </div>

            {/* Gradiente inferior con título */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "40px 14px 10px",
              background: "linear-gradient(transparent, rgba(10,46,37,0.72))",
              pointerEvents: "none",
            }}>
              <p style={{
                fontFamily: FONT_UI, fontSize: "0.68rem",
                color: "rgba(248,245,238,0.92)", lineHeight: 1.3,
              }}>
                {title}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Barra inferior — tip configuración player */}
      <div style={{
        background: GREEN_900,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "7px 14px",
        borderBottom: `1px solid rgba(248,245,238,0.06)`,
      }}>
        <span style={{
          fontFamily: FONT_UI, fontSize: "0.56rem", fontWeight: 500,
          letterSpacing: "0.04em",
          color: "rgba(248,245,238,0.38)",
        }}>
          💡 En ⚙ del player podés elegir <strong style={{ color: "rgba(248,245,238,0.55)" }}>Pista de audio</strong> en español y activar <strong style={{ color: "rgba(248,245,238,0.55)" }}>Subtítulos</strong>
        </span>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "3px 10px", borderRadius: "999px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(248,245,238,0.12)",
            fontFamily: FONT_UI, fontSize: "0.6rem", fontWeight: 600,
            letterSpacing: "0.05em", color: GOLD,
            textDecoration: "none",
            transition: "background 150ms ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.13)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)")}
        >
          <Youtube size={11} />
          Ver en YouTube
        </a>
      </div>
    </div>
  );
}

function CursoPlayer({ modules, courseUrl }: { modules: CourseModule[]; courseUrl?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = modules[activeIndex];
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${active.videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${active.videoId}?autoplay=1&modestbranding=1&rel=0`;

  const handleSelect = (i: number) => {
    setActiveIndex(i);
    setPlaying(true);
  };

  return (
    <div style={{ flexShrink: 0 }}>
      {/* Video player */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#111" }}>
        {playing ? (
          <iframe
            key={active.videoId}
            src={embedUrl}
            title={active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, cursor: "pointer" }} onClick={() => setPlaying(true)}>
            <img src={thumbUrl} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,46,37,0.28)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.93)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 24px rgba(0,0,0,0.45)",
              }}>
                <Play size={24} fill={GREEN_900} color={GREEN_900} style={{ marginLeft: 4 }} />
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "40px 14px 10px",
              background: "linear-gradient(transparent, rgba(10,46,37,0.72))",
              pointerEvents: "none",
            }}>
              <p style={{ fontFamily: FONT_UI, fontSize: "0.7rem", color: "rgba(248,245,238,0.92)" }}>{active.title}</p>
            </div>
          </div>
        )}
      </div>

      {/* Module list */}
      <div style={{
        background: GREEN_900,
        borderBottom: "1px solid rgba(248,245,238,0.06)",
      }}>
        <div style={{
          padding: "8px 14px 6px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: FONT_UI, fontSize: "0.58rem", fontWeight: 600,
            letterSpacing: "0.10em", textTransform: "uppercase",
            color: GOLD,
          }}>
            Módulos — {modules.length} videos
          </span>
          {courseUrl && (
            <a href={courseUrl} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "3px 10px", borderRadius: 999,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(248,245,238,0.12)",
              fontFamily: FONT_UI, fontSize: "0.6rem", fontWeight: 600,
              letterSpacing: "0.05em", color: GOLD, textDecoration: "none",
            }}>
              <Youtube size={11} /> Ver en YouTube
            </a>
          )}
        </div>
        <div style={{ maxHeight: 220, overflowY: "auto" }}>
          {modules.map((mod, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={mod.videoId}
                onClick={() => handleSelect(i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 14px",
                  background: isActive ? "rgba(184,148,85,0.12)" : "transparent",
                  borderLeft: `3px solid ${isActive ? GOLD : "transparent"}`,
                  borderBottom: "1px solid rgba(248,245,238,0.05)",
                  cursor: "pointer", textAlign: "left", transition: "background 120ms ease",
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(248,245,238,0.04)"; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{
                  fontFamily: FONT_UI, fontSize: "0.58rem", fontWeight: 600,
                  color: isActive ? GOLD : "rgba(248,245,238,0.28)",
                  minWidth: 22, flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{
                  fontFamily: FONT_UI, fontSize: "0.75rem",
                  color: isActive ? IVORY : "rgba(248,245,238,0.65)",
                  fontWeight: isActive ? 500 : 400,
                  lineHeight: 1.35, flex: 1,
                }}>
                  {mod.title}
                </span>
                {isActive && playing && <ChevronRight size={12} style={{ color: GOLD, flexShrink: 0 }} />}
                {isActive && !playing && <Play size={11} fill={GOLD} style={{ color: GOLD, flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function NotesPanel() {
  const { selectedResource, setSelectedResource, getResourceNotes, addNote, deleteNote } = useNotes();
  const [activeTab, setActiveTab]           = useState<NoteType>("aprendizaje");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isAddingNote, setIsAddingNote]     = useState(false);
  const [currentTime, setCurrentTime]       = useState(0);
  const [visible, setVisible]               = useState(false);

  useEffect(() => {
    if (selectedResource) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [selectedResource]);

  if (!selectedResource) return null;

  const notes    = getResourceNotes(selectedResource.id);
  const tabNotes = notes.filter((n) => n.type === activeTab);
  const config   = noteTypeConfig[activeTab];
  const isCurso  = selectedResource.type === "curso";
  const isVideo  = selectedResource.type === "podcast" || selectedResource.type === "audiolibro" || selectedResource.type === "documental";
  const videoId  = isVideo && selectedResource.url ? getYouTubeId(selectedResource.url) : null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setSelectedResource(null), 200);
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    const timestamp = isVideo ? `[${formatTime(currentTime)}] ` : "";
    addNote(selectedResource.id, {
      id: nanoid(),
      type: activeTab,
      content: timestamp + newNoteContent,
      createdAt: new Date().toISOString(),
    } as Note);
    setNewNoteContent("");
    setIsAddingNote(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{
          background: "rgba(10,46,37,0.50)",
          backdropFilter: "blur(3px)",
          transition: "opacity 200ms ease",
          opacity: visible ? 1 : 0,
        }}
        onClick={handleClose}
      />

      {/* Modal centrado */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full flex flex-col pointer-events-auto"
          style={{
            maxWidth: 600,
            maxHeight: "92vh",
            background: IVORY,
            borderRadius: "10px",
            border: `1px solid ${SAND}`,
            boxShadow: "0 32px 80px -20px rgba(10,46,37,0.45), 0 8px 24px -6px rgba(33,31,23,0.15)",
            transition: "opacity 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(10px)",
            overflow: "hidden",
          }}
        >
          {/* ── Header verde ── */}
          <div style={{ background: GREEN_800, borderRadius: "10px 10px 0 0", flexShrink: 0 }}>
            <div className="px-6 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <BookOpen size={11} style={{ color: GOLD, flex: "none" }} />
                    <span style={{
                      fontFamily: FONT_UI, fontSize: "0.57rem", fontWeight: 600,
                      letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD,
                    }}>
                      Mis notas
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: FONT_DISPLAY, fontSize: "1rem", fontWeight: 600,
                    color: IVORY, lineHeight: 1.25, letterSpacing: "-0.01em",
                  }}>
                    {selectedResource.title}
                  </h2>
                  {selectedResource.author && (
                    <p style={{
                      fontFamily: FONT_SERIF, fontSize: "0.72rem",
                      fontStyle: "italic", color: "rgba(248,245,238,0.55)", marginTop: "3px",
                    }}>
                      {selectedResource.author}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0 mt-0.5">
                  {selectedResource.url && (
                    <a
                      href={selectedResource.url} target="_blank" rel="noopener noreferrer"
                      style={{ color: "rgba(248,245,238,0.45)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = GOLD)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,245,238,0.45)")}
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                  <button
                    onClick={handleClose}
                    style={{ color: "rgba(248,245,238,0.45)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = IVORY)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(248,245,238,0.45)")}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex px-4 gap-1" style={{ borderTop: `1px solid rgba(248,245,238,0.08)` }}>
              {(["aprendizaje", "semilla", "conexion"] as NoteType[]).map((type) => {
                const active = activeTab === type;
                const cfg    = noteTypeConfig[type];
                return (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className="pb-3 pt-2.5 px-4 relative"
                    style={{
                      fontFamily: FONT_UI, fontWeight: active ? 600 : 500,
                      fontSize: "0.7rem", letterSpacing: "0.04em",
                      color: active ? IVORY : "rgba(248,245,238,0.38)",
                    }}
                  >
                    {active && (
                      <span style={{
                        position: "absolute", bottom: 0, left: 8, right: 8,
                        height: "2px", background: cfg.color, borderRadius: "2px 2px 0 0",
                      }} />
                    )}
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Curso: lista de módulos ── */}
          {isCurso && selectedResource.modules && selectedResource.modules.length > 0 && (
            <CursoPlayer modules={selectedResource.modules} courseUrl={selectedResource.url} />
          )}

          {/* ── Video inline (podcast / audiolibro / documental) ── */}
          {videoId && <InlineVideoPlayer videoId={videoId} title={selectedResource.title} youtubeUrl={selectedResource.url!} />}

          {/* ── Notas (scrollable) ── */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ minHeight: 0 }}>
            {tabNotes.length === 0 && !isAddingNote && (
              <div className="flex flex-col items-center justify-center py-10">
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: "#EAF2EE",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px",
                }}>
                  <BookOpen size={16} style={{ color: GREEN, opacity: 0.45 }} />
                </div>
                <p style={{
                  fontFamily: FONT_SERIF, fontSize: "0.83rem",
                  fontStyle: "italic", color: KHAKI, marginBottom: "3px",
                }}>
                  Sin {config.label.toLowerCase()}s aún
                </p>
                <p style={{ fontFamily: FONT_UI, fontSize: "0.67rem", color: KHAKI, letterSpacing: "0.03em" }}>
                  Haz clic en «Agregar» para empezar
                </p>
              </div>
            )}

            {tabNotes.map((note) => (
              <div
                key={note.id}
                className="group rounded p-4"
                style={{ background: noteTypeConfig[note.type].bg, border: `1px solid ${SAND}` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p style={{
                      fontFamily: FONT_SERIF, fontSize: "0.85rem",
                      color: INK, lineHeight: 1.65, whiteSpace: "pre-wrap",
                    }}>
                      {note.content}
                    </p>
                    <p style={{
                      fontFamily: FONT_UI, fontSize: "0.6rem", color: KHAKI,
                      letterSpacing: "0.04em", marginTop: "8px",
                    }}>
                      {new Date(note.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNote(selectedResource.id, note.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
                    style={{ color: KHAKI }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#9E3B33")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = KHAKI)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            {isAddingNote && (
              <div className="rounded p-4 space-y-3" style={{ background: BONE, border: `1px solid ${SAND}` }}>
                {isVideo && (
                  <button
                    onClick={() => setNewNoteContent(prev => `[${formatTime(currentTime)}] ` + prev)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded"
                    style={{
                      border: `1px solid ${SAND}`, background: "#EAF2EE", color: GREEN,
                      fontFamily: FONT_UI, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em",
                    }}
                  >
                    <Clock size={13} />
                    Capturar tiempo ({formatTime(currentTime)})
                  </button>
                )}
                <Textarea
                  placeholder={`Escribe tu ${config.label.toLowerCase()}...`}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="min-h-24 resize-none text-sm"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddNote} className="flex-1">Guardar</Button>
                  <Button size="sm" variant="outline"
                    onClick={() => { setIsAddingNote(false); setNewNoteContent(""); }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer: botón + leyenda ── */}
          {!isAddingNote && (
            <div
              className="px-4 pb-4 pt-3 flex-shrink-0"
              style={{ borderTop: `1px solid ${SAND}`, background: "#FFFFFF", borderRadius: "0 0 10px 10px" }}
            >
              <button
                onClick={() => setIsAddingNote(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded mb-3"
                style={{
                  background: GREEN, color: IVORY, border: `1px solid ${GREEN}`,
                  fontFamily: FONT_UI, fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#166B4F")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = GREEN)}
              >
                <Plus size={14} />
                Agregar {config.label.toLowerCase()}
              </button>

              {/* Leyenda de tipos */}
              <div className="flex justify-center gap-6">
                {(["aprendizaje", "semilla", "conexion"] as NoteType[]).map((type) => {
                  const cfg = noteTypeConfig[type];
                  return (
                    <div key={type} className="flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: cfg.color, flex: "none",
                        }} />
                        <span style={{
                          fontFamily: FONT_UI, fontSize: "0.62rem",
                          fontWeight: 600, color: INK, letterSpacing: "0.01em",
                        }}>
                          {cfg.label}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: FONT_UI, fontSize: "0.55rem",
                        color: EARTH, letterSpacing: "0.02em",
                      }}>
                        {cfg.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
