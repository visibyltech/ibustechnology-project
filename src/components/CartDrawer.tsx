import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Boxes,
  Zap,
  CreditCard,
  PiggyBank
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { BRAND_INFO } from '../data/products';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal,
    cartSavings,
    openCheckoutWithMode,
    isWholesaleMode
  } = useApp();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = BRAND_INFO.freeDeliveryThresholdLagos;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-[#0f1219] border-l border-[#222736] flex flex-col h-full shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202533] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Your Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a1f2c] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Tracker (Lagos) */}
        <div className="bg-[#141722] px-5 py-3 border-b border-[#202533]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
            <span className="text-slate-300 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              Lagos Free Delivery:
            </span>
            <span className="font-semibold text-amber-400">
              {cartSubtotal >= freeDeliveryThreshold ? 'Unlocked! 🎉' : `${formatNaira(remainingForFreeDelivery)} away`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#222838] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#181d28] border border-[#273042] flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Your cart is currently empty</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore our high-performance power banks, earbuds, and charging accessories.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-colors"
              >
                Browse Store Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.product.id}
                className="bg-[#151923] border border-[#222736] rounded-xl p-3 flex gap-3 relative group"
              >
                {/* Product Thumbnail */}
                <div className="w-18 h-18 bg-[#0a0c10] rounded-lg border border-[#222736] p-1.5 shrink-0 flex items-center justify-center">
                  <img 
                    src={item.product.images[0] || BRAND_INFO.logoUrl} 
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-0.5 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {item.isWholesale && (
                      <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1 mt-0.5 font-semibold">
                        <Boxes className="w-3 h-3" />
                        Wholesale Bulk Rate
                      </span>
                    )}
                  </div>

                  {/* Quantity and Price Row */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e2330]">
                    <div className="flex items-center bg-[#0d1017] border border-[#293144] rounded-md">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white">
                        {formatNaira(item.unitPrice * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[10px] text-slate-500 font-mono">
                          {formatNaira(item.unitPrice)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#202533] bg-[#121620] space-y-3">
            {/* Savings callout */}
            {cartSavings > 0 && (
              <div className="flex items-center justify-between text-xs text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20 font-mono">
                <span>Total Bulk Savings:</span>
                <span className="font-bold">-{formatNaira(cartSavings)}</span>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Subtotal:</span>
              <span className="text-xl font-black text-white font-mono">
                {formatNaira(cartSubtotal)}
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Taxes included. Delivery calculated at checkout across all 36 Nigerian states.
            </p>

            {/* Checkout CTAs */}
            <div className="space-y-2">
              <button
                onClick={() => openCheckoutWithMode('pay_now')}
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-black" />
                <span>Pay Now (Paystack / Transfer / USSD)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openCheckoutWithMode('bnpl')}
                  className="py-2.5 px-2 bg-[#1a202c] hover:bg-[#252c3c] text-white border border-[#2e374a] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                  <span>Buy Now Pay Later</span>
                </button>

                <button
                  onClick={() => openCheckoutWithMode('save_to_buy')}
                  className="py-2.5 px-2 bg-[#1a202c] hover:bg-[#252c3c] text-white border border-[#2e374a] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Save to Buy</span>
                </button>
              </div>
            </div>

            {/* Clear Cart */}
            <div className="flex justify-between items-center pt-1 text-[11px] text-slate-400">
              <button
                onClick={clearCart}
                className="hover:text-red-400 transition-colors"
              >
                Clear Cart
              </button>
              <span className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                SSL Encrypted Checkout
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
