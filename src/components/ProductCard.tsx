import React from 'react';
import { Heart, ShoppingBag, PiggyBank, Eye } from 'lucide-react';
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
      onClick={(event) => {
        event.stopPropagation();
        setActiveProductModal(product);
      }}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          setActiveProductModal(product);
        }
      }}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-[#343b48] bg-[#1a1f28] shadow-sm transition-all duration-200 hover:border-amber-400/70 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
    >
      {/* Larger, brighter product photography */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#252b36] p-1.5 sm:p-2 flex items-center justify-center">
        <img
          src={primaryImage}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {product.badge && (
          <span className="absolute left-2 top-2 max-w-[75%] truncate rounded bg-black/80 px-1.5 py-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide text-amber-300 border border-amber-400/30">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-colors ${
            isFavorited ? 'bg-amber-400 text-black' : 'bg-black/65 text-white hover:bg-black/85'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Only the product name and price are shown as product information. */}
      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:p-3">
        <h3
          className="min-h-[2.25rem] text-[11px] sm:text-sm font-bold leading-snug text-white line-clamp-2"
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-sm sm:text-base font-extrabold tracking-tight text-amber-300">
            {formatNaira(displayPrice)}
          </span>
          {!isWholesaleMode && product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-[10px] text-slate-500 line-through">{formatNaira(product.originalPrice)}</span>
              <span className="text-[9px] font-bold text-emerald-400">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
            </>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              addToCart(product, isWholesaleMode ? product.minWholesaleQty : 1, isWholesaleMode);
            }}
            className="flex min-h-8 min-w-0 items-center justify-center gap-1 rounded-md bg-amber-400 px-1.5 py-1.5 text-[9px] sm:text-[10px] font-extrabold leading-none text-black transition-colors hover:bg-amber-300"
          >
            <ShoppingBag className="h-3 w-3 shrink-0" />
            <span className="truncate">{isWholesaleMode ? 'Add Carton' : 'Add to Cart'}</span>
          </button>

          {product.saveToBuyEligible ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openCheckoutWithMode('save_to_buy', product);
              }}
              className="flex min-h-8 min-w-0 items-center justify-center gap-1 rounded-md border border-[#414a59] bg-[#252c37] px-1.5 py-1.5 text-[9px] sm:text-[10px] font-bold leading-none text-slate-100 transition-colors hover:bg-[#303a49]"
              title="Save towards this product"
            >
              <PiggyBank className="h-3 w-3 shrink-0 text-emerald-300" />
              <span className="truncate">Save to Buy</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveProductModal(product);
              }}
              className="flex min-h-8 min-w-0 items-center justify-center gap-1 rounded-md border border-[#414a59] bg-[#252c37] px-1.5 py-1.5 text-[9px] sm:text-[10px] font-bold leading-none text-slate-100 transition-colors hover:bg-[#303a49]"
            >
              <Eye className="h-3 w-3 shrink-0 text-amber-300" />
              <span>Details</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
