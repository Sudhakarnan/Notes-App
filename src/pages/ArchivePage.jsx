import React, { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";

export default function ArchivePage() {
  const { notes, archiveNote, pinNote, trashNote, updateNote } = useNotes();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(null);

  const archivedNotes = notes.filter((n) => n.archived && !n.trashed);
  const allTags = [...new Set(archivedNotes.flatMap((n) => n.tags || []))];

  let shownNotes = archivedNotes.filter(
    (n) =>
      (!search ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.desc.toLowerCase().includes(search.toLowerCase())) &&
      (!tag || (n.tags && n.tags.includes(tag)))
  );

  return (
    <div>
      <h1 className="font-bold text-2xl mb-2 text-blue-600">Archive</h1>
      <SearchBar value={search} onChange={setSearch} />
      <TagFilter tags={allTags} selected={tag} onSelect={setTag} />
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {shownNotes.length === 0 && (
          <div className="text-gray-400 italic mt-8">No archived notes.</div>
        )}
        {shownNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            inArchive
            onPin={pinNote}
            onArchive={archiveNote}
            onTrash={trashNote}
            onEdit={(n) => updateNote(n.id, n)}
          />
        ))}
      </div>
    </div>
  );
}
