import React, { useState, useEffect } from "react";

export default function NoteEditor({ onSave, editingNote, onCancel }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(editingNote ? editingNote.title : "");
    setDesc(editingNote ? editingNote.desc : "");
    setTags(editingNote ? (editingNote.tags || []).join(", ") : "");
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !desc.trim()) {
      setError("Please enter a title or a description.");
      return;
    }
    setError("");
    onSave({
      ...editingNote,
      title: title.trim(),
      desc: desc.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    if (!editingNote) {
      setTitle("");
      setDesc("");
      setTags("");
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded-3xl p-6 mb-8 max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Title"
        className="w-full font-bold text-lg bg-neutral-100 rounded-xl px-3 py-2 mb-2 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={80}
      />
      <textarea
        placeholder="Write your note here..."
        className="w-full bg-neutral-100 rounded-xl px-3 py-2 mb-2 outline-none"
        rows={3}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full text-sm bg-neutral-100 rounded-xl px-3 py-2 mb-2 outline-none"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2 font-semibold shadow transition"
        >
          {editingNote ? "Update" : "Add Note"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-200 text-gray-600 rounded-xl px-5 py-2 font-semibold hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
