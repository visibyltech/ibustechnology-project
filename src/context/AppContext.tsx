import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { 
  Product, 
  ProductCategory, 
  CartItem, 
  Order, 
  SaveToBuyPlan, 
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
  checkoutInitialMode: 'pay_now' | 'save_to_buy';
  openCheckoutWithMode: (mode: 'pay_now' | 'save_to_buy', directProduct?: Product) => void;

  saveToBuySelectedProduct: Product | null;
  setSaveToBuySelectedProduct: (p: Product | null) => void;
  isSaveToBuyModalOpen: boolean;
  setIsSaveToBuyModalOpen: (open: boolean) => void;

  isWholesaleInquiryModalOpen: boolean;
  setIsWholesaleInquiryModalOpen: (open: boolean) => void;

  // User & Authentication
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAdminAuthenticated: boolean;
  isAdminEmailRecognized: boolean;
  isAuthReady: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  logout: () => void;

  // Orders & Save to Buy Data
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'orderStatus'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], trackingNumber?: string) => void;

  saveToBuyPlans: SaveToBuyPlan[];
  verifySaveToBuyDeposit: (planId: string, depositId: string) => void;

  wholesaleInquiries: WholesaleInquiry[];
  submitWholesaleInquiry: (inquiry: Omit<WholesaleInquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: WholesaleInquiry['status']) => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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
  const [hasAttemptedProductSeed, setHasAttemptedProductSeed] = useState(false);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ibus_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ibus_wishlist');
    return saved ? JSON.parse(saved) : [];
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
  const [checkoutInitialMode, setCheckoutInitialMode] = useState<'pay_now' | 'save_to_buy'>('pay_now');

  const [saveToBuySelectedProduct, setSaveToBuySelectedProduct] = useState<Product | null>(null);
  const [isSaveToBuyModalOpen, setIsSaveToBuyModalOpen] = useState(false);

  const [isWholesaleInquiryModalOpen, setIsWholesaleInquiryModalOpen] = useState(false);

  // User
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminEmailRecognized, setIsAdminEmailRecognized] = useState<boolean>(false);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  // Firebase Authentication is the source of truth for customer sessions.
  // Wait for Firebase to restore the session before rendering protected routes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsAdminAuthenticated(false);
        setIsAdminEmailRecognized(false);
        setIsAuthReady(true);
        return;
      }

      try {
        await firebaseUser.reload();
      } catch (error) {
        console.error('Unable to refresh the signed-in account:', error);
      }

      const currentUser = auth.currentUser || firebaseUser;
      try {
        await currentUser.getIdToken(true);
      } catch (error) {
        console.error('Unable to refresh Firebase sign-in token:', error);
      }
      const email = (currentUser.email || '').toLowerCase();
      const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
        .split(',')
        .map((value: string) => value.trim().toLowerCase())
        .filter(Boolean);
      const recognizedAdmin = adminEmails.includes(email);

      setUser({
        id: currentUser.uid,
        name: currentUser.displayName || email.split('@')[0] || 'iBUS Customer',
        email,
        phone: '',
        address: { street: '', city: '', state: '' },
        isWholesaleCustomer: false
      });
      setIsAdminEmailRecognized(recognizedAdmin);
      setIsAdminAuthenticated(recognizedAdmin);
      setIsAuthReady(true);
    });

    return unsubscribe;
  }, []);

  // Customer orders, Save to Buy plans and inquiries
  const [orders, setOrders] = useState<Order[]>(() => {
    return [];
  });

  const [saveToBuyPlans, setSaveToBuyPlans] = useState<SaveToBuyPlan[]>(() => {
    return [];
  });

  const [wholesaleInquiries, setWholesaleInquiries] = useState<WholesaleInquiry[]>(() => {
    return [];
  });

  // The public catalogue is read from Firestore. An administrator explicitly
  // migrates the existing browser catalogue from the Admin Console so no local
  // products are silently overwritten by a starter-only seed.
  useEffect(() => {
    const stop = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (!snapshot.empty) {
        setProducts(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Product)));
      }
    }, (error) => {
      console.error('Unable to load the Firestore product catalogue:', error);
      showNotification('Could not load the permanent product catalogue. Check Firestore access.');
    });
    return stop;
  }, []);

  // Firestore is the shared source of truth for customer orders and Save to Buy
  // plans. LocalStorage remains only as a non-authoritative cache for the UI.
  useEffect(() => {
    if (!user?.id) {
      setOrders([]);
      setSaveToBuyPlans([]);
      return;
    }

    const ordersQuery = isAdminAuthenticated
      ? query(collection(db, 'orders'))
      : query(collection(db, 'orders'), where('customerUid', '==', user.id));
    const plansQuery = isAdminAuthenticated
      ? query(collection(db, 'saveToBuyPlans'))
      : query(collection(db, 'saveToBuyPlans'), where('customerUid', '==', user.id));

    const stopOrders = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Order)));
    }, (error) => showNotification(error.message || 'Unable to load orders from Firestore'));

    const stopPlans = onSnapshot(plansQuery, (snapshot) => {
      setSaveToBuyPlans(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as SaveToBuyPlan)));
    }, (error) => showNotification(error.message || 'Unable to load Save to Buy plans'));

    return () => {
      stopOrders();
      stopPlans();
    };
  }, [user?.id, isAdminAuthenticated]);

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

  // Customer transactions are loaded from Firestore only. Clear old browser-cached
  // demo records so they can never appear as genuine orders, savings or credit.
  useEffect(() => {
    localStorage.removeItem('ibus_orders');
    localStorage.removeItem('ibus_stb');
    localStorage.removeItem('ibus_bnpl');
    localStorage.removeItem('ibus_inquiries');
  }, []);

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
    void addDoc(collection(db, 'products'), { ...newProd, createdAt: new Date().toISOString() })
      .then(() => showNotification(`Added "${newProd.name}" to the shared product catalogue`))
      .catch((error) => showNotification(error instanceof Error ? error.message : 'Unable to publish product to Firestore'));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    void updateDoc(doc(db, 'products', id), updates)
      .then(() => showNotification('Product inventory updated for all customers'))
      .catch((error) => showNotification(error instanceof Error ? error.message : 'Unable to update product in Firestore'));
  };

  const deleteProduct = (id: string) => {
    void deleteDoc(doc(db, 'products', id))
      .then(() => showNotification('Product deleted from the shared catalogue'))
      .catch((error) => showNotification(error instanceof Error ? error.message : 'Unable to delete product from Firestore'));
  };

  // Open Checkout in different modes
  const openCheckoutWithMode = (mode: 'pay_now' | 'save_to_buy', directProduct?: Product) => {
    if (!user) {
      window.dispatchEvent(new Event('ibus:open-auth'));
      return;
    }
    if (directProduct) {
      if (mode === 'save_to_buy') {
        setSaveToBuySelectedProduct(directProduct);
        setIsSaveToBuyModalOpen(true);
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

  // Save to Buy verification is performed through the payment-submission review flow.
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
  const logout = async () => {
    try {
      await signOut(auth);
      showNotification('Logged out successfully');
    } catch (error) {
      showNotification('Unable to sign out. Please try again.');
    }
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
        isWholesaleInquiryModalOpen,
        setIsWholesaleInquiryModalOpen,
        user,
        setUser,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        isAdminEmailRecognized,
        isAuthReady,
        logout,
        orders,
        createOrder,
        updateOrderStatus,
        saveToBuyPlans,
        verifySaveToBuyDeposit,
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
