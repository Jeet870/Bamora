import { create } from 'zustand';
import { Product, CartItem, ColorOption, User, Coupon } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  appliedCoupon: Coupon | null;
  
  // Modals & UI States
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isAuthOpen: boolean;
  isTrackingOpen: boolean;
  isCompareOpen: boolean;
  isChatOpen: boolean;
  isNewsletterModalOpen: boolean;
  isAdminDashboardOpen: boolean;
  
  quickViewProduct: Product | null;
  activeProductPage: Product | null;
  comparedProducts: Product[];
  
  user: User | null;
  token: string | null;
  
  activeCategory: string;
  searchQuery: string;
  
  toast: { type: 'success' | 'error' | 'info'; text: string } | null;
  
  // Actions
  addToCart: (product: Product, color?: ColorOption, size?: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQty: (index: number, qty: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  
  setUser: (user: User | null, token?: string | null) => void;
  logout: () => void;
  
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setAuthOpen: (open: boolean) => void;
  setTrackingOpen: (open: boolean) => void;
  setCompareOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
  setAdminDashboardOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setActiveProductPage: (product: Product | null) => void;
  
  toggleCompareProduct: (product: Product) => void;
  clearCompared: () => void;
  
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  
  // Selectors/Computed
  getCartSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getCartTotal: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  appliedCoupon: null,
  
  isCartOpen: false,
  isSearchOpen: false,
  isAuthOpen: false,
  isTrackingOpen: false,
  isCompareOpen: false,
  isChatOpen: false,
  isNewsletterModalOpen: false,
  isAdminDashboardOpen: false,
  
  quickViewProduct: null,
  activeProductPage: null,
  comparedProducts: [],
  
  user: null,
  token: localStorage.getItem('bamora_token') || null,
  
  activeCategory: 'All',
  searchQuery: '',
  
  toast: null,
  
  // Cart Actions
  addToCart: (product, color, size, quantity = 1) => {
    const user = get().user;
    if (!user) {
      get().showToast('Please sign in or create an account to add items to your cart.', 'info');
      set({ isAuthOpen: true });
      return;
    }

    const selectedColor = color || product.colors[0];
    const selectedSize = size || product.sizes[0];
    const cart = get().cart;
    
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id &&
              item.selectedColor.name === selectedColor.name &&
              item.selectedSize === selectedSize
    );
    
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      set({ cart: updatedCart, isCartOpen: true });
    } else {
      set({
        cart: [...cart, { product, selectedColor, selectedSize, quantity }],
        isCartOpen: true
      });
    }
    
    get().showToast(`Added ${product.name} to cart!`, 'success');
  },

  removeFromCart: (index) => {
    const updated = get().cart.filter((_, i) => i !== index);
    set({ cart: updated });
    get().showToast('Item removed from cart', 'info');
  },

  updateCartQty: (index, qty) => {
    if (qty <= 0) return get().removeFromCart(index);
    const updated = [...get().cart];
    updated[index].quantity = qty;
    set({ cart: updated });
  },

  clearCart: () => set({ cart: [], appliedCoupon: null }),
  
  // Wishlist
  toggleWishlist: (product) => {
    const wishlist = get().wishlist;
    const exists = wishlist.some(p => p.id === product.id);
    
    if (exists) {
      set({ wishlist: wishlist.filter(p => p.id !== product.id) });
      get().showToast(`Removed from Wishlist`, 'info');
    } else {
      set({ wishlist: [...wishlist, product] });
      get().showToast(`Added to Wishlist!`, 'success');
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some(p => p.id === productId);
  },
  
  // Coupons
  applyCoupon: (coupon) => {
    set({ appliedCoupon: coupon });
    get().showToast(`Coupon ${coupon.code} applied successfully!`, 'success');
  },

  removeCoupon: () => {
    set({ appliedCoupon: null });
    get().showToast('Coupon removed', 'info');
  },
  
  // Auth
  setUser: (user, token) => {
    if (token) {
      localStorage.setItem('bamora_token', token);
    }
    set({ user, token: token || get().token });
  },

  logout: () => {
    localStorage.removeItem('bamora_token');
    set({ user: null, token: null, isAdminDashboardOpen: false });
    get().showToast('Logged out of BAMORA™', 'info');
  },
  
  // UI Controls
  setCartOpen: (open) => set({ isCartOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setAuthOpen: (open) => set({ isAuthOpen: open }),
  setTrackingOpen: (open) => set({ isTrackingOpen: open }),
  setCompareOpen: (open) => set({ isCompareOpen: open }),
  setChatOpen: (open) => set({ isChatOpen: open }),
  setAdminDashboardOpen: (open) => set({ isAdminDashboardOpen: open }),
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),
  setActiveProductPage: (product) => set({ activeProductPage: product }),
  
  toggleCompareProduct: (product) => {
    const compared = get().comparedProducts;
    const exists = compared.some(p => p.id === product.id);
    if (exists) {
      set({ comparedProducts: compared.filter(p => p.id !== product.id) });
      get().showToast('Removed from compare list', 'info');
    } else {
      if (compared.length >= 3) {
        return get().showToast('You can compare up to 3 products at a time', 'error');
      }
      set({ comparedProducts: [...compared, product], isCompareOpen: true });
      get().showToast('Added to comparison', 'success');
    }
  },

  clearCompared: () => set({ comparedProducts: [] }),
  
  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  showToast: (text, type = 'success') => {
    set({ toast: { text, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 3500);
  },

  hideToast: () => set({ toast: null }),
  
  // Computations
  getCartSubtotal: () => {
    return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getCartSubtotal();
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;
    
    if (coupon.discountPercent) {
      return Math.round((subtotal * coupon.discountPercent) / 100);
    }
    if (coupon.discountAmount) {
      return Math.min(subtotal, coupon.discountAmount);
    }
    return 0;
  },

  getShippingFee: () => {
    const subtotal = get().getCartSubtotal();
    const coupon = get().appliedCoupon;
    if (subtotal === 0) return 0;
    if (subtotal >= 999 || coupon?.freeShipping) return 0;
    return 99; // Standard express delivery fee
  },

  getCartTotal: () => {
    const subtotal = get().getCartSubtotal();
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingFee();
    return Math.max(0, subtotal - discount + shipping);
  }
}));
