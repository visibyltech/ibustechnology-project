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
import { MessageCircle, ShieldCheck, Star, Building2, ArrowRight, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    notification,
    isWholesaleMode,
    isAdminAuthenticated,
    isAdminEmailRecognized,
    isAuthReady,
    toggleWholesaleMode
  } = useApp();

  return (
    <div className="min-h-screen bg-[#11141a] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#202631] border border-amber-400/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <a
        href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20Ibus%20Technology,%20I%20am%20browsing%20your%20website%20and%20need%20assistance.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
        title="Chat with Alaba Sales Desk on WhatsApp"
        aria-label="WhatsApp Sales Desk"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

      <Header />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <ProductCatalog />

            <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
              <div className="relative rounded-3xl bg-gradient-to-r from-[#1b202a] via-[#252d3a] to-[#1b202a] border border-[#343d4b] p-8 sm:p-12 overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      Wholesale & Distributor Program
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      Buy in Bulk. Distribute in Your State.
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
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
                        className="px-5 py-3 bg-[#252d3a] hover:bg-[#303a49] text-white border border-[#414c5d] text-xs font-semibold rounded-xl transition-colors"
                      >
                        {isWholesaleMode ? 'Switch Back to Retail' : 'Enable Wholesale Pricing Mode'}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-[#151a22] border border-[#343d4b] p-5 rounded-2xl space-y-3 font-mono text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Primary Warehouse:</span>
                      <span className="text-white font-bold">Ubakason Plaza UB96</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Interstate Waybills:</span>
                      <span className="text-emerald-300 font-bold">All 36 States</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Retailer Margins:</span>
                      <span className="text-amber-300 font-bold">30% to 45%</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Warranty Replacement:</span>
                      <span className="text-white font-bold">12 Months (1-to-1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>


          </>
        )}

        {currentView === 'catalog' && <ProductCatalog />}
        {currentView === 'wholesale' && <WholesaleSection />}
        {currentView === 'save-to-buy' && <SaveToBuyView />}
        {currentView === 'about-contact' && <AboutContact />}
        {currentView === 'dashboard' && <CustomerDashboard />}
        {currentView === 'admin' && (!isAuthReady ? (
          <section className="mx-auto my-16 max-w-xl rounded-2xl border border-[#414b5b] bg-[#1a1f28] p-8 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 animate-pulse text-amber-400" />
            <h2 className="mt-4 text-xl font-bold text-white">Checking administrator access…</h2>
            <p className="mt-2 text-sm text-slate-300">Please wait while your secure session is restored.</p>
          </section>
        ) : isAdminAuthenticated ? <AdminDashboard /> : (
          <section className="mx-auto my-16 max-w-xl rounded-2xl border border-[#414b5b] bg-[#1a1f28] p-8 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-amber-400" />
            <h2 className="mt-4 text-xl font-bold text-white">{isAdminEmailRecognized ? 'Administrator access is being prepared' : 'Administrator access required'}</h2>
            <p className="mt-2 text-sm text-slate-300">{isAdminEmailRecognized ? 'Your administrator account is recognized. Please wait for the secure session to finish loading.' : 'This area is restricted. Sign in with the authorized iBUS administrator account.'}</p>
            <button onClick={() => setCurrentView('home')} className="mt-5 rounded-lg bg-amber-400 px-5 py-2.5 text-xs font-bold text-black">Return to store</button>
          </section>
        ))}
      </main>

      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
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
