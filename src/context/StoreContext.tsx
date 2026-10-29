import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  CustomerReview,
  Coupon,
  ProductCategory,
  ProductSize,
  OrderStatus
} from '../types/store';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import { INITIAL_REVIEWS, INITIAL_COUPONS } from '../data/mockReviews';

interface FilterState {
  searchQuery: string;
  category: ProductCategory;
  priceRange: [number, number];
  selectedSize: ProductSize | 'All';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'trending';
  inStockOnly: boolean;
}

interface StoreContextType {
  // Products
  products: Product[];
  filteredProducts: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;

  // Filters
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setCategory: (category: ProductCategory) => void;
  setPriceRange: (range: [number, number]) => void;
  setSelectedSize: (size: ProductSize | 'All') => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  setInStockOnly: (inStock: boolean) => void;
  resetFilters: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, size: ProductSize, quantity?: number) => void;
  removeFromCart: (productId: string, size: ProductSize) => void;
  updateCartQuantity: (productId: string, size: ProductSize, delta: number) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  latestOrder: Order | null;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingCode' | 'loyaltyPointsEarned'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date' | 'helpfulVotes'>) => void;
  voteHelpful: (reviewId: string) => void;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;

  // Loyalty Program
  loyaltyPoints: number;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isWriteReviewOpen: boolean;
  setIsWriteReviewOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  notificationMessage: string | null;
  showNotification: (msg: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  priceRange: [500, 15000],
  selectedSize: 'All',
  sortBy: 'featured',
  inStockOnly: false
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zt_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zt_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('zt_orders');
    if (saved) return JSON.parse(saved);
    // Initial sample orders for demonstration of the admin tracking panel
    return [
      {
        id: 'ZT-DEL-9812',
        customerName: 'Rohit Khandelwal',
        phone: '+91 98102 34567',
        email: 'rohit.k@gmail.com',
        address: 'House 42, Brahumpuri Main Road, Near Shiv Temple',
        landmark: 'Opposite State Bank',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110053',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            size: 'L',
            quantity: 1
          }
        ],
        subtotal: 8999,
        discountAmount: 500,
        shippingFee: 0,
        totalAmount: 8499,
        couponApplied: 'ZARAGOLD',
        paymentMethod: 'upi',
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        trackingCode: 'DTDC-ZT-78411',
        estimatedDelivery: 'Tomorrow, by 6:00 PM',
        loyaltyPointsEarned: 840
      },
      {
        id: 'ZT-DEL-9790',
        customerName: 'Gaurav Aggarwal',
        phone: '+91 99114 88219',
        email: 'gaurav.agg@yahoo.com',
        address: 'B-14 Preet Vihar, Vikas Marg',
        city: 'East Delhi',
        state: 'Delhi',
        pincode: '110092',
        items: [
          {
            product: INITIAL_PRODUCTS[1],
            size: 'M',
            quantity: 1
          },
          {
            product: INITIAL_PRODUCTS[2],
            size: 'M',
            quantity: 1
          }
        ],
        subtotal: 6398,
        discountAmount: 640,
        shippingFee: 0,
        totalAmount: 5758,
        couponApplied: 'DELHI10',
        paymentMethod: 'card',
        paymentStatus: 'Paid',
        orderStatus: 'Dispatched',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        trackingCode: 'BLUEDART-ZT-6652',
        estimatedDelivery: 'Today, by 4:00 PM',
        loyaltyPointsEarned: 570
      }
    ];
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('zt_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('zt_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    const saved = localStorage.getItem('zt_loyalty_points');
    return saved ? parseInt(saved, 10) : 450;
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3200);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('zt_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('zt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zt_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zt_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('zt_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('zt_loyalty_points', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  // Cart operations
  const addToCart = (product: Product, size: ProductSize, quantity = 1) => {
    if (product.stock <= 0) {
      showNotification('Item is currently out of stock.');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = { ...updated[existingIndex], quantity: Math.min(newQty, product.stock) };
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });

    showNotification(`Added ${product.name} (${size}) to Bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: ProductSize) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: string, size: ProductSize, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return { ...item, quantity: Math.min(nextQty, item.product.stock) };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Filter setters
  const setSearchQuery = (query: string) => setFilters(prev => ({ ...prev, searchQuery: query }));
  const setCategory = (category: ProductCategory) => setFilters(prev => ({ ...prev, category }));
  const setPriceRange = (range: [number, number]) => setFilters(prev => ({ ...prev, priceRange: range }));
  const setSelectedSize = (size: ProductSize | 'All') => setFilters(prev => ({ ...prev, selectedSize: size }));
  const setSortBy = (sort: FilterState['sortBy']) => setFilters(prev => ({ ...prev, sortBy: sort }));
  const setInStockOnly = (inStock: boolean) => setFilters(prev => ({ ...prev, inStockOnly: inStock }));
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // Filtered Products computation
  const filteredProducts = products.filter(product => {
    // Search
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchFabric = product.fabric.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchSku = product.sku.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchFabric && !matchDesc && !matchSku) return false;
    }
    // Category
    if (filters.category !== 'All' && product.category !== filters.category) {
      return false;
    }
    // Price Range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    // Size
    if (filters.selectedSize !== 'All' && !product.sizes.includes(filters.selectedSize)) {
      return false;
    }
    // In Stock Only
    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    return 0; // featured default order
  });

  // Admin Product operations
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `zt-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id: newId
    };
    setProducts(prev => [newProduct, ...prev]);
    showNotification(`New piece "${newProduct.name}" added to catalog.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showNotification(`Updated "${updated.name}" details.`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showNotification('Product removed from catalog.');
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  // Order operations
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingCode' | 'loyaltyPointsEarned'>): Order => {
    const orderId = `ZT-DEL-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingCode = `ZT-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
    const loyaltyPointsEarned = Math.floor(orderData.totalAmount * 0.1);

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      trackingCode,
      loyaltyPointsEarned
    };

    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);

    // Deduct stock
    setProducts(prev => {
      const copy = [...prev];
      for (const item of orderData.items) {
        const idx = copy.findIndex(p => p.id === item.product.id);
        if (idx !== -1) {
          copy[idx] = {
            ...copy[idx],
            stock: Math.max(0, copy[idx].stock - item.quantity)
          };
        }
      }
      return copy;
    });

    // Award loyalty points
    setLoyaltyPoints(prev => prev + loyaltyPointsEarned);

    // Clear cart
    clearCart();
    setAppliedCoupon(null);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
    showNotification(`Order ${orderId} marked as ${status}.`);
  };

  // Reviews
  const addReview = (reviewData: Omit<CustomerReview, 'id' | 'date' | 'helpfulVotes'>) => {
    const newRev: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulVotes: 1
    };
    setReviews(prev => [newRev, ...prev]);
    showNotification('Thank you! Your verified customer review has been published.');
  };

  const voteHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, helpfulVotes: r.helpfulVotes + 1 } : r));
    showNotification('Thank you for your feedback.');
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.active);

    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code.' };
    }
    if (cartSubtotal < found.minOrder) {
      return { success: false, message: `Minimum order value for ${found.code} is ₹${found.minOrder.toLocaleString('en-IN')}.` };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Code ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
    showNotification(`Coupon ${newCoupon.code} created.`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        filteredProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        filters,
        setSearchQuery,
        setCategory,
        setPriceRange,
        setSelectedSize,
        setSortBy,
        setInStockOnly,
        resetFilters,
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orders,
        latestOrder,
        createOrder,
        updateOrderStatus,
        reviews,
        addReview,
        voteHelpful,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        loyaltyPoints,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        isAdminOpen,
        setIsAdminOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isWriteReviewOpen,
        setIsWriteReviewOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        notificationMessage,
        showNotification
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
