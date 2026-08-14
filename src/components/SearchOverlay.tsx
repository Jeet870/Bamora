import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_PRODUCTS } from '../services/api';
import { Product } from '../types';

interface SearchOverlayProps {
  onSelectProduct: (p: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onSelectProduct }) => {
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery } = useStore();
  const [query, setQuery] = useState(searchQuery);

  if (!isSearchOpen) return null;

  const results = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg flex flex-col justify-start p-4 sm:p-12 overflow-y-auto">
        
        {/* TOP BAR */}
        <div className="max-w-4xl w-full mx-auto flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-[#D8F05A]">
            <Sparkles className="w-5 h-5" />
            <span className="font-heading font-black text-xl text-white">Search BAMORA™</span>
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 rounded-full glass-panel-dark text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* INPUT BOX */}
        <div className="max-w-4xl w-full mx-auto relative mb-10">
          <Search className="w-6 h-6 text-[#5D9906] absolute left-5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bamboo crew, ankle socks, gift boxes..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchQuery(e.target.value); }}
            autoFocus
            className="w-full pl-14 pr-6 py-5 rounded-3xl glass-panel-dark text-white placeholder-stone-400 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#D8F05A] border border-[#5D9906]/30 shadow-2xl"
          />
        </div>

        {/* SEARCH RESULTS */}
        <div className="max-w-4xl w-full mx-auto space-y-4">
          <p className="text-xs uppercase font-extrabold text-stone-400 tracking-widest">
            {results.length} Products Found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => { onSelectProduct(product); setSearchOpen(false); }}
                className="p-4 rounded-2xl glass-panel-dark border border-stone-800 hover:border-[#D8F05A]/40 transition-all cursor-pointer flex items-center gap-4 group"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#5D9906] uppercase font-bold">{product.category}</span>
                  <h4 className="font-heading font-bold text-sm text-white truncate group-hover:text-[#D8F05A] transition-colors">
                    {product.name}
                  </h4>
                  <p className="font-extrabold text-xs text-stone-300 mt-1">₹{product.price}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-[#D8F05A] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
};
