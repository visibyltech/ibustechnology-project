import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  Boxes, 
  CreditCard, 
  PiggyBank, 
  ShoppingBag, 
  Phone, 
  CheckCircle2, 
  Share2, 
  Heart,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../types';
import { useApp, formatNaira } from '../context/AppContext';
import { BRAND_INFO } from '../data/products';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeProductModal, 
    setActiveProductModal, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    openCheckoutWithMode,
    isWholesaleMode
  } = useApp();

  const product = activeProductModal;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const currentImage = product.images[selectedImageIndex] || product.images[0];

  // Dynamic price based on selected quantity
  const calculateTierPrice = (qty: number) => {
    if (isWholesaleMode || qty >= product.minWholesaleQty) {
      const tier = [...product.wholesaleTiers].reverse().find((t) => qty >= t.minQty);
      return tier ? tier.pricePerUnit : product.wholesalePrice;
    }
    return product.price;
  };

  const currentUnitPrice = calculateTierPrice(quantity);
  const totalCost = currentUnitPrice * quantity;
  const retailEquivalent = product.price * quantity;
  const savings = retailEquivalent > totalCost ? retailEquivalent - totalCost : 0;

  // BNPL calculation: 25% down, 3 installments
  const bnplDownPayment = Math.round(product.price * 0.25);
  const bnplInstallment = Math.round((product.price - bnplDownPayment) / 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#11141c] border border-[#232938] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Gallery Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="aspect-square w-full bg-[#0a0c10] rounded-xl border border-[#222736] overflow-hidden flex items-center justify-center p-4 relative group">
              <img 
                src={currentImage} 
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded font-mono">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails if multiple images exist */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg bg-[#0a0c10] border overflow-hidden p-1 transition-all ${
                      selectedImageIndex === idx ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-[#222736] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Assurance Tags */}
            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Waybill from Alaba Plaza UB96 to All States</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Column (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1.5">
                <span className="uppercase text-amber-400 font-bold tracking-wider">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-slate-300">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {product.name}
              </h1>
              <div className="mt-3 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      setActiveProductModal(null);
                    }}
                    className="min-w-0 py-3 px-2 sm:px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-[11px] sm:text-xs rounded-xl shadow-lg shadow-amber-400/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>Add to Cart ({formatNaira(totalCost)})</span>
                  </button>
                  <button
                    onClick={() => {
                      openCheckoutWithMode('pay_now', product);
                      setActiveProductModal(null);
                    }}
                    className="min-w-0 py-3 px-2 sm:px-4 bg-[#f4b400] hover:bg-amber-300 text-black font-extrabold text-[11px] sm:text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CreditCard className="w-4 h-4 shrink-0" />
                    <span>Shop Now</span>
                  </button>
                </div>
                <a
                  href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS%20Alaba,%20I%20am%20interested%20in%20purchasing%20${quantity}%20units%20of%20${encodeURIComponent(product.name)}.%20Please%20confirm%20waybill%20availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#0e2717] hover:bg-[#143922] text-emerald-400 border border-emerald-500/30 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {product.subTitle}
              </p>

              {/* Price Banner */}
              <div className="mt-4 p-4 rounded-xl bg-[#161a23] border border-[#272e3d]">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl font-black text-white font-mono">
                        {formatNaira(currentUnitPrice)}
                      </span>
                      {product.originalPrice && currentUnitPrice <= product.price && (
                        <span className="text-xs text-slate-500 line-through font-mono">
                          {formatNaira(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {quantity >= product.minWholesaleQty || isWholesaleMode ? (
                        <span className="text-amber-400 font-semibold">Bulk Wholesale Tier Applied ({quantity} units)</span>
                      ) : (
                        <span>Standard Retail Price · Order {product.minWholesaleQty}+ for Wholesale</span>
                      )}
                    </p>
                  </div>

                  <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    In Stock ({product.stockCount} units available)
                  </span>
                </div>

                {savings > 0 && (
                  <div className="mt-2 text-xs text-amber-400 font-mono bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                    You save {formatNaira(savings)} on this bulk order!
                  </div>
                )}
              </div>

              {/* Wholesale Tier Table */}
              <div className="mt-4">
                <p className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5 font-mono uppercase tracking-wide">
                  <Boxes className="w-3.5 h-3.5 text-amber-400" />
                  Wholesale Volume Pricing Matrix:
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs text-center font-mono">
                  <div className={`p-2 rounded-lg border ${quantity < product.minWholesaleQty ? 'bg-[#1b202c] border-amber-400 text-white' : 'bg-[#141720] border-[#222736] text-slate-400'}`}>
                    <p className="text-[10px] text-slate-400">1 – 9 Units</p>
                    <p className="font-bold text-white text-xs">{formatNaira(product.price)}</p>
                    <span className="text-[9px] text-slate-500">Retail Unit</span>
                  </div>

                  {product.wholesaleTiers.slice(0, 2).map((tier, idx) => {
                    const isCurrentTier = quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty);
                    return (
                      <div 
                        key={idx}
                        className={`p-2 rounded-lg border ${isCurrentTier ? 'bg-[#1b202c] border-amber-400 text-amber-300' : 'bg-[#141720] border-[#222736] text-slate-400'}`}
                      >
                        <p className="text-[10px] text-slate-400">{tier.minQty}{tier.maxQty ? ` – ${tier.maxQty}` : '+'} Units</p>
                        <p className="font-bold text-amber-400 text-xs">{formatNaira(tier.pricePerUnit)}</p>
                        <span className="text-[9px] text-emerald-400">-{tier.discountPercent}% OFF</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-300">Quantity:</span>
                <div className="flex items-center bg-[#171b24] border border-[#2b3345] rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick preset wholesale button */}
                <button
                  onClick={() => setQuantity(product.minWholesaleQty)}
                  className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  Set to MOQ ({product.minWholesaleQty} units)
                </button>
              </div>

              {/* Additional purchase options */}
              <div className="mt-4 space-y-2.5">
                {product.saveToBuyEligible && (
                  <button
                    onClick={() => {
                      setActiveProductModal(null);
                      openCheckoutWithMode('save_to_buy', product);
                    }}
                    className="w-full py-2.5 px-4 bg-[#181c26] hover:bg-[#222838] text-white border border-[#2d364a] hover:border-emerald-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <PiggyBank className="w-4 h-4 text-emerald-400" />
                    <span>Save to Buy (Layaway)</span>
                  </button>
                )}

                {product.bnplEligible && (
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                        Buy Now, Pay Later
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Pay <span className="text-amber-400 font-bold">{formatNaira(bnplDownPayment)}</span> today, then 3 payments of {formatNaira(bnplInstallment)}.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveProductModal(null);
                        openCheckoutWithMode('bnpl', product);
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] rounded-lg transition-colors whitespace-nowrap"
                    >
                      Apply BNPL
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Specifications Sheet */}
            <div className="pt-4 border-t border-[#202533] space-y-3">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Technical Specifications & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="bg-[#0e1017] p-2 rounded-lg border border-[#1b202b]">
                    <span className="text-slate-500 text-[10px] block font-mono">{key}</span>
                    <span className="text-slate-200 font-medium text-[11px]">{val}</span>
                  </div>
                ))}
              </div>

              {/* Description Paragraph */}
              <p className="text-xs text-slate-400 leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
