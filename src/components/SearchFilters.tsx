import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters as FiltersType } from '../types/Phone';

interface SearchFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onClearFilters: () => void;
  resultsCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  resultsCount 
}) => {
  const handleFilterChange = (key: keyof FiltersType, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="w-6 h-6 text-indigo-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900">Find Your Perfect Phone</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Type</label>
          <select
            value={filters.phoneType}
            onChange={(e) => handleFilterChange('phoneType', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="">All Types</option>
            <option value="Flagship">Flagship</option>
            <option value="Gaming">Gaming</option>
            <option value="Camera">Camera Focused</option>
            <option value="Mid-range">Mid-range</option>
            <option value="Budget">Budget</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Google">Google</option>
            <option value="Realme">Realme</option>
            <option value="Vivo">Vivo</option>
            <option value="iQOO">iQOO</option>
            <option value="Nothing">Nothing</option>
            <option value="POCO">POCO</option>
            <option value="Motorola">Motorola</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="">Any Price</option>
            <option value="0-20000">Under ₹20,000</option>
            <option value="20000-40000">₹20,000 - ₹40,000</option>
            <option value="40000-70000">₹40,000 - ₹70,000</option>
            <option value="70000-100000">₹70,000 - ₹1,00,000</option>
            <option value="100000+">Above ₹1,00,000</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Min Rating</label>
          <select
            value={filters.minRating?.toString() || ''}
            onChange={(e) => handleFilterChange('minRating', e.target.value ? parseInt(e.target.value) : '' as any)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.2">4.2+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <Search className="w-5 h-5 mr-2" />
          <span className="text-sm">
            Found <span className="font-semibold text-indigo-600">{resultsCount}</span> phones
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;