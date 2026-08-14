import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  RotateCw,
  Play,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { Product, Review } from '../types';
import { useStore } from '../store/useStore';
import { ProductCard } from './ProductCard';
import { MOCK_PRODUCTS } from '../services/api';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
  onSelectProduct
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [is360Active, setIs360Active] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Review Form State
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerTitle, setReviewerTitle] = useState('');
  const [reviewerContent, setReviewerContent] = useState('');

  const { addToCart, toggleWishlist, isInWishlist, setCartOpen, setAuthOpen, showToast } = useStore();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setCartOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'success');
    }
  };

  const handleSpin360 = () => {
    setIs360Active(true);
    setSpinDegree((prev) => (prev + 90) % 360);
  };

  const recommended = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#F9F9F5] min-h-screen py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB / BACK BUTTON */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 hover:text-[#5D9906] font-bold text-sm transition-colors py-2 px-4 glass-panel rounded-2xl border border-stone-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-stone-600 hover:text-[#5D9906] font-bold text-sm transition-colors py-2 px-4 glass-panel rounded-2xl border border-stone-200"
          >
            <Share2 className="w-4 h-4" /> Share Product
          </button>
        </div>

        {/* MAIN PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 glass-panel p-6 sm:p-10 rounded-3xl border border-[#5D9906]/20 shadow-2xl">
          
          {/* LEFT: GALLERY & 360 MEDIA VIEWER */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* MAIN IMAGE CARD */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 shadow-lg border border-stone-200 group">
              <img
                src={selectedColor ? selectedColor.image : activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ transform: is360Active ? `rotate(${spinDegree}deg)` : undefined }}
              />

              {/* MEDIA CONTROL BUTTONS */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={handleSpin360}
                  className="bg-black/70 hover:bg-black text-[#D8F05A] text-xs font-bold px-3 py-2 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-lg border border-[#D8F05A]/30 transition-all"
                  title="360° Spin Simulation"
                >
                  <RotateCw className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} /> 360° View
                </button>

                {product.videoUrl && (
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="bg-[#5D9906] hover:bg-[#467304] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" /> Watch Weave Video
                  </button>
                )}
              </div>

              {/* TAG BADGE */}
              {product.tag && (
                <span className="absolute top-4 left-4 bg-[#222222] text-[#D8F05A] text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-widest border border-[#D8F05A]/30">
                  {product.tag}
                </span>
              )}
            </div>

            {/* THUMBNAILS ROW */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveImage(img); setIs360Active(false); }}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-[#5D9906] scale-105 shadow-md' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: DETAILS & ACTIONS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-extrabold text-[#5D9906] uppercase tracking-wider">{product.category}</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-4xl text-stone-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-stone-500 mt-1">{product.subtitle}</p>

              {/* PRICING */}
              <div className="flex items-baseline gap-4 mt-6 p-4 rounded-2xl bg-stone-100/70 border border-stone-200">
                <span className="font-heading font-black text-4xl text-stone-900">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-stone-400 line-through font-semibold">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="bg-[#D8F05A] text-[#222222] text-xs font-black px-3 py-1 rounded-full shadow-sm">
                  SAVE {product.discountPercent}% OFF
                </span>
              </div>
            </div>

            {/* COLOR SELECTOR */}
            <div>
              <label className="block text-xs font-extrabold text-stone-800 uppercase tracking-widest mb-3">
                Select Color: <span className="text-[#5D9906]">{selectedColor.name}</span>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(col)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border text-xs font-bold transition-all ${
                      selectedColor.name === col.name
                        ? 'border-[#5D9906] bg-[#5D9906]/10 text-stone-900 shadow-sm'
                        : 'border-stone-300 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border shadow-inner" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE SELECTOR */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-extrabold text-stone-800 uppercase tracking-widest">
                  Select Size
                </label>
                <span className="text-xs text-[#5D9906] font-bold cursor-pointer hover:underline">
                  Size Guide (Fits standard UK/US shoes)
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-5 py-3 rounded-2xl text-xs font-extrabold border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#222222] text-[#D8F05A] border-[#222222] shadow-lg scale-105'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY & PRIMARY ACTION BUTTONS */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-2xl bg-white shadow-inner">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-stone-600 font-bold text-lg hover:bg-stone-100 rounded-l-2xl"
                  >
                    -
                  </button>
                  <span className="px-5 text-sm font-extrabold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-stone-600 font-bold text-lg hover:bg-stone-100 rounded-r-2xl"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#5D9906] hover:bg-[#467304] text-white font-extrabold text-sm py-4 px-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isWishlisted ? 'bg-red-500 text-white border-red-500' : 'border-stone-300 text-stone-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#222222] hover:bg-black text-[#D8F05A] font-extrabold text-sm py-4 rounded-2xl transition-all shadow-lg border border-[#D8F05A]/30 flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4 text-[#D8F05A]" /> Buy Now (Express Checkout)
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 text-center text-xs text-stone-600 font-semibold">
              <div className="p-3 rounded-2xl bg-stone-100">
                <Truck className="w-5 h-5 text-[#5D9906] mx-auto mb-1" />
                <span>Free Shipping &gt; ₹999</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-100">
                <ShieldCheck className="w-5 h-5 text-[#D8B26E] mx-auto mb-1" />
                <span>100% Odour Free</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-100">
                <CheckCircle2 className="w-5 h-5 text-[#5D9906] mx-auto mb-1" />
                <span>Cash on Delivery Available</span>
              </div>
            </div>

          </div>

        </div>

        {/* TABBED DETAILS & SPECIFICATIONS */}
        <div className="mt-16 glass-panel p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-xl">
          
          <div className="flex items-center gap-6 border-b border-stone-200 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`font-heading font-extrabold text-base sm:text-lg pb-2 transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'desc' ? 'text-[#5D9906] border-[#5D9906]' : 'text-stone-400 border-transparent hover:text-stone-700'
              }`}
            >
              Description & Science
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`font-heading font-extrabold text-base sm:text-lg pb-2 transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'specs' ? 'text-[#5D9906] border-[#5D9906]' : 'text-stone-400 border-transparent hover:text-stone-700'
              }`}
            >
              Material & Specifications
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-heading font-extrabold text-base sm:text-lg pb-2 transition-colors whitespace-nowrap border-b-2 ${
                activeTab === 'reviews' ? 'text-[#5D9906] border-[#5D9906]' : 'text-stone-400 border-transparent hover:text-stone-700'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          {/* TAB CONTENT: DESCRIPTION */}
          {activeTab === 'desc' && (
            <div className="space-y-6 text-stone-700 leading-relaxed">
              <p className="text-base sm:text-lg font-medium">
                {product.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-stone-100/80 font-bold text-sm text-stone-900 border border-stone-200">
                    <CheckCircle2 className="w-5 h-5 text-[#5D9906] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: SPECS */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-stone-100 space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#5D9906]">Fabric Blend</span>
                <p className="font-bold text-stone-900 text-base">{product.specs.material}</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-100 space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#5D9906]">Weave Technology</span>
                <p className="font-bold text-stone-900 text-base">{product.specs.weave}</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-100 space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#5D9906]">Washing & Care</span>
                <p className="font-bold text-stone-900 text-base">{product.specs.care}</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-100 space-y-1">
                <span className="text-xs uppercase font-extrabold text-[#5D9906]">Packaging Pledge</span>
                <p className="font-bold text-stone-900 text-base">{product.specs.origin}</p>
              </div>
            </div>
          )}

          {/* TAB CONTENT: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-4 p-6 rounded-3xl bg-[#222222] text-white text-center space-y-4">
                  <span className="text-[#D8F05A] text-6xl font-black">{product.rating}</span>
                  <div className="flex justify-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-300 font-semibold">
                    Based on {product.reviewCount} verified customer reviews
                  </p>
                </div>

                {/* SUBMIT REVIEW FORM */}
                <div className="lg:col-span-8 p-6 rounded-3xl bg-stone-100 border border-stone-200 space-y-4">
                  <h4 className="font-heading font-bold text-lg text-stone-900">
                    Write a Verified Review
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                    />
                    <input
                      type="text"
                      placeholder="Review Headline (e.g., Unbelievable Softness!)"
                      value={reviewerTitle}
                      onChange={(e) => setReviewerTitle(e.target.value)}
                      className="p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                    />
                  </div>
                  <textarea
                    placeholder="Share your experience wearing BAMORA Bamboo socks..."
                    value={reviewerContent}
                    onChange={(e) => setReviewerContent(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-xl bg-white border border-stone-300 text-xs focus:ring-2 focus:ring-[#5D9906]"
                  ></textarea>
                  <button
                    onClick={() => {
                      if (!reviewerName || !reviewerContent) {
                        return showToast('Please complete all review fields', 'error');
                      }
                      showToast('Thank you! Your review is being published.', 'success');
                      setReviewerName('');
                      setReviewerTitle('');
                      setReviewerContent('');
                    }}
                    className="bg-[#5D9906] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
                  >
                    Submit Review
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* RECOMMENDED PRODUCTS */}
        <div className="mt-20 space-y-8">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-stone-900 text-center">
            Complete Your Bamboo Wardrobe
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((rec) => (
              <ProductCard
                key={rec.id}
                product={rec}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>

      </div>

      {/* MOBILE STICKY BUY BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-nav p-4 border-t border-stone-300 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-stone-500 font-bold uppercase block">{product.name}</span>
          <span className="font-heading font-black text-xl text-stone-900">₹{product.price}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-[#5D9906] text-white font-extrabold text-xs py-3 px-6 rounded-2xl shadow-lg flex items-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
      </div>

    </div>
  );
};
