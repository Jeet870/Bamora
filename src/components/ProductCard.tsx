import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star, Layers, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    toggleCompareProduct,
    comparedProducts
  } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const isCompared = comparedProducts.some(p => p.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-panel rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-200/80 flex flex-col justify-between group"
    >
      {/* CARD TOP MEDIA CONTAINER */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        
        {/* MAIN PRODUCT IMAGE */}
        <img
          src={selectedColor ? selectedColor.image : product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* SECONDARY HOVER IMAGE OVERLAY */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} detail`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* BADGES TOP LEFT */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="bg-[#222222] text-[#D8F05A] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider border border-[#D8F05A]/30">
              {product.tag}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-[#5D9906] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* ACTION BUTTONS OVERLAY TOP RIGHT */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* WISHLIST BUTTON */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
              isWishlisted ? 'bg-red-500 text-white' : 'glass-panel text-stone-700 hover:text-red-500 hover:scale-110'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* QUICK VIEW BUTTON */}
          <button
            onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
            className="w-9 h-9 rounded-full glass-panel text-stone-700 hover:text-[#5D9906] hover:scale-110 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* COMPARE BUTTON */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleCompareProduct(product); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
              isCompared ? 'bg-[#5D9906] text-white' : 'glass-panel text-stone-700 hover:text-[#5D9906] hover:scale-110'
            } opacity-0 group-hover:opacity-100`}
            title="Compare Product"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* COLOR PREVIEW SWATCHES OVERLAY BOTTOM */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10 glass-panel px-2.5 py-1.5 rounded-full border border-white/50 shadow-sm">
          {product.colors.map((col, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setSelectedColor(col); }}
              className={`w-3.5 h-3.5 rounded-full border transition-all ${
                selectedColor.name === col.name ? 'ring-2 ring-[#5D9906] scale-110' : 'opacity-80'
              }`}
              style={{ backgroundColor: col.hex }}
              title={col.name}
            />
          ))}
        </div>

      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-semibold text-[#5D9906]">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-heading font-bold text-base text-stone-900 line-clamp-1 cursor-pointer hover:text-[#5D9906] transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* PRICING & ADD TO CART */}
        <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-lg text-stone-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <p className="text-[10px] text-[#5D9906] font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Incl. all taxes
            </p>
          </div>

          <button
            onClick={() => addToCart(product, selectedColor)}
            className="bg-[#5D9906] hover:bg-[#467304] text-white p-2.5 rounded-2xl transition-all shadow-md flex items-center gap-1.5 hover:scale-105"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Add</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};
