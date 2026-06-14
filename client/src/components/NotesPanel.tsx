import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useNotes } from "@/contexts/NotesContext";
import { Note, NoteType } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { nanoid } from "nanoid";

const noteTypeConfig: Record<NoteType, { label: string; color: string; bgColor: string }> = {
  aprendizaje: {
    label: "Aprendizaje",
    color: "#C8922A",
    bgColor: "rgba(200, 146, 42, 0.08)",
  },
  semilla: {
    label: "Semilla",
    color: "#7B9E87",
    bgColor: "rgba(123, 158, 135, 0.08)",
  },
  conexion: {
    label: "Conexión",
    color: "#6B8E9E",
    bgColor: "rgba(107, 142, 158, 0.08)",
  },
};

export function NotesPanel() {
  const { selectedResource, setSelectedResource, getResourceNotes, addNote, deleteNote } =
    useNotes();
  const [activeTab, setActiveTab] = useState<NoteType>("aprendizaje");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  if (!selectedResource) return null;

  const notes = getResourceNotes(selectedResource.id);
  const tabNotes = notes.filter((n) => n.type === activeTab);

  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      const newNote: Note = {
        id: nanoid(),
        type: activeTab,
        content: newNoteContent,
        createdAt: new Date().toISOString(),
      };
      addNote(selectedResource.id, newNote);
      setNewNoteContent("");
      setIsAddingNote(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-card border-l border-border shadow-2xl z-40 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-start justify-between bg-gradient-to-b from-card to-transparent">
        <div className="flex-1 pr-4">
          <h2 className="text-lg font-playfair font-bold text-foreground mb-1 line-clamp-2">
            {selectedResource.title}
          </h2>
          {selectedResource.author && (
            <p className="text-xs text-muted-foreground italic">{selectedResource.author}</p>
          )}
        </div>
        <button
          onClick={() => setSelectedResource(null)}
          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 hover:scale-110"
        >
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-4 pt-3 gap-1">
        {(["aprendizaje", "semilla", "conexion"] as NoteType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`pb-3 px-3 text-xs font-medium transition-all border-b-2 ${
              activeTab === type
                ? "text-foreground border-amber-600 font-semibold"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {noteTypeConfig[type].label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {tabNotes.length === 0 && !isAddingNote && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">
              No hay {noteTypeConfig[activeTab].label.toLowerCase()}s aún
            </p>
            <p className="text-xs mt-2 opacity-60">Haz click en "Agregar" para empezar</p>
          </div>
        )}

        {tabNotes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-lg border border-border hover:border-amber-600/30 transition-all"
            style={{ backgroundColor: noteTypeConfig[note.type].bgColor }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(note.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => deleteNote(selectedResource.id, note.id)}
                className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 hover:scale-110"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {isAddingNote && (
          <div className="p-4 rounded-lg border border-border space-y-3">
            <Textarea
              placeholder={`Escribe tu ${noteTypeConfig[activeTab].label.toLowerCase()}...`}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="min-h-24 resize-none text-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAddNote}
                className="flex-1 text-white"
                style={{ backgroundColor: noteTypeConfig[activeTab].color }}
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
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Add Note Button */}
      {!isAddingNote && (
        <div className="p-6 border-t border-border bg-gradient-to-t from-card to-transparent">
          <Button
            onClick={() => setIsAddingNote(true)}
            className="w-full text-white font-medium"
            style={{ backgroundColor: noteTypeConfig[activeTab].color }}
          >
            <Plus size={16} className="mr-2" />
            Agregar {noteTypeConfig[activeTab].label.toLowerCase()}
          </Button>
        </div>
      )}
    </div>
  );
}
