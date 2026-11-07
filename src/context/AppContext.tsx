import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ProductCategory, 
  CartItem, 
  Order, 
  SaveToBuyPlan, 
  BNPLPlan, 
  WholesaleInquiry, 
  UserProfile,
  PaymentMethod
} from '../types';
import { INITIAL_PRODUCTS, BRAND_INFO } from '../data/products';

interface AppContextType {
  // Navigation & Views
  currentView: 'home' | 'catalog' | 'wholesale' | 'save-to-buy' | 'about-contact' | 'dashboard' | 'admin';
  setCurrentView: (view: 'home' | 'catalog' | 'wholesale' | 'save-to-buy' | 'about-contact' | 'dashboard' | 'admin') => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Wholesale Mode
  isWholesaleMode: boolean;
  setIsWholesaleMode: (val: boolean) => void;
  toggleWholesaleMode: () => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, isWholesaleOrder?: boolean) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartSavings: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals
  activeProductModal: Product | null;
  setActiveProductModal: (p: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutInitialMode: 'pay_now' | 'bnpl' | 'save_to_buy';
  openCheckoutWithMode: (mode: 'pay_now' | 'bnpl' | 'save_to_buy', directProduct?: Product) => void;

  saveToBuySelectedProduct: Product | null;
  setSaveToBuySelectedProduct: (p: Product | null) => void;
  isSaveToBuyModalOpen: boolean;
  setIsSaveToBuyModalOpen: (open: boolean) => void;

  bnplSelectedProduct: Product | null;
  setBnplSelectedProduct: (p: Product | null) => void;
  isBnplModalOpen: boolean;
  setIsBnplModalOpen: (open: boolean) => void;

  isWholesaleInquiryModalOpen: boolean;
  setIsWholesaleInquiryModalOpen: (open: boolean) => void;

  // User & Authentication
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  loginAsDemoUser: (asWholesale?: boolean) => void;
  logout: () => void;

  // Orders, BNPL & Save to Buy Data
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'orderStatus'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], trackingNumber?: string) => void;

  saveToBuyPlans: SaveToBuyPlan[];
  createSaveToBuyPlan: (productId: string, targetAmount: number, initialDeposit: number, frequency: SaveToBuyPlan['frequency'], channel?: 'Card' | 'Bank Transfer' | 'USSD') => SaveToBuyPlan;
  addSaveToBuyDeposit: (planId: string, amount: number, channel: 'Card' | 'Bank Transfer' | 'USSD', proofImage?: string) => void;
  verifySaveToBuyDeposit: (planId: string, depositId: string) => void;

  bnplPlans: BNPLPlan[];
  createBnplPlan: (productId: string, bvnLast4: string, tenureWeeks?: number) => BNPLPlan;
  payBnplInstallment: (planId: string, installmentNumber: number) => void;

  wholesaleInquiries: WholesaleInquiry[];
  submitWholesaleInquiry: (inquiry: Omit<WholesaleInquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: WholesaleInquiry['status']) => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample Orders for rich realistic history
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-84920',
    orderNumber: 'IBUS-LAG-84920',
    date: '2026-11-04 14:22',
    customerName: 'Babajide Adeleke',
    customerEmail: 'baba.adeleke@gmail.com',
    customerPhone: '+234 803 449 1120',
    deliveryAddress: {
      street: '14 Admiralty Way, Lekki Phase 1',
      city: 'Lekki',
      state: 'Lagos',
      landmark: 'Near Ebeano Supermarket'
    },
    items: [
      {
        productId: 'ibus-buds-3',
        productName: 'iBUS buds 3.0 ANC/ENC Wireless Earbuds',
        image: '/assets/aistudio/IMG-20261104-WA0088_1__650f297a.jpg',
        quantity: 1,
        unitPrice: 28500,
        isWholesale: false
      },
      {
        productId: 'ibus-cable-type-c',
        productName: 'iBUS C-Cable Type-C Fast Charging Cable (2-Pack)',
        image: '/assets/aistudio/IMG-20261104-WA0087_1__7aae242a.jpg',
        quantity: 1,
        unitPrice: 5500,
        isWholesale: false
      }
    ],
    subtotal: 34000,
    shippingFee: 2500,
    discount: 0,
    total: 36500,
    paymentMethod: 'pay_now_paystack',
    paymentStatus: 'paid',
    paymentReference: 'PSTK_99182374921',
    orderStatus: 'dispatched',
    trackingNumber: 'GIGL-LOS-99824',
    trackingCourier: 'GIG Logistics Express',
    notes: 'Please call before delivery'
  },
  {
    id: 'ord-84912',
    orderNumber: 'IBUS-WHS-84912',
    date: '2026-11-02 10:15',
    customerName: 'Alhaji Musa Danjuma (Kano Gadgets Ltd)',
    customerEmail: 'musa.kanogadgets@yahoo.com',
    customerPhone: '+234 802 881 9923',
    deliveryAddress: {
      street: 'Shop 42, Farm Centre GSM Market',
      city: 'Kano',
      state: 'Kano',
      landmark: 'Opposite Central Mosque'
    },
    items: [
      {
        productId: 'ibus-pb-30000',
        productName: 'iBUS 30,000mAh Ultra-Capacity Power Bank',
        image: '/assets/aistudio/IMG-20261104-WA0080_1__de103086.jpg',
        quantity: 20,
        unitPrice: 26500,
        isWholesale: true
      },
      {
        productId: 'ibus-cable-lightning',
        productName: 'iBUS L-Cable iPhone Lightning Fast Charging Cable (2-Pack)',
        image: '/assets/aistudio/IMG-20261104-WA0083_1__75b06355.jpg',
        quantity: 30,
        unitPrice: 3800,
        isWholesale: true
      }
    ],
    subtotal: 644000,
    shippingFee: 15000,
    discount: 14000,
    total: 645000,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    paymentReference: 'ALB-TRF-449102',
    orderStatus: 'processing',
    trackingNumber: 'ABC-LOG-8812',
    trackingCourier: 'ABC Inter-State Luxury Bus Dispatch',
    notes: 'Waybill to Kano Luxury Bus Terminal, Sabon Gari'
  }
];

const INITIAL_SAVINGS_PLANS: SaveToBuyPlan[] = [
  {
    id: 'stb-101',
    planNumber: 'STB-88391',
    productId: 'ibus-pb-30000',
    productName: 'iBUS 30,000mAh Ultra-Capacity Power Bank',
    productImage: '/assets/aistudio/IMG-20261104-WA0080_1__de103086.jpg',
    targetAmount: 34000,
    totalSaved: 20000,
    depositCount: 2,
    startDate: '2026-10-18',
    targetDate: '2026-11-20',
    frequency: 'weekly',
    suggestedInstallment: 7000,
    status: 'active',
    deposits: [
      {
        id: 'dep-1',
        amount: 10000,
        date: '2026-10-18',
        reference: 'STB-DEP-001',
        verified: true,
        channel: 'Card'
      },
      {
        id: 'dep-2',
        amount: 10000,
        date: '2026-10-29',
        reference: 'STB-DEP-002',
        verified: true,
        channel: 'Bank Transfer'
      }
    ]
  }
];

const INITIAL_BNPL_PLANS: BNPLPlan[] = [
  {
    id: 'bnpl-201',
    applicationNumber: 'BNPL-7740',
    productId: 'ibus-buds-3',
    productName: 'iBUS buds 3.0 ANC/ENC Wireless Earbuds',
    productImage: '/assets/aistudio/IMG-20261104-WA0088_1__650f297a.jpg',
    totalAmount: 28500,
    initialDeposit: 7125, // 25% down
    amountRemaining: 21375,
    tenureWeeks: 6,
    customerBvnLast4: '4892',
    status: 'active',
    installments: [
      { installmentNumber: 1, dueDate: '2026-11-04', amount: 7125, paid: true, paidDate: '2026-11-04' },
      { installmentNumber: 2, dueDate: '2026-11-18', amount: 7125, paid: false },
      { installmentNumber: 3, dueDate: '2026-12-02', amount: 7125, paid: false },
      { installmentNumber: 4, dueDate: '2026-12-16', amount: 7125, paid: false }
    ]
  }
];

const INITIAL_INQUIRIES: WholesaleInquiry[] = [
  {
    id: 'inq-301',
    date: '2026-11-05',
    name: 'Obinna Chukwuma',
    businessName: 'Apex Mobile Tech Onitsha',
    email: 'obinna.apex@gmail.com',
    phone: '+234 812 390 1199',
    state: 'Anambra',
    interestedCategories: ['Power Banks', 'Wireless Audio', 'Cables'],
    estimatedMonthlyVolume: '₦1,500,000 - ₦3,000,000',
    message: 'We operate 3 retail gadget stores in Main Market Onitsha. We want to become the direct state distributor for iBUS 30,000mAh power banks and ANC earbuds. Please send dealer carton pricing.',
    status: 'new'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentViewState] = useState<'home' | 'catalog' | 'wholesale' | 'save-to-buy' | 'about-contact' | 'dashboard' | 'admin'>(() => {
    const historyView = window.history.state?.ibusAppView;
    return historyView || 'home';
  });

  // Keep every store screen and product detail in browser history so the
  // Android/browser Back button closes the detail first, then navigates within
  // the store instead of leaving the website.
  const setCurrentView = (view: 'home' | 'catalog' | 'wholesale' | 'save-to-buy' | 'about-contact' | 'dashboard' | 'admin') => {
    if (view === currentView) return;
    window.history.pushState({ ...window.history.state, ibusAppView: view, ibusProductModal: false }, '', window.location.href);
    setCurrentViewState(view);
  };
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Wholesale Mode toggle
  const [isWholesaleMode, setIsWholesaleMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ibus_wholesale_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ibus_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ibus_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ibus_wishlist');
    return saved ? JSON.parse(saved) : ['ibus-buds-3', 'ibus-pb-30000'];
  });

  // Product details participate in browser history. Pressing Back closes the
  // detail overlay first, rather than navigating away from the store.
  const [activeProductModal, setActiveProductModalState] = useState<Product | null>(null);
  const setActiveProductModal = (product: Product | null) => {
    if (product) {
      if (!window.history.state?.ibusProductModal) {
        window.history.pushState(
          { ...window.history.state, ibusAppView: currentView, ibusProductModal: true },
          '',
          window.location.href
        );
      }
      setActiveProductModalState(product);
      return;
    }

    if (activeProductModal && window.history.state?.ibusProductModal) {
      window.history.back();
      return;
    }
    setActiveProductModalState(null);
  };

  useEffect(() => {
    window.history.replaceState(
      { ...window.history.state, ibusAppView: currentView, ibusProductModal: false },
      '',
      window.location.href
    );

    const handlePopState = (event: PopStateEvent) => {
      setActiveProductModalState(null);
      setCurrentViewState(event.state?.ibusAppView || 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutInitialMode, setCheckoutInitialMode] = useState<'pay_now' | 'bnpl' | 'save_to_buy'>('pay_now');

  const [saveToBuySelectedProduct, setSaveToBuySelectedProduct] = useState<Product | null>(null);
  const [isSaveToBuyModalOpen, setIsSaveToBuyModalOpen] = useState(false);

  const [bnplSelectedProduct, setBnplSelectedProduct] = useState<Product | null>(null);
  const [isBnplModalOpen, setIsBnplModalOpen] = useState(false);

  const [isWholesaleInquiryModalOpen, setIsWholesaleInquiryModalOpen] = useState(false);

  // User
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ibus_user');
    if (saved) return JSON.parse(saved);
    return {
      id: 'usr-default',
      name: 'Chidera Anyanwu',
      email: 'chidera.gadgets@gmail.com',
      phone: '+234 810 220 8521',
      address: {
        street: 'Block 4, Flat 12, Festac Town',
        city: 'Amuwo-Odofin',
        state: 'Lagos'
      },
      isWholesaleCustomer: false
    };
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Orders, BNPL, STB, Inquiries
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ibus_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [saveToBuyPlans, setSaveToBuyPlans] = useState<SaveToBuyPlan[]>(() => {
    const saved = localStorage.getItem('ibus_stb');
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS_PLANS;
  });

  const [bnplPlans, setBnplPlans] = useState<BNPLPlan[]>(() => {
    const saved = localStorage.getItem('ibus_bnpl');
    return saved ? JSON.parse(saved) : INITIAL_BNPL_PLANS;
  });

  const [wholesaleInquiries, setWholesaleInquiries] = useState<WholesaleInquiry[]>(() => {
    const saved = localStorage.getItem('ibus_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Notification toast
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('ibus_wholesale_mode', JSON.stringify(isWholesaleMode));
  }, [isWholesaleMode]);

  useEffect(() => {
    localStorage.setItem('ibus_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ibus_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ibus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ibus_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ibus_stb', JSON.stringify(saveToBuyPlans));
  }, [saveToBuyPlans]);

  useEffect(() => {
    localStorage.setItem('ibus_bnpl', JSON.stringify(bnplPlans));
  }, [bnplPlans]);

  useEffect(() => {
    localStorage.setItem('ibus_inquiries', JSON.stringify(wholesaleInquiries));
  }, [wholesaleInquiries]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ibus_user', JSON.stringify(user));
    }
  }, [user]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const toggleWholesaleMode = () => {
    setIsWholesaleMode((prev) => {
      const next = !prev;
      showNotification(next ? 'Switched to B2B Wholesale Mode (Bulk discounts active)' : 'Switched to Retail Store Mode');
      return next;
    });
  };

  // Cart operations
  const calculateUnitPrice = (product: Product, qty: number, isBulk: boolean): number => {
    if (isBulk || isWholesaleMode || qty >= product.minWholesaleQty) {
      // Find matching tier
      const matchingTier = [...product.wholesaleTiers]
        .reverse()
        .find((t) => qty >= t.minQty);
      if (matchingTier) {
        return matchingTier.pricePerUnit;
      }
      return product.wholesalePrice;
    }
    return product.price;
  };

  const addToCart = (product: Product, quantity = 1, isWholesaleOrder = isWholesaleMode) => {
    const effectiveQty = isWholesaleOrder && quantity < product.minWholesaleQty ? product.minWholesaleQty : quantity;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + effectiveQty;
        const newBulkState = isWholesaleOrder || newQty >= product.minWholesaleQty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          isWholesale: newBulkState,
          unitPrice: calculateUnitPrice(product, newQty, newBulkState)
        };
        return updated;
      } else {
        const bulkState = isWholesaleOrder || effectiveQty >= product.minWholesaleQty;
        return [
          ...prevCart,
          {
            product,
            quantity: effectiveQty,
            isWholesale: bulkState,
            unitPrice: calculateUnitPrice(product, effectiveQty, bulkState)
          }
        ];
      }
    });

    showNotification(`Added ${product.name} to cart`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          const bulkState = item.isWholesale || isWholesaleMode || quantity >= item.product.minWholesaleQty;
          return {
            ...item,
            quantity,
            isWholesale: bulkState,
            unitPrice: calculateUnitPrice(item.product, quantity, bulkState)
          };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartSavings = cart.reduce((sum, item) => {
    const regularCost = item.product.price * item.quantity;
    const actualCost = item.unitPrice * item.quantity;
    return sum + (regularCost > actualCost ? regularCost - actualCost : 0);
  }, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `ibus-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showNotification(`Added "${product.name}" to inventory`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showNotification('Product inventory updated');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification('Product deleted from catalog');
  };

  // Open Checkout in different modes
  const openCheckoutWithMode = (mode: 'pay_now' | 'bnpl' | 'save_to_buy', directProduct?: Product) => {
    if (directProduct) {
      if (mode === 'save_to_buy') {
        setSaveToBuySelectedProduct(directProduct);
        setIsSaveToBuyModalOpen(true);
        return;
      }
      if (mode === 'bnpl') {
        setBnplSelectedProduct(directProduct);
        setIsBnplModalOpen(true);
        return;
      }
      // If pay_now with direct product, make sure it is in cart
      const inCart = cart.some((i) => i.product.id === directProduct.id);
      if (!inCart) {
        addToCart(directProduct, 1);
      }
    }
    setCheckoutInitialMode(mode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'orderStatus'>): Order => {
    const orderNumber = `IBUS-${orderData.deliveryAddress.state.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      orderStatus: 'confirmed',
      trackingCourier: 'iBUS Alaba Express / GIGL'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus'], trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status, ...(trackingNumber ? { trackingNumber } : {}) } : o))
    );
    showNotification(`Order status updated to "${status.replace('_', ' ')}"`);
  };

  // Save to Buy
  const createSaveToBuyPlan = (
    productId: string,
    targetAmount: number,
    initialDeposit: number,
    frequency: SaveToBuyPlan['frequency'],
    channel: 'Card' | 'Bank Transfer' | 'USSD' = 'Card'
  ): SaveToBuyPlan => {
    const prod = products.find((p) => p.id === productId);
    const planNumber = `STB-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toISOString().split('T')[0];
    const targetDateObj = new Date();
    targetDateObj.setDate(targetDateObj.getDate() + 45); // default target 45 days

    const newPlan: SaveToBuyPlan = {
      id: `stb-${Date.now()}`,
      planNumber,
      productId,
      productName: prod ? prod.name : 'iBUS Gadget',
      productImage: prod ? prod.images[0] : BRAND_INFO.logoUrl,
      targetAmount,
      totalSaved: initialDeposit,
      depositCount: initialDeposit > 0 ? 1 : 0,
      startDate: today,
      targetDate: targetDateObj.toISOString().split('T')[0],
      frequency,
      suggestedInstallment: Math.round((targetAmount - initialDeposit) / 4),
      status: 'active',
      deposits: initialDeposit > 0 ? [
        {
          id: `dep-${Date.now()}`,
          amount: initialDeposit,
          date: today,
          reference: `STB-INIT-${Math.floor(1000 + Math.random() * 9000)}`,
          verified: true,
          channel
        }
      ] : []
    };

    setSaveToBuyPlans((prev) => [newPlan, ...prev]);
    showNotification(`Save to Buy plan ${planNumber} created successfully!`);
    return newPlan;
  };

  const addSaveToBuyDeposit = (
    planId: string,
    amount: number,
    channel: 'Card' | 'Bank Transfer' | 'USSD',
    proofImage?: string
  ) => {
    setSaveToBuyPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const newTotal = plan.totalSaved + amount;
          const isComplete = newTotal >= plan.targetAmount;
          const newDeposit = {
            id: `dep-${Date.now()}`,
            amount,
            date: new Date().toISOString().split('T')[0],
            reference: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
            proofImage,
            verified: channel !== 'Bank Transfer', // auto-verify card/USSD, manual verify bank transfer receipt
            channel
          };

          return {
            ...plan,
            totalSaved: newTotal,
            depositCount: plan.depositCount + 1,
            status: isComplete ? 'completed' : plan.status,
            deposits: [newDeposit, ...plan.deposits]
          };
        }
        return plan;
      })
    );
    showNotification(`Deposit of ₦${amount.toLocaleString()} received!`);
  };

  const verifySaveToBuyDeposit = (planId: string, depositId: string) => {
    setSaveToBuyPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            deposits: plan.deposits.map((d) => (d.id === depositId ? { ...d, verified: true } : d))
          };
        }
        return plan;
      })
    );
    showNotification('Deposit receipt verified and approved');
  };

  // BNPL
  const createBnplPlan = (productId: string, bvnLast4: string, tenureWeeks = 6): BNPLPlan => {
    const prod = products.find((p) => p.id === productId);
    const totalAmount = prod ? prod.price : 25000;
    const initialDeposit = Math.round(totalAmount * 0.25);
    const amountRemaining = totalAmount - initialDeposit;
    const installmentCount = 3;
    const installmentAmount = Math.round(amountRemaining / installmentCount);

    const installments = Array.from({ length: installmentCount }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + (i + 1) * 14); // every 2 weeks
      return {
        installmentNumber: i + 2,
        dueDate: d.toISOString().split('T')[0],
        amount: installmentAmount,
        paid: false
      };
    });

    const newBnpl: BNPLPlan = {
      id: `bnpl-${Date.now()}`,
      applicationNumber: `BNPL-${Math.floor(1000 + Math.random() * 9000)}`,
      productId,
      productName: prod ? prod.name : 'iBUS Gadget',
      productImage: prod ? prod.images[0] : BRAND_INFO.logoUrl,
      totalAmount,
      initialDeposit,
      amountRemaining,
      tenureWeeks,
      customerBvnLast4: bvnLast4,
      status: 'active',
      installments: [
        {
          installmentNumber: 1,
          dueDate: new Date().toISOString().split('T')[0],
          amount: initialDeposit,
          paid: true,
          paidDate: new Date().toISOString().split('T')[0]
        },
        ...installments
      ]
    };

    setBnplPlans((prev) => [newBnpl, ...prev]);
    showNotification(`BNPL approved! 25% down payment confirmed.`);
    return newBnpl;
  };

  const payBnplInstallment = (planId: string, installmentNumber: number) => {
    setBnplPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          let paidAmount = 0;
          const updatedInstallments = plan.installments.map((inst) => {
            if (inst.installmentNumber === installmentNumber && !inst.paid) {
              paidAmount = inst.amount;
              return { ...inst, paid: true, paidDate: new Date().toISOString().split('T')[0] };
            }
            return inst;
          });
          const allPaid = updatedInstallments.every((inst) => inst.paid);
          return {
            ...plan,
            amountRemaining: Math.max(0, plan.amountRemaining - paidAmount),
            status: allPaid ? 'completed' : plan.status,
            installments: updatedInstallments
          };
        }
        return plan;
      })
    );
    showNotification(`Installment #${installmentNumber} payment confirmed.`);
  };

  // Wholesale Inquiries
  const submitWholesaleInquiry = (inquiry: Omit<WholesaleInquiry, 'id' | 'date' | 'status'>) => {
    const newInq: WholesaleInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setWholesaleInquiries((prev) => [newInq, ...prev]);
    showNotification('Wholesale distributor inquiry received. Our Alaba sales desk will contact you via WhatsApp.');
  };

  const updateInquiryStatus = (id: string, status: WholesaleInquiry['status']) => {
    setWholesaleInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  };

  // User Actions
  const loginAsDemoUser = (asWholesale = false) => {
    setUser({
      id: 'usr-chidera',
      name: asWholesale ? 'Emeka Umeh (Umeh Electronics Nig)' : 'Chidera Anyanwu',
      email: asWholesale ? 'umehelectronics@gmail.com' : 'chidera.gadgets@gmail.com',
      phone: '+234 810 220 8521',
      address: {
        street: asWholesale ? 'Shop 18, Block B, Alaba Market' : '14 Admiralty Way, Lekki',
        city: asWholesale ? 'Ojo' : 'Lagos',
        state: 'Lagos'
      },
      isWholesaleCustomer: asWholesale,
      businessName: asWholesale ? 'Umeh Electronics Nig Enterprises' : undefined
    });
    if (asWholesale) {
      setIsWholesaleMode(true);
    }
    showNotification(`Logged in as ${asWholesale ? 'Wholesale Partner' : 'Retail Customer'}`);
  };

  const logout = () => {
    setUser(null);
    setIsAdminAuthenticated(false);
    showNotification('Logged out successfully');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isWholesaleMode,
        setIsWholesaleMode,
        toggleWholesaleMode,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartSavings,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        activeProductModal,
        setActiveProductModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutInitialMode,
        openCheckoutWithMode,
        saveToBuySelectedProduct,
        setSaveToBuySelectedProduct,
        isSaveToBuyModalOpen,
        setIsSaveToBuyModalOpen,
        bnplSelectedProduct,
        setBnplSelectedProduct,
        isBnplModalOpen,
        setIsBnplModalOpen,
        isWholesaleInquiryModalOpen,
        setIsWholesaleInquiryModalOpen,
        user,
        setUser,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        loginAsDemoUser,
        logout,
        orders,
        createOrder,
        updateOrderStatus,
        saveToBuyPlans,
        createSaveToBuyPlan,
        addSaveToBuyDeposit,
        verifySaveToBuyDeposit,
        bnplPlans,
        createBnplPlan,
        payBnplInstallment,
        wholesaleInquiries,
        submitWholesaleInquiry,
        updateInquiryStatus,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};
