import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useStore();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl glass-panel border border-[#5D9906]/30 text-stone-900"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#5D9906] shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#D8B26E] shrink-0" />}
          
          <p className="text-sm font-medium text-stone-800 flex-1">{toast.text}</p>
          
          <button
            onClick={hideToast}
            className="p-1 hover:bg-stone-200/50 rounded-full transition-colors text-stone-500"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
