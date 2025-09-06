import React from "react";

const ReorderModal = ({ onClose, onConfirm }) => {
  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">
            Reorder Confirmation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-600 mt-4">
          Are you sure you want to reorder this order?
        </p>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700"
          >
           Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReorderModal;
