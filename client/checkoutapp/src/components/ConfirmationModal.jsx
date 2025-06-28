import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  confirmColor = 'red',
}) => {
  if (!isOpen) return null;

  const confirmStyle =
    confirmColor === 'blue'
      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      : 'bg-red-600 hover:bg-red-700 focus:ring-red-500';

  const iconBg =
    confirmColor === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600';

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-sm overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${iconBg}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-md transition"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm text-gray-600">{message}</p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-sm text-white rounded-md transition focus:outline-none focus:ring-2 ${confirmStyle}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
