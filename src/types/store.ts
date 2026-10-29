export type ProductCategory =
  | 'All'
  | 'Suits & Blazers'
  | 'Regal Ethnic'
  | 'Linen & Shirts'
  | 'Urban Streetwear'
  | 'Trousers & Chinos';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  details: string[];
  fabric: string;
  fit: string;
  sizes: ProductSize[];
  stock: number;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  isBestSeller?: boolean;
  sku: string;
  color: string;
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

export type OrderStatus = 'New' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  couponApplied?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending COD';
  orderStatus: OrderStatus;
  createdAt: string;
  trackingCode: string;
  estimatedDelivery: string;
  loyaltyPointsEarned: number;
}

export interface CustomerReview {
  id: string;
  productId?: string;
  productName?: string;
  customerName: string;
  location: string;
  rating: number;
  headline: string;
  comment: string;
  date: string;
  verified: boolean;
  fitFeedback: 'True to Size' | 'Runs Small' | 'Runs Large';
  helpfulVotes: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  minOrder: number;
  active: boolean;
}
