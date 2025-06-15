import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const NOTE_COLORS = [
  "bg-yellow-100",
  "bg-green-100",
  "bg-pink-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-lime-100",
];
function getNoteColor(note) {
  return NOTE_COLORS[Math.floor(note.id) % NOTE_COLORS.length];
}

export default function NoteCard({
  note,
  onPin,
  onArchive,
  onTrash,
  onEdit,
  inTrash,
  inArchive,
  onDeletePermanently,
  onRestore,
}) {
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(null);

  const handleTrash = () => setModal("trash");
  const handleArchive = () => setModal("archive");
  const handleDeletePermanently = () => setModal("delete");
  const handleRestore = () => setModal("restore");

  const handleConfirm = () => {
    if (modal === "trash") onTrash(note.id, true);
    if (modal === "archive") onArchive(note.id, !note.archived);
    if (modal === "delete") onDeletePermanently(note.id);
    if (modal === "restore") onRestore(note.id);
    setModal(null);
  };

  const archiveMsg = note.archived
    ? "Unarchive this note?"
    : "Archive this note? You can find it in Archive later.";
  const trashMsg = "Move this note to Trash? You can restore it from Trash.";
  const deleteMsg = "Permanently delete this note? This cannot be undone!";
  const restoreMsg = "Restore this note from Trash?";

  return (
    <>
      <div
        className={`relative group p-4 mb-4 rounded-3xl shadow hover:shadow-lg transition-all border border-neutral-200 ${getNoteColor(
          note
        )} break-inside-avoid min-h-[120px]`}
        style={{ minWidth: "260px", maxWidth: "350px" }}
      >
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg text-gray-800">{note.title}</h2>
          {!inTrash && (
            <button
              className={`icon-btn`}
              title={note.pinned ? "Unpin" : "Pin"}
              onClick={() => onPin(note.id, !note.pinned)}
            >
              <span
                className={`material-symbols-rounded text-xl ${note.pinned ? "text-red-500" : "text-yellow-500"
                  }`}
              >
                <i class="fa-solid fa-location-pin"></i>
              </span>
            </button>
          )}
        </div>
        <div>
          <p className="text-gray-800 mt-1 line-clamp-5">{note.desc}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {note.tags &&
            note.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/70 text-blue-800 text-xs px-2 py-0.5 rounded-lg border border-blue-100"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex gap-2 mt-3">
          {!inTrash && (
            <>
              <button
                className="icon-btn"
                onClick={() => setExpanded(true)}
                title="View"
              >
                <span className="material-symbols-rounded"><i class="fa-solid fa-eye"></i></span>
              </button>
              <button
                className="icon-btn"
                onClick={() => onEdit(note)}
                title="Edit"
              >
                <span className="material-symbols-rounded"><i class="fa-solid fa-pencil"></i></span>
              </button>
              <button
                className="icon-btn"
                onClick={handleArchive}
                title={note.archived ? "Unarchive" : "Archive"}
              >
                {note.archived ? (
                  // Use another FA icon if you want, or just show the same
                  <i className="fa-solid fa-box-open"></i>
                ) : (
                  <i className="fa-solid fa-box-archive"></i>
                )}
              </button>

              <button
                className="icon-btn"
                onClick={handleTrash}
                title="Trash"
              >
                <span className="material-symbols-rounded text-red-400">
                  <i class="fa-solid fa-trash"></i>
                </span>
              </button>
            </>
          )}
          {inTrash && (
            <>
              <button
                className="icon-btn"
                onClick={handleRestore}
                title="Restore"
              >
                <span className="material-symbols-rounded text-green-400">
                  restore
                </span>
              </button>
              <button
                className="icon-btn"
                onClick={handleDeletePermanently}
                title="Delete permanently"
              >
                <span className="material-symbols-rounded text-red-500">
                  delete_forever
                </span>
              </button>
            </>
          )}
        </div>
        <div className="absolute right-4 bottom-2 text-xs text-neutral-400">
          {new Date(note.created).toLocaleDateString()}
        </div>
      </div>
      {/* Modal for full note */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl icon-btn"
              onClick={() => setExpanded(false)}
            >
              <span className="material-symbols-rounded p-2 text-red-500"><i class="fa-solid fa-xmark"></i></span>
            </button>
            <h2 className="font-bold text-2xl mb-2">{note.title}</h2>
            <div className="text-xs text-gray-400 mb-2">
              {new Date(note.created).toLocaleString()}
            </div>
            <p className="mb-4 text-gray-800">{note.desc}</p>
            <div className="flex flex-wrap gap-1">
              {note.tags &&
                note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
      {/* Confirmation modals */}
      <ConfirmModal
        open={modal === "archive"}
        message={archiveMsg}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
      <ConfirmModal
        open={modal === "trash"}
        message={trashMsg}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
      <ConfirmModal
        open={modal === "delete"}
        message={deleteMsg}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
      <ConfirmModal
        open={modal === "restore"}
        message={restoreMsg}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
      />
    </>
  );
}
