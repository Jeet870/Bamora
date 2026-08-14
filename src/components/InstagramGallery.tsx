import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, X } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
      likes: '1.4k',
      caption: 'Morning coffee & BAMORA Executive Bamboo Crew. #ComfortByNature'
    },
    {
      url: 'https://images.unsplash.com/photo-1582966772680-860e3525554a?auto=format&fit=crop&w=800&q=80',
      likes: '980',
      caption: 'Stealth Ankle socks tucked inside Italian leather loafers. #BAMORALuxury'
    },
    {
      url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      likes: '2.1k',
      caption: 'Silk cream edition. Made from 100% organic bamboo viscose.'
    },
    {
      url: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
      likes: '3.4k',
      caption: 'The Gold Reserve Heritage Box wrapped in gold leaf tissue. #BAMORA'
    }
  ];

  return (
    <section className="py-20 bg-[#F9F9F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#5D9906]/10 text-[#5D9906] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full">
            <Camera className="w-4 h-4" /> @BAMORASocks
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-stone-900">
            Follow the <span className="text-[#5D9906]">#BAMORA</span> Movement
          </h2>
          <p className="text-stone-600 text-sm">
            Tag us in your bamboo outfit styling to be featured on our official global gallery.
          </p>
        </div>

        {/* MASONRY GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImg(img.url)}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-lg cursor-pointer group border border-stone-200"
            >
              <img
                src={img.url}
                alt="Instagram BAMORA post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <div className="flex items-center gap-1.5 text-xs font-bold mb-1">
                  <Heart className="w-4 h-4 text-red-400 fill-current" /> {img.likes}
                </div>
                <p className="text-[11px] line-clamp-2 text-stone-200">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-stone-800"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedImg} alt="Enlarged gallery" className="w-full h-auto max-h-[80vh] object-contain" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
