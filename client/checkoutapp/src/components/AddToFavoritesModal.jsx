import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';

const AddToFavoritesModal = ({ isOpen, onClose, onSubmit, packageName }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError('Please provide a reason');
      return;
    }

    if (reason.trim().length < 10) {
      setError('Reason must be at least 10 characters');
      return;
    }

    const success = onSubmit(reason.trim());
    if (success) {
      setReason('');
      setError('');
    } else {
      setError('Package already added to favorites');
    }
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-lg p-6 border border-white/30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" />
            <h2 className="text-xl font-semibold text-gray-800">Add to Favorites</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Package</label>
            <div className="mt-1 px-4 py-2 bg-white border rounded-xl shadow-inner text-gray-900">
              {packageName}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Why is this your favorite? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError('');
              }}
              placeholder="Tell us why you love this package..."
              className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Min. 10 characters</span>
              <span>{reason.length}/500</span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToFavoritesModal;
