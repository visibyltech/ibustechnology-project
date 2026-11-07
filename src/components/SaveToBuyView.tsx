import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  PiggyBank, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  CreditCard, 
  Building, 
  Calendar, 
  DollarSign, 
  Plus, 
  Sparkles,
  Phone,
  Lock,
  Boxes,
  X
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { BRAND_INFO } from '../data/products';

export const SaveToBuyView: React.FC = () => {
  const { 
    products, 
    saveToBuyPlans, 
    createSaveToBuyPlan, 
    addSaveToBuyDeposit,
    openCheckoutWithMode,
    setCurrentView
  } = useApp();

  const [selectedPlanForDeposit, setSelectedPlanForDeposit] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<number>(5000);
  const [depositChannel, setDepositChannel] = useState<'Card' | 'Bank Transfer' | 'USSD'>('Card');
  const [receiptFileName, setReceiptFileName] = useState<string>('');
  const [isDepositing, setIsDepositing] = useState(false);

  // New plan modal states
  const [newPlanProductId, setNewPlanProductId] = useState<string>(products[0]?.id || 'ibus-pb-30000');
  const [newPlanInitialDeposit, setNewPlanInitialDeposit] = useState<number>(5000);
  const [newPlanFrequency, setNewPlanFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [isStartingNewPlan, setIsStartingNewPlan] = useState(false);

  const selectedProduct = products.find((p) => p.id === newPlanProductId) || products[0];

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForDeposit || depositAmount <= 0) return;

    setIsDepositing(true);
    setTimeout(() => {
      addSaveToBuyDeposit(
        selectedPlanForDeposit, 
        depositAmount, 
        depositChannel, 
        receiptFileName ? `https://storage.ibus.ng/receipts/${receiptFileName}` : undefined
      );
      setIsDepositing(false);
      setSelectedPlanForDeposit(null);
      setReceiptFileName('');

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 1000);
  };

  const handleCreateNewPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    createSaveToBuyPlan(
      selectedProduct.id, 
      selectedProduct.price, 
      newPlanInitialDeposit, 
      newPlanFrequency, 
      'Card'
    );
    setIsStartingNewPlan(false);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      
      {/* Hero Explainer Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#11141c] via-[#151923] to-[#11141c] border border-[#242a3a] p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <PiggyBank className="w-4 h-4" />
            <span>iBUS "Save to Buy" Layaway Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Lock Today’s Price. <br />
            <span className="text-emerald-400">Save Flexibly. Own Authentic.</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Never let price hikes or unexpected expenses stop you from owning premium tech. Make a small initial deposit (as low as ₦5,000) to lock in your device price. Top up weekly or whenever you earn, track your progress live, upload receipts, and have your gadget dispatched the moment you hit 100%!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsStartingNewPlan(true)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Start a New Savings Plan</span>
            </button>

            <a
              href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS,%20I%20want%20to%20learn%20more%20about%20the%20Save%20to%20Buy%20Layaway%20program`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#191e2b] hover:bg-[#22283a] text-slate-200 border border-[#2d3548] text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>WhatsApp Layaway Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Step Visual Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 font-bold font-mono flex items-center justify-center text-sm mb-3">
            01
          </div>
          <h3 className="text-sm font-bold text-white">1. Select Gadget & Lock Price</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Choose any eligible power bank, ANC earbuds, or car charger. Pay a starting deposit of ₦5,000 or more to freeze today's official price.
          </p>
        </div>

        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold font-mono flex items-center justify-center text-sm mb-3">
            02
          </div>
          <h3 className="text-sm font-bold text-white">2. Save at Your Own Pace</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Make flexible top-up deposits whenever you have funds via Card, Bank Transfer, or USSD. Upload bank transfer receipts directly to your dashboard.
          </p>
        </div>

        <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 font-bold font-mono flex items-center justify-center text-sm mb-3">
            03
          </div>
          <h3 className="text-sm font-bold text-white">3. Dispatched to Your Doorstep</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Once your savings reach 100%, our Alaba warehouse immediately packages and ships your brand new gadget with 12 months official warranty!
          </p>
        </div>
      </div>

      {/* ACTIVE USER PLANS SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              My Active Save to Buy Targets ({saveToBuyPlans.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live progress meters, deposit history, and receipt uploads.
            </p>
          </div>

          <button
            onClick={() => setIsStartingNewPlan(true)}
            className="px-4 py-2 bg-[#171b24] hover:bg-[#222838] text-amber-400 border border-[#2a3244] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Target</span>
          </button>
        </div>

        {saveToBuyPlans.length === 0 ? (
          <div className="bg-[#11141c] border border-[#222736] rounded-2xl p-8 text-center max-w-md mx-auto">
            <PiggyBank className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white">No active savings plan yet</h4>
            <p className="text-xs text-slate-400 mt-1">
              Select any iBUS power bank or earbuds and begin saving gradually.
            </p>
            <button
              onClick={() => setIsStartingNewPlan(true)}
              className="mt-4 px-4 py-2 bg-emerald-500 text-black font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Start First Target Plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {saveToBuyPlans.map((plan) => {
              const percent = Math.min(100, Math.round((plan.totalSaved / plan.targetAmount) * 100));
              const remaining = Math.max(0, plan.targetAmount - plan.totalSaved);

              return (
                <div 
                  key={plan.id}
                  className="bg-[#12151e] border border-[#232938] rounded-2xl p-6 space-y-5 shadow-lg relative overflow-hidden"
                >
                  {/* Top Product Banner */}
                  <div className="flex gap-4 items-start">
                    <div className="w-20 h-20 bg-[#0a0c10] border border-[#222736] rounded-xl p-2 shrink-0 flex items-center justify-center">
                      <img 
                        src={plan.productImage} 
                        alt={plan.productName} 
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-0.5">
                        <span className="text-amber-400 font-bold">{plan.planNumber}</span>
                        <span className="uppercase text-emerald-400 font-semibold">{plan.status}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {plan.productName}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 font-mono">
                        Target Date: {plan.targetDate}
                      </p>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-2 bg-[#0d0f15] p-4 rounded-xl border border-[#1d2230]">
                    <div className="flex items-baseline justify-between text-xs font-mono">
                      <span className="text-slate-400">Total Saved:</span>
                      <span className="text-base font-extrabold text-emerald-400">
                        {formatNaira(plan.totalSaved)} <span className="text-xs text-slate-400 font-normal">/ {formatNaira(plan.targetAmount)}</span>
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#1d2230] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-0.5">
                      <span>{percent}% Completed</span>
                      <span>{remaining === 0 ? 'Target Reached! Ready for Dispatch' : `${formatNaira(remaining)} remaining`}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {remaining > 0 ? (
                      <button
                        onClick={() => setSelectedPlanForDeposit(plan.id)}
                        className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Make a Top-Up Deposit</span>
                      </button>
                    ) : (
                      <div className="flex-1 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold rounded-xl text-center">
                        🎉 Savings Complete! Being Processed for Dispatch
                      </div>
                    )}
                  </div>

                  {/* Deposit History Accordion */}
                  <div className="border-t border-[#1e2330] pt-3">
                    <p className="text-xs font-bold text-slate-300 font-mono mb-2 uppercase">
                      Deposit History ({plan.deposits.length}):
                    </p>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {plan.deposits.map((dep) => (
                        <div 
                          key={dep.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#0d0f15] border border-[#1b202a] text-xs font-mono"
                        >
                          <div>
                            <span className="text-white font-bold">{formatNaira(dep.amount)}</span>
                            <span className="text-[10px] text-slate-500 ml-2">via {dep.channel}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">{dep.date}</span>
                            {dep.verified ? (
                              <span className="text-[10px] text-emerald-400 font-bold">Verified</span>
                            ) : (
                              <span className="text-[10px] text-amber-400">Pending Review</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* POPUP: TOP-UP DEPOSIT MODAL */}
      {selectedPlanForDeposit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151e] border border-[#272e3f] rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#202533]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-emerald-400" />
                <span>Make a Savings Deposit</span>
              </h3>
              <button
                onClick={() => setSelectedPlanForDeposit(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Deposit Amount (₦) *
                </label>
                <input 
                  type="number"
                  required
                  min={1000}
                  step={500}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-[#171b26] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-sm font-mono text-white outline-none focus:border-emerald-400"
                />
                <div className="flex gap-2 mt-2">
                  {[2000, 5000, 10000, 20000].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setDepositAmount(amt)}
                      className="px-2.5 py-1 rounded bg-[#1c2230] hover:bg-[#252c3c] text-[11px] font-mono text-slate-300"
                    >
                      +{formatNaira(amt)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['Card', 'Bank Transfer', 'USSD'] as const).map((ch) => (
                    <button
                      type="button"
                      key={ch}
                      onClick={() => setDepositChannel(ch)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        depositChannel === ch 
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold' 
                          : 'bg-[#171b26] border-[#293142] text-slate-400'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              {depositChannel === 'Bank Transfer' && (
                <div className="p-3 bg-[#171b26] rounded-xl border border-[#2b3345] space-y-2 text-xs">
                  <p className="text-slate-300 font-medium">Transfer to dedicated savings account:</p>
                  <div className="font-mono bg-[#0e1017] p-2 rounded text-slate-200">
                    <p className="text-amber-400 font-bold">Wema Bank (Paystack)</p>
                    <p className="text-white text-sm font-bold">0293847192</p>
                    <p className="text-[10px] text-slate-400">iBUS TECH LTD - SAVINGS</p>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Upload Transfer Screenshot / Receipt:
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setReceiptFileName(e.target.files?.[0]?.name || '')}
                      className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-emerald-500 file:text-black file:text-xs file:font-bold cursor-pointer"
                    />
                    {receiptFileName && (
                      <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                        Selected: {receiptFileName}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isDepositing}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-colors"
              >
                {isDepositing ? 'Recording Deposit...' : `Confirm Deposit of ${formatNaira(depositAmount)}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* POPUP: START NEW PLAN MODAL */}
      {isStartingNewPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151e] border border-[#272e3f] rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#202533]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-emerald-400" />
                <span>Start a New Save to Buy Target</span>
              </h3>
              <button
                onClick={() => setIsStartingNewPlan(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPlan} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Desired Product *</label>
                <select
                  value={newPlanProductId}
                  onChange={(e) => setNewPlanProductId(e.target.value)}
                  className="w-full bg-[#171b26] border border-[#2b3345] rounded-xl px-3.5 py-2.5 text-white outline-none cursor-pointer"
                >
                  {products.filter((p) => p.saveToBuyEligible).map((prod) => (
                    <option key={prod.id} value={prod.id} className="bg-[#171b26]">
                      {prod.name} ({formatNaira(prod.price)})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="flex items-center gap-3 bg-[#171b26] p-3 rounded-xl border border-[#273042]">
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.name} 
                    className="w-12 h-12 object-contain bg-black rounded p-1"
                  />
                  <div>
                    <p className="font-bold text-white">{selectedProduct.name}</p>
                    <p className="text-amber-400 font-mono font-bold">{formatNaira(selectedProduct.price)}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Starting Lock Deposit (Min ₦5,000)</label>
                  <input 
                    type="number"
                    min={5000}
                    step={1000}
                    value={newPlanInitialDeposit}
                    onChange={(e) => setNewPlanInitialDeposit(Number(e.target.value))}
                    className="w-full bg-[#171b26] border border-[#2b3345] rounded-xl px-3 py-2 font-mono text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Savings Cadence</label>
                  <select
                    value={newPlanFrequency}
                    onChange={(e) => setNewPlanFrequency(e.target.value as typeof newPlanFrequency)}
                    className="w-full bg-[#171b26] border border-[#2b3345] rounded-xl px-3 py-2 text-white outline-none cursor-pointer"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly Salary</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-colors"
              >
                Deposit {formatNaira(newPlanInitialDeposit)} & Activate Target Plan
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
