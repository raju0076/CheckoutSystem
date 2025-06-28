import React, { useState } from 'react';
import { Search, Package, AlertCircle } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PackageCard from '../components/PackageCard';
import { NPMApi } from '../services/npmApi';

const SearchPage = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError('');
    setSearchQuery(query);
    setHasSearched(true);

    try {
      const result = await NPMApi.searchPackages(query);
      setPackages(result.objects || []);
    } catch (err) {
      setError(err.message);
      setPackages([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 py-12 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-extrabold">
              NPM Package Explorer
            </h1>
          </div>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
            Explore millions of useful packages from the NPM registry. Search, learn, and favorite your tools.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-[-2rem] px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-3 flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Results Heading */}
        {hasSearched && !isLoading && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {packages.length > 0
                ? `Results for "${searchQuery}"`
                : `No results for "${searchQuery}"`}
            </h2>
            {packages.length > 0 && (
              <span className="text-sm text-gray-500">{packages.length} packages found</span>
            )}
          </div>
        )}

        {/* Grid */}
        {packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((result) => (
              <PackageCard
                key={result.package.name}
                packageData={result.package}
              />
            ))}
          </div>
        )}

        {/* Empty Search */}
        {hasSearched && !isLoading && packages.length === 0 && !error && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No packages found</h3>
            <p className="text-gray-500 text-sm">
              Try a different keyword or spelling.
            </p>
          </div>
        )}

        {/* Welcome Prompt */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-20 text-gray-600">
            <p className="text-xl font-semibold text-gray-800 mb-2">
  Start by searching for a package above
</p>
<p className="text-sm text-gray-500 italic">
  Enter the name of a library, tool, or keyword
</p>

          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
