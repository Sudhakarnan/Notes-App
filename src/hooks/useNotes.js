import { useEffect, useState } from "react";

const NOTES_KEY = "react-notes-app-v2";

function getInitialNotes() {
  const saved = localStorage.getItem(NOTES_KEY);
  if (saved) return JSON.parse(saved);
  return [];
}

export function useNotes() {
  const [notes, setNotes] = useState(getInitialNotes);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const createNote = (note) => {
    setNotes((prev) => [
      {
        ...note,
        id: Date.now() + Math.random(),
        pinned: false,
        archived: false,
        trashed: false,
        created: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const updateNote = (id, changes) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...changes } : n))
    );
  };

  const pinNote = (id, value) => updateNote(id, { pinned: value });
  const archiveNote = (id, value) => updateNote(id, { archived: value });
  const trashNote = (id, value) => updateNote(id, { trashed: value });
  const deleteNotePermanently = (id) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  return {
    notes,
    createNote,
    updateNote,
    pinNote,
    archiveNote,
    trashNote,
    deleteNotePermanently,
  };
}
