import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('bamora_cookie_consent');
    if (!saved) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('bamora_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-40 max-w-md glass-panel p-4 rounded-3xl shadow-2xl border border-[#5D9906]/30 text-stone-900 bg-[#F9F9F5]/95"
      >
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#5D9906] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs space-y-1">
            <p className="font-bold text-stone-900">BAMORA Cookie & Privacy Notice</p>
            <p className="text-stone-600 text-[11px] leading-relaxed">
              We use essential cookies to personalize your shopping experience and measure analytics. No tracking without consent.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="bg-[#5D9906] text-white text-[11px] font-bold px-4 py-1.5 rounded-xl shadow-sm hover:bg-[#467304]"
              >
                Accept Cookies
              </button>
              <button
                onClick={() => setAccepted(true)}
                className="text-[11px] font-semibold text-stone-500 hover:underline"
              >
                Decline
              </button>
            </div>
          </div>
          <button onClick={() => setAccepted(true)} className="text-stone-400 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
