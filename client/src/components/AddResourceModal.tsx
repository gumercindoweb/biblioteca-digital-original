// ============================================================
// ADD RESOURCE MODAL — Biblioteca Digital
// Diseño: Archivo Nocturno
// Modal para agregar nuevos recursos a la biblioteca
// ============================================================

import { useState } from "react";
import { categories, ResourceType, Status } from "@/lib/data";
import { X, BookOpen, Headphones, Monitor, Youtube } from "lucide-react";

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
  }) => void;
}

export default function AddResourceModal({ isOpen, onClose, onAdd }: AddResourceModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ResourceType>("libro");
  const [category, setCategory] = useState("marketing");
  const [status, setStatus] = useState<Status>("en-cola");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      author: author.trim() || undefined,
      description: description.trim() || undefined,
      type,
      category,
      status,
      url: url.trim() || undefined,
      tags: tags.trim() ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
    });
    setTitle(""); setAuthor(""); setDescription(""); setUrl(""); setTags("");
    setType("libro"); setCategory("marketing"); setStatus("en-cola");
    onClose();
  };

  const inputStyle = {
    background: "oklch(0.14 0.008 60)",
    border: "1px solid oklch(0.22 0.008 60)",
    borderRadius: "0.375rem",
    color: "#F0E6D3",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.82rem",
    padding: "8px 12px",
    width: "100%",
    outline: "none",
    transition: "border-color 180ms ease",
  };

  const labelStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.6rem",
    letterSpacing: "0.1em",
    color: "#8A7D6B",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "6px",
  };

  const typeOptions: Array<{ id: ResourceType; label: string; icon: React.ReactNode }> = [
    { id: "libro", label: "Libro", icon: <BookOpen size={14} /> },
    { id: "podcast", label: "Podcast", icon: <Headphones size={14} /> },
    { id: "plataforma", label: "Plataforma", icon: <Monitor size={14} /> },
    { id: "youtube", label: "YouTube", icon: <Youtube size={14} /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg rounded-lg overflow-hidden"
        style={{
          background: "oklch(0.12 0.008 60)",
          border: "1px solid oklch(0.22 0.008 60)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,146,42,0.1)",
          animation: "fadeSlideUp 250ms cubic-bezier(0.23, 1, 0.32, 1) both",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid oklch(0.20 0.008 60)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600, color: "#F0E6D3" }}>
            Agregar a la biblioteca
          </h2>
          <button onClick={onClose} className="p-1 rounded transition-colors" style={{ color: "#8A7D6B" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#C8922A")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8A7D6B")}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Tipo de recurso */}
          <div>
            <label style={labelStyle}>Tipo de recurso</label>
            <div className="grid grid-cols-4 gap-2">
              {typeOptions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className="flex flex-col items-center gap-1 py-2.5 rounded transition-all"
                  style={{
                    background: type === t.id ? "rgba(200,146,42,0.15)" : "oklch(0.14 0.008 60)",
                    border: `1px solid ${type === t.id ? "rgba(200,146,42,0.5)" : "oklch(0.22 0.008 60)"}`,
                    color: type === t.id ? "#C8922A" : "#8A7D6B",
                    fontSize: "0.7rem",
                    fontFamily: "'DM Sans', sans-serif",
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
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(200,146,42,0.5)")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "oklch(0.22 0.008 60)")}
            />
          </div>

          {/* Autor (solo para libros) */}
          {type === "libro" && (
            <div>
              <label style={labelStyle}>Autor</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nombre del autor"
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(200,146,42,0.5)")}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "oklch(0.22 0.008 60)")}
              />
            </div>
          )}

          {/* Categoría + Estado en fila */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = "rgba(200,146,42,0.5)")}
                onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = "oklch(0.22 0.008 60)")}
              >
                {categories.filter(c => c.id !== "todos").map((cat) => (
                  <option key={cat.id} value={cat.id} style={{ background: "oklch(0.12 0.008 60)" }}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => ((e.target as HTMLSelectElement).style.borderColor = "rgba(200,146,42,0.5)")}
                onBlur={(e) => ((e.target as HTMLSelectElement).style.borderColor = "oklch(0.22 0.008 60)")}
              >
                <option value="en-cola" style={{ background: "oklch(0.12 0.008 60)" }}>En cola</option>
                <option value="leyendo" style={{ background: "oklch(0.12 0.008 60)" }}>Leyendo</option>
                <option value="completado" style={{ background: "oklch(0.12 0.008 60)" }}>Completado</option>
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
              onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(200,146,42,0.5)")}
              onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "oklch(0.22 0.008 60)")}
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
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(200,146,42,0.5)")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "oklch(0.22 0.008 60)")}
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
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(200,146,42,0.5)")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "oklch(0.22 0.008 60)")}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded transition-all"
              style={{
                background: "transparent",
                border: "1px solid oklch(0.22 0.008 60)",
                color: "#8A7D6B",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded transition-all"
              style={{
                background: "#C8922A",
                border: "1px solid #C8922A",
                color: "oklch(0.09 0.008 60)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#B8821A")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#C8922A")}
            >
              Agregar al estante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
