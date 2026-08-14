import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Droplets, Wind, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const { setActiveCategory } = useStore();

  const handleShopNow = () => {
    setActiveCategory('All');
    onExplore();
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero-radial py-12 lg:py-24">
      
      {/* BACKGROUND GRAPHICS & BAMBOO AMBIENCE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D8F05A]/15 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#5D9906]/20 rounded-full blur-[140px]"></div>
        
        {/* FLOATING BAMBOO LEAVES ANIMATION */}
        <div className="absolute top-12 left-10 text-[#5D9906]/30 animate-leaf text-4xl">🍃</div>
        <div className="absolute top-1/3 right-16 text-[#5D9906]/25 animate-leaf text-3xl" style={{ animationDelay: '3s' }}>🌿</div>
        <div className="absolute bottom-20 left-1/5 text-[#D8F05A]/40 animate-leaf text-5xl" style={{ animationDelay: '5s' }}>🍃</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 text-center lg:text-left space-y-6"
        >
          {/* LUXURY BADGE */}
          <div className="inline-flex items-center gap-2 bg-[#5D9906]/10 border border-[#5D9906]/30 px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-[#5D9906]" />
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#5D9906]">
              Ultra-Premium 80% Organic Bamboo
            </span>
          </div>

          {/* MAIN HEADING */}
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#222222] tracking-tight leading-[1.1]">
            Experience <br />
            <span className="text-bamboo-gradient">Nature on Every</span> <br />
            Step.
          </h1>

          {/* SUBHEADING */}
          <p className="text-stone-600 font-medium text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Premium Bamboo Socks crafted for all-day comfort, freshness, and performance. 3X softer than cotton with natural bio-antimicrobial defense.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={handleShopNow}
              className="w-full sm:w-auto bg-[#5D9906] hover:bg-[#467304] text-white font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 text-[#D8F05A] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto glass-panel hover:bg-stone-200/50 text-[#222222] font-bold text-base px-8 py-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 border border-stone-300"
            >
              Explore Collection
            </button>
          </div>

          {/* KEY TRUST BADGES */}
          <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5D9906]/10 flex items-center justify-center text-[#5D9906] shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">Odour Free</p>
                <p className="text-xs text-stone-500">Natural Bamboo Kun</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5D9906]/10 flex items-center justify-center text-[#5D9906] shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">3X Softer</p>
                <p className="text-xs text-stone-500">Silky Cloud Feel</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5D9906]/10 flex items-center justify-center text-[#5D9906] shrink-0">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">Thermo-Cool</p>
                <p className="text-xs text-stone-500">Airflow Mesh</p>
              </div>
            </div>
          </div>

        </motion.div>

        {/* RIGHT COLUMN: FLOATING SOCKS DEMO DISPLAY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* MAIN PRODUCT IMAGE CARD */}
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden glass-panel p-4 shadow-2xl border border-[#5D9906]/20 group">
            
            <img
              src="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80"
              alt="BAMORA Premium Bamboo Socks"
              className="w-full h-full object-cover rounded-2xl animate-float transition-transform duration-700 group-hover:scale-105"
            />

            {/* FLOATING GLASS SPECS BADGE 1 */}
            <div className="absolute top-6 right-6 glass-panel-dark text-white p-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs border border-[#D8F05A]/30">
              <span className="w-3 h-3 rounded-full bg-[#D8F05A] animate-ping"></span>
              <div>
                <p className="font-bold text-[#D8F05A]">Zero Seam Toe Box</p>
                <p className="text-[10px] text-stone-300">Hand-linked comfort</p>
              </div>
            </div>

            {/* FLOATING GLASS SPECS BADGE 2 */}
            <div className="absolute bottom-6 left-6 glass-panel text-stone-900 p-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs border border-[#5D9906]/30">
              <RefreshCw className="w-5 h-5 text-[#5D9906] animate-spin" style={{ animationDuration: '8s' }} />
              <div>
                <p className="font-bold text-[#222222]">Sweat-Wicking Tech</p>
                <p className="text-[10px] text-stone-600">Active moisture control</p>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
