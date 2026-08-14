import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';

export const RecentlyPurchasedPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState<any>(null);

  const mockPurchases = [
    {
      name: 'Aditya from Mumbai',
      product: 'BAMORA™ Executive Bamboo Crew Socks',
      time: '3 mins ago',
      img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Pooja from Bengaluru',
      product: 'BAMORA™ Gold Reserve Heritage Box',
      time: '6 mins ago',
      img: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Rohan from Delhi',
      product: 'BAMORA™ Invisible Air Ankle Socks',
      time: '12 mins ago',
      img: 'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=200&q=80'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPurchase(mockPurchases[0]);
      setIsVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * mockPurchases.length);
      setCurrentPurchase(mockPurchases[randomIdx]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 18000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible || !currentPurchase) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, scale: 0.9 }}
        className="fixed bottom-6 left-6 z-40 max-w-xs glass-panel p-3.5 rounded-2xl shadow-2xl border border-[#5D9906]/30 flex items-center gap-3 text-stone-900"
      >
        <img
          src={currentPurchase.img}
          alt="Purchased Sock"
          className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] text-[#5D9906] font-extrabold uppercase">
            <CheckCircle2 className="w-3 h-3" /> Just Purchased
          </div>
          <p className="text-xs font-bold text-stone-900 truncate">
            {currentPurchase.name}
          </p>
          <p className="text-[10px] text-stone-500 truncate">
            {currentPurchase.product} • <span className="font-semibold text-stone-400">{currentPurchase.time}</span>
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
