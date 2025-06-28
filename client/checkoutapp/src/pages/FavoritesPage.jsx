import React, { useState, useEffect } from 'react';
import { Heart, Package, Trash2 } from 'lucide-react';
import FavoriteCard from '../components/FavoriteCard';
import ConfirmationModal from '../components/ConfirmationModal';
import { FavoritesService } from '../services/favoritesService';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showClearAllModal, setShowClearAllModal] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favoritesList = FavoritesService.getFavorites();
    setFavorites(favoritesList);
  };

  const handleRemoveFavorite = (id) => {
    FavoritesService.removeFavorite(id);
    loadFavorites();
  };

  const handleClearAll = () => {
    favorites.forEach(favorite => {
      FavoritesService.removeFavorite(favorite.id);
    });
    loadFavorites();
    setShowClearAllModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500 to-pink-600 rounded-2xl shadow-lg">
              <Heart className="h-12 w-12 text-black" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Favorite{' '}
            <span className="bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent">
              Packages
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A curated collection of your favorite NPM packages with personal notes about why you love them.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-lg text-gray-600">
              <span className="font-semibold text-gray-900">{favorites.length}</span> favorite package{favorites.length !== 1 ? 's' : ''}
            </div>
            <button
              onClick={() => setShowClearAllModal(true)}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All Favorites</span>
            </button>
          </div>
        )}

        {favorites.length > 0 ? (
          <div className="flex flex-col items-center space-y-8">
            {favorites.map((favorite, index) => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                index={index}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-6">
                <Heart className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No favorites yet</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start exploring NPM packages and add your favorites to build your personal collection. 
                Each favorite can include a personal note about why you love it!
              </p>
              <a
                href="/"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                <Package className="h-5 w-5" />
                <span>Start Exploring Packages</span>
              </a>
            </div>
          </div>
        )}

        <ConfirmationModal
          isOpen={showClearAllModal}
          onClose={() => setShowClearAllModal(false)}
          onConfirm={handleClearAll}
          title="Clear All Favorites"
          message={`Are you sure you want to remove all ${favorites.length} favorite packages? This action cannot be undone.`}
          confirmText="Clear All"
          confirmColor="red"
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
