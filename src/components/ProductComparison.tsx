import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const ProductComparison: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Softness & Feel',
      bamora: '3X Softer Cashmere-Like Feel',
      bamoraPass: true,
      cotton: 'Coarse & Stiff After 5 Washes',
      cottonPass: false
    },
    {
      feature: 'Odour Defense',
      bamora: 'Natural Bamboo Kun (100% Odour Free)',
      bamoraPass: true,
      cotton: 'Bacteria Growth Causes Odour',
      cottonPass: false
    },
    {
      feature: 'Breathability',
      bamora: 'Micro-Gap Air Ventilation Channels',
      bamoraPass: true,
      cotton: 'Dense Weave Traps Heat',
      cottonPass: false
    },
    {
      feature: 'Moisture Control',
      bamora: '40% Faster Sweat Absorption & Wicking',
      bamoraPass: true,
      cotton: 'Holds Dampness & Damp Odour',
      cottonPass: false
    },
    {
      feature: 'Seamless Toe Construction',
      bamora: 'Hand-Linked Handcrafted Zero-Seam',
      bamoraPass: true,
      cotton: 'Bulky Toe Seam Causes Blisters',
      cottonPass: false
    },
    {
      feature: 'Eco-Friendly & Sustainability',
      bamora: '100% Biodegradable & Zero Pesticides',
      bamoraPass: true,
      cotton: 'Heavy Chemical & Water Intensive',
      cottonPass: false
    },
    {
      feature: 'Temperature Regulation',
      bamora: 'Cool in Summer, Warm in Winter',
      bamoraPass: true,
      cotton: 'Poor Thermal Balance',
      cottonPass: false
    },
    {
      feature: 'Dermatological Safety',
      bamora: 'Hypoallergenic & Friction Free',
      bamoraPass: true,
      cotton: 'Causes Chafing & Skin Rash',
      cottonPass: false
    }
  ];

  return (
    <section id="comparison" className="py-20 bg-[#F9F9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="bg-[#5D9906]/10 text-[#5D9906] border border-[#5D9906]/30 text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
            The Ultimate Test
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#222222]">
            BAMORA™ vs <span className="text-[#5D9906]">Regular Cotton</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            See how BAMORA™ organic bamboo fiber out-performs ordinary cotton across every critical luxury metric.
          </p>
        </div>

        {/* COMPARISON TABLE */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden shadow-2xl border border-[#5D9906]/20">
          <div className="grid grid-cols-12 bg-[#222222] text-white p-5 font-heading text-sm sm:text-base font-bold">
            <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
              <span>Feature</span>
            </div>
            <div className="col-span-4 sm:col-span-4 text-center text-[#D8F05A] flex items-center justify-center gap-1.5 bg-[#5D9906]/30 py-2 rounded-xl border border-[#5D9906]">
              <Sparkles className="w-4 h-4 text-[#D8F05A]" /> BAMORA™
            </div>
            <div className="col-span-3 sm:col-span-4 text-center text-stone-400">
              Regular Cotton
            </div>
          </div>

          <div className="divide-y divide-stone-200/80">
            {comparisonRows.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-[#5D9906]/5 transition-colors text-xs sm:text-sm"
              >
                <div className="col-span-5 sm:col-span-4 font-bold text-stone-900">
                  {row.feature}
                </div>

                <div className="col-span-4 sm:col-span-4 flex items-center justify-center gap-2 font-semibold text-[#5D9906] bg-[#5D9906]/10 py-2 px-3 rounded-xl border border-[#5D9906]/20">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#5D9906] shrink-0" />
                  <span className="text-center">{row.bamora}</span>
                </div>

                <div className="col-span-3 sm:col-span-4 flex items-center justify-center gap-2 font-medium text-stone-500">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 shrink-0" />
                  <span className="text-center hidden sm:inline">{row.cotton}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
