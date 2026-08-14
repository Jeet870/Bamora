import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  Truck,
  ChevronDown,
  MessageCircle,
  Layers
} from 'lucide-react';
import { useStore } from '../store/useStore';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const {
    cart,
    wishlist,
    user,
    setCartOpen,
    setSearchOpen,
    setAuthOpen,
    setTrackingOpen,
    setCompareOpen,
    comparedProducts,
    setActiveCategory
  } = useStore();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Shop', id: 'shop', hasMegaMenu: true },
    { name: 'Benefits', id: 'benefits' },
    { name: 'Comparison', id: 'comparison' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'About', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string, category?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${
      isScrolled ? 'glass-nav shadow-lg border-b border-[#5D9906]/15 py-3' : 'bg-[#F9F9F5]/90 py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO ON LEFT */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('hero')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5D9906] to-[#222222] flex items-center justify-center text-[#D8F05A] font-extrabold text-xl shadow-md border border-[#D8F05A]/30">
            B
          </div>
          <div>
            <span className="font-heading font-black text-2xl tracking-wider text-[#222222]">
              BAMORA<span className="text-[#5D9906] font-normal text-sm align-super">™</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#5D9906] font-semibold -mt-1">
              Comfort by Nature
            </span>
          </div>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <div
              key={link.id}
              className="relative"
              onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
              onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
            >
              <button
                onClick={() => handleLinkClick(link.id)}
                className="flex items-center gap-1 text-sm font-semibold text-stone-700 hover:text-[#5D9906] transition-colors py-2"
              >
                {link.name}
                {link.hasMegaMenu && <ChevronDown className="w-3.5 h-3.5 text-stone-400" />}
              </button>

              {/* MEGA MENU POPUP */}
              {link.hasMegaMenu && isMegaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full -left-20 w-[600px] glass-panel rounded-3xl p-6 shadow-2xl border border-[#5D9906]/20 grid grid-cols-2 gap-6 mt-1"
                >
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-widest font-bold text-[#5D9906]">Categories</p>
                    <div className="space-y-2">
                      {[
                        { label: 'All Bamboo Socks', cat: 'All' },
                        { label: 'Bamboo Crew Socks', cat: 'Crew Socks' },
                        { label: 'Bamboo Ankle Socks', cat: 'Ankle Socks' },
                        { label: 'Best Sellers Collection', cat: 'Best Sellers' },
                        { label: 'New Arrivals 2026', cat: 'New Arrival' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLinkClick('shop', item.cat)}
                          className="block w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-stone-800 hover:bg-[#5D9906]/10 hover:text-[#5D9906] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#222222] to-[#152404] text-[#F9F9F5] p-5 rounded-2xl flex flex-col justify-between border border-[#D8F05A]/20">
                    <div>
                      <span className="bg-[#D8F05A] text-[#222222] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                        Signature Set
                      </span>
                      <h4 className="font-heading font-bold text-lg text-white mt-2">
                        Gold Reserve Heritage Box
                      </h4>
                      <p className="text-xs text-stone-300 mt-1">
                        Handcrafted 3-pair bamboo gift box with gold embroidered emblem.
                      </p>
                    </div>
                    <button
                      onClick={() => handleLinkClick('shop', 'Best Sellers')}
                      className="mt-4 bg-[#5D9906] hover:bg-[#467304] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D8F05A]" /> Shop Gift Edition
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* ADMIN CONTROL HUB BUTTON */}
          {user?.role === 'admin' && (
            <button
              onClick={() => useStore.getState().setAdminDashboardOpen(true)}
              className="bg-[#222222] hover:bg-black text-[#D8F05A] font-extrabold text-xs px-3.5 py-2 rounded-full border border-[#D8F05A]/40 shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
              title="Launch BAMORA Executive Control Center"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8F05A]" />
              <span className="hidden sm:inline">Admin Hub</span>
            </button>
          )}

          {/* SEARCH BUTTON */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors relative"
            title="Search BAMORA"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* TRACK ORDER BUTTON */}
          <button
            onClick={() => setTrackingOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-200/60 hover:bg-[#5D9906]/15 hover:text-[#5D9906] text-stone-700 transition-all"
            title="Track Your Shipment"
          >
            <Truck className="w-3.5 h-3.5 text-[#5D9906]" />
            <span>Track Order</span>
          </button>

          {/* COMPARE PRODUCTS */}
          {comparedProducts.length > 0 && (
            <button
              onClick={() => setCompareOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
              title="Compare Products"
            >
              <Layers className="w-5 h-5 text-[#5D9906]" />
              <span className="absolute -top-1 -right-1 bg-[#5D9906] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {comparedProducts.length}
              </span>
            </button>
          )}

          {/* WISHLIST BUTTON */}
          <button
            onClick={() => handleLinkClick('shop')}
            className="relative p-2.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* ACCOUNT BUTTON */}
          <button
            onClick={() => setAuthOpen(true)}
            className="p-2.5 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors relative"
            title={user ? `Logged in as ${user.name}` : "Sign In / Register"}
          >
            <UserIcon className="w-5 h-5" />
            {user && (
              <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#5D9906] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* CART BUTTON */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-[#5D9906] hover:bg-[#467304] text-white p-2.5 rounded-full transition-all shadow-md flex items-center justify-center hover:scale-105"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D8F05A] text-[#222222] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-[#5D9906]">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* WHATSAPP ACTION BUTTON */}
          <a
            href="https://wa.me/919876543210?text=Hi%20BAMORA%20Team!%20I%20have%20a%20question%20about%20your%20Premium%20Bamboo%20Socks."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-bold px-3 py-2 rounded-full transition-transform hover:scale-105 shadow-md"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat</span>
          </a>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-stone-200/60 text-stone-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F9F9F5] border-b border-stone-200 overflow-hidden px-6 py-6 shadow-2xl space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left font-bold text-stone-800 hover:text-[#5D9906] py-2 px-3 rounded-xl hover:bg-[#5D9906]/10 text-base"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
              <button
                onClick={() => { setTrackingOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm"
              >
                <Truck className="w-4 h-4 text-[#5D9906]" /> Track Shipment
              </button>
              
              <a
                href="https://wa.me/919876543210?text=Hi%20BAMORA%20Team!%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Order via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
