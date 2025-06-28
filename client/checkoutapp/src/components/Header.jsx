import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Package } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition">
            <Package className="h-6 w-6 text-white" />
            <span className="text-lg font-bold tracking-wide">NPM Explorer</span>
          </Link>

          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                location.pathname === '/'
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                location.pathname === '/favorites'
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Heart className="h-4 w-4 mr-1" />
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
