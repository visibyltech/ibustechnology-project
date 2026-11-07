import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Boxes, 
  PiggyBank, 
  CreditCard,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp();

  return (
    <footer className="bg-[#08090c] border-t border-[#1d222e] text-slate-400 text-xs">
      {/* Upper Footer: Value Props */}
      <div className="border-b border-[#181d28] bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">1-to-1 Warranty Guarantee</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Official 12-month replacement on all manufacturing defects</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/20">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">Alaba Wholesale Distribution</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Direct carton pricing & same-day interstate waybills</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/20">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs">Flexible Purchase Options</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Pay Now, Buy Now Pay Later, or Save to Buy layaway plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-black ring-1 ring-amber-400/40 shrink-0">
                <img 
                  src={BRAND_INFO.logoUrl} 
                  alt="iBUS Logo" 
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">
                  iBUS <span className="text-amber-400">GADGETS</span>
                </span>
                <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  {BRAND_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Premium Nigerian phone accessories brand. Specializing in high-capacity power banks, Active Noise Cancellation earbuds, heavy-duty cables, and turbo car chargers engineered for durability.
            </p>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{BRAND_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${BRAND_INFO.phoneClean}`} className="hover:text-amber-400">
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-amber-400">
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Product Categories (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('power-banks');
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  High-Capacity Power Banks (10k – 30k mAh)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('audio');
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Wireless ANC & ENC Earbuds
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('chargers');
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Dual USB Fast Car Chargers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('cables');
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Fast Charging Cables (Type-C, iPhone, Micro)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-amber-400 font-semibold"
                >
                  View Complete Lineup &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Distribution (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Wholesale & Financing
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('wholesale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Wholesale Distribution Hub</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('save-to-buy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Save to Buy Layaway Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Buy Now, Pay Later (0% Interest)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Nationwide Waybill Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('about-contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Alaba Showroom & Warehouse
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Badges & Verification (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Accepted Payments
            </h4>
            <p className="text-[11px] text-slate-500">
              Secured Nigerian payment processing powered by Paystack & Flutterwave.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-1 rounded bg-[#131620] border border-[#242b3b] text-[10px] font-mono text-slate-300 font-bold">
                PAYSTACK
              </span>
              <span className="px-2 py-1 rounded bg-[#131620] border border-[#242b3b] text-[10px] font-mono text-slate-300 font-bold">
                VERVE
              </span>
              <span className="px-2 py-1 rounded bg-[#131620] border border-[#242b3b] text-[10px] font-mono text-slate-300 font-bold">
                MASTERCARD
              </span>
              <span className="px-2 py-1 rounded bg-[#131620] border border-[#242b3b] text-[10px] font-mono text-slate-300 font-bold">
                VISA
              </span>
              <span className="px-2 py-1 rounded bg-[#131620] border border-[#242b3b] text-[10px] font-mono text-slate-300 font-bold">
                BANK TRANSFER
              </span>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 font-mono flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>256-Bit SSL Protection</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-[#161a24] bg-[#06070a] px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} iBUS Gadgets & Accessories Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>RC Verified · Lagos, Nigeria</span>
            <span>·</span>
            <a 
              href={BRAND_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:underline"
            >
              Ubakason Plaza, Alaba Int'l Market
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
