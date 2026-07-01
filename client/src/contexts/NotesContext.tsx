import React, { createContext, useContext, useState, useEffect } from "react";
import { Resource, Note } from "@/lib/data";

interface NotesContextType {
  selectedResource: Resource | null;
  setSelectedResource: (resource: Resource | null) => void;
  updateNotes: (resourceId: string, notes: Note[]) => void;
  getResourceNotes: (resourceId: string) => Note[];
  addNote: (resourceId: string, note: Note) => void;
  deleteNote: (resourceId: string, noteId: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [notesMap, setNotesMap] = useState<Record<string, Note[]>>(() => {
    try {
      const stored = localStorage.getItem("gj-notes");
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("gj-notes", JSON.stringify(notesMap));
  }, [notesMap]);

  const updateNotes = (resourceId: string, notes: Note[]) => {
    setNotesMap((prev) => ({ ...prev, [resourceId]: notes }));
  };

  const getResourceNotes = (resourceId: string) => {
    return notesMap[resourceId] || [];
  };

  const addNote = (resourceId: string, note: Note) => {
    setNotesMap((prev) => ({
      ...prev,
      [resourceId]: [...(prev[resourceId] || []), note],
    }));
  };

  const deleteNote = (resourceId: string, noteId: string) => {
    setNotesMap((prev) => ({
      ...prev,
      [resourceId]: prev[resourceId]?.filter((n) => n.id !== noteId) || [],
    }));
  };

  return (
    <NotesContext.Provider
      value={{
        selectedResource,
        setSelectedResource,
        updateNotes,
        getResourceNotes,
        addNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes debe usarse dentro de NotesProvider");
  }
  return context;
}
