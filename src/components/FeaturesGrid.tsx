import React from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  ThermometerSnowflake,
  ShieldAlert,
  Wind,
  Smile,
  Globe2,
  Zap,
  Layers
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const featureCards = [
    {
      icon: Sprout,
      title: 'Organic Bamboo Fiber',
      desc: '100% natural pesticide-free bamboo pulp turned into silky micro-filament threads.'
    },
    {
      icon: ThermometerSnowflake,
      title: 'Natural Cooling',
      desc: 'Thermo-balancing micro gap structure keeps feet 2°C cooler than ambient air.'
    },
    {
      icon: Layers,
      title: 'Soft Terry Cushion',
      desc: 'Absorbs heel strike shock and distributes pressure evenly across your arch.'
    },
    {
      icon: Smile,
      title: 'All-Day Comfort',
      desc: 'Zero-seam hand construction prevents chafing, blisters, and toe irritation.'
    },
    {
      icon: Globe2,
      title: '100% Eco-Friendly',
      desc: 'Rapidly renewable bamboo grows using 1/3 the water of conventional cotton.'
    },
    {
      icon: Zap,
      title: 'Sweat Control',
      desc: 'Rapid capillary wicking pulls moisture out so your feet remain dry.'
    },
    {
      icon: ShieldAlert,
      title: 'Anti-Odour Kun',
      desc: 'Bio-agent shield destroys 99.8% of odour-causing bacteria naturally.'
    },
    {
      icon: Wind,
      title: 'Breathable Mesh',
      desc: 'Zoned mesh ventilation zones on the upper foot release trapped heat.'
    }
  ];

  return (
    <section className="py-20 bg-[#F9F9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="bg-[#5D9906]/10 text-[#5D9906] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#5D9906]/30">
            Next-Gen Fiber Engineering
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-stone-900">
            8 Pillars of <span className="text-[#5D9906]">BAMORA™</span> Tech
          </h2>
          <p className="text-stone-600 text-base">
            Every thread engineered for uncompromising foot wellness and eco-luxury.
          </p>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-md hover:shadow-xl transition-all group hover:-translate-y-1.5"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#5D9906]/10 text-[#5D9906] flex items-center justify-center mb-4 group-hover:bg-[#5D9906] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-heading font-bold text-lg text-stone-900 mb-2">
                  {feat.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
