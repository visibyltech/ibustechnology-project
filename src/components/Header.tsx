import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Boxes, 
  PiggyBank, 
  CreditCard,
  Building2,
  Lock
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { BRAND_INFO } from '../data/products';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    isWholesaleMode,
    toggleWholesaleMode,
    user,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    loginAsDemoUser,
    logout,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (view: typeof currentView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090a0d]/95 backdrop-blur-md border-b border-[#222734]">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#111319] via-[#1a1d26] to-[#111319] border-b border-[#222734] px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              100% Authentic iBUS Products
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-slate-500" />
              Alaba Int'l Market, Lagos
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              Same-day dispatch nationwide across all 36 States
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS%20Gadgets,%20I%20am%20inquiry%20from%20your%20website`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="font-mono text-xs font-medium">{BRAND_INFO.phone}</span>
            </a>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  handleNavClick('admin');
                } else {
                  const pass = prompt('Enter Admin Access Code (Default: ibus2026):');
                  if (pass === 'ibus2026' || pass === 'admin') {
                    setIsAdminAuthenticated(true);
                    handleNavClick('admin');
                  } else if (pass !== null) {
                    alert('Invalid credentials. Use: ibus2026');
                  }
                }
              }}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-2.5 h-2.5" />
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Header - Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark & Official Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 group text-left shrink-0 cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-amber-400/30 group-hover:ring-amber-400 transition-all duration-300 bg-black flex items-center justify-center">
            <img 
              src={BRAND_INFO.logoUrl} 
              alt="Ibus Technology logo" 
              className="w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Ibus <span className="text-amber-400 font-light text-base">Technology</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-mono">
              Your Connection to Quality!
            </span>
          </div>
        </button>

        {/* Zone 2: Primary Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap transition-colors hover:text-amber-400 ${
              currentView === 'home' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Store Home
          </button>
          <button
            onClick={() => {
              setSelectedCategory('all');
              handleNavClick('catalog');
            }}
            className={`whitespace-nowrap transition-colors hover:text-amber-400 ${
              currentView === 'catalog' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Product Catalog
          </button>
          <button
            onClick={() => handleNavClick('wholesale')}
            className={`whitespace-nowrap flex items-center gap-1.5 transition-colors hover:text-amber-400 ${
              currentView === 'wholesale' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            Wholesale Hub
          </button>
          <button
            onClick={() => handleNavClick('save-to-buy')}
            className={`whitespace-nowrap flex items-center gap-1.5 transition-colors hover:text-amber-400 ${
              currentView === 'save-to-buy' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
            Save to Buy
          </button>
          <button
            onClick={() => handleNavClick('about-contact')}
            className={`whitespace-nowrap transition-colors hover:text-amber-400 ${
              currentView === 'about-contact' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : ''
            }`}
          >
            Alaba Showroom
          </button>
        </nav>

        {/* Zone 3: Primary Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Wholesale Mode Toggle Pill Button */}
          <button
            onClick={toggleWholesaleMode}
            className={`relative hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              isWholesaleMode 
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' 
                : 'bg-[#181c25] hover:bg-[#222734] text-slate-300 border border-[#2b3242]'
            }`}
            title="Toggle between Retail Price and Wholesale Carton Pricing"
          >
            <Boxes className={`w-3.5 h-3.5 ${isWholesaleMode ? 'text-black' : 'text-amber-400'}`} />
            <span className="whitespace-nowrap">
              {isWholesaleMode ? 'Wholesale Mode Active' : 'Wholesale Pricing'}
            </span>
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="p-2 text-slate-300 hover:text-amber-400 hover:bg-[#181c25] rounded-lg transition-colors relative"
            title="Saved Items"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 text-slate-300 hover:text-amber-400 hover:bg-[#181c25] rounded-lg transition-colors flex items-center gap-1.5"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="hidden xl:inline text-xs font-medium text-slate-300 max-w-[90px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {userDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-[#12151c] border border-[#262c3b] rounded-xl shadow-2xl py-2 z-50 text-xs"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-[#222734]">
                      <p className="font-semibold text-white truncate">{user.name}</p>
                      <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
                      {user.isWholesaleCustomer && (
                        <span className="mt-1 inline-block text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                          Verified Distributor
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1f2b] text-slate-200"
                    >
                      My Dashboard & Orders
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('save-to-buy');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1f2b] text-slate-200"
                    >
                      Save to Buy Tracker
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1f2b] text-amber-400"
                    >
                      Admin Console
                    </button>
                    <div className="border-t border-[#222734] my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1f2b] text-red-400"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-[#222734]">
                      <p className="text-slate-400 text-[11px]">Welcome to iBUS Nigeria</p>
                    </div>
                    <button
                      onClick={() => {
                        loginAsDemoUser(false);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1f2b] text-white"
                    >
                      Sign in (Retail Customer)
                    </button>
                    <button
                      onClick={() => {
                        loginAsDemoUser(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#1a1f2b] text-amber-400 font-medium"
                    >
                      Sign in (Wholesale Distributor)
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Primary CTA */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black px-3.5 py-2 rounded-lg font-bold text-xs shadow-lg shadow-amber-400/10 hover:shadow-amber-400/25 transition-all"
            aria-label="Open Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black text-amber-400 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono">
              {cartSubtotal > 0 ? formatNaira(cartSubtotal) : 'Cart'}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white lg:hidden rounded-lg hover:bg-[#181c25]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1017] border-b border-[#222734] px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => {
                toggleWholesaleMode();
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                isWholesaleMode ? 'bg-amber-400 text-black' : 'bg-[#1a1f2b] text-slate-200 border border-[#2b3242]'
              }`}
            >
              <Boxes className="w-4 h-4" />
              {isWholesaleMode ? 'Wholesale Mode Active (Bulk Prices)' : 'Switch to Wholesale Mode'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'home' ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Store Home
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'catalog' ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Product Catalog
            </button>
            <button
              onClick={() => handleNavClick('wholesale')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'wholesale' ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Wholesale Sourcing
            </button>
            <button
              onClick={() => handleNavClick('save-to-buy')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'save-to-buy' ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Save to Buy (Layaway)
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'dashboard' ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              My Orders & BNPL
            </button>
            <button
              onClick={() => handleNavClick('about-contact')}
              className={`p-2.5 rounded-lg text-left ${currentView === 'about-contact' ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Alaba Showroom
            </button>
          </div>

          <div className="pt-2 border-t border-[#222734] flex items-center justify-between text-xs text-slate-400">
            <span>Alaba Plaza UB96, Lagos</span>
            <a href={`tel:${BRAND_INFO.phoneClean}`} className="text-amber-400 font-mono">
              {BRAND_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
