import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, PackageCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { api } from '../services/api';
import { Order } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setTrackingOpen, showToast } = useStore();
  const [trackInput, setTrackInput] = useState('BAM-TRK-88492');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isTrackingOpen) return null;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    setLoading(true);
    try {
      const result = await api.trackOrder(trackInput.trim());
      setTrackedOrder(result);
    } catch (err: any) {
      showToast(err.message || 'Tracking number not found', 'error');
      setTrackedOrder(null);
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
          className="relative w-full max-w-xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-[#F9F9F5] p-6 sm:p-8"
        >
          <button
            onClick={() => setTrackingOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-6 h-6 text-[#5D9906]" />
            <h3 className="font-heading font-black text-2xl text-stone-900">
              Track Your Shipment
            </h3>
          </div>

          {/* SEARCH FORM */}
          <form onSubmit={handleTrack} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter Order ID or Tracking Number (e.g. BAM-TRK-88492)"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-[#5D9906]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-md"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>

          {/* TRACKING RESULTS */}
          {trackedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-[#222222] text-white space-y-6 border border-[#5D9906]/30"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D8F05A] block">Order Code</span>
                  <span className="font-heading font-extrabold text-lg">{trackedOrder.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Status</span>
                  <span className="bg-[#5D9906] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {trackedOrder.status}
                  </span>
                </div>
              </div>

              {/* TRACKING STEPS TIMELINE */}
              <div className="space-y-4 relative pl-4 border-l-2 border-stone-700">
                {trackedOrder.trackingSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start justify-between text-xs">
                    <div className={`absolute -left-[21px] top-0 w-3 h-3 rounded-full border-2 ${
                      step.completed ? 'bg-[#5D9906] border-[#D8F05A]' : 'bg-stone-800 border-stone-600'
                    }`} />
                    <div>
                      <p className={`font-bold ${step.completed ? 'text-white' : 'text-stone-500'}`}>
                        {step.title}
                      </p>
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">{step.time}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#5D9906]" /> Delivery Address: {trackedOrder.shippingAddress}
                </span>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
