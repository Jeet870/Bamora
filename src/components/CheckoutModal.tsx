import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle2, Truck, ShieldCheck, Sparkles, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { api } from '../services/api';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const {
    cart,
    getCartTotal,
    user,
    clearCart,
    showToast
  } = useStore();

  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('');

  if (!isOpen) return null;

  const totalAmount = getCartTotal();

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !pincode) {
      return showToast('Please fill all shipping details', 'error');
    }

    setLoading(true);

    try {
      const payload = {
        items: cart.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          qty: i.quantity,
          price: i.product.price
        })),
        shippingAddress: `${address}, ${city}, ${stateName} - ${pincode}`,
        paymentMethod: paymentMethod === 'razorpay' ? 'Prepaid (Razorpay / UPI)' : 'Cash on Delivery',
        totalAmount
      };

      const order = await api.createOrder(payload);
      setCreatedOrder(order);
      clearCart();
      triggerConfetti();
      setStep('success');
      onOrderSuccess(order);
    } catch (err: any) {
      showToast(err.message || 'Payment processing failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-[#F9F9F5] my-8 p-6 sm:p-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'checkout' ? (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-[#5D9906]" />
                <h3 className="font-heading font-black text-2xl text-stone-900">
                  BAMORA™ Express Checkout
                </h3>
              </div>

              <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* LEFT: SHIPPING DETAILS */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#5D9906]">
                    1. Shipping & Contact Information
                  </h4>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                      />
                    </div>

                    <textarea
                      placeholder="Delivery Address (House No, Street, Landmark)"
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                    ></textarea>

                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                      />
                      <input
                        type="text"
                        placeholder="PIN Code"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                      />
                    </div>
                  </div>

                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#5D9906] pt-4">
                    2. Select Payment Method
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'razorpay'
                          ? 'border-[#5D9906] bg-[#5D9906]/10 text-stone-900 shadow-md'
                          : 'border-stone-300 bg-white text-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-[#5D9906]" />
                        <span className="text-[10px] bg-[#D8F05A] text-[#222222] font-black px-2 py-0.5 rounded-full">
                          Fast & Secure
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="font-extrabold text-xs">Prepaid (Razorpay)</p>
                        <p className="text-[10px] text-stone-500">UPI, GPay, Cards, NetBanking</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#5D9906] bg-[#5D9906]/10 text-stone-900 shadow-md'
                          : 'border-stone-300 bg-white text-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Truck className="w-5 h-5 text-[#D8B26E]" />
                      </div>
                      <div className="mt-3">
                        <p className="font-extrabold text-xs">Cash on Delivery</p>
                        <p className="text-[10px] text-stone-500">Pay cash upon receipt</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* RIGHT: ORDER SUMMARY */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4 p-5 rounded-3xl bg-[#222222] text-white border border-[#5D9906]/30">
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#D8F05A] mb-4">
                      Order Summary
                    </h4>

                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-stone-300">
                          <span className="truncate max-w-[160px]">
                            {item.product.name} (x{item.quantity})
                          </span>
                          <span className="font-bold text-white">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-800 space-y-2 text-xs text-stone-400 font-medium">
                      <div className="flex justify-between">
                        <span>Express Delivery</span>
                        <span className="text-[#5D9906]">FREE</span>
                      </div>
                      <div className="flex justify-between text-base font-black text-white pt-2 border-t border-stone-800">
                        <span>Total Payable</span>
                        <span className="text-[#D8F05A]">₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#5D9906] hover:bg-[#467304] text-white font-black text-sm py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    {loading ? 'Processing Order...' : `Complete Order (₹${totalAmount})`}
                  </button>

                </div>

              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#5D9906]/20 text-[#5D9906] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="bg-[#5D9906] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full">
                  Order Confirmed
                </span>
                <h3 className="font-heading font-black text-3xl text-stone-900">
                  Thank You for Choosing BAMORA™!
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Your luxury bamboo socks are being eco-packed at our warehouse. We have sent a confirmation email to <strong className="text-stone-900">{email}</strong>.
                </p>
              </div>

              {createdOrder && (
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-stone-100 border border-stone-300 text-left space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-bold">Order ID:</span>
                    <span className="font-extrabold text-stone-900">{createdOrder.orderId}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-bold">Tracking Code:</span>
                    <span className="font-extrabold text-[#5D9906] bg-[#5D9906]/10 px-2 py-0.5 rounded-lg border border-[#5D9906]/30">
                      {createdOrder.trackingCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-bold">Estimated Delivery:</span>
                    <span className="font-bold text-stone-900">{createdOrder.estimatedDelivery}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="bg-[#5D9906] text-white font-bold text-xs py-3 px-8 rounded-2xl shadow-lg"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
