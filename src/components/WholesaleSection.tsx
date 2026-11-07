import React, { useState } from 'react';
import { 
  Building2, 
  Boxes, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  Download, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { BRAND_INFO, WHOLESALE_BENEFITS } from '../data/products';

export const WholesaleSection: React.FC = () => {
  const { 
    products, 
    isWholesaleMode, 
    toggleWholesaleMode, 
    submitWholesaleInquiry,
    addToCart,
    setCurrentView
  } = useApp();

  // Enquiry form states
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('Lagos');
  const [volume, setVolume] = useState('₦1,000,000 - ₦3,000,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitWholesaleInquiry({
      name,
      businessName: businessName || `${name} Enterprises`,
      email: email || 'dealer@gmail.com',
      phone,
      state,
      interestedCategories: ['Power Banks', 'Wireless Audio', 'Cables'],
      estimatedMonthlyVolume: volume,
      message: message || 'Interested in dealership / carton distribution in my state.'
    });

    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#11141c] via-[#171b26] to-[#11141c] border border-[#262c3d] p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Alaba International Market B2B Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Distribute iBUS Gadgets in Your State. <br />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              High Margins. Zero Returns.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Partner directly with our primary warehouse at Ubakason Plaza UB96, Alaba International Market. Access wholesale carton pricing, verified dealer allocations, branded POS display collateral, and same-day interstate waybills to Computer Village, Onitsha Main Market, Farm Centre Kano, and across all 36 states.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={toggleWholesaleMode}
              className={`px-6 py-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isWholesaleMode 
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20' 
                  : 'bg-[#222938] hover:bg-[#2c3548] text-white border border-[#353f56]'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>{isWholesaleMode ? 'Wholesale Pricing Active in Store' : 'Browse Store in Wholesale Mode'}</span>
            </button>

            <a
              href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS%20Alaba,%20I%20am%20interested%20in%20becoming%20a%20registered%20regional%20distributor.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#0e2a18] hover:bg-[#143d23] text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Alaba Wholesale Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Wholesale Partnership */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHOLESALE_BENEFITS.map((item, idx) => (
          <div 
            key={idx}
            className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-3 relative group hover:border-amber-400/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">0{idx + 1}</span>
              <span className="text-[11px] font-mono font-bold bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
                {item.stat}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* WHOLESALE PRICE LIST MATRIX */}
      <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#202533]">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Master Wholesale & Bulk Price Sheet
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Current factory carton prices (FOB Alaba International Market, Lagos).
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#1b202c] hover:bg-[#252c3c] text-slate-200 border border-[#2d3648] text-xs font-semibold rounded-lg flex items-center gap-2 self-start transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Official Price Sheet</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#222838] text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Model / Product</th>
                <th className="pb-3 font-semibold">Retail Price</th>
                <th className="pb-3 font-semibold text-amber-400">Carton Price (MOQ)</th>
                <th className="pb-3 font-semibold text-emerald-400">Super Dealer (50+)</th>
                <th className="pb-3 font-semibold">Margin %</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c212d]">
              {products.map((prod) => {
                const superDealerTier = prod.wholesaleTiers.find((t) => t.minQty >= 30) || prod.wholesaleTiers[prod.wholesaleTiers.length - 1];
                const marginPercent = Math.round(((prod.price - prod.wholesalePrice) / prod.price) * 100);

                return (
                  <tr key={prod.id} className="hover:bg-[#161a24] transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-10 h-10 object-contain bg-black rounded p-1 shrink-0"
                        />
                        <div>
                          <p className="text-xs font-bold text-white font-sans">{prod.name}</p>
                          <span className="text-[10px] text-slate-500 font-mono">MOQ: {prod.minWholesaleQty} units</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-400">{formatNaira(prod.price)}</td>
                    <td className="py-3.5 text-amber-400 font-bold">{formatNaira(prod.wholesalePrice)}</td>
                    <td className="py-3.5 text-emerald-400 font-bold">{formatNaira(superDealerTier?.pricePerUnit || prod.wholesalePrice)}</td>
                    <td className="py-3.5 text-white font-bold">{marginPercent}% Margin</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => addToCart(prod, prod.minWholesaleQty, true)}
                        className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] rounded-lg transition-colors"
                      >
                        Add Carton ({prod.minWholesaleQty})
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* WHOLESALE DISTRIBUTOR APPLICATION FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Information */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <span>Direct Account Setup</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Register as an Authorized iBUS Retailer / Distributor
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Fill in your business details. Our commercial sales manager at Ubakason Plaza Alaba will review your submission and connect with you on WhatsApp within 3 business hours with custom carton quotes and payment terms.
          </p>

          <div className="p-4 rounded-xl bg-[#12151e] border border-[#222736] space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>UB96, Ubakason Plaza, Alaba International Market, Lagos</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>WhatsApp / Calls: +234 810 220 8521</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: ibustechltd@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 bg-[#11141c] border border-[#222736] rounded-2xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Wholesale Application Received</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Thank you for applying. An official iBUS trade representative has been assigned to your business. We will reach out on WhatsApp at <span className="text-white font-mono">{phone}</span> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-amber-400 text-black font-bold text-xs rounded-xl hover:bg-amber-300 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white mb-2">Wholesale Partnership Application</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Obinna Chukwuma"
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Business / Store Name *</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Mobile Tech"
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 812 345 6789"
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 font-mono text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dealer@gmail.com"
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Your State / Market Location *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Anambra (Onitsha Main Market)"
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Estimated Monthly Purchase Volume</label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option>₦500,000 - ₦1,500,000 (Retailer Pack)</option>
                    <option>₦1,500,000 - ₦3,500,000 (Major Dealer)</option>
                    <option>₦3,500,000 - ₦10,000,000+ (Master Distributor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Specific Product Requirements or Notes</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Which products are you most interested in? (e.g. 30,000mAh power banks, ANC earbuds, 2-pack fast cables)..."
                  className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Submit Distributor Application</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
