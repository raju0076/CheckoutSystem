const FAVORITES_KEY = 'npm_favorites';

export class FavoritesService {
  static getFavorites() {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static addFavorite(packageData, reason) {
    try {
      const favorites = this.getFavorites();
      if (favorites.some(fav => fav.package.name === packageData.name)) {
        return false;
      }

      const newFavorite = {
        id: `${packageData.name}-${Date.now()}`,
        package: packageData,
        reason: reason.trim(),
        dateAdded: new Date().toISOString(),
      };

      favorites.push(newFavorite);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    } catch {
      return false;
    }
  }

  static removeFavorite(id) {
    try {
      const favorites = this.getFavorites();
      const updated = favorites.filter(f => f.id !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }

  static isFavorite(packageName) {
    const favorites = this.getFavorites();
    return favorites.some(f => f.package.name === packageName);
  }
}
