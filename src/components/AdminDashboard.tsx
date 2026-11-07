import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Boxes, 
  PiggyBank, 
  CreditCard, 
  Users, 
  Plus, 
  Check, 
  Edit3, 
  Trash2, 
  Truck, 
  Phone, 
  Mail, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  Eye,
  X
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { Product, ProductCategory, OrderStatus } from '../types';
import { BRAND_INFO } from '../data/products';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    saveToBuyPlans, 
    verifySaveToBuyDeposit,
    bnplPlans, 
    wholesaleInquiries, 
    updateInquiryStatus,
    showNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'save_to_buy' | 'bnpl' | 'inquiries'>('overview');

  // New product modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdSubTitle, setNewProdSubTitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('power-banks');
  const [newProdPrice, setNewProdPrice] = useState(25000);
  const [newProdWholesalePrice, setNewProdWholesalePrice] = useState(19000);
  const [newProdMinWholesaleQty, setNewProdMinWholesaleQty] = useState(10);
  const [newProdStock, setNewProdStock] = useState(100);
  const [newProdBadge, setNewProdBadge] = useState('New Release');
  const [newProdImage, setNewProdImage] = useState('/assets/aistudio/IMG-20261104-WA0088_1__650f297a.jpg');
  const [newProdDesc, setNewProdDesc] = useState('Authentic iBUS engineering with 12 months replacement warranty.');

  // Tracking number prompt state
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');

  // Financial calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : o.subtotal * 0.25), 0);
  const totalSavingsLocked = saveToBuyPlans.reduce((sum, p) => sum + p.totalSaved, 0);
  const totalWholesaleOrders = orders.filter((o) => o.items.some((i) => i.isWholesale)).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      subTitle: newProdSubTitle || 'Premium iBUS Accessory',
      category: newProdCategory,
      price: Number(newProdPrice),
      wholesalePrice: Number(newProdWholesalePrice),
      minWholesaleQty: Number(newProdMinWholesaleQty),
      wholesaleTiers: [
        { minQty: Number(newProdMinWholesaleQty), pricePerUnit: Number(newProdWholesalePrice), discountPercent: 25, label: 'Carton' }
      ],
      images: [newProdImage],
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: Number(newProdStock),
      badge: newProdBadge || undefined,
      specs: { 'Origin': 'Alaba Plaza Hub', 'Warranty': '12 Months Replacement' },
      features: ['Genuine high-grade electronics', 'High energy efficiency'],
      description: newProdDesc,
      warranty: '12 Months Replacement Warranty',
      bnplEligible: true,
      saveToBuyEligible: true
    });

    setShowAddProductModal(false);
    setNewProdName('');
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-[#12151e] border border-[#232938] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-black text-xl shadow-lg shadow-amber-400/20">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                iBUS Store Administration Console
              </h1>
              <span className="text-[10px] font-mono bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                Alaba Main Office
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              UB96 Ubakason Plaza, Alaba International Market · Live Inventory & Order Management
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddProductModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 self-start md:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product to Inventory</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#11141c] border border-[#222736] rounded-xl p-5 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Gross Value</span>
          <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{formatNaira(totalRevenue)}</p>
          <span className="text-[10px] text-emerald-400 font-mono">Paid & Deposits Inflow</span>
        </div>

        <div className="bg-[#11141c] border border-[#222736] rounded-xl p-5 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Orders</span>
          <p className="text-xl sm:text-2xl font-black text-white font-mono">{orders.length}</p>
          <span className="text-[10px] text-amber-400 font-mono">{totalWholesaleOrders} Wholesale Cartons</span>
        </div>

        <div className="bg-[#11141c] border border-[#222736] rounded-xl p-5 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Save to Buy Deposits</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{formatNaira(totalSavingsLocked)}</p>
          <span className="text-[10px] text-slate-400 font-mono">{saveToBuyPlans.length} Active Layaways</span>
        </div>

        <div className="bg-[#11141c] border border-[#222736] rounded-xl p-5 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Wholesale Leads</span>
          <p className="text-xl sm:text-2xl font-black text-blue-400 font-mono">{wholesaleInquiries.length}</p>
          <span className="text-[10px] text-blue-300 font-mono">Interstate Distributors</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#222736]">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview' ? 'bg-amber-400 text-black font-extrabold' : 'bg-[#12151e] text-slate-300 border border-[#222736]'
          }`}
        >
          Recent Activity
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'products' ? 'bg-amber-400 text-black font-extrabold' : 'bg-[#12151e] text-slate-300 border border-[#222736]'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'orders' ? 'bg-amber-400 text-black font-extrabold' : 'bg-[#12151e] text-slate-300 border border-[#222736]'
          }`}
        >
          Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('save_to_buy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'save_to_buy' ? 'bg-amber-400 text-black font-extrabold' : 'bg-[#12151e] text-slate-300 border border-[#222736]'
          }`}
        >
          Save to Buy Verification ({saveToBuyPlans.length})
        </button>
        <button
          onClick={() => setActiveTab('bnpl')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bnpl' ? 'bg-amber-400 text-black font-extrabold' : 'bg-[#12151e] text-slate-300 border border-[#222736]'
          }`}
        >
          BNPL Credit Accounts ({bnplPlans.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'inquiries' ? 'bg-amber-400 text-black font-extrabold' : 'bg-[#12151e] text-slate-300 border border-[#222736]'
          }`}
        >
          Distributor Inquiries ({wholesaleInquiries.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Latest Orders */}
          <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#202533]">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Latest Customer Orders</h3>
              <button onClick={() => setActiveTab('orders')} className="text-xs text-amber-400 hover:underline">
                View All &rarr;
              </button>
            </div>
            <div className="space-y-3">
              {orders.slice(0, 3).map((ord) => (
                <div key={ord.id} className="p-3 bg-[#151923] rounded-xl border border-[#202533] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono text-amber-400 font-bold block">{ord.orderNumber}</span>
                    <span className="text-white font-semibold">{ord.customerName}</span>
                    <span className="text-[10px] text-slate-400 block">{ord.deliveryAddress.state}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-white block">{formatNaira(ord.total)}</span>
                    <span className="text-[10px] text-emerald-400 capitalize">{ord.orderStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Wholesale Leads */}
          <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#202533]">
              <h3 className="text-sm font-bold text-white font-mono uppercase">Wholesale Distributor Leads</h3>
              <button onClick={() => setActiveTab('inquiries')} className="text-xs text-amber-400 hover:underline">
                View All &rarr;
              </button>
            </div>
            <div className="space-y-3">
              {wholesaleInquiries.map((inq) => (
                <div key={inq.id} className="p-3 bg-[#151923] rounded-xl border border-[#202533] space-y-1.5 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white">{inq.businessName}</span>
                    <span className="text-amber-400 font-mono text-[11px]">{inq.state}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{inq.message}</p>
                  <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                    <span>{inq.phone}</span>
                    <a 
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold"
                    >
                      Chat on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#202533]">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Inventory & Price Controller</h3>
            <span className="text-xs text-slate-400">{products.length} Products Live</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#202533] text-slate-400 uppercase text-[10px]">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Retail Price</th>
                  <th className="pb-3 text-amber-400">Wholesale Price</th>
                  <th className="pb-3">MOQ</th>
                  <th className="pb-3">Stock Units</th>
                  <th className="pb-3">Badge</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b202c]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#151923] transition-colors">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <img src={p.images[0]} alt={p.name} className="w-9 h-9 object-contain bg-black rounded p-1 shrink-0" />
                        <div>
                          <p className="text-white font-sans font-bold line-clamp-1">{p.name}</p>
                          <span className="text-[10px] text-slate-500 uppercase">{p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <input 
                        type="number"
                        defaultValue={p.price}
                        onBlur={(e) => updateProduct(p.id, { price: Number(e.target.value) })}
                        className="w-20 bg-[#1b202c] border border-[#293244] rounded px-1.5 py-1 text-white text-xs font-mono"
                      />
                    </td>
                    <td className="py-3">
                      <input 
                        type="number"
                        defaultValue={p.wholesalePrice}
                        onBlur={(e) => updateProduct(p.id, { wholesalePrice: Number(e.target.value) })}
                        className="w-20 bg-[#1b202c] border border-[#293244] rounded px-1.5 py-1 text-amber-400 text-xs font-mono font-bold"
                      />
                    </td>
                    <td className="py-3 text-slate-300">{p.minWholesaleQty} units</td>
                    <td className="py-3">
                      <input 
                        type="number"
                        defaultValue={p.stockCount}
                        onBlur={(e) => updateProduct(p.id, { stockCount: Number(e.target.value) })}
                        className="w-16 bg-[#1b202c] border border-[#293244] rounded px-1.5 py-1 text-white text-xs font-mono"
                      />
                    </td>
                    <td className="py-3">
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">
                        {p.badge || 'Standard'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#202533]">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Customer Orders & Waybills</h3>
            <span className="text-xs text-slate-400">{orders.length} Total Orders</span>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 bg-[#141722] rounded-xl border border-[#232938] space-y-3 text-xs font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1f2433] pb-2">
                  <div>
                    <span className="text-amber-400 font-bold text-sm mr-2">{ord.orderNumber}</span>
                    <span className="text-slate-400">{ord.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{formatNaira(ord.total)}</span>
                    <span className="text-[10px] uppercase text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                      {ord.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Customer:</span>
                    <p className="text-white font-sans font-bold">{ord.customerName}</p>
                    <p className="text-slate-400 text-[11px]">{ord.customerPhone}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Destination:</span>
                    <p className="text-slate-300">{ord.deliveryAddress.street}, {ord.deliveryAddress.city}</p>
                    <p className="text-amber-400 font-bold">{ord.deliveryAddress.state}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Dispatch Status:</span>
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="bg-[#1b202c] border border-[#2b3548] text-white rounded px-2 py-1 text-xs cursor-pointer outline-none mt-1"
                    >
                      <option value="pending_payment">Pending Payment</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing (Packing)</option>
                      <option value="dispatched">Dispatched with Courier</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* Tracking input */}
                <div className="pt-2 border-t border-[#1f2433] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Waybill Number: <span className="text-white font-bold">{ord.trackingNumber || 'Unassigned'}</span></span>
                  </div>
                  <button
                    onClick={() => {
                      const num = prompt('Enter Courier Tracking / Waybill Number:', ord.trackingNumber || 'GIGL-LOS-');
                      if (num) {
                        updateOrderStatus(ord.id, ord.orderStatus, num);
                      }
                    }}
                    className="text-amber-400 hover:underline"
                  >
                    Edit Tracking #
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SAVE TO BUY VERIFICATION */}
      {activeTab === 'save_to_buy' && (
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#202533]">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Save to Buy Layaway Deposits</h3>
            <span className="text-xs text-slate-400">{saveToBuyPlans.length} Active Targets</span>
          </div>

          <div className="space-y-4">
            {saveToBuyPlans.map((plan) => (
              <div key={plan.id} className="p-4 bg-[#141722] rounded-xl border border-[#232938] space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold">{plan.planNumber}</span>
                  <span className="text-emerald-400 font-bold">
                    {formatNaira(plan.totalSaved)} / {formatNaira(plan.targetAmount)} ({Math.round((plan.totalSaved/plan.targetAmount)*100)}%)
                  </span>
                </div>
                <p className="text-white font-sans font-bold">{plan.productName}</p>

                {/* Deposits */}
                <div className="space-y-2 pt-2 border-t border-[#1e2330]">
                  <p className="text-slate-400 uppercase text-[10px]">Deposit Transactions:</p>
                  {plan.deposits.map((dep) => (
                    <div key={dep.id} className="flex items-center justify-between p-2 bg-[#0d0f15] rounded border border-[#1b202a]">
                      <div>
                        <span className="text-white font-bold">{formatNaira(dep.amount)}</span>
                        <span className="text-slate-500 ml-2">via {dep.channel} ({dep.date})</span>
                      </div>
                      <div>
                        {dep.verified ? (
                          <span className="text-emerald-400 font-bold">Verified ✓</span>
                        ) : (
                          <button
                            onClick={() => verifySaveToBuyDeposit(plan.id, dep.id)}
                            className="px-2.5 py-1 bg-emerald-500 text-black font-bold text-[10px] rounded hover:bg-emerald-400"
                          >
                            Approve Receipt
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

      {/* TAB 5: BNPL ACCOUNTS */}
      {activeTab === 'bnpl' && (
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#202533]">
            <h3 className="text-sm font-bold text-white font-mono uppercase">BNPL Credit Portfolio</h3>
            <span className="text-xs text-blue-400 font-mono">{bnplPlans.length} Accounts</span>
          </div>

          <div className="space-y-3">
            {bnplPlans.map((bnpl) => (
              <div key={bnpl.id} className="p-4 bg-[#141722] rounded-xl border border-[#232938] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-blue-400 font-bold">{bnpl.applicationNumber}</span>
                  <span className="text-slate-300">BVN Hash: ***{bnpl.customerBvnLast4}</span>
                </div>
                <p className="text-white font-sans font-bold">{bnpl.productName}</p>
                <div className="flex justify-between text-slate-400">
                  <span>Down Payment: {formatNaira(bnpl.initialDeposit)} (Paid)</span>
                  <span>Remaining: <span className="text-amber-400 font-bold">{formatNaira(bnpl.amountRemaining)}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#202533]">
            <h3 className="text-sm font-bold text-white font-mono uppercase">Wholesale Distributor Submissions</h3>
            <span className="text-xs text-slate-400">{wholesaleInquiries.length} Inquiries</span>
          </div>

          <div className="space-y-4">
            {wholesaleInquiries.map((inq) => (
              <div key={inq.id} className="p-4 bg-[#141722] rounded-xl border border-[#232938] space-y-2 text-xs">
                <div className="flex justify-between items-start font-mono">
                  <span className="text-white font-bold text-sm">{inq.businessName} ({inq.name})</span>
                  <span className="text-amber-400">{inq.state} · {inq.estimatedMonthlyVolume}</span>
                </div>
                <p className="text-slate-300 bg-[#0d0f15] p-3 rounded-lg border border-[#1b202a]">
                  "{inq.message}"
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[11px]">
                  <span className="text-slate-400">Contact: {inq.phone} · {inq.email}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20iBUS%20Alaba%20Market%20Wholesale%20team.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-emerald-500 text-black font-bold rounded hover:bg-emerald-400 transition-colors"
                    >
                      Chat WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#12151e] border border-[#272e3f] rounded-2xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#202533]">
              <h3 className="text-sm font-bold text-white">Add New Product to iBUS Catalog</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Product Model Name *</label>
                <input 
                  type="text" 
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. iBUS 65W GaN Fast Charger"
                  className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Subtitle / Key Specs *</label>
                <input 
                  type="text" 
                  required
                  value={newProdSubTitle}
                  onChange={(e) => setNewProdSubTitle(e.target.value)}
                  placeholder="e.g. 3-Port Turbo · PD 3.0 · Foldable Plug"
                  className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductCategory)}
                    className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="power-banks">Power Banks</option>
                    <option value="audio">Wireless Audio</option>
                    <option value="chargers">Car & Wall Chargers</option>
                    <option value="cables">Fast Cables</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Badge Tag</label>
                  <input 
                    type="text" 
                    value={newProdBadge}
                    onChange={(e) => setNewProdBadge(e.target.value)}
                    placeholder="e.g. Flagship / Bestseller"
                    className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1 font-sans">Retail (₦) *</label>
                  <input 
                    type="number" 
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1 font-sans">Wholesale (₦) *</label>
                  <input 
                    type="number" 
                    required
                    value={newProdWholesalePrice}
                    onChange={(e) => setNewProdWholesalePrice(Number(e.target.value))}
                    className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-amber-400 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1 font-sans">Min Qty (MOQ)</label>
                  <input 
                    type="number" 
                    value={newProdMinWholesaleQty}
                    onChange={(e) => setNewProdMinWholesaleQty(Number(e.target.value))}
                    className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Stock Initial Units</label>
                <input 
                  type="number" 
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(Number(e.target.value))}
                  className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Product Image Asset</label>
                <select
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg px-3 py-2 text-white outline-none"
                >
                  <option value="/assets/aistudio/IMG-20261104-WA0088_1__650f297a.jpg">iBUS buds 3.0 ANC (Box + Case)</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0080_1__de103086.jpg">30,000mAh Power Bank (Retail Box)</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0086_1__9650e2a4.jpg">20,000mAh Power Bank</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0084_1__6f834baa.jpg">iS3 Mini 10,000mAh LED Power Bank</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0081_1__f344b7d1.jpg">iS2 Dual USB Car Charger 3.4A</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0087_1__7aae242a.jpg">C-Cable Type C 2-Pack</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0083_1__75b06355.jpg">L-Cable iPhone Lightning 2-Pack</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0085_1__48c2d545.jpg">M-Cable Android Micro USB 2-Pack</option>
                  <option value="/assets/aistudio/IMG-20261104-WA0090_1__aeed71e6.jpg">iS1 True Wireless Earbuds</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Detailed Description</label>
                <textarea 
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full bg-[#171b26] border border-[#2b3345] rounded-lg p-2.5 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow-lg transition-colors"
              >
                Publish Product to Store
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
