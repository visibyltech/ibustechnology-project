import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  BatteryCharging, 
  Headphones, 
  PiggyBank, 
  CreditCard,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { BRAND_INFO } from '../data/products';

export const Hero: React.FC = () => {
  const { 
    setCurrentView, 
    setSelectedCategory, 
    products, 
    setActiveProductModal, 
    addToCart,
    openCheckoutWithMode
  } = useApp();

  const flagshipEarbuds = products.find((p) => p.id === 'ibus-buds-3') || products[0];
  const flagshipPowerBank = products.find((p) => p.id === 'ibus-pb-30000') || products[1];

  return (
    <div className="relative overflow-hidden bg-[#090a0d] border-b border-[#222734]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Statement & Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Direct from Alaba International Market, Lagos</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Wholesale & Retail</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
              Power Built for <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                Nigerian Energy.
              </span>
            </h1>

            {/* Brand Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Experience the pinnacle of Nigerian mobile tech engineering. Authentic high-capacity power banks, Active Noise Cancellation earbuds, and heavy-duty reinforced cables crafted to outlast every outage and commute.
            </p>

            {/* 3 Flexible Purchasing Pillars */}
            <div className="grid grid-cols-3 gap-2 py-2 max-w-lg">
              <div className="bg-[#12151c] border border-[#222734] rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-0.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Pay Now</span>
                </div>
                <p className="text-[11px] text-slate-400">Instant Paystack / Transfer</p>
              </div>

              <div className="bg-[#12151c] border border-[#222734] rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs mb-0.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>BNPL</span>
                </div>
                <p className="text-[11px] text-slate-400">25% down, spread in 4</p>
              </div>

              <div className="bg-[#12151c] border border-[#222734] rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-0.5">
                  <PiggyBank className="w-3.5 h-3.5" />
                  <span>Save to Buy</span>
                </div>
                <p className="text-[11px] text-slate-400">Target savings layaway</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentView('catalog');
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-black px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.02]"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('wholesale')}
                className="flex items-center gap-2 bg-[#151922] hover:bg-[#1d222e] text-white border border-[#2d3445] hover:border-amber-400/50 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Wholesale & Bulk Orders</span>
              </button>

              <button
                onClick={() => {
                  if (flagshipEarbuds) {
                    openCheckoutWithMode('save_to_buy', flagshipEarbuds);
                  }
                }}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors underline underline-offset-4"
              >
                Start a Save to Buy Plan &rarr;
              </button>
            </div>

            {/* Proof Metric Adjacency */}
            <div className="pt-2 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>12-Month Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>36 States Waybill Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Glow Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#181c25] to-[#0f1117] p-1.5 border border-[#2b3345] shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card Inner */}
                <div className="bg-[#10131a] rounded-xl p-5 relative">
                  
                  {/* Badge & Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                      Featured Flagship Duo
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Authentic iBUS Lineup
                    </span>
                  </div>

                  {/* Dual Hero Product Showcase Images */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Earbuds */}
                    <div 
                      onClick={() => setActiveProductModal(flagshipEarbuds)}
                      className="bg-[#171a23] rounded-xl p-3 border border-[#232938] hover:border-amber-400/50 cursor-pointer transition-all group/item"
                    >
                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-black/40 mb-2 relative">
                        <img 
                          src="/assets/aistudio/IMG-20261104-WA0088_1__650f297a.jpg" 
                          alt="iBUS buds 3.0 ANC" 
                          className="w-full h-full object-contain group-hover/item:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1.5 left-1.5 bg-black/80 backdrop-blur-sm text-[10px] text-amber-400 px-1.5 py-0.5 rounded font-mono font-bold">
                          ANC + ENC
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white truncate">iBUS buds 3.0</p>
                      <p className="text-[11px] text-amber-400 font-mono font-semibold">₦28,500</p>
                    </div>

                    {/* 30,000mAh Power Bank */}
                    <div 
                      onClick={() => setActiveProductModal(flagshipPowerBank)}
                      className="bg-[#171a23] rounded-xl p-3 border border-[#232938] hover:border-amber-400/50 cursor-pointer transition-all group/item"
                    >
                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-black/40 mb-2 relative">
                        <img 
                          src="/assets/aistudio/IMG-20261104-WA0080_1__de103086.jpg" 
                          alt="iBUS 30,000mAh Power Bank" 
                          className="w-full h-full object-contain group-hover/item:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1.5 left-1.5 bg-black/80 backdrop-blur-sm text-[10px] text-amber-400 px-1.5 py-0.5 rounded font-mono font-bold">
                          30,000mAh
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white truncate">Ultra Power Bank</p>
                      <p className="text-[11px] text-amber-400 font-mono font-semibold">₦34,000</p>
                    </div>
                  </div>

                  {/* Quick Highlight specs */}
                  <div className="space-y-2 py-2 border-t border-[#1f2430] text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Wholesale Carton Pricing:</span>
                      <span className="text-amber-400 font-mono font-bold">Up to 36% Off MOQ</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Save to Buy Initial Lock:</span>
                      <span className="text-emerald-400 font-mono font-bold">From ₦5,000 deposit</span>
                    </div>
                  </div>

                  {/* Quick Card Action */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(flagshipEarbuds, 1)}
                      className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition-colors"
                    >
                      Add Buds to Cart
                    </button>
                    <button
                      onClick={() => setActiveProductModal(flagshipPowerBank)}
                      className="w-full py-2 bg-[#1e2330] hover:bg-[#282f40] text-slate-200 font-semibold text-xs rounded-lg transition-colors border border-[#2d3548]"
                    >
                      View Specs & Tiers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Proof & Trust Strip Below Hero */}
      <div className="border-t border-[#1e2430] bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Genuine iBUS Quality</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">1-to-1 official replacement warranty on factory faults</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Nationwide Waybills</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Daily interstate logistics to all 36 Nigerian states</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Alaba Market Hub</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Ubakason Plaza UB96 showroom and direct warehouse</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">3-Way Payment Plans</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Pay Now, Buy Now Pay Later, or Save to Buy Layaway</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
