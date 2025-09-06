import React, { useState } from "react";

const CancelOrderModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reasons = [
    "Ordered by mistake",
    "Found a better price",
    "Delivery is too slow",
    "Not needed anymore",
    "Other",
  ];

  const isSubmitEnabled =
    reason && (reason !== "Other" || (reason === "Other" && customReason.trim()));

  const handleSubmit = () => {
    const finalReason = reason === "Other" ? customReason : reason;
    onSubmit(finalReason);
  };

  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">
            Are you sure you want to cancel this order?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-500 mt-3">
          This action cannot be undone. Your order will be cancelled and will not
          be delivered.
        </p>

        {/* Reason Selector */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Reason
          </label>
          <select
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">-- Select a reason --</option>
            {reasons.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Reason Textbox */}
        {reason === "Other" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Please specify your reason
            </label>
            <textarea
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Enter your reason here..."
            ></textarea>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Keep Order
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitEnabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
