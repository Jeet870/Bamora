import React, { useState } from 'react';
import { DiscountBanner } from './components/DiscountBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyBamora } from './components/WhyBamora';
import { ProductComparison } from './components/ProductComparison';
import { ProductShowcase } from './components/ProductShowcase';
import { FeaturesGrid } from './components/FeaturesGrid';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { FAQAccordion } from './components/FAQAccordion';
import { AboutBamora } from './components/AboutBamora';
import { Contact } from './components/Contact';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Modals & Drawers
import { QuickViewModal } from './components/QuickViewModal';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { UserAccountModal } from './components/UserAccountModal';
import { SearchOverlay } from './components/SearchOverlay';
import { CompareModal } from './components/CompareModal';
import { LiveChatSupport } from './components/LiveChatSupport';
import { CookieBanner } from './components/CookieBanner';
import { Toast } from './components/Toast';
import { AdminDashboard } from './components/AdminDashboard';

import { Product, Order } from './types';
import { useStore } from './store/useStore';
import { MessageCircle } from 'lucide-react';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { setChatOpen, isChatOpen, isAdminDashboardOpen, setAdminDashboardOpen } = useStore();

  const handleNavigate = (sectionId: string) => {
    setSelectedProduct(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: Order) => {
    console.log('Order created:', order);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F5] text-[#222222] font-sans antialiased selection:bg-[#5D9906] selection:text-white">
      
      {/* TOP TICKER ANNOUNCEMENT BANNER */}
      <DiscountBanner />

      {/* STICKY GLASS NAVBAR */}
      <Navbar onNavigate={handleNavigate} />

      {/* MAIN CONTENT AREA */}
      {selectedProduct ? (
        <ProductDetailsPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onSelectProduct={handleSelectProduct}
        />
      ) : (
        <main>
          {/* HERO SECTION */}
          <Hero onExplore={() => handleNavigate('shop')} />

          {/* WHY BAMORA 9-BENEFITS */}
          <WhyBamora />

          {/* PRODUCT COMPARISON MATRIX */}
          <ProductComparison />

          {/* SHOP COLLECTION / PRODUCT SHOWCASE */}
          <ProductShowcase onSelectProduct={handleSelectProduct} />

          {/* FEATURES GRID */}
          <FeaturesGrid />

          {/* CUSTOMER REVIEWS */}
          <CustomerReviews />

          {/* INSTAGRAM GALLERY */}
          <InstagramGallery />

          {/* FAQ ACCORDION */}
          <FAQAccordion />

          {/* ABOUT BAMORA */}
          <AboutBamora />

          {/* CONTACT SECTION */}
          <Contact />

          {/* NEWSLETTER SECTION */}
          <Newsletter />
        </main>
      )}

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* MODALS & DRAWERS */}
      <QuickViewModal />
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />
      <OrderTrackingModal />
      <UserAccountModal />
      <SearchOverlay onSelectProduct={handleSelectProduct} />
      <CompareModal />
      
      {/* FLOATING CHAT SUPPORT TOGGLE BUTTON */}
      {!isChatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#5D9906] hover:bg-[#467304] text-white p-3.5 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center gap-2 border border-[#D8F05A]/30"
          title="BAMORA AI Concierge"
        >
          <MessageCircle className="w-6 h-6 fill-current text-[#D8F05A]" />
        </button>
      )}

      <LiveChatSupport />
      <CookieBanner />
      <Toast />

      {isAdminDashboardOpen && (
        <AdminDashboard onClose={() => setAdminDashboardOpen(false)} />
      )}

    </div>
  );
}

export default App;
