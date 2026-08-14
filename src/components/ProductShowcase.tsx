import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { api } from '../services/api';
import { useStore } from '../store/useStore';

interface ProductShowcaseProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onSelectProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>('rating');
  const [localSearch, setLocalSearch] = useState<string>('');

  const { activeCategory, setActiveCategory } = useStore();

  const categories = [
    'All',
    'Crew Socks',
    'Ankle Socks',
    'Best Sellers',
    'New Arrival'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await api.getProducts({
        category: activeCategory,
        search: localSearch,
        sort: sortOption
      });
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [activeCategory, localSearch, sortOption]);

  return (
    <section id="shop" className="py-20 bg-[#F9F9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="bg-[#5D9906]/10 text-[#5D9906] border border-[#5D9906]/30 text-xs uppercase tracking-widest font-extrabold px-3.5 py-1 rounded-full">
            Curated Bamboo Range
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#222222]">
            Shop the <span className="text-bamboo-gradient">BAMORA™</span> Collection
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Impeccably engineered bamboo socks tailored for boardroom elegance, athletic endurance, and everyday luxury.
          </p>
        </div>

        {/* CONTROLS BAR: CATEGORY TABS & FILTERS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          
          {/* CATEGORY TABS */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#5D9906] text-white shadow-lg scale-105'
                    : 'glass-panel text-stone-700 hover:bg-stone-200/60'
                }`}
              >
                {cat === 'All' ? '✨ All Collections' : cat}
              </button>
            ))}
          </div>

          {/* SEARCH & SORT CONTROLS */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* IN-LINE SEARCH */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search socks..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl glass-panel text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#5D9906] border border-stone-200"
              />
            </div>

            {/* SORT DROPDOWN */}
            <div className="flex items-center gap-2 glass-panel px-3 py-2 rounded-2xl border border-stone-200 text-xs font-semibold text-stone-700">
              <SlidersHorizontal className="w-4 h-4 text-[#5D9906]" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-3xl bg-stone-200 animate-pulse"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl max-w-md mx-auto space-y-4">
            <Sparkles className="w-12 h-12 text-[#5D9906] mx-auto animate-bounce" />
            <h3 className="font-heading font-bold text-xl text-stone-800">No Socks Found</h3>
            <p className="text-sm text-stone-500">
              We couldn't find any products matching your current category or search filter.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setLocalSearch(''); }}
              className="bg-[#5D9906] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
