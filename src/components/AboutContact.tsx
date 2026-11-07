import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Building2,
  Truck
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';
import { useApp } from '../context/AppContext';

export const AboutContact: React.FC = () => {
  const { showNotification } = useApp();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Product Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showNotification('Thank you! Your message has been sent to our Alaba sales desk.');
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Brand Identity & Showroom Hero */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#10131a] via-[#161a24] to-[#10131a] border border-[#262c3e] p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Showroom & Central Warehouse</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              iBUS Gadgets & Accessories <br />
              <span className="text-amber-400">Your Connection to Quality!</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Located at the epicenter of West Africa’s electronics commerce—Alaba International Market, Lagos—iBUS represents the benchmark for authentic, long-lasting mobile power and audio tech. We cater to individual device enthusiasts and nationwide bulk distributors alike.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS%20Alaba,%20I%20would%20like%20to%20visit%20your%20showroom%20at%20Ubakason%20Plaza.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-400/20 flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Chat on WhatsApp (+234 810 220 8521)</span>
              </a>

              <a
                href={BRAND_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#191e2b] hover:bg-[#232938] text-slate-200 border border-[#2f394d] text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Brand Badge / Logo Showcase */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-56 h-56 rounded-full bg-black p-2 ring-4 ring-amber-400/30 shadow-2xl relative group">
              <img 
                src={BRAND_INFO.logoUrl} 
                alt="iBUS Logo" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Showroom Location & Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Physical Address */}
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Showroom & Warehouse</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            UB96, Ubakason Plaza, Alaba International Market, Ojo, Lagos, Nigeria.
          </p>
          <a
            href={BRAND_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-bold pt-1"
          >
            <span>Get Directions on Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* WhatsApp & Phone */}
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Call & WhatsApp</h3>
          <p className="text-xs text-slate-300 font-mono">
            +234 810 220 8521
          </p>
          <p className="text-[11px] text-slate-500">
            Direct sales desk, waybill verification & wholesale queries.
          </p>
          <a
            href={`tel:${BRAND_INFO.phoneClean}`}
            className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-bold pt-1"
          >
            <span>Click to Call Directly</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Email */}
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Official Email</h3>
          <p className="text-xs text-slate-300 font-mono">
            ibustechltd@gmail.com
          </p>
          <p className="text-[11px] text-slate-500">
            For wholesale contracts, distributor applications, and warranty inquiries.
          </p>
          <a
            href="mailto:ibustechltd@gmail.com"
            className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 font-bold pt-1"
          >
            <span>Send Email Message</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Showroom Hours */}
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Opening Hours</h3>
          <div className="text-xs text-slate-300 space-y-1 font-mono">
            <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
            <p>Saturday: 8:30 AM – 6:00 PM</p>
            <p className="text-amber-400">Sunday: Closed (Online Open)</p>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold block pt-1">
            Same-day waybill cutoff: 3:00 PM
          </span>
        </div>

      </div>

      {/* Embedded Google Map & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Embedded Interactive Google Map (7 cols) */}
        <div className="lg:col-span-7 bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Alaba International Market Location
              </h3>
              <p className="text-xs text-slate-400">Ubakason Plaza UB96, Alaba, Ojo, Lagos</p>
            </div>
            <a
              href={BRAND_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono font-bold"
            >
              <span>View Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map Frame */}
          <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[#222736] relative bg-[#0d0f15]">
            <iframe
              title="iBUS Alaba Market Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.571477784013!2d3.1951597!3d6.4490333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b879c37951a31%3A0xe6bf44b7f83b276!2sAlaba%20International%20Market!5e0!3m2!1sen!2sng!4v1714000000000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale contrast-125 opacity-90"
            />
            {/* Overlay Chip */}
            <div className="absolute bottom-3 left-3 bg-[#0a0c10]/90 backdrop-blur-md border border-[#2b3345] p-2.5 rounded-lg text-xs font-mono">
              <p className="font-bold text-amber-400">iBUS Gadgets & Accessories</p>
              <p className="text-[10px] text-slate-300">UB96 Ubakason Plaza, Alaba Market, Lagos</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <span>Landmark: Near Main Electronics Section & Transporter Loading Bay</span>
            <span className="text-amber-400 font-mono">GPS Coordinates Verified</span>
          </div>
        </div>

        {/* Contact Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#11141c] border border-[#222736] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Send a Message</span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            How Can We Assist You?
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Have a question about a product, warranty replacement, or bulk order? Drop your message below.
          </p>

          {sent ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">Message Dispatched!</p>
              <p className="text-xs text-slate-300">
                Our support team will respond to your email or WhatsApp number shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 px-4 py-2 bg-emerald-500 text-black font-bold text-xs rounded-lg"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Chukwudi Eze"
                  className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+234 810 220 8521"
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 font-mono text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="chukwudi@gmail.com"
                    className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Topic</label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                >
                  <option>Product Inquiries & Specifications</option>
                  <option>Wholesale & Dealer Carton Pricing</option>
                  <option>Save to Buy Layaway Support</option>
                  <option>12-Month Warranty Replacement</option>
                  <option>Interstate Waybill Tracking</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full bg-[#161a24] border border-[#293244] focus:border-amber-400 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Submit Inquiry to Alaba Desk</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
