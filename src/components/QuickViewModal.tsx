import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedSize(quickViewProduct.sizes[0]);
      setActiveImage(quickViewProduct.images[0]);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-[#F9F9F5] my-8"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* GALLERY & MEDIA */}
            <div className="p-6 bg-stone-100 flex flex-col justify-between space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner border border-stone-200">
                <img
                  src={selectedColor ? selectedColor.image : activeImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#5D9906] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                  Quick View
                </span>
              </div>

              {/* THUMBNAILS */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-[#5D9906] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-bold text-[#5D9906]">{quickViewProduct.category}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{quickViewProduct.rating}</span>
                    <span className="text-stone-400 font-normal">({quickViewProduct.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-heading font-black text-2xl text-stone-900 leading-tight">
                  {quickViewProduct.name}
                </h2>
                <p className="text-xs text-stone-500 mt-1">{quickViewProduct.subtitle}</p>

                {/* PRICE */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-heading font-extrabold text-3xl text-stone-900">
                    ₹{quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-sm text-stone-400 line-through">
                      ₹{quickViewProduct.originalPrice}
                    </span>
                  )}
                  <span className="bg-[#D8F05A] text-[#222222] text-xs font-black px-2.5 py-0.5 rounded-full">
                    Save {quickViewProduct.discountPercent}%
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-4 leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>
              </div>

              {/* OPTIONS: COLOR & SIZE */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Color: <span className="text-[#5D9906]">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(col)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          selectedColor.name === col.name
                            ? 'border-[#5D9906] bg-[#5D9906]/10 text-stone-900'
                            : 'border-stone-200 text-stone-600'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: col.hex }} />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Size Selection
                  </label>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === sz
                            ? 'bg-[#222222] text-[#D8F05A] border-[#222222] shadow-md'
                            : 'bg-white text-stone-700 border-stone-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUANTITY & ACTIONS */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center border border-stone-300 rounded-2xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-stone-600 font-bold text-base hover:bg-stone-100 rounded-l-2xl"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-extrabold text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-stone-600 font-bold text-base hover:bg-stone-100 rounded-r-2xl"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#5D9906] hover:bg-[#467304] text-white font-bold text-xs py-3.5 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3 rounded-2xl border transition-all ${
                      isWishlisted ? 'bg-red-500 text-white border-red-500' : 'border-stone-300 text-stone-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* TRUST FOOTER */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-stone-200 text-[11px] text-stone-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#5D9906]" /> Free Shipping &gt; ₹999
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D8B26E]" /> 30-Day Guarantee
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
