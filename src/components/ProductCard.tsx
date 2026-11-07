import React from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  PiggyBank, 
  Star, 
  ShieldCheck, 
  Boxes,
  Zap,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { useApp, formatNaira } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    isWholesaleMode, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setActiveProductModal,
    openCheckoutWithMode
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0] || '/assets/aistudio/IMG-20261104-WA0074_58210dd6.jpg';

  const displayPrice = isWholesaleMode ? product.wholesalePrice : product.price;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onClick={(event) => { event.stopPropagation(); setActiveProductModal(product); }}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          setActiveProductModal(product);
        }
      }}
      className="group relative bg-[#11141b] rounded-2xl border border-[#222736] hover:border-amber-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/50 cursor-pointer"
    >
      
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full bg-[#0a0c10] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#11141b]/80 pointer-events-none" />

        {/* Product Image */}
        <img 
          src={primaryImage} 
          alt={product.name}
          className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges: Quiet Text Tag (Anti-Pill Rule) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded border border-amber-400/30">
              {product.badge}
            </span>
          )}
          {isWholesaleMode && (
            <span className="text-[10px] font-mono font-semibold tracking-wide text-white bg-blue-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-blue-500/30">
              MOQ: {product.minWholesaleQty} units
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorited 
              ? 'bg-amber-400 text-black shadow-md' 
              : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/90'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-black' : ''}`} />
        </button>

        {/* Quick View Hover Action */}
        <button
          onClick={() => setActiveProductModal(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/85 hover:bg-black text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-[#2b3345] whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Specs & Tiers</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        {/* Unboxed Metadata & Category */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span className="uppercase tracking-wider text-[11px] text-amber-400/90 font-semibold">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setActiveProductModal(product)}
            className="text-sm font-bold text-white hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Subtitle / Short spec */}
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.subTitle}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-[#1d222e]">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-white font-mono tracking-tight">
                  {formatNaira(displayPrice)}
                </span>
                {!isWholesaleMode && product.originalPrice && (
                  <span className="text-xs text-slate-500 line-through font-mono">
                    {formatNaira(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Wholesale Hint or Retail Contrast */}
              {isWholesaleMode ? (
                <p className="text-[11px] text-amber-400 font-mono mt-0.5">
                  Bulk tier: ₦{product.wholesalePrice.toLocaleString()} / unit
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Wholesale from: <span className="text-amber-400 font-semibold">{formatNaira(product.wholesalePrice)}</span> (MOQ {product.minWholesaleQty})
                </p>
              )}
            </div>

            {/* In stock indicator */}
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              In Stock
            </span>
          </div>

          {/* Interactive Card Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3.5">
            <button
              onClick={(event) => {
                event.stopPropagation();
                if (isWholesaleMode) {
                  addToCart(product, product.minWholesaleQty, true);
                } else {
                  addToCart(product, 1, false);
                }
              }}
              className="w-full py-2 px-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">
                {isWholesaleMode ? `Add Carton (${product.minWholesaleQty})` : 'Add to Cart'}
              </span>
            </button>

            {product.saveToBuyEligible ? (
              <button
                onClick={(event) => { event.stopPropagation(); openCheckoutWithMode('save_to_buy', product); }}
                className="w-full py-2 px-2 bg-[#171b24] hover:bg-[#202532] text-slate-200 hover:text-white font-semibold text-xs rounded-lg transition-colors border border-[#293142] flex items-center justify-center gap-1"
                title="Lock price with initial deposit and save towards it"
              >
                <PiggyBank className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="whitespace-nowrap">Save to Buy</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveProductModal(product)}
                className="w-full py-2 px-2 bg-[#171b24] hover:bg-[#202532] text-slate-200 hover:text-white font-semibold text-xs rounded-lg transition-colors border border-[#293142] flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">Details</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
