import React, { useEffect, useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory, products } = useApp();

  // Use every product image so the hero continuously showcases the live catalog.
  const heroSlides = products.flatMap((product) =>
    product.images.filter(Boolean).map((image) => ({ image, name: product.name }))
  );
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    if (activeHeroSlide >= heroSlides.length) setActiveHeroSlide(0);
  }, [activeHeroSlide, heroSlides.length]);

  const activeSlide = heroSlides[activeHeroSlide];

  return (
    <section className="relative isolate min-h-[250px] sm:min-h-[310px] lg:min-h-[350px] overflow-hidden bg-[#090a0d] border-b border-[#222734]">
      {/* Bright, full-section product slideshow background */}
      {activeSlide && (
        <img
          key={activeSlide.image}
          src={activeSlide.image}
          alt={activeSlide.name}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80 transition-opacity duration-700"
          referrerPolicy="no-referrer"
        />
      )}
      {/* Keep the product image visible while ensuring the headline stays readable. */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d]/75 via-[#090a0d]/35 to-[#090a0d]/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d]/55 via-transparent to-[#090a0d]/10 pointer-events-none" />

      <div className="relative z-10 flex min-h-[250px] sm:min-h-[310px] lg:min-h-[350px] max-w-7xl mx-auto items-center px-4 sm:px-6 py-7 sm:py-9">
        <div className="max-w-xl space-y-3">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
            Quality Tech for <span className="text-amber-400">Everyday Life.</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-md">
            Explore the iBUS collection.
          </p>
          <div className="flex flex-row items-center gap-2 pt-1">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentView('catalog');
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-black px-4 sm:px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              <span>Shop Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentView('wholesale')}
              className="flex items-center justify-center gap-1.5 bg-[#151922]/90 hover:bg-[#1d222e] text-white border border-white/25 px-3 sm:px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Wholesale</span>
            </button>
          </div>
        </div>
      </div>

      {heroSlides.length > 1 && (
        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5" aria-label="Product slideshow position">
          {heroSlides.map((slide, index) => (
            <span
              key={slide.image + index}
              className={`h-1.5 rounded-full transition-all ${index === activeHeroSlide ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/65'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
