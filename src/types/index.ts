export type ProductCategory = 
  | 'all'
  | 'power-banks'
  | 'audio'
  | 'chargers'
  | 'cables'
  | 'accessories';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Matte Black", "Graphite Grey", "1-Meter", "2-Meter"
  sku: string;
  inStock: boolean;
  colorHex?: string;
}

export interface WholesaleTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number; // in NGN (₦)
  discountPercent: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  subTitle: string;
  category: ProductCategory;
  price: number; // Retail price in NGN
  originalPrice?: number;
  wholesalePrice: number; // Base wholesale unit price
  minWholesaleQty: number; // Minimum bulk order qty
  wholesaleTiers: WholesaleTier[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string; // "Bestseller", "New Release", "ANC Flagship"
  specs: { [key: string]: string };
  features: string[];
  description: string;
  warranty: string;
  bnplEligible: boolean;
  saveToBuyEligible: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  isWholesale: boolean;
  unitPrice: number; // dynamic based on quantity & wholesale status
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  unitPrice: number;
  isWholesale: boolean;
}

export type OrderStatus = 'pending_payment' | 'confirmed' | 'processing' | 'dispatched' | 'delivered';
export type PaymentMethod = 'pay_now_paystack' | 'pay_now_flutterwave' | 'bank_transfer' | 'bnpl' | 'save_to_buy';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string; // Nigerian state (e.g., Lagos, Abuja, Rivers, Kano)
    landmark?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'partial' | 'pending' | 'failed';
  paymentReference?: string;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  trackingCourier?: string; // e.g., "GIG Logistics", "Speedaf", "iBUS Alaba Express"
  notes?: string;
}

export interface SaveToBuyPlan {
  id: string;
  planNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  targetAmount: number;
  totalSaved: number;
  depositCount: number;
  startDate: string;
  targetDate: string;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'flexible';
  suggestedInstallment: number;
  status: 'active' | 'completed' | 'cancelled';
  deposits: {
    id: string;
    amount: number;
    date: string;
    reference: string;
    proofImage?: string;
    verified: boolean;
    channel: 'Card' | 'Bank Transfer' | 'USSD';
  }[];
}

export interface BNPLPlan {
  id: string;
  applicationNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  totalAmount: number;
  initialDeposit: number;
  amountRemaining: number;
  tenureWeeks: number; // e.g. 6 weeks (4 installments)
  installments: {
    installmentNumber: number;
    dueDate: string;
    amount: number;
    paid: boolean;
    paidDate?: string;
  }[];
  customerBvnLast4: string;
  status: 'active' | 'completed' | 'defaulted';
}

export interface WholesaleInquiry {
  id: string;
  date: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  state: string;
  interestedCategories: string[];
  estimatedMonthlyVolume: string;
  message: string;
  status: 'new' | 'contacted' | 'approved' | 'closed';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  isWholesaleCustomer: boolean;
  businessName?: string;
}
