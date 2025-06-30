import React, { useState } from 'react';
import {
  Trash2,
  ExternalLink,
  Calendar,
  User,
  MessageSquare,
} from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

const colors = [
  {
    base: 'bg-orange-100',
    border: 'border-orange-300',
    text: 'text-orange-900',
    badge: 'bg-orange-300 text-white',
    tag: 'bg-orange-100 text-orange-800 border-orange-300',
    reasonBg: 'bg-orange-200 border-orange-300',
    reasonText: 'text-orange-800',
  },
  {
    base: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-900',
    badge: 'bg-blue-300 text-white',
    tag: 'bg-blue-100 text-blue-800 border-blue-300',
    reasonBg: 'bg-blue-200 border-blue-300',
    reasonText: 'text-blue-800',
  },
  {
    base: 'bg-green-100',
    border: 'border-green-300',
    text: 'text-green-900',
    badge: 'bg-green-300 text-white',
    tag: 'bg-green-100 text-green-800 border-green-300',
    reasonBg: 'bg-green-200 border-green-300',
    reasonText: 'text-green-800',
  },
  {
    base: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-900',
    badge: 'bg-purple-300 text-white',
    tag: 'bg-purple-100 text-purple-800 border-purple-300',
    reasonBg: 'bg-purple-200 border-purple-300',
    reasonText: 'text-purple-800',
  },
  {
    base: 'bg-pink-100',
    border: 'border-pink-300',
    text: 'text-pink-900',
    badge: 'bg-pink-300 text-white',
    tag: 'bg-pink-100 text-pink-800 border-pink-300',
    reasonBg: 'bg-pink-200 border-pink-300',
    reasonText: 'text-pink-800',
  },
];

const FavoriteCard = ({ favorite, onRemove, index }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReason, setEditedReason] = useState(favorite.reason);

  const color = colors[index % colors.length];

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const handleRemove = () => {
    onRemove(favorite.id);
    setShowConfirmation(false);
  };

  return (
    <>
      <div className={`w-3/4 h-[26rem] sticky top-24 z-10 mx-auto ${color.base} rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer p-6 flex flex-col justify-between`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <a
              href={favorite.package.links.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xl font-bold text-gray-800 hover:text-blue-600"
            >
              {favorite.package.name}
              <ExternalLink className="w-4 h-4 opacity-60" />
            </a>
            <p className="text-sm text-gray-700 mt-1">
              {favorite.package.description || 'No description available.'}
            </p>
          </div>
          <button
            onClick={() => setShowConfirmation(true)}
            className="ml-4 p-2 rounded-md hover:bg-red-200 text-gray-500 hover:text-red-600 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className={`mt-4 ${color.reasonBg} border ${color.border} rounded-md p-4`}>
          <div className="flex gap-2 items-start">
            <MessageSquare className={`w-4 h-4 ${color.reasonText} mt-0.5`} />
            <div className="flex-1">
              <p className={`text-sm font-medium ${color.reasonText}`}>Reason:</p>

              {isEditing ? (
                <>
                  <textarea
                    value={editedReason}
                    onChange={(e) => setEditedReason(e.target.value)}
                    className="w-full mt-1 p-2 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        favorite.reason = editedReason;
                        setIsEditing(false);
                      }}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditedReason(favorite.reason);
                        setIsEditing(false);
                      }}
                      className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className={`text-sm ${color.text} mt-0.5`}>{favorite.reason}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-base text-black-600 hover:bg-green-600 bg-red-600 px-1 rounded-md "
                  >
                    Edit Reason
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${color.badge}`}>
            v{favorite.package.version}
          </span>
          {favorite.package.keywords?.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className={`px-3 py-1 rounded-full text-xs font-medium ${color.tag}`}
            >
              {kw}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-800">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>
              {favorite.package.author?.name ||
                favorite.package.publisher?.username ||
                'Unknown'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(favorite.package.date)}</span>
          </div>
        </div>

        <p className={`mt-3 pt-3 border-t ${color.border} text-xs text-gray-600`}>
          Added on {formatDate(favorite.dateAdded)}
        </p>

        {favorite.package.links.homepage && (
          <div className={`mt-2 pt-3 border-t ${color.border}`}>
            <a
              href={favorite.package.links.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
            >
              Visit Homepage
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleRemove}
        title="Remove from Favorites"
        message={`Are you sure you want to remove "${favorite.package.name}" from your favorites? This cannot be undone.`}
        confirmText="Remove"
        confirmColor="red"
      />
    </>
  );
};

export default FavoriteCard;
