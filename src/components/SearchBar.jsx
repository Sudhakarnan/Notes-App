import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="w-full rounded-xl px-3 py-2 mb-4 border border-gray-300 outline-none bg-neutral-100"
      placeholder="Search notes by title or content..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
