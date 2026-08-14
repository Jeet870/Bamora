import React from 'react';
import { motion } from 'framer-motion';
import {
  Feather,
  ShieldCheck,
  Zap,
  Droplets,
  Wind,
  Thermometer,
  Sparkles,
  HeartPulse,
  CheckCircle2
} from 'lucide-react';

export const WhyBamora: React.FC = () => {
  const benefits = [
    {
      icon: Feather,
      title: '3X Softer',
      description: 'Derived from natural bamboo micro-fibers for a cashmere-like cloud feel against skin.',
      tag: 'Silk Texture'
    },
    {
      icon: ShieldCheck,
      title: 'Odour Free',
      description: 'Contains natural bio-agent "Bamboo Kun" that neutralizes odor-causing bacteria instantly.',
      tag: 'Fresh All Day'
    },
    {
      icon: Zap,
      title: 'Anti Bacterial',
      description: 'Self-defending natural fiber properties prevent bacterial growth and fungal infections.',
      tag: 'Hygienic Bio Shield'
    },
    {
      icon: Droplets,
      title: 'Sweat Free',
      description: 'Absorbs foot moisture 40% faster than organic cotton to keep skin dry and refreshed.',
      tag: 'Active Dry'
    },
    {
      icon: Wind,
      title: 'Breathable',
      description: 'Micro-gap ventilation mesh channels maximize airflow and continuous thermal release.',
      tag: 'Micro Ventilation'
    },
    {
      icon: Sparkles,
      title: 'Moisture Wicking',
      description: 'Pulls sweat away from your skin surface to outer layers where it rapidly evaporates.',
      tag: 'Wick Tech'
    },
    {
      icon: Thermometer,
      title: 'Temp Regulating',
      description: 'Thermo-dynamic fibers keep your feet 2°C cooler during summer and cozy during winter.',
      tag: 'All-Season'
    },
    {
      icon: HeartPulse,
      title: 'Hypoallergenic',
      description: 'Non-irritating round bamboo filaments suitable for sensitive skin & eczema sufferers.',
      tag: 'Derm Safe'
    },
    {
      icon: CheckCircle2,
      title: 'Cushioned Comfort',
      description: 'High-density micro-terry footbed absorbs impact stress on your arches & heels.',
      tag: 'Impact Shock Absorber'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-[#222222] text-[#F9F9F5] relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVE ACCENTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5D9906]/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D8F05A]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="bg-[#5D9906] text-white text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
            The Bamboo Difference
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Why Choose <span className="text-bamboo-gradient">BAMORA™</span>?
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Engineered at the intersection of natural sustainable forestry and advanced textile engineering. Experience 9 reasons why traditional cotton is obsolete.
          </p>
        </div>

        {/* 9 BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel-dark p-8 rounded-3xl border border-[#5D9906]/25 hover:border-[#D8F05A]/50 transition-all group hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5D9906] to-[#D8F05A] p-0.5 shadow-lg group-hover:scale-110 transition-transform">
                    <div className="w-full h-full bg-[#222222] rounded-[14px] flex items-center justify-center text-[#D8F05A]">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <span className="text-[11px] font-bold tracking-wider text-[#D8B26E] uppercase bg-[#D8B26E]/10 px-2.5 py-1 rounded-full border border-[#D8B26E]/20">
                    {b.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-[#D8F05A] transition-colors">
                  ✓ {b.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
