export interface ColorOption {
  name: string;
  hex: string;
  image: string;
}

export interface ProductSpecs {
  material: string;
  weave: string;
  care: string;
  origin: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'Crew Socks' | 'Ankle Socks' | 'Best Sellers' | 'New Arrival';
  tag?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  stockCount: number;
  colors: ColorOption[];
  sizes: string[];
  images: string[];
  videoUrl?: string;
  features: string[];
  description: string;
  specs: ProductSpecs;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'user' | 'admin';
  savedAddresses?: {
    id: string;
    label: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  }[];
}

export interface AdminStats {
  totalRevenue: number;
  prepaidRevenue: number;
  codRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  conversionRate: number;
  recentOrders: Order[];
  salesByMonth: { month: string; revenue: number }[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  freeShipping?: boolean;
  description: string;
}

export interface OrderStep {
  title: string;
  time: string;
  completed: boolean;
}

export interface Order {
  orderId: string;
  trackingCode: string;
  status: string;
  date: string;
  items: {
    productId: string;
    name: string;
    qty: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: string;
  estimatedDelivery: string;
  trackingSteps: OrderStep[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
}
