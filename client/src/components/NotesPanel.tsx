import React, { useState, useRef, useEffect } from "react";
import { X, Plus, Trash2, Sparkles, ExternalLink, Clock, Play } from "lucide-react";
import { useNotes } from "@/contexts/NotesContext";
import { Note, NoteType } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { nanoid } from "nanoid";

/**
 * NotesPanel - Estética Futurista Visionaria
 * Diseño innovador con gradientes cibernéticos, colores vibrantes y efectos de luz
 * Incluye reproductor de video en modal popup y captura de timestamp
 */

const noteTypeConfig: Record<NoteType, { label: string; gradient: string; accentColor: string; glowColor: string }> = {
  aprendizaje: {
    label: "Aprendizaje",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    accentColor: "#00D9FF",
    glowColor: "rgba(0, 217, 255, 0.2)",
  },
  semilla: {
    label: "Semilla",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.2)",
  },
  conexion: {
    label: "Conexión",
    gradient: "from-violet-500 via-pink-500 to-rose-500",
    accentColor: "#A78BFA",
    glowColor: "rgba(167, 139, 250, 0.2)",
  },
};

// Función para extraer ID de YouTube de una URL
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?modestbranding=1&rel=0`;
    }
  }
  
  return null;
}

// Función para formatear tiempo (mm:ss)
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Modal de video popup
function VideoModal({ embedUrl, title, onClose }: { embedUrl: string; title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo oscuro con blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal centralizado */}
      <div className="relative z-50 w-full max-w-2xl mx-4 rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl" style={{
        boxShadow: "0 0 40px rgba(0, 217, 255, 0.3), 0 0 80px rgba(0, 217, 255, 0.1)"
      }}>
        {/* Header del modal */}
        <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 px-6 py-4 border-b border-cyan-500/20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-playfair font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent line-clamp-2">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-cyan-400/60 hover:text-cyan-300 transition-all flex-shrink-0 hover:scale-110 hover:drop-shadow-lg"
              style={{ textShadow: "0 0 8px rgba(0, 217, 255, 0.3)" }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Video player */}
        <div className="relative bg-black" style={{ paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

export function NotesPanel() {
  const { selectedResource, setSelectedResource, getResourceNotes, addNote, deleteNote } =
    useNotes();
  const [activeTab, setActiveTab] = useState<NoteType>("aprendizaje");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  if (!selectedResource) return null;

  // Ahora es seguro acceder a selectedResource
  const notes = getResourceNotes(selectedResource.id);
  const tabNotes = notes.filter((n) => n.type === activeTab);
  const config = noteTypeConfig[activeTab];
  
  // Verificar si es un podcast y obtener URL de embed
  const isPodcast = selectedResource.type === "podcast";
  const embedUrl = isPodcast && selectedResource.url ? getYouTubeEmbedUrl(selectedResource.url) : null;

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      // Incluir timestamp en la nota si es un podcast
      const timestamp = isPodcast ? `[${formatTime(currentTime)}] ` : "";
      const fullContent = timestamp + newNoteContent;

      const newNote: Note = {
        id: nanoid(),
        type: activeTab,
        content: fullContent,
        createdAt: new Date().toISOString(),
      };
      addNote(selectedResource.id, newNote);
      setNewNoteContent("");
      setIsAddingNote(false);
    }
  };

  const handleCaptureTimestamp = () => {
    // Insertar timestamp en el textarea
    const timestamp = `[${formatTime(currentTime)}] `;
    setNewNoteContent(prev => timestamp + prev);
  };

  return (
    <>
      <div className="fixed right-0 top-0 h-screen w-96 z-40 flex flex-col overflow-hidden">
        {/* Fondo futurista con gradiente y efecto de luz */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cyan-500/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        
        {/* Contenido relativo */}
        <div className="relative flex flex-col h-full">
          {/* Header con efecto de borde luminoso */}
          <div className="relative p-6 border-b border-cyan-500/20 backdrop-blur-sm bg-gradient-to-b from-cyan-500/5 to-transparent">
            {/* Línea de luz superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-cyan-400" />
                  <h2 className="text-lg font-playfair font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent line-clamp-2">
                    {selectedResource.title}
                  </h2>
                </div>
                {selectedResource.author && (
                  <p className="text-xs text-cyan-300/60 italic">{selectedResource.author}</p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {isPodcast && embedUrl && (
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="text-cyan-400/60 hover:text-cyan-300 transition-all hover:scale-110 hover:drop-shadow-lg"
                    title="Reproducir video"
                  >
                    <Play size={18} fill="currentColor" />
                  </button>
                )}
                {isPodcast && selectedResource.url && (
                  <a
                    href={selectedResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400/60 hover:text-cyan-300 transition-all hover:scale-110 hover:drop-shadow-lg"
                    title="Abrir en YouTube"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-cyan-400/60 hover:text-cyan-300 transition-all flex-shrink-0 hover:scale-110 hover:drop-shadow-lg"
                  style={{ textShadow: "0 0 8px rgba(0, 217, 255, 0.3)" }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs con efecto de neón */}
          <div className="relative flex border-b border-cyan-500/10 px-4 pt-3 gap-2 backdrop-blur-sm bg-gradient-to-b from-cyan-500/3 to-transparent">
            {(["aprendizaje", "semilla", "conexion"] as NoteType[]).map((type) => {
              const isActive = activeTab === type;
              const typeConfig = noteTypeConfig[type];
              return (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`pb-3 px-4 text-xs font-medium transition-all relative ${
                    isActive
                      ? "text-white"
                      : "text-cyan-300/50 hover:text-cyan-300/80"
                  }`}
                >
                  {isActive && (
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                      <div
                        className="absolute inset-x-0 bottom-0 h-0.5 blur-sm"
                        style={{
                          background: `linear-gradient(to right, transparent, ${typeConfig.accentColor}, transparent)`,
                          filter: "blur(4px)",
                        }}
                      />
                    </>
                  )}
                  <span className="relative z-10">{typeConfig.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content - Scroll area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 backdrop-blur-sm">
            {tabNotes.length === 0 && !isAddingNote && (
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <Sparkles size={24} className="text-cyan-400/60" />
                </div>
                <p className="text-sm text-cyan-300/60">
                  No hay {noteTypeConfig[activeTab].label.toLowerCase()}s aún
                </p>
                <p className="text-xs mt-2 text-cyan-400/40">Haz click en "Agregar" para empezar</p>
              </div>
            )}

            {tabNotes.map((note) => (
              <div
                key={note.id}
                className="relative p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all group backdrop-blur-sm overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${noteTypeConfig[note.type].glowColor} 0%, rgba(15, 23, 42, 0.4) 100%)`,
                }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                    style={{
                      animation: "shimmer 2s infinite",
                    }}
                  />
                </div>

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm text-cyan-50 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <p className="text-xs text-cyan-300/40 mt-2">
                      {new Date(note.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNote(selectedResource.id, note.id)}
                    className="text-cyan-400/40 hover:text-rose-400 transition-all flex-shrink-0 hover:scale-110"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {isAddingNote && (
              <div className="relative p-4 rounded-lg border border-cyan-400/30 space-y-3 backdrop-blur-sm bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                
                {/* Botón para capturar timestamp */}
                {isPodcast && (
                  <button
                    onClick={handleCaptureTimestamp}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 transition-all text-xs font-medium"
                  >
                    <Clock size={14} />
                    Capturar timestamp ({formatTime(currentTime)})
                  </button>
                )}

                <Textarea
                  placeholder={`Escribe tu ${noteTypeConfig[activeTab].label.toLowerCase()}...`}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="min-h-24 resize-none text-sm bg-slate-800/50 border-cyan-500/20 text-cyan-50 placeholder-cyan-400/30"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddNote}
                    className="flex-1 text-white font-medium transition-all hover:shadow-lg hover:drop-shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}dd)`,
                      boxShadow: `0 0 12px ${config.glowColor}`,
                    }}
                  >
                    Guardar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsAddingNote(false);
                      setNewNoteContent("");
                    }}
                    className="flex-1 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Add Note Button */}
          {!isAddingNote && (
            <div className="relative p-6 border-t border-cyan-500/10 backdrop-blur-sm bg-gradient-to-t from-cyan-500/3 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              <Button
                onClick={() => setIsAddingNote(true)}
                className="w-full text-white font-medium transition-all hover:shadow-lg hover:drop-shadow-lg relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}dd)`,
                  boxShadow: `0 0 16px ${config.glowColor}`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <Plus size={16} className="mr-2 relative z-10" />
                <span className="relative z-10">Agregar {noteTypeConfig[activeTab].label.toLowerCase()}</span>
              </Button>
            </div>
          )}
        </div>

        {/* Estilos globales para animaciones */}
        <style>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>

      {/* Modal de video popup */}
      {showVideoModal && embedUrl && (
        <VideoModal
          embedUrl={embedUrl}
          title={selectedResource.title}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </>
  );
}
