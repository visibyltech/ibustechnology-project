import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Boxes, 
  ArrowUpDown, 
  Check, 
  X,
  BatteryCharging,
  Headphones,
  Zap,
  Cable,
  Sparkles,
  Building2,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES_CONFIG } from '../data/products';

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    isWholesaleMode,
    toggleWholesaleMode,
    setCurrentView
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          const priceA = isWholesaleMode ? a.wholesalePrice : a.price;
          const priceB = isWholesaleMode ? b.wholesalePrice : b.price;
          return priceA - priceB;
        }
        if (sortBy === 'price-desc') {
          const priceA = isWholesaleMode ? a.wholesalePrice : a.price;
          const priceB = isWholesaleMode ? b.wholesalePrice : b.price;
          return priceB - priceA;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, sortBy, isWholesaleMode]);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#222736]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
            <span>Official Store Catalog</span>
            <span className="text-slate-600">·</span>
            <span>Genuine Alaba Direct Distribution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isWholesaleMode ? 'Wholesale Distributor Catalog' : 'Engineered Accessories & Gadgets'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {isWholesaleMode 
              ? 'Bulk carton pricing unlocked for electronics retailers, phone repairers, and regional distributors across Nigeria.'
              : 'Browse our full lineup of high-capacity power banks, ANC wireless earbuds, turbo car chargers and durable cables.'}
          </p>
        </div>

        {/* Wholesale Mode Toggle Card */}
        <div className="flex items-center gap-3 bg-[#13161f] border border-[#232938] rounded-xl p-2 shrink-0">
          <div className="text-left px-2">
            <p className="text-xs font-bold text-white">Wholesale / Carton Mode</p>
            <p className="text-[11px] text-slate-400">Unlock 25%–45% bulk discounts</p>
          </div>
          <button
            onClick={toggleWholesaleMode}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              isWholesaleMode 
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' 
                : 'bg-[#1e2330] hover:bg-[#282f40] text-slate-200 border border-[#2e374a]'
            }`}
          >
            {isWholesaleMode ? 'Active' : 'Enable Wholesale'}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 space-y-4">
        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, capacity (e.g. 30,000mAh), earbuds, cables..."
              className="w-full bg-[#11141b] border border-[#222736] focus:border-amber-400 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-[#11141b] border border-[#222736] rounded-xl px-3 py-2 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent text-white font-medium outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#11141b]">Featured Flagships</option>
                <option value="price-asc" className="bg-[#11141b]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#11141b]">Price: High to Low</option>
                <option value="rating" className="bg-[#11141b]">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Segmented Tabs (Anti-pill: Interactive functional tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/10' 
                    : 'bg-[#11141b] text-slate-300 hover:bg-[#1a1f2c] border border-[#222736]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wholesale Mode Notification Banner */}
      {isWholesaleMode && (
        <div className="mt-6 bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent border border-amber-400/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/20 text-amber-400 rounded-lg shrink-0">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Wholesale Carton Pricing is currently applied</p>
              <p className="text-[11px] text-slate-300">Each item displays unit price when buying Minimum Order Quantities (MOQ). Same-day interstate waybills from Alaba.</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('wholesale')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 shrink-0"
          >
            Distributor Perks & Form &rarr;
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="mt-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#11141b] border border-[#222736] rounded-2xl p-12 text-center max-w-md mx-auto my-8">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No products match your criteria</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search terms or select "All Products" to view our complete lineup.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-lg hover:bg-amber-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
