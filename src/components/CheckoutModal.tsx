import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Phone, 
  CheckCircle2, 
  Truck, 
  Zap, 
  PiggyBank, 
  Lock, 
  Copy, 
  Check, 
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp, formatNaira } from '../context/AppContext';
import { PaymentMethod, Order } from '../types';
import { BRAND_INFO } from '../data/products';
import { uploadImageToCloudinary } from '../lib/cloudinary';
import { submitOrderBankTransfer } from '../lib/paymentSubmissions';

const NIGERIAN_STATES = [
  { name: 'Lagos', fee: 2500, region: 'lagos' },
  { name: 'Abuja (FCT)', fee: 4500, region: 'north' },
  { name: 'Rivers (Port Harcourt)', fee: 4500, region: 'south' },
  { name: 'Kano', fee: 5500, region: 'north' },
  { name: 'Oyo (Ibadan)', fee: 3500, region: 'south-west' },
  { name: 'Anambra (Onitsha/Awka)', fee: 4000, region: 'south-east' },
  { name: 'Ogun (Abeokuta/Sagamu)', fee: 3500, region: 'south-west' },
  { name: 'Enugu', fee: 4000, region: 'south-east' },
  { name: 'Delta (Warri/Asaba)', fee: 4500, region: 'south-south' },
  { name: 'Edo (Benin City)', fee: 4000, region: 'south-south' },
  { name: 'Kaduna', fee: 5500, region: 'north' },
  { name: 'Akwa Ibom (Uyo)', fee: 4500, region: 'south-south' },
  { name: 'Ondo', fee: 3800, region: 'south-west' },
  { name: 'Imo (Owerri)', fee: 4200, region: 'south-east' },
  { name: 'Plateau (Jos)', fee: 5500, region: 'north' },
  { name: 'Other States (Interstate Waybill)', fee: 5000, region: 'nationwide' }
];

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    checkoutInitialMode, 
    createOrder,
    createSaveToBuyPlan,
    createBnplPlan,
    clearCart,
    user,
    setCurrentView
  } = useApp();

  // Active step: 'details' -> 'payment' -> 'confirmed'
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [paymentMode, setPaymentMode] = useState<'pay_now' | 'bnpl' | 'save_to_buy'>(checkoutInitialMode);

  // Customer Form
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address.street || '');
  const [city, setCity] = useState(user?.address.city || '');
  const [selectedState, setSelectedState] = useState(user?.address.state || 'Lagos');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Provider Setup Pending
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Bank Transfer virtual account states
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);

  // BNPL Specific states
  const [bvnLast4, setBvnLast4] = useState('8921');
  const [employmentType, setEmploymentType] = useState('Salaried Professional');

  // Save to Buy specific states
  const [stbFrequency, setStbFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');
  const [stbInitialDeposit, setStbInitialDeposit] = useState(Math.round(cartSubtotal * 0.25));

  // Completed Order
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  // Delivery fee calculation
  const stateConfig = NIGERIAN_STATES.find((s) => s.name === selectedState) || NIGERIAN_STATES[0];
  const isLagosFree = selectedState === 'Lagos' && cartSubtotal >= BRAND_INFO.freeDeliveryThresholdLagos;
  const shippingFee = isLagosFree ? 0 : stateConfig.fee;
  const totalAmount = cartSubtotal + shippingFee;

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !street) {
      alert('Please fill in your name, delivery address, and phone number.');
      return;
    }
    setStep('payment');
  };

  const executePayNow = () => {
    setIsProcessingPayment(false);
    window.alert('Online card payments are not enabled yet. No payment has been taken.');
  };

  const submitBankTransferReceipt = async () => {
    if (!user?.id) {
      window.alert('Please sign in or create an account before submitting a bank transfer receipt.');
      return;
    }
    if (!receiptFile) {
      window.alert('Please choose a screenshot or photo of your bank transfer receipt.');
      return;
    }
    if (!cart.length) {
      window.alert('Your cart is empty. Please add products before checkout.');
      return;
    }

    setIsUploadingReceipt(true);
    try {
      const uploaded = await uploadImageToCloudinary(receiptFile, 'ibus/payment-receipts');
      const orderData = {
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress: { street, city, state: selectedState, landmark },
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          image: item.product.images[0] || '',
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          isWholesale: item.isWholesale
        })),
        subtotal: cartSubtotal,
        shippingFee,
        discount: 0,
        total: totalAmount,
        paymentMethod: 'bank_transfer' as const,
        paymentStatus: 'pending' as const,
        orderStatus: 'pending_payment' as const,
        notes: deliveryNotes
      };
      const result = await submitOrderBankTransfer(user.id, orderData, {
        secureUrl: uploaded.secureUrl,
        publicId: uploaded.publicId
      });
      const localOrder: Order = {
        ...orderData,
        id: result.orderId,
        orderNumber: result.orderNumber,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        trackingCourier: 'Pending payment verification'
      };
      setCompletedOrder(localOrder);
      clearCart();
      setStep('confirmed');
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to submit your receipt. Please try again.');
    } finally {
      setIsUploadingReceipt(false);
    }
  };

  const executeBnpl = () => {
    setIsProcessingPayment(false);
    window.alert('Buy Now Pay Later is not enabled yet. No credit application or payment has been submitted.');
  };

  const executeSaveToBuy = () => {
    setIsProcessingPayment(false);
    window.alert('Save to Buy payments are not enabled yet. No deposit has been collected and no savings plan has been activated.');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#11141c] border border-[#272e3d] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#141722] border-b border-[#222736] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black ring-1 ring-amber-400/40 overflow-hidden flex items-center justify-center">
              <img src={BRAND_INFO.logoUrl} alt="iBUS" className="w-full h-full object-cover scale-110" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>iBUS Secure Checkout</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                  SSL Encrypted
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Alaba International Market, Lagos, Nigeria</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1f2433] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        <div className="bg-[#0e1017] px-6 py-2 border-b border-[#1f2430] flex items-center justify-between text-xs font-mono">
          <div className={`flex items-center gap-1.5 ${step === 'details' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <span className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center text-[10px]">1</span>
            <span>Delivery Info</span>
          </div>
          <span className="text-slate-700">———</span>
          <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <span className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center text-[10px]">2</span>
            <span>Flexible Payment</span>
          </div>
          <span className="text-slate-700">———</span>
          <div className={`flex items-center gap-1.5 ${step === 'confirmed' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
            <span className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center text-[10px]">3</span>
            <span>Order Receipt</span>
          </div>
        </div>

        {/* STEP 1: DELIVERY DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#202533] pb-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Customer & Destination Details
              </h4>
              <span className="text-xs text-amber-400 font-mono font-bold">
                Total: {formatNaira(totalAmount)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Babajide Adeleke"
                  className="w-full bg-[#151923] border border-[#273042] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+234 810 220 8521"
                  className="w-full bg-[#151923] border border-[#273042] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Email Address (for Receipt)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="baba.adeleke@gmail.com"
                  className="w-full bg-[#151923] border border-[#273042] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  State in Nigeria (Waybill Destination) *
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-[#151923] border border-[#273042] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st.name} value={st.name} className="bg-[#151923]">
                      {st.name} ({st.name === 'Lagos' && cartSubtotal >= BRAND_INFO.freeDeliveryThresholdLagos ? 'FREE Delivery' : formatNaira(st.fee)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Street Address / Shop Location *
              </label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="e.g. 14 Admiralty Way / Shop 22, Plaza..."
                className="w-full bg-[#151923] border border-[#273042] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  City / Town / Area
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Lekki / Ikeja / Alaba"
                  className="w-full bg-[#151923] border border-[#273042] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Prominent Landmark (Near bus stop / church / market)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Ebeano Supermarket"
                  className="w-full bg-[#151923] border border-[#273042] focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            {/* Choose 1 of 3 Purchasing Pathways */}
            <div className="pt-2">
              <label className="text-xs font-bold text-white block mb-2 font-mono uppercase">
                Select Your Payment Method:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode('pay_now')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMode === 'pay_now' 
                      ? 'bg-amber-400/10 border-amber-400 text-white' 
                      : 'bg-[#151923] border-[#252b3a] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Pay Now</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Bank Transfer only</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('bnpl')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMode === 'bnpl' 
                      ? 'bg-blue-500/10 border-blue-400 text-white' 
                      : 'bg-[#151923] border-[#252b3a] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs mb-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>BNPL (0%)</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Pay 25% today, 3 instalments</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('save_to_buy')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMode === 'save_to_buy' 
                      ? 'bg-emerald-500/10 border-emerald-400 text-white' 
                      : 'bg-[#151923] border-[#252b3a] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-1">
                    <PiggyBank className="w-3.5 h-3.5" />
                    <span>Save to Buy</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Target Layaway Lock</p>
                </button>
              </div>
            </div>

            {/* Submit Step 1 Button */}
            <div className="pt-3 border-t border-[#202533] flex items-center justify-between">
              <div className="text-xs text-slate-400 font-mono">
                Shipping fee: {shippingFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : formatNaira(shippingFee)}
              </div>
              <button
                type="submit"
                className="py-2.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT PROCESSING */}
        {step === 'payment' && (
          <div className="p-6 space-y-4">
            {/* PAY NOW PATHWAY */}
            {paymentMode === 'pay_now' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#202533]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Bank Transfer
                    </span>
                  </div>
                  <span className="text-sm font-black text-amber-400 font-mono">
                    {formatNaira(totalAmount)}
                  </span>
                </div>

                {/* Sub-view: Bank Transfer */}
                <div className="mt-4 p-4 rounded-xl bg-[#131620] border border-[#232938] space-y-3">
                    <p className="text-xs text-slate-300 text-center">
                      Transfer exactly <span className="font-bold text-amber-400 font-mono">{formatNaira(totalAmount)}</span> to the iBUS account below.
                    </p>
                    <div className="p-4 bg-[#181d28] rounded-xl border border-[#293244] space-y-3 text-xs">
                      <div className="flex justify-between gap-3"><span className="text-slate-400">Bank:</span><span className="text-white font-bold">Providus Bank</span></div>
                      <div className="flex justify-between gap-3"><span className="text-slate-400">Account Number:</span><span className="text-amber-400 font-mono font-bold">1309277162</span></div>
                      <div className="flex justify-between gap-3"><span className="text-slate-400">Account Name:</span><span className="text-white font-bold text-right">Ibus Technology Limited</span></div>
                      <button type="button" onClick={() => copyToClipboard('1309277162')} className="text-amber-400 text-[11px] font-semibold flex items-center gap-1">
                        {copiedAccount ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} Copy account number
                      </button>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Upload transfer receipt *</label>
                      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} className="w-full text-xs text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-amber-400 file:px-3 file:py-2 file:text-xs file:font-bold file:text-black" />
                      <p className="text-[10px] text-slate-500 mt-1">JPG, PNG or WebP · Maximum 8 MB</p>
                      {receiptFile && <p className="text-[11px] text-emerald-400 mt-2">Selected: {receiptFile.name}</p>}
                    </div>
                    <p className="text-[11px] text-amber-300/90">Your order remains pending until iBUS verifies the transfer. Uploading a receipt does not confirm payment.</p>
                    <button type="button" disabled={isUploadingReceipt} onClick={submitBankTransferReceipt} className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {isUploadingReceipt ? 'Uploading receipt & submitting…' : 'Submit Transfer Receipt'}
                    </button>
                </div>
              </div>
            )}

            {/* BUY NOW PAY LATER PATHWAY */}
            {paymentMode === 'bnpl' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#202533] flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase font-mono tracking-wider">
                    Buy Now, Pay Later (0% Interest Rate)
                  </span>
                  <span className="text-xs font-mono text-white">4 Equal Split Payments</span>
                </div>

                <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Purchase:</span>
                    <span className="text-white font-mono font-bold">{formatNaira(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-amber-400">
                    <span>Due Today (25% Initial Down Payment):</span>
                    <span className="font-mono">{formatNaira(Math.round(totalAmount * 0.25))}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>3 Fortnightly Installments:</span>
                    <span className="font-mono">{formatNaira(Math.round((totalAmount * 0.75) / 3))} each</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Last 4 Digits of BVN / NIN *</label>
                    <input 
                      type="text" 
                      maxLength={4}
                      value={bvnLast4}
                      onChange={(e) => setBvnLast4(e.target.value)}
                      placeholder="e.g. 8921"
                      className="w-full bg-[#151923] border border-[#273042] rounded-lg px-3 py-2 font-mono text-center outline-none text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Employment / Business Status</label>
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full bg-[#151923] border border-[#273042] rounded-lg px-3 py-2 text-white outline-none cursor-pointer"
                    >
                      <option>Salaried Professional</option>
                      <option>Business Owner / Trader</option>
                      <option>Tech & Creative Freelancer</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={executeBnpl}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {isProcessingPayment 
                      ? 'Approving credit limit...' 
                      : `Pay Initial 25% (${formatNaira(Math.round(totalAmount * 0.25))}) & Confirm BNPL`}
                  </span>
                </button>
              </div>
            )}

            {/* SAVE TO BUY PATHWAY */}
            {paymentMode === 'save_to_buy' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#202533] flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
                    Save to Buy (Target Layaway Savings Plan)
                  </span>
                  <span className="text-xs font-mono text-white">Target: {formatNaira(totalAmount)}</span>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2 text-xs">
                  <p className="text-slate-300 leading-relaxed">
                    Lock today's price against inflation or stock-outs. Make your initial deposit today, then save at your own pace. Once 100% saved, your items will be automatically dispatched from Alaba!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Initial Deposit Today (Min ₦5,000)</label>
                    <input 
                      type="number"
                      value={stbInitialDeposit}
                      onChange={(e) => setStbInitialDeposit(Number(e.target.value))}
                      className="w-full bg-[#151923] border border-[#273042] rounded-lg px-3 py-2 font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Target Savings Frequency</label>
                    <select
                      value={stbFrequency}
                      onChange={(e) => setStbFrequency(e.target.value as typeof stbFrequency)}
                      className="w-full bg-[#151923] border border-[#273042] rounded-lg px-3 py-2 text-white outline-none cursor-pointer"
                    >
                      <option value="weekly">Weekly Target</option>
                      <option value="biweekly">Bi-Weekly Target</option>
                      <option value="monthly">Monthly Salary Target</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={executeSaveToBuy}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PiggyBank className="w-4 h-4" />
                  <span>
                    {isProcessingPayment 
                      ? 'Creating target savings account...' 
                      : `Deposit ${formatNaira(stbInitialDeposit)} & Lock Price`}
                  </span>
                </button>
              </div>
            )}

            {/* Back button */}
            <div className="pt-2 flex justify-start">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-slate-400 hover:text-white"
              >
                &larr; Back to Delivery Details
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMED */}
        {step === 'confirmed' && completedOrder && (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Transfer Submitted — Awaiting Verification
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Thank You, {completedOrder.customerName}!
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Your order <span className="font-mono text-white font-bold">{completedOrder.orderNumber}</span> has been recorded. Your receipt is awaiting iBUS verification; your order is not yet paid or confirmed.
              </p>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="bg-[#141722] border border-[#232a3a] rounded-xl p-4 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Order Reference:</span>
                <span className="text-white font-bold">{completedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Method:</span>
                <span className="text-amber-400 font-bold uppercase">{completedOrder.paymentMethod.replace(/_/g, ' ')} · PENDING</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Courier / Dispatch:</span>
                <span className="text-slate-200">Payment verification pending</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Destination:</span>
                <span className="text-slate-200">{completedOrder.deliveryAddress.city}, {completedOrder.deliveryAddress.state}</span>
              </div>
              <div className="pt-2 border-t border-[#222838] flex justify-between font-bold text-white text-sm">
                <span>Total Amount:</span>
                <span className="text-amber-400">{formatNaira(completedOrder.total)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setCurrentView('dashboard');
                }}
                className="py-3 px-4 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl transition-colors"
              >
                Track in Customer Dashboard
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="py-3 px-4 bg-[#1b202c] hover:bg-[#252c3c] text-slate-200 border border-[#2d3648] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Official iBUS Receipt</span>
              </button>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${BRAND_INFO.phoneClean}?text=Hello%20iBUS%20Alaba,%20I%20just%20completed%20Order%20${completedOrder.orderNumber}%20(${formatNaira(completedOrder.total)}).%20Please%20verify%20and%20share%20waybill%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center justify-center gap-1.5 underline underline-offset-4"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Notify Alaba Dispatch Hub on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
