import React, { useMemo } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES_CONFIG } from '../data/products';

export const ProductCatalog: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, isWholesaleMode } = useApp();

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      selectedCategory === 'all' || product.category === selectedCategory
    );
  }, [products, selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto w-full px-3 sm:px-6 pt-5 pb-10">
      {/* Compact category navigation: products now begin immediately below the hero. */}
      <nav aria-label="Product categories" className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as ProductCategory)}
              className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'bg-[#1b202a] text-slate-200 hover:bg-[#252c38] border border-[#343c49]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {isWholesaleMode && (
        <p className="mb-3 text-[11px] text-amber-300 font-medium">
          Wholesale pricing is active. Prices shown are wholesale unit prices.
        </p>
      )}

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-2 rounded-xl border border-[#343c49] bg-[#1b202a] p-8 text-center">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">No products in this category yet</h3>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="mt-3 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-black"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
