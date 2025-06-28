import React, { useState } from 'react';
import {
  Heart,
  ExternalLink,
  Calendar,
  User,
  Home,
  BadgeHelp,
} from 'lucide-react';
import { FavoritesService } from '../services/favoritesService';
import AddToFavoritesModal from './AddToFavoritesModal';

const PackageCard = ({ packageData, showRemoveButton = false, onFavoriteChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    FavoritesService.isFavorite(packageData.name)
  );

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const handleAddToFavorites = (reason) => {
    const success = FavoritesService.addFavorite(packageData, reason);
    if (success) {
      setIsFavorite(true);
      setIsModalOpen(false);
      onFavoriteChange?.();
    }
    return success;
  };

  const handleFavoriteClick = () => {
    if (!isFavorite) setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col border-l-4 border-indigo-500 bg-white shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <a
                href={packageData.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-gray-900 hover:text-indigo-600 flex items-center gap-2"
              >
                {packageData.name}
                <ExternalLink className="w-4 h-4 opacity-50" />
              </a>
              <p className="text-gray-600 text-sm mt-1">
                {packageData.description || 'No description available'}
              </p>
            </div>
            <button
              onClick={handleFavoriteClick}
              disabled={isFavorite}
              title={isFavorite ? 'Already in favorites' : 'Add to favorites'}
              className={`p-2 rounded-full transition ${
                isFavorite
                  ? 'bg-red-100 text-red-500 cursor-default'
                  : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 hover:scale-110'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700 font-medium">
              <BadgeHelp className="w-3 h-3" />
              v{packageData.version}
            </span>
            {packageData.keywords?.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>
                {packageData.author?.name ||
                  packageData.publisher?.username ||
                  'Unknown'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(packageData.date)}</span>
            </div>
          </div>

          {packageData.links.homepage && (
            <div className="pt-4 border-t border-gray-100">
              <a
                href={packageData.links.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium inline-flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Visit Homepage
              </a>
            </div>
          )}
        </div>
      </div>

      <AddToFavoritesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddToFavorites}
        packageName={packageData.name}
      />
    </>
  );
};

export default PackageCard;
