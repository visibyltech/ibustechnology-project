/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SaveToBuyView } from './components/SaveToBuyView';
import { WholesaleSection } from './components/WholesaleSection';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutContact } from './components/AboutContact';
import { Footer } from './components/Footer';
import { BRAND_INFO, TESTIMONIALS } from './data/products';
import { 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  Truck, 
  Building2, 
  PiggyBank, 
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    notification, 
    isWholesaleMode, 
    toggleWholesaleMode 
  } = useApp();

  return (
    <div className="min-h-screen bg-[#090a0d] text-slate-200 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#161a24] border border-amber-400/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS%20Gadgets,%20I%20am%20browsing%20your%20website%20and%20need%20assistance.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
        title="Chat with Alaba Sales Desk on WhatsApp"
        aria-label="WhatsApp Sales Desk"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

      {/* Persistent Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Cinematic Hero Section */}
            <Hero />

            {/* 2. Primary Product Catalog & Categories */}
            <ProductCatalog />

            {/* 3. Wholesale Teaser Banner (Direct Sourcing from Alaba) */}
            <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
              <div className="relative rounded-3xl bg-gradient-to-r from-[#12151e] via-[#1a202d] to-[#12151e] border border-[#273042] p-8 sm:p-12 overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      Wholesale & Distributor Program
                    </span>

                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      Buy in Bulk. Distribute in Your State.
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                      Looking to supply phone accessories in Computer Village Ikeja, Onitsha Main Market, Port Harcourt, or Kano? Take advantage of our direct carton pricing, branded POS kits, and daily nationwide interstate bus waybills.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setCurrentView('wholesale')}
                        className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                      >
                        <span>Open Wholesale Hub</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={toggleWholesaleMode}
                        className="px-5 py-3 bg-[#1e2433] hover:bg-[#283042] text-white border border-[#313c52] text-xs font-semibold rounded-xl transition-colors"
                      >
                        {isWholesaleMode ? 'Switch Back to Retail' : 'Enable Wholesale Pricing Mode'}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-[#0d0f15] border border-[#222736] p-5 rounded-2xl space-y-3 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Primary Warehouse:</span>
                      <span className="text-white font-bold">Ubakason Plaza UB96</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Interstate Waybills:</span>
                      <span className="text-emerald-400 font-bold">All 36 States</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Retailer Margins:</span>
                      <span className="text-amber-400 font-bold">30% to 45%</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Warranty Replacement:</span>
                      <span className="text-white font-bold">12 Months (1-to-1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Verified Customer & Retailer Testimonials */}
            <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#1d222e]">
              <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Real Feedback from Nigeria
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Trusted by Retailers & Gadget Lovers
                </h2>
                <p className="text-xs text-slate-400">
                  From Computer Village to Onitsha and Port Harcourt, discover why thousands trust authentic iBUS accessories.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{t.comment}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1e2330]">
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <p className="text-[11px] text-slate-400">{t.role}</p>
                      <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">{t.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'catalog' && <ProductCatalog />}
        {currentView === 'wholesale' && <WholesaleSection />}
        {currentView === 'save-to-buy' && <SaveToBuyView />}
        {currentView === 'about-contact' && <AboutContact />}
        {currentView === 'dashboard' && <CustomerDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
