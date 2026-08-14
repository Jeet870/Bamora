import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  Truck,
  Sparkles,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { api } from '../services/api';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQty,
    getCartSubtotal,
    getDiscountAmount,
    getShippingFee,
    getCartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    showToast
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getCartTotal();

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setValidatingCoupon(true);
    try {
      const coupon = await api.validateCoupon(couponInput.trim());
      applyCoupon(coupon);
      setCouponInput('');
    } catch (err: any) {
      showToast(err.message || 'Invalid coupon code', 'error');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(item => `- ${item.product.name} (${item.selectedColor.name}, ${item.selectedSize}) x${item.quantity}`).join('%0A');
    const msg = `Hi BAMORA™! I would like to place an order:%0A%0A${itemsList}%0A%0ATotal Amount: ₹${total}%0A%0APlease confirm my order!`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#F9F9F5] h-full shadow-2xl flex flex-col justify-between border-l border-stone-300"
        >
          {/* CART HEADER */}
          <div className="p-6 border-b border-stone-200 glass-nav flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#5D9906]" />
              <h3 className="font-heading font-black text-xl text-stone-900">
                Your Bamboo Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#222222] text-white p-4 text-xs space-y-1.5 border-b border-[#5D9906]/30">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1 text-[#D8F05A]">
                <Truck className="w-4 h-4 text-[#D8F05A]" />
                {remainingForFreeShipping === 0
                  ? '🎉 You unlocked FREE Express Shipping!'
                  : `Add ₹${remainingForFreeShipping} more for FREE Express Delivery`}
              </span>
              <span className="text-[#D8F05A]">{Math.round(freeShippingPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#5D9906] to-[#D8F05A] transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              ></div>
            </div>
          </div>

          {/* CART ITEMS LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto animate-bounce" />
                <h4 className="font-heading font-bold text-lg text-stone-700">Your bag is empty</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Experience nature on every step with BAMORA™ luxury bamboo socks.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-[#5D9906] text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-2xl glass-panel border border-stone-200 shadow-sm items-center"
                >
                  <img
                    src={item.selectedColor.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-heading font-bold text-sm text-stone-900 truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      Color: {item.selectedColor.name} | Size: {item.selectedSize}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-stone-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <div className="flex items-center border border-stone-300 rounded-xl bg-white">
                        <button
                          onClick={() => updateCartQty(idx, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* CART FOOTER & CHECKOUT */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 glass-nav space-y-4 shadow-2xl">
              
              {/* COUPON INPUT */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#5D9906]/10 border border-[#5D9906]/30 text-xs font-bold text-[#5D9906]">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4" /> Code {appliedCoupon.code} Applied
                    </span>
                    <button onClick={removeCoupon} className="text-red-500 hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. BAMORA20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#5D9906]"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={validatingCoupon}
                      className="bg-[#222222] text-[#D8F05A] font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* SUMMARY BREAKDOWN */}
              <div className="space-y-1 text-xs text-stone-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#5D9906] font-bold">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span>{shipping === 0 ? <strong className="text-[#5D9906]">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-[#5D9906]">₹{total}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2">
                <button
                  onClick={() => { setCartOpen(false); onOpenCheckout(); }}
                  className="w-full bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-sm py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D8F05A]" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs py-3 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Order via WhatsApp
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
