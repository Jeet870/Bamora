import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const AboutBamora: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#222222] text-[#F9F9F5] relative overflow-hidden">
      
      {/* GLOWING AMBIENT LIGHTS */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#5D9906]/15 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: BRAND STORY IMAGE COLLAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel-dark p-3 shadow-2xl border border-[#5D9906]/30">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                alt="Bamboo Forest & Organic Harvest"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 glass-panel-dark rounded-2xl border border-[#D8F05A]/20">
                <span className="text-[#D8F05A] font-black text-2xl block">100% Biodegradable</span>
                <p className="text-stone-300 text-xs mt-1">
                  Sourced exclusively from FSC-Certified organic bamboo groves with zero pesticides.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: BRAND TEXT STORY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="bg-[#5D9906] text-white text-xs uppercase tracking-widest font-extrabold px-3.5 py-1 rounded-full">
              Our Story & Pledge
            </span>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white leading-tight">
              Crafted at the intersection of <span className="text-bamboo-gradient">Nature</span> & <span className="text-[#D8B26E]">Luxury</span>.
            </h2>

            <p className="text-stone-300 text-base leading-relaxed">
              BAMORA™ was born out of a simple refusal to accept synthetic polyesters and scratchy cotton as the default for our feet. We set out to re-engineer everyday socks from the ground up using raw organic bamboo Viscose.
            </p>

            <p className="text-stone-300 text-base leading-relaxed">
              Every pair represents 200-needle high-density precision knitting, hand-linked seamless toe closures, and an unyielding commitment to sustainable luxury.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl glass-panel-dark border border-[#5D9906]/30">
                <Leaf className="w-6 h-6 text-[#D8F05A] mb-2" />
                <h4 className="font-bold text-white text-sm">Zero Plastic Pledge</h4>
                <p className="text-xs text-stone-400 mt-1">Compostable paper packaging.</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel-dark border border-[#5D9906]/30">
                <Award className="w-6 h-6 text-[#D8B26E] mb-2" />
                <h4 className="font-bold text-white text-sm">Hand-Linked Stitch</h4>
                <p className="text-xs text-stone-400 mt-1">Zero pressure ridge on toes.</p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
