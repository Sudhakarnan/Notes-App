import React from "react";

export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xs w-full text-center">
        <div className="mb-4 text-gray-800">{message}</div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-red-100 text-red-700 rounded-full px-4 py-2 font-semibold hover:bg-red-200 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-100 text-gray-600 rounded-full px-4 py-2 font-semibold hover:bg-gray-200 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
