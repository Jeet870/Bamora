import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { MOCK_REVIEWS } from '../services/api';

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    ...MOCK_REVIEWS,
    {
      id: 'rev-4',
      productId: 'bam-003',
      userName: 'Devika Singhania',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '5 days ago',
      verified: true,
      title: 'Absurdly soft! Replaced all my cotton socks',
      content: 'I work 10 hours on set every day. Switching to BAMORA bamboo socks completely eliminated leg fatigue and sweaty feet. The Gold Reserve box feels like pure royalty!'
    },
    {
      id: 'rev-5',
      productId: 'bam-004',
      userName: 'Karan Malhotra',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '1 week ago',
      verified: true,
      title: 'Zero odor after 21km marathon run',
      content: 'Tested the Motion Pro Bamboo socks on a half-marathon run. Zero friction, zero blisters, and completely fresh even after sweating profusely.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const active = reviews[currentIndex];

  return (
    <section id="reviews" className="py-20 bg-[#222222] text-[#F9F9F5] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="bg-[#5D9906] text-white text-xs uppercase tracking-widest font-extrabold px-3.5 py-1 rounded-full">
            Real Customer Words
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white">
            Loved by <span className="text-bamboo-gradient">thousands</span> of feet.
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Read un-edited testimonials from professionals, athletes, and sock connoisseurs.
          </p>
        </div>

        {/* TESTIMONIAL CAROUSEL */}
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-panel-dark p-8 sm:p-12 rounded-3xl border border-[#5D9906]/30 shadow-2xl relative"
            >
              <Quote className="w-16 h-16 text-[#5D9906]/20 absolute top-6 left-6 pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                <img
                  src={active.userAvatar}
                  alt={active.userName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#D8F05A] shadow-xl shrink-0"
                />

                <div className="flex-1 text-center sm:text-left space-y-3">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white">
                    "{active.title}"
                  </h3>

                  <p className="text-stone-300 text-base leading-relaxed italic">
                    {active.content}
                  </p>

                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white text-sm">{active.userName}</span>
                      <span className="text-stone-400 ml-2">({active.date})</span>
                    </div>

                    {active.verified && (
                      <span className="bg-[#5D9906]/20 text-[#D8F05A] border border-[#5D9906]/30 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purchase
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* SLIDER NAVIGATION BUTTONS */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="w-12 h-12 rounded-full glass-panel-dark text-white hover:text-[#D8F05A] flex items-center justify-center border border-[#5D9906]/30 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#D8F05A]' : 'w-2.5 bg-stone-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="w-12 h-12 rounded-full glass-panel-dark text-white hover:text-[#D8F05A] flex items-center justify-center border border-[#5D9906]/30 transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
