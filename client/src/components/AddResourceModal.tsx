// ============================================================
// ADD RESOURCE MODAL — Gumercindo Jiménez Brand System
// Paper white · green primary · brass detail · Hanken labels
// ============================================================

import { useState, useEffect } from "react";
import { categories, Resource, ResourceType, Status } from "@/lib/data";
import { X, BookOpen, Headphones, Monitor, Youtube, Volume2, Film } from "lucide-react";

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (resource: {
    title: string;
    author?: string;
    description?: string;
    type: ResourceType;
    category: string;
    status: Status;
    url?: string;
    tags?: string[];
  }) => Promise<string | null>;
  editResource?: Resource;
  onUpdate?: (id: string, resource: {
    title: string;
    author?: string;
    description?: string;
    type: ResourceType;
    category: string;
    status: Status;
    url?: string;
    tags?: string[];
  }) => Promise<string | null>;
}

export default function AddResourceModal({ isOpen, onClose, onAdd, editResource, onUpdate }: AddResourceModalProps) {
  const isEditMode = !!editResource;

  const [title, setTitle]           = useState("");
  const [author, setAuthor]         = useState("");
  const [description, setDescription] = useState("");
  const [type, setType]             = useState<ResourceType>("libro");
  const [category, setCategory]     = useState("marketing");
  const [status, setStatus]         = useState<Status>("en-cola");
  const [url, setUrl]               = useState("");
  const [tags, setTags]             = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  // Pre-fill form when entering edit mode
  useEffect(() => {
    if (editResource) {
      setTitle(editResource.title);
      setAuthor(editResource.author ?? "");
      setDescription(editResource.description ?? "");
      setType(editResource.type);
      setCategory(editResource.category);
      setStatus(editResource.status);
      setUrl(editResource.url ?? "");
      setTags(editResource.tags?.join(", ") ?? "");
    } else {
      setTitle(""); setAuthor(""); setDescription(""); setUrl(""); setTags("");
      setType("libro"); setCategory("marketing"); setStatus("en-cola");
    }
    setError(null);
  }, [editResource, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);

    const payload = {
      title: title.trim(),
      author: author.trim() || undefined,
      description: description.trim() || undefined,
      type, category, status,
      url: url.trim() || undefined,
      tags: tags.trim() ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
    };

    let err: string | null;
    if (isEditMode && onUpdate && editResource) {
      err = await onUpdate(editResource.id, payload);
    } else {
      err = await onAdd(payload);
    }

    setSubmitting(false);
    if (err) {
      setError("No se pudo guardar. Verificá que tengas sesión de administrador activa.");
      return;
    }
    onClose();
  };

  /* ---- tokens ---- */
  const FONT_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
  const FONT_UI      = "'Hanken Grotesk', system-ui, sans-serif";
  const FONT_SERIF   = "'Spectral', Georgia, serif";
  const IVORY        = "#F8F5EE";
  const BONE         = "#F1ECE0";
  const SAND         = "#E5DDCC";
  const EARTH        = "#897F66";
  const INK          = "#221F17";
  const GREEN        = "#11503D";
  const GREEN_HOVER  = "#166B4F";
  const GOLD         = "#B89455";

  const inputStyle: React.CSSProperties = {
    background: BONE,
    border: `1px solid ${SAND}`,
    borderRadius: "0.25rem",
    color: INK,
    fontFamily: FONT_SERIF,
    fontSize: "0.85rem",
    padding: "9px 12px",
    width: "100%",
    outline: "none",
    transition: "border-color 180ms ease",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_UI,
    fontSize: "0.6rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: EARTH,
    display: "block",
    marginBottom: "6px",
  };

  const typeOptions: Array<{ id: ResourceType; label: string; icon: React.ReactNode }> = [
    { id: "libro",       label: "Libro",       icon: <BookOpen size={14} /> },
    { id: "podcast",     label: "Podcast",     icon: <Headphones size={14} /> },
    { id: "audiolibro",  label: "Audiolibro",  icon: <Volume2 size={14} /> },
    { id: "documental",  label: "Documental",  icon: <Film size={14} /> },
    { id: "plataforma",  label: "Plataforma",  icon: <Monitor size={14} /> },
    { id: "youtube",     label: "YouTube",     icon: <Youtube size={14} /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(14,59,46,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg rounded overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: `1px solid ${SAND}`,
          boxShadow: "0 40px 90px -30px rgba(10,46,37,0.35), 0 8px 24px -8px rgba(33,31,23,0.14)",
          animation: "fadeSlideUp 240ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: `1px solid ${SAND}` }}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span style={{ width: 20, height: 1.5, background: GOLD, opacity: 0.65 }} />
              <span style={{ fontFamily: FONT_UI, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD }}>
                {isEditMode ? "Editar entrada" : "Nueva entrada"}
              </span>
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "1.4rem",
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.01em",
            }}>
              {isEditMode ? "Editar recurso" : "Agregar a la biblioteca"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded transition-colors"
            style={{ color: EARTH }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = INK)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = EARTH)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Tipo */}
          <div>
            <label style={labelStyle}>Tipo de recurso</label>
            <div className="grid grid-cols-4 gap-2">
              {typeOptions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className="flex flex-col items-center gap-1.5 py-3 rounded transition-all"
                  style={{
                    background: type === t.id ? "#EAF2EE" : BONE,
                    border: `1px solid ${type === t.id ? `${GREEN}40` : SAND}`,
                    color: type === t.id ? GREEN : EARTH,
                    fontFamily: FONT_UI,
                    fontSize: "0.65rem",
                    fontWeight: type === t.id ? 600 : 400,
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label style={labelStyle}>Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre del recurso"
              style={inputStyle}
              required
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = `${GREEN}55`)}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = SAND)}
            />
          </div>

          {/* Autor */}
          {type === "libro" && (
            <div>
              <label style={labelStyle}>Autor</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nombre del autor"
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = `${GREEN}55`)}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = SAND)}
              />
            </div>
          )}

          {/* Categoría + Estado */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = `${GREEN}55`)}
                onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = SAND)}
              >
                {categories.filter(c => c.id !== "todos").map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = `${GREEN}55`)}
                onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = SAND)}
              >
                <option value="en-cola">En cola</option>
                <option value="leyendo">Leyendo</option>
                <option value="completado">Completado</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label style={labelStyle}>Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción del recurso..."
              rows={2}
              style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = `${GREEN}55`)}
              onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = SAND)}
            />
          </div>

          {/* URL */}
          <div>
            <label style={labelStyle}>URL (opcional)</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = `${GREEN}55`)}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = SAND)}
            />
          </div>

          {/* Tags */}
          <div>
            <label style={labelStyle}>Tags (separados por coma)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ventas, persuasión, mindset"
              style={inputStyle}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = `${GREEN}55`)}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = SAND)}
            />
          </div>

          {error && (
            <p style={{ fontFamily: FONT_UI, fontSize: "0.72rem", color: "#AB4A40" }}>
              {error}
            </p>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded transition-all"
              style={{
                background: "transparent",
                border: `1px solid ${SAND}`,
                color: EARTH,
                fontFamily: FONT_UI,
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded transition-all"
              style={{
                background: GREEN,
                border: `1px solid ${GREEN}`,
                color: IVORY,
                fontFamily: FONT_UI,
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                opacity: submitting ? 0.65 : 1,
                cursor: submitting ? "default" : "pointer",
              }}
              onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = GREEN_HOVER; }}
              onMouseLeave={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = GREEN; }}
            >
              {submitting ? "Guardando..." : isEditMode ? "Guardar cambios" : "Agregar al estante"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
