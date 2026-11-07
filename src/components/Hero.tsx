import React, { useEffect, useState } from 'react';
import { Zap, ArrowRight, PiggyBank, CreditCard, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data/products';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory, products } = useApp();

  // Rotate through real product photos for the hero background.
  const heroSlides = products
    .flatMap((product) => product.images.map((image) => ({ image, name: product.name })))
    .filter((slide) => Boolean(slide.image));
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative isolate overflow-hidden bg-[#090a0d] border-b border-[#222734]">
      {/* Automatic product-photo background slideshow */}
      <div
        key={heroSlides[activeHeroSlide]?.image || BRAND_INFO.logoUrl}
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-1000"
        style={{ backgroundImage: `url("${heroSlides[activeHeroSlide]?.image || BRAND_INFO.logoUrl}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d]/95 via-[#090a0d]/85 to-[#090a0d]/65 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-7 sm:py-9 lg:py-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-[10px] sm:text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono">
            Ibus Technology · Alaba International Market
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight text-balance">
            Power Built for <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Everyday Life.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Shop quality power banks, earbuds and charging accessories at great prices.
          </p>

          {/* Three compact ways to purchase */}
          <div className="grid grid-cols-3 gap-2 max-w-md">
            <div className="flex items-center justify-center gap-1.5 rounded-lg border border-[#222734] bg-[#12151c]/90 px-2 py-2 text-[10px] sm:text-xs font-semibold text-amber-400">
              <Zap className="w-3 h-3 shrink-0" />
              <span>Pay Now</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 rounded-lg border border-[#222734] bg-[#12151c]/90 px-2 py-2 text-[10px] sm:text-xs font-semibold text-blue-400">
              <CreditCard className="w-3 h-3 shrink-0" />
              <span>Buy Now, Pay Later</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 rounded-lg border border-[#222734] bg-[#12151c]/90 px-2 py-2 text-[10px] sm:text-xs font-semibold text-emerald-400">
              <PiggyBank className="w-3 h-3 shrink-0" />
              <span>Save to Buy</span>
            </div>
          </div>

          <div className="flex flex-row items-stretch gap-2 pt-1 w-full max-w-xl">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentView('catalog');
              }}
              className="flex flex-1 items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-black px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-lg shadow-amber-400/15 transition-all"
            >
              <span>Shop Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentView('wholesale')}
              className="flex flex-1 items-center justify-center gap-1.5 bg-[#151922] hover:bg-[#1d222e] text-white border border-[#2d3445] hover:border-amber-400/50 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Wholesale</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
