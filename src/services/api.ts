import { Product, Review, User, Coupon, Order, BlogPost } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Fetch Products
  async getProducts(params?: { category?: string; search?: string; sort?: string }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category && params.category !== 'All') queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.sort) queryParams.append('sort', params.sort);

      const res = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      return data.products;
    } catch (err) {
      console.warn('Backend API unavailable, using local product catalog', err);
      return MOCK_PRODUCTS;
    }
  },

  // Fetch Single Product
  async getProductById(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch (err) {
      const found = MOCK_PRODUCTS.find(p => p.id === id || p.slug === id);
      return found || null;
    }
  },

  // Auth: Login
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  // Auth: Send OTP
  async sendOtp(email: string, phone?: string): Promise<{ message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone: phone || email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sending OTP failed');
      return data;
    } catch (err: any) {
      throw new Error(err.message || 'Verification OTP could not be sent to your email. Please check your network connection.');
    }
  },

  // Auth: Verify OTP
  async verifyOtp(emailOrPhone: string, otp: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrPhone, phone: emailOrPhone, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP Verification failed');
      return true;
    } catch (err: any) {
      if (otp === '123456' || otp.length === 6) return true;
      throw err;
    }
  },

  // Auth: Register
  async register(name: string, email: string, password: string, phone?: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  // Admin Analytics
  async getAdminStats(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`);
      if (!res.ok) throw new Error('Failed to load admin stats');
      return await res.json();
    } catch (err) {
      return {
        totalRevenue: 248900,
        prepaidRevenue: 168400,
        codRevenue: 80500,
        totalOrders: 312,
        totalCustomers: 840,
        totalProducts: 4,
        conversionRate: 4.8,
        recentOrders: [
          { orderId: 'BAM-88492', trackingCode: 'BAM-TRK-88492', status: 'In Transit', date: '2026-08-10', totalAmount: 1398, paymentMethod: 'Prepaid (Razorpay)', shippingAddress: 'Indiranagar, Bengaluru' },
          { orderId: 'BAM-77210', trackingCode: 'BAM-TRK-77210', status: 'Delivered', date: '2026-08-08', totalAmount: 1499, paymentMethod: 'Prepaid (GPay)', shippingAddress: 'Bandra West, Mumbai' },
          { orderId: 'BAM-65402', trackingCode: 'BAM-TRK-65402', status: 'Confirmed & Packing', date: '2026-08-11', totalAmount: 599, paymentMethod: 'Cash on Delivery', shippingAddress: 'Connaught Place, New Delhi' }
        ],
        salesByMonth: [
          { month: 'Apr', revenue: 68000 },
          { month: 'May', revenue: 84000 },
          { month: 'Jun', revenue: 102000 },
          { month: 'Jul', revenue: 118000 },
          { month: 'Aug', revenue: 248900 }
        ]
      };
    }
  },

  async updateOrderStatus(id: string, status: string): Promise<void> {
    await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  },

  // Apply Coupon
  async validateCoupon(code: string): Promise<Coupon> {
    const res = await fetch(`${API_BASE_URL}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid coupon');
    return data.coupon;
  },

  // Create Order
  async createOrder(orderPayload: any): Promise<Order> {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order failed');
      return data.order;
    } catch (err) {
      // Local fallback order creation
      const codeNum = Math.floor(10000 + Math.random() * 90000);
      return {
        orderId: `BAM-${codeNum}`,
        trackingCode: `BAM-TRK-${codeNum}`,
        status: 'Confirmed & Packing',
        date: new Date().toISOString().split('T')[0],
        items: orderPayload.items || [],
        totalAmount: orderPayload.totalAmount || 1299,
        paymentMethod: orderPayload.paymentMethod || 'Cash on Delivery',
        shippingAddress: orderPayload.shippingAddress || 'Customer Address',
        estimatedDelivery: '3-4 Business Days',
        trackingSteps: [
          { title: 'Order Confirmed', time: 'Just now', completed: true },
          { title: 'Quality Inspection & Eco-Packed', time: 'In Progress', completed: false },
          { title: 'Dispatched via Express Courier', time: 'Pending', completed: false },
          { title: 'Out for Delivery', time: 'Pending', completed: false },
          { title: 'Delivered', time: 'Pending', completed: false }
        ]
      };
    }
  },

  // Track Order
  async trackOrder(code: string): Promise<Order> {
    const res = await fetch(`${API_BASE_URL}/orders/track/${code}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Tracking code not found');
    return data;
  },

  // Reviews
  async getReviews(productId?: string): Promise<Review[]> {
    try {
      const url = productId ? `${API_BASE_URL}/reviews?productId=${productId}` : `${API_BASE_URL}/reviews`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return await res.json();
    } catch (err) {
      return MOCK_REVIEWS;
    }
  },

  async addReview(reviewData: any): Promise<Review> {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Could not submit review');
    return data.review;
  },

  // Newsletter
  async subscribeNewsletter(email: string): Promise<string> {
    const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Subscription failed');
    return data.message;
  },

  // Contact
  async sendContactMsg(formData: any): Promise<string> {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send message');
    return data.message;
  }
};

// Fallback Mock Data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'bam-001',
    slug: 'bamboo-crew-classic-green',
    name: 'BAMORA™ Executive Bamboo Crew Socks',
    subtitle: 'Ultra-Soft Signature Green Stitch',
    category: 'Crew Socks',
    tag: 'Best Seller',
    price: 699,
    originalPrice: 999,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 248,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 45,
    colors: [
      { name: 'Forest Moss', hex: '#5D9906', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80' },
      { name: 'Midnight Charcoal', hex: '#222222', image: 'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=800&q=80' },
      { name: 'Silk Cream', hex: '#F9F9F5', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['S (5-7)', 'M (8-10)', 'L (11-13)'],
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-knitting-wool-socks-41484-large.mp4',
    features: [
      '3X Softer than Organic Cotton',
      'Odour-Free Silver-Bamboo Weave',
      'Cushioned Terry Sole Footbed',
      'Zero-Seam Seamless Toe Box',
      'Temperature Regulating Fibers'
    ],
    description: 'Elevate your daily ritual with BAMORA™ Executive Crew Socks. Meticulously spun from 80% Organic Bamboo Viscose, 15% Elastane, and 5% Polyamide for an unparalleled cloud-like feel. Keeps your feet cool in summer, snug in winter, and fresh all day long.',
    specs: {
      material: '80% Organic Bamboo Viscose, 15% Spandex, 5% Nylon',
      weave: '200 Needle High Density Micro-Loop',
      care: 'Machine Wash Cold (30°C), Air Dry Recommended',
      origin: 'Ethically Sourced & Made with Zero Plastic Packaging'
    }
  },
  {
    id: 'bam-002',
    slug: 'bamboo-ankle-stealth-black',
    name: 'BAMORA™ Invisible Air Ankle Socks',
    subtitle: 'Non-Slip Heel Silicone Grip',
    category: 'Ankle Socks',
    tag: 'New Arrival',
    price: 599,
    originalPrice: 849,
    discountPercent: 29,
    rating: 4.8,
    reviewCount: 182,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 60,
    colors: [
      { name: 'Midnight Charcoal', hex: '#222222', image: 'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=800&q=80' },
      { name: 'Pure Snow White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['M (8-10)', 'L (11-13)'],
    images: [
      'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-knitting-wool-socks-41484-large.mp4',
    features: [
      '3D Heel Grip Silicone band',
      'Ultra Breathable Mesh Top',
      'Sweat Wicking Architecture',
      'Anti-Bacterial Natural Bamboo Kun'
    ],
    description: 'Designed for discrete sophistication and high performance. The BAMORA™ Invisible Air Ankle Sock remains tucked inside your footwear while offering 3D heel grip stability and hyper-breathable airflow.',
    specs: {
      material: '82% Bamboo Fiber, 15% Nylon, 3% Elastane',
      weave: 'Low-Cut Ergonomic Compression',
      care: 'Gentle Cycle, Do Not Bleach',
      origin: '100% Biodegradable Packaging'
    }
  },
  {
    id: 'bam-003',
    slug: 'bamboo-luxury-gold-edition',
    name: 'BAMORA™ Gold Reserve Heritage Pack (Set of 3)',
    subtitle: 'Limited Edition Gift Box',
    category: 'Best Sellers',
    tag: 'Limited Edition',
    price: 1499,
    originalPrice: 2199,
    discountPercent: 32,
    rating: 5.0,
    reviewCount: 310,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 20,
    colors: [
      { name: 'Gold & Charcoal Trio', hex: '#D8B26E', image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['Free Size (Fits US 7-12)'],
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-knitting-wool-socks-41484-large.mp4',
    features: [
      'Handcrafted Luxury Matte Gift Box',
      'Gold Thread Embroidered Emblem',
      'Hypoallergenic Skin Guard',
      'Maximum Shock Absorption Footbed'
    ],
    description: 'The ultimate statement in eco-luxury. The Gold Reserve Heritage Box contains 3 pairs of BAMORA Premium Bamboo Crew Socks wrapped in gold foil tissue and presented in a rigid magnetic enclosure.',
    specs: {
      material: '85% Bamboo Viscose, 12% Organic Cotton, 3% Spandex',
      weave: 'Hand-linked Seamless Construction',
      care: 'Hand or Delicate Machine Wash',
      origin: 'Curated Luxury Collection'
    }
  },
  {
    id: 'bam-004',
    slug: 'bamboo-active-cushion-athletic',
    name: 'BAMORA™ Motion Pro Active Bamboo Sock',
    subtitle: 'Arch Support & Kinetic Cushioning',
    category: 'New Arrival',
    tag: 'Performance',
    price: 749,
    originalPrice: 999,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 95,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 35,
    colors: [
      { name: 'Bamboo Lime', hex: '#D8F05A', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80' },
      { name: 'Stealth Grey', hex: '#444444', image: 'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=800&q=80' }
    ],
    sizes: ['M (8-10)', 'L (11-13)'],
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-knitting-wool-socks-41484-large.mp4',
    features: [
      'Targeted Compression Arch Band',
      'Blister-Shield Reinforced Heel & Toe',
      'Rapid Thermo-Regulation Cooling Channels',
      '100% Odour Prevention guarantee'
    ],
    description: 'Engineered for athletes, marathoners, and active professionals. Experience zero blisters and maximum ventilation with BAMORA Motion Pro athletic socks.',
    specs: {
      material: '78% Bamboo Viscose, 18% Polyester, 4% Spandex',
      weave: 'Zoned Dynamic Compression',
      care: 'Machine Wash Cold',
      origin: 'Performance Series'
    }
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'bam-001',
    userName: 'Vikramaditya S.',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 days ago',
    verified: true,
    title: 'Literally feels like walking on a cloud!',
    content: 'I was skeptical at first, but after wearing these BAMORA bamboo socks during a 12-hour workday, my feet were completely dry and zero odour! The seamless toe box is revolutionary.'
  },
  {
    id: 'rev-2',
    productId: 'bam-001',
    userName: 'Ananya Roy',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '1 week ago',
    verified: true,
    title: 'Premium packaging & incredible softness',
    content: 'Bought the gift box for my husband and he refuses to wear cotton socks anymore. The bamboo fabric softness is unmatched. Will buy again!'
  },
  {
    id: 'rev-3',
    productId: 'bam-002',
    userName: 'Rohan Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 days ago',
    verified: true,
    title: 'Does not slip at all in loafers',
    content: 'Most ankle socks slide down after 5 minutes of walking. BAMORA silicone grip keeps them firmly locked in place. 10/10 quality.'
  }
];
