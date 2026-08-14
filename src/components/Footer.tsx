import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Globe,
  Share2,
  MessageCircle,
  X
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; text: string }> = {
    privacy: {
      title: 'Privacy Policy',
      text: 'BAMORA™ values your privacy. We store customer order details securely using end-to-end encryption. Your contact numbers and delivery addresses are never shared or sold to third-party advertisers.'
    },
    refund: {
      title: 'Refund & Returns Policy',
      text: 'We offer a 30-Day Satisfaction Guarantee. If you receive a damaged or incorrect size of BAMORA bamboo socks, contact concierge@bamora.com for a free replacement or instant full refund.'
    },
    terms: {
      title: 'Terms of Service',
      text: 'By using BAMORA™ website, you agree to our fair commercial terms. All brand artwork, bamboo fabric trademarks, and zero-seam proprietary designs are owned by BAMORA International Ltd.'
    },
    shipping: {
      title: 'Shipping Policy',
      text: 'All orders placed before 2:00 PM are dispatched on the same business day via Bluedart Express. Express delivery takes 2-4 days. Orders over ₹999 qualify for Free Shipping.'
    }
  };

  return (
    <footer className="bg-[#222222] text-[#F9F9F5] pt-16 pb-8 border-t border-[#5D9906]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5D9906] to-[#222222] flex items-center justify-center text-[#D8F05A] font-extrabold text-xl shadow-md border border-[#D8F05A]/30">
                B
              </div>
              <div>
                <span className="font-heading font-black text-2xl tracking-wider text-white">
                  BAMORA<span className="text-[#5D9906] font-normal text-sm align-super">™</span>
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#D8F05A] font-semibold -mt-1">
                  Comfort by Nature
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              BAMORA™ is a global eco-luxury brand devoted to zero-friction, ultra-breathable organic bamboo footwear. 3X softer than cotton with natural bio-antimicrobial protection.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass-panel-dark flex items-center justify-center text-stone-300 hover:text-[#D8F05A] transition-colors border border-stone-800"
                title="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass-panel-dark flex items-center justify-center text-stone-300 hover:text-[#D8F05A] transition-colors border border-stone-800"
                title="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass-panel-dark flex items-center justify-center text-stone-300 hover:text-[#D8F05A] transition-colors border border-stone-800"
                title="LinkedIn"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#D8F05A]">Quick Navigation</p>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#5D9906] transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#5D9906] transition-colors">Shop All Bamboo Socks</button>
              </li>
              <li>
                <button onClick={() => onNavigate('benefits')} className="hover:text-[#5D9906] transition-colors">9 Bamboo Benefits</button>
              </li>
              <li>
                <button onClick={() => onNavigate('comparison')} className="hover:text-[#5D9906] transition-colors">BAMORA vs Cotton</button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#5D9906] transition-colors">Customer Reviews</button>
              </li>
            </ul>
          </div>

          {/* BRAND POLICIES */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#D8F05A]">Customer Care & Policies</p>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li>
                <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-[#5D9906] transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('refund')} className="hover:text-[#5D9906] transition-colors">Refund & Return Policy</button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('terms')} className="hover:text-[#5D9906] transition-colors">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('shipping')} className="hover:text-[#5D9906] transition-colors">Express Shipping Policy</button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#5D9906] transition-colors">Help Center & FAQ</button>
              </li>
            </ul>
          </div>

          {/* CONTACT & HOURS */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-extrabold tracking-widest text-[#D8F05A]">Concierge Office</p>
            <div className="space-y-1.5 text-xs text-stone-400">
              <p className="font-bold text-white">BAMORA™ Eco-Labs Pvt Ltd</p>
              <p>42 Bamboo Grove Way, Indiranagar</p>
              <p>Bengaluru, Karnataka 560001, India</p>
              <p className="pt-2 text-[#5D9906] font-bold">Email: support@bamora.com</p>
              <p className="text-[#D8B26E] font-bold">Hotline: +91 98765 43210</p>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & PAYMENT ICONS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
          <p>© {new Date().getFullYear()} BAMORA™. All rights reserved. Comfort by Nature™.</p>
          
          <div className="flex items-center gap-3 text-stone-400">
            <span className="text-[10px] uppercase font-bold text-stone-500">Secure Payments:</span>
            <span className="bg-stone-800 text-stone-300 px-2 py-0.5 rounded text-[10px] font-bold">Razorpay</span>
            <span className="bg-stone-800 text-stone-300 px-2 py-0.5 rounded text-[10px] font-bold">UPI / GPay</span>
            <span className="bg-stone-800 text-stone-300 px-2 py-0.5 rounded text-[10px] font-bold">Visa</span>
            <span className="bg-stone-800 text-stone-300 px-2 py-0.5 rounded text-[10px] font-bold">Cash on Delivery</span>
          </div>
        </div>

      </div>

      {/* POLICY MODAL POPUP */}
      <AnimatePresence>
        {activePolicyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full glass-panel-dark p-6 rounded-3xl border border-[#5D9906]/40 text-white bg-[#222222]"
            >
              <button
                onClick={() => setActivePolicyModal(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-stone-800 text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-heading font-black text-xl text-[#D8F05A] mb-3">
                {policyContent[activePolicyModal]?.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {policyContent[activePolicyModal]?.text}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
};
