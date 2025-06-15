import React from "react";

export default function TagFilter({ tags, selected, onSelect }) {
  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <button
        className={`px-3 py-1 rounded-xl transition font-medium ${
          selected === null
            ? "bg-yellow-400 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-yellow-100"
        }`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`px-3 py-1 rounded-xl transition font-medium ${
            selected === tag
              ? "bg-blue-400 text-white"
              : "bg-gray-200 text-blue-700 hover:bg-blue-100"
          }`}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
