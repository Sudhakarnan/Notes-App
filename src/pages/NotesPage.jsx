import React, { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";

export default function NotesPage() {
  const { notes, createNote, updateNote, pinNote, archiveNote, trashNote } =
    useNotes();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(null);
  const [editing, setEditing] = useState(null);

  const activeNotes = notes.filter((n) => !n.archived && !n.trashed);
  const allTags = [...new Set(activeNotes.flatMap((n) => n.tags || []))];

  let shownNotes = activeNotes.filter(
    (n) =>
      (!search ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.desc.toLowerCase().includes(search.toLowerCase())) &&
      (!tag || (n.tags && n.tags.includes(tag)))
  );

  const pinned = shownNotes.filter((n) => n.pinned);
  const unpinned = shownNotes.filter((n) => !n.pinned);

  const handleSave = (data) => {
    if (editing) {
      updateNote(editing.id, { ...editing, ...data });
      setEditing(null);
    } else {
      createNote(data);
    }
  };

  return (
    <div>
      <NoteEditor
        onSave={handleSave}
        editingNote={editing}
        onCancel={() => setEditing(null)}
      />
      <SearchBar value={search} onChange={setSearch} />
      <TagFilter tags={allTags} selected={tag} onSelect={setTag} />
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {pinned.length > 0 &&
          pinned.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onPin={pinNote}
              onArchive={archiveNote}
              onTrash={trashNote}
              onEdit={setEditing}
            />
          ))}
        {unpinned.length > 0 &&
          unpinned.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onPin={pinNote}
              onArchive={archiveNote}
              onTrash={trashNote}
              onEdit={setEditing}
            />
          ))}
        {unpinned.length === 0 && pinned.length === 0 && (
          <div className="text-gray-400 italic mt-8">No notes found. Add some!</div>
        )}
      </div>
    </div>
  );
}
