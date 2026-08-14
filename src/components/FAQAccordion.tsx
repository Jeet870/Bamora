import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why are BAMORA bamboo socks better than regular 100% cotton socks?',
      a: 'Bamboo fiber contains a natural bio-agent called "Bamboo Kun" that makes it naturally anti-bacterial and odour-resistant. Bamboo Viscose is 3X softer than combed cotton, absorbs sweat 40% faster, and regulates temperature to keep your feet 2°C cooler in summer.'
    },
    {
      q: 'How should I wash and care for my BAMORA bamboo socks?',
      a: 'Machine wash in cold water (30°C) on a gentle cycle. Use a mild eco-friendly detergent. Do not bleach or tumble dry on high heat. Air drying in shade is recommended to preserve elasticity and cloud-like fiber softness.'
    },
    {
      q: 'Do BAMORA ankle socks slip off inside shoes?',
      a: 'Not at all! BAMORA Invisible Ankle Socks feature a 3D-molded silicone heel-grip strip and an ergonomic elastic compression band that keeps the sock firmly anchored to your ankle regardless of footwear type.'
    },
    {
      q: 'What is your shipping time and return policy?',
      a: 'We dispatch all orders within 24 hours via Bluedart Express. Delivery takes 2-4 business days across India. We offer a 30-Day No-Questions-Asked Satisfaction Guarantee for unopened items.'
    },
    {
      q: 'Is BAMORA packaging zero plastic and eco-friendly?',
      a: 'Yes! Every pair of BAMORA socks is packed in 100% recycled biodegradable kraft sleeves and shipped in zero-plastic water-based soy ink mailer boxes.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#F9F9F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center space-y-3 mb-12">
          <span className="bg-[#5D9906]/10 text-[#5D9906] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#5D9906]/30">
            Got Questions?
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-stone-900">
            Frequently Asked <span className="text-[#5D9906]">Questions</span>
          </h2>
          <p className="text-stone-600 text-base">
            Everything you need to know about BAMORA™ bamboo fiber technology and care instructions.
          </p>
        </div>

        {/* ACCORDION CARDS */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-stone-900 hover:text-[#5D9906] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#5D9906] shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-300 shrink-0 ${
                    openIndex === idx ? 'rotate-180 text-[#5D9906]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-200/50 pt-4"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
