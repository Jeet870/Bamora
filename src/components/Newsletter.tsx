import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useStore } from '../store/useStore';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const { showToast, applyCoupon } = useStore();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return showToast('Please enter a valid email address', 'error');
    }
    setLoading(true);
    try {
      const msg = await api.subscribeNewsletter(email);
      setSubscribed(true);
      showToast(msg, 'success');
      // Automatically reward WELCOME10 coupon code
      applyCoupon({ code: 'WELCOME10', discountAmount: 150, description: '₹150 Flat Welcome Discount' });
    } catch (err: any) {
      showToast(err.message || 'Subscription failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-hero-radial relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-[#5D9906]/30 shadow-2xl text-center space-y-6 relative overflow-hidden bg-gradient-to-br from-[#222222] to-[#152404] text-white">
          
          <div className="w-14 h-14 rounded-2xl bg-[#5D9906] text-[#D8F05A] flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
              Join the <span className="text-[#D8F05A]">BAMORA™</span> Luxury Circle
            </h2>
            <p className="text-stone-300 text-sm sm:text-base">
              Subscribe to unlock VIP access to new releases, seasonal bamboo gift sets, and an instant <strong className="text-[#D8F05A]">₹150 welcome discount</strong> applied to your cart.
            </p>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-[#5D9906]/20 border border-[#5D9906] text-[#D8F05A] text-sm font-bold max-w-md mx-auto flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-[#D8F05A]" /> You are subscribed! Coupon WELCOME10 applied automatically to your cart.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 text-white placeholder-stone-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D8F05A] border border-white/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-lg transition-all"
              >
                {loading ? 'Subscribing...' : 'Subscribe & Save'}
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
