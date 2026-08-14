import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CompareModal: React.FC = () => {
  const {
    isCompareOpen,
    setCompareOpen,
    comparedProducts,
    toggleCompareProduct,
    clearCompared,
    addToCart
  } = useStore();

  if (!isCompareOpen || comparedProducts.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-[#F9F9F5] p-6 sm:p-8 my-8"
        >
          <button
            onClick={() => setCompareOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#5D9906]" />
              <h3 className="font-heading font-black text-2xl text-stone-900">
                Compare BAMORA™ Socks ({comparedProducts.length}/3)
              </h3>
            </div>

            <button
              onClick={clearCompared}
              className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {comparedProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl glass-panel border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100">
                  <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleCompareProduct(prod)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="font-heading font-bold text-sm text-stone-900">{prod.name}</h4>
                  <p className="font-extrabold text-[#5D9906] text-base">₹{prod.price}</p>
                  
                  <div className="space-y-1 text-stone-600 pt-2 border-t border-stone-200">
                    <p><strong>Category:</strong> {prod.category}</p>
                    <p><strong>Rating:</strong> {prod.rating} ★</p>
                    <p><strong>Colors:</strong> {prod.colors.map(c => c.name).join(', ')}</p>
                    <p><strong>Material:</strong> {prod.specs.material}</p>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(prod)}
                  className="w-full bg-[#5D9906] text-white font-bold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
