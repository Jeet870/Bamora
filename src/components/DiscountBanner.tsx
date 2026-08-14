import React from 'react';
import { Sparkles, Truck, ShieldCheck, Tag } from 'lucide-react';

export const DiscountBanner: React.FC = () => {
  return (
    <div className="bg-[#222222] text-[#F9F9F5] text-xs py-2.5 px-4 overflow-hidden border-b border-[#5D9906]/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 text-stone-300">
          <span className="bg-[#5D9906] text-white text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D8F05A]" /> Offer
          </span>
          <span className="font-medium text-stone-200">
            Use code <strong className="text-[#D8F05A] font-bold">BAMORA20</strong> for 20% OFF on all Bamboo Collections!
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-stone-400 font-medium">
          <div className="flex items-center gap-1.5 hover:text-[#D8F05A] transition-colors">
            <Truck className="w-3.5 h-3.5 text-[#5D9906]" />
            <span>Free Express Shipping &gt; ₹999</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-[#D8F05A] transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D8B26E]" />
            <span>100% Odour-Free Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-[#D8F05A] transition-colors">
            <Tag className="w-3.5 h-3.5 text-[#D8F05A]" />
            <span>Zero Plastic Packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
};
