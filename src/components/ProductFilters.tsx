import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory, ProductSize } from '../types/store';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Suits & Blazers',
  'Regal Ethnic',
  'Linen & Shirts',
  'Urban Streetwear',
  'Trousers & Chinos'
];

const SIZES: (ProductSize | 'All')[] = ['All', 'S', 'M', 'L', 'XL', 'XXL'];

export const ProductFilters: React.FC = () => {
  const {
    filters,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setSelectedSize,
    setSortBy,
    setInStockOnly,
    resetFilters,
    filteredProducts,
    products
  } = useStore();

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.category !== 'All' ||
    filters.selectedSize !== 'All' ||
    filters.inStockOnly ||
    filters.priceRange[0] !== 500 ||
    filters.priceRange[1] !== 15000 ||
    filters.sortBy !== 'featured';

  return (
    <div className="space-y-5">
      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search sherwanis, blazers, linen shirts, size..."
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400/60 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort & Quick Filter Stats */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <div className="text-xs text-zinc-400 whitespace-nowrap">
            Showing <strong className="text-amber-400 tabular-nums">{filteredProducts.length}</strong> of {products.length} pieces
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-zinc-400 hidden sm:inline whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-400/60 cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="trending">Trending Styles First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const isActive = filters.category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md shadow-amber-400/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Controls Bar (Size chips, Price brackets, Stock toggle, Reset) */}
      <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Size Selection */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-semibold mr-1">
            Size:
          </span>
          <div className="flex items-center gap-1.5">
            {SIZES.map(s => {
              const isSelected = filters.selectedSize === s;
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md font-mono text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/60 font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Price Range Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-zinc-400 uppercase tracking-wider text-[11px] font-semibold mr-1">
            Budget:
          </span>
          <button
            onClick={() => setPriceRange([500, 2000])}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              filters.priceRange[0] === 500 && filters.priceRange[1] === 2000
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            Under ₹2,000
          </button>
          <button
            onClick={() => setPriceRange([2000, 5000])}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              filters.priceRange[0] === 2000 && filters.priceRange[1] === 5000
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            ₹2,000 - ₹5,000
          </button>
          <button
            onClick={() => setPriceRange([5000, 15000])}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              filters.priceRange[0] === 5000 && filters.priceRange[1] === 15000
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            ₹5,000+ Luxury
          </button>
        </div>

        {/* In-Stock Toggle & Reset */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-300">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="accent-amber-400 w-3.5 h-3.5 rounded cursor-pointer"
            />
            <span>In Stock Only</span>
          </label>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
