import React, { useState } from 'react';
import { 
  User, 
  Package, 
  PiggyBank, 
  CreditCard, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Trash2, 
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { BRAND_INFO } from '../data/products';

export const CustomerDashboard: React.FC = () => {
  const { 
    user, 
    orders, 
    saveToBuyPlans, 
    bnplPlans, 
    payBnplInstallment, 
    wishlist, 
    products, 
    addToCart, 
    toggleWishlist,
    setCurrentView,
    loginAsDemoUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'save_to_buy' | 'bnpl' | 'wishlist' | 'profile'>('orders');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      
      {/* Top Profile Banner */}
      <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shrink-0 shadow-lg shadow-amber-400/20">
            <div className="w-full h-full bg-[#11141c] rounded-[14px] flex items-center justify-center text-amber-400 font-extrabold text-2xl font-mono">
              {user?.name.charAt(0) || 'U'}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {user?.name || 'Customer Portal'}
              </h1>
              {user?.isWholesaleCustomer && (
                <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Wholesale Distributor
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              {user?.email} · {user?.phone}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {user?.address.street}, {user?.address.city}, {user?.address.state}
            </p>
          </div>
        </div>

        {/* Quick Demo Switcher if needed */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {!user ? (
            <button
              onClick={() => loginAsDemoUser(false)}
              className="px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-xl"
            >
              Sign In Demo Account
            </button>
          ) : (
            <button
              onClick={() => loginAsDemoUser(!user.isWholesaleCustomer)}
              className="px-3.5 py-2 bg-[#191e2b] hover:bg-[#232a3d] text-slate-300 text-xs font-semibold rounded-xl border border-[#2a3449] transition-colors"
            >
              Switch to {user.isWholesaleCustomer ? 'Retail Profile' : 'Distributor Profile'}
            </button>
          )}
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#222736]">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'orders' 
              ? 'bg-amber-400 text-black shadow-md' 
              : 'bg-[#12151e] text-slate-300 hover:bg-[#1a1f2c] border border-[#232938]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('save_to_buy')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'save_to_buy' 
              ? 'bg-emerald-500 text-black shadow-md' 
              : 'bg-[#12151e] text-slate-300 hover:bg-[#1a1f2c] border border-[#232938]'
          }`}
        >
          <PiggyBank className="w-4 h-4" />
          <span>Save to Buy Layaway ({saveToBuyPlans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bnpl')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bnpl' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-[#12151e] text-slate-300 hover:bg-[#1a1f2c] border border-[#232938]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Buy Now Pay Later ({bnplPlans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'wishlist' 
              ? 'bg-amber-400 text-black shadow-md' 
              : 'bg-[#12151e] text-slate-300 hover:bg-[#1a1f2c] border border-[#232938]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlist.length})</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Order History & Nationwide Tracking
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Dispatched from Ubakason Plaza UB96, Alaba
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-10 text-center max-w-md mx-auto">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white">No orders placed yet</h4>
              <p className="text-xs text-slate-400 mt-1">
                Browse our catalog and experience fast nationwide delivery.
              </p>
              <button
                onClick={() => setCurrentView('catalog')}
                className="mt-4 px-4 py-2 bg-amber-400 text-black font-bold text-xs rounded-xl"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div 
                  key={ord.id}
                  className="bg-[#11141c] border border-[#222736] rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f2433] text-xs font-mono">
                    <div>
                      <span className="text-amber-400 font-bold text-sm block">{ord.orderNumber}</span>
                      <span className="text-slate-500 text-[11px]">{ord.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                        ord.orderStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                        ord.orderStatus === 'dispatched' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-400/20 text-amber-300'
                      }`}>
                        {ord.orderStatus.replace('_', ' ')}
                      </span>
                      <span className="text-white font-extrabold text-sm">{formatNaira(ord.total)}</span>
                    </div>
                  </div>

                  {/* Visual Tracker Bar */}
                  <div className="py-2 bg-[#0c0e14] p-4 rounded-xl border border-[#1b202a]">
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                      <div className="space-y-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto font-bold">✓</div>
                        <span className="text-slate-200">Order Placed</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto font-bold ${
                          ['processing', 'dispatched', 'delivered'].includes(ord.orderStatus) ? 'bg-emerald-500 text-black' : 'bg-[#1e2330] text-slate-500'
                        }`}>✓</div>
                        <span className="text-slate-200">Packed in Alaba</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto font-bold ${
                          ['dispatched', 'delivered'].includes(ord.orderStatus) ? 'bg-emerald-500 text-black' : 'bg-[#1e2330] text-slate-500'
                        }`}>✓</div>
                        <span className="text-slate-200">With Courier</span>
                      </div>
                      <div className="space-y-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto font-bold ${
                          ord.orderStatus === 'delivered' ? 'bg-emerald-500 text-black' : 'bg-[#1e2330] text-slate-500'
                        }`}>✓</div>
                        <span className="text-slate-200">Delivered</span>
                      </div>
                    </div>
                    {ord.trackingNumber && (
                      <p className="text-center text-[11px] text-amber-400 font-mono mt-3">
                        Courier: {ord.trackingCourier} · Waybill Tracking #: <span className="text-white font-bold">{ord.trackingNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 pt-1">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#1b202a] last:border-0">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image} 
                            alt={item.productName} 
                            className="w-10 h-10 object-contain bg-black rounded p-1"
                          />
                          <div>
                            <p className="font-bold text-white">{item.productName}</p>
                            <span className="text-slate-400 font-mono text-[11px]">Qty: {item.quantity} · {formatNaira(item.unitPrice)} each</span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-white">{formatNaira(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer details */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-[#1f2433]">
                    <span>Destination: {ord.deliveryAddress.street}, {ord.deliveryAddress.city}, {ord.deliveryAddress.state}</span>
                    <a
                      href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS%20Alaba,%20I%20am%20tracking%20my%20Order%20${ord.orderNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 font-mono"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Inquire Dispatch Status</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. SAVE TO BUY TAB */}
      {activeTab === 'save_to_buy' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              My Save to Buy Layaway Plans
            </h2>
            <button
              onClick={() => setCurrentView('save-to-buy')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl"
            >
              Open Full Savings Hub
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {saveToBuyPlans.map((plan) => {
              const percent = Math.min(100, Math.round((plan.totalSaved / plan.targetAmount) * 100));
              return (
                <div key={plan.id} className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">{plan.planNumber}</span>
                    <span className="text-emerald-400 uppercase font-bold">{percent}% Saved</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <img src={plan.productImage} alt={plan.productName} className="w-14 h-14 object-contain bg-black rounded p-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{plan.productName}</h4>
                      <p className="text-xs text-slate-400 font-mono">Target: {formatNaira(plan.targetAmount)}</p>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-[#1e2330] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 transition-all" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-slate-400">Total Saved: {formatNaira(plan.totalSaved)}</span>
                    <button
                      onClick={() => setCurrentView('save-to-buy')}
                      className="text-emerald-400 hover:underline font-bold"
                    >
                      Make Deposit &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. BNPL TAB */}
      {activeTab === 'bnpl' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Buy Now, Pay Later Active Installments
            </h2>
            <span className="text-xs text-blue-400 font-mono">0% Interest Credit Line</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bnplPlans.map((plan) => (
              <div key={plan.id} className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-400 font-bold">{plan.applicationNumber}</span>
                  <span className="text-slate-400">Remaining: <span className="text-white font-bold">{formatNaira(plan.amountRemaining)}</span></span>
                </div>

                <div className="flex gap-3 items-center">
                  <img src={plan.productImage} alt={plan.productName} className="w-14 h-14 object-contain bg-black rounded p-1" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{plan.productName}</h4>
                    <p className="text-xs text-slate-400 font-mono">Total: {formatNaira(plan.totalAmount)}</p>
                  </div>
                </div>

                {/* Installment breakdown */}
                <div className="space-y-2 pt-2 border-t border-[#1f2433]">
                  <p className="text-xs font-bold text-slate-300 font-mono uppercase">Payment Schedule:</p>
                  {plan.installments.map((inst) => (
                    <div 
                      key={inst.installmentNumber}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#0d0f15] border border-[#1b202a] text-xs font-mono"
                    >
                      <div>
                        <span className="text-white font-bold">Installment #{inst.installmentNumber}</span>
                        <span className="text-slate-500 ml-2">Due: {inst.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{formatNaira(inst.amount)}</span>
                        {inst.paid ? (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">Paid</span>
                        ) : (
                          <button
                            onClick={() => payBnplInstallment(plan.id, inst.installmentNumber)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded"
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. WISHLIST TAB */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Saved Products Wishlist ({wishlistProducts.length})
          </h2>

          {wishlistProducts.length === 0 ? (
            <p className="text-xs text-slate-400">No items in your wishlist.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistProducts.map((prod) => (
                <div key={prod.id} className="bg-[#11141c] border border-[#222736] rounded-xl p-4 flex gap-3 items-center">
                  <img src={prod.images[0]} alt={prod.name} className="w-16 h-16 object-contain bg-black rounded p-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                    <p className="text-xs text-amber-400 font-mono font-bold mt-0.5">{formatNaira(prod.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="px-2.5 py-1 bg-amber-400 text-black text-[10px] font-bold rounded hover:bg-amber-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="text-slate-500 hover:text-red-400 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
