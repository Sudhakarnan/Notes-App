import React, { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";

export default function TrashPage() {
  const { notes, deleteNotePermanently, trashNote } = useNotes();
  const [search, setSearch] = useState("");

  const trashedNotes = notes.filter((n) => n.trashed);

  let shownNotes = trashedNotes.filter(
    (n) =>
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-bold text-2xl mb-2 text-red-600">Trash</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {shownNotes.length === 0 && (
          <div className="text-gray-400 italic mt-8">Trash is empty.</div>
        )}
        {shownNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            inTrash
            onDeletePermanently={deleteNotePermanently}
            onRestore={(id) => trashNote(id, false)}
          />
        ))}
      </div>
    </div>
  );
}
