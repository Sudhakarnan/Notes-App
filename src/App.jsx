import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import ArchivePage from "./pages/ArchivePage";
import TrashPage from "./pages/TrashPage";

export default function App() {
  return (
    
    <div className="min-h-screen bg-neutral-100">
      <nav className="sticky top-0 z-20 flex items-center justify-between bg-white/70 shadow-sm px-8 py-3 backdrop-blur-lg">
        <span className="font-bold text-xl tracking-tight flex items-center gap-2 text-primary">
          <img src="src/assets/favicon.png" className="w-15"/>
          <span className="material-symbols-rounded text-2xl text-yellow-400">
            Notes
          </span>
          App
        </span>
        <div className="flex gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-yellow-100 text-yellow-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-600"
              }`
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/archive"
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-600"
              }`
            }
          >
            Archive
          </NavLink>
          <NavLink
            to="/trash"
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full transition ${
                isActive
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-600"
              }`
            }
          >
            Trash
          </NavLink>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto py-8 px-4">
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/trash" element={<TrashPage />} />
        </Routes>
      </main>
    </div>
  );
}
