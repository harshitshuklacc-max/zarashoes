import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductFilters } from './components/ProductFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CustomerReviews } from './components/CustomerReviews';
import { StoreLocationModal } from './components/StoreLocationModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Footer } from './components/Footer';
import { Sparkles, MapPin, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    filteredProducts,
    notificationMessage,
    setIsLocationModalOpen,
    resetFilters
  } = useStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans-clean selection:bg-amber-400 selection:text-zinc-950">
      
      {/* Toast Notification */}
      {notificationMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-zinc-900 border border-amber-400/60 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <p className="text-xs font-medium text-zinc-200">{notificationMessage}</p>
        </div>
      )}

      {/* Primary Top Bar */}
      <Navbar />

      {/* Main Campaign Hero */}
      <Hero />

      {/* Catalog & Filter Section */}
      <section id="collection-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium mb-1.5">
              <span>Mens Wear</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Trending Styles</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Delhi Flagship</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Curated Menswear Collection
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md font-sans-clean">
            Hand-inspected silhouettes crafted for wedding banquets, formal evenings, and effortless modern streetwear.
          </p>
        </div>

        {/* Product Filter Bar */}
        <ProductFilters />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-zinc-900/30 rounded-2xl border border-zinc-800">
            <p className="font-serif-luxury text-lg text-zinc-300">
              No matching pieces found in the current selection
            </p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Try adjusting your price range, clearing your search query, or selecting another category.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </section>

      {/* Craftsmanship & Delhi Showroom Feature Banner */}
      <section className="bg-zinc-900/50 border-y border-zinc-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The Zara Traders Legacy</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-snug">
                Master Tailoring Rooted in East Delhi, Shipped Everywhere.
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans-clean">
                For over a decade, Zara Traders on Brahumpuri Main Road has stood as Delhi’s premier destination for discerning gentlemen. We source raw unbleached Egyptian cotton, fine Italian worsted wools, and rich velvet bases directly, bypassing distributors to deliver unbeatable wholesale rates to our patrons.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800">
                  <span className="font-serif-luxury text-amber-400 font-bold block text-sm">Brahumpuri Hub</span>
                  <span className="text-zinc-400 text-[11px]">Walk-in trial rooms & master fittings</span>
                </div>
                <div className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800">
                  <span className="font-serif-luxury text-amber-400 font-bold block text-sm">Best Price</span>
                  <span className="text-zinc-400 text-[11px]">Direct boutique pricing without markup</span>
                </div>
                <div className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800 col-span-2 sm:col-span-1">
                  <span className="font-serif-luxury text-amber-400 font-bold block text-sm">Fast Dispatch</span>
                  <span className="text-zinc-400 text-[11px]">Express delivery across Delhi NCR</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 bg-zinc-950 rounded-2xl border border-amber-500/30 space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-white">
                Visit Our Delhi Showroom
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Step into our showroom on Brahumpuri Main Road to touch fabrics, compare lapel styles, and get measured by our head master tailor.
              </p>

              <div className="space-y-2 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Brahumpuri Main Road, North East Delhi - 110053</span>
                </div>
                <div className="text-zinc-400">
                  Timings: <strong className="text-white">10:30 AM – 9:30 PM (All 7 Days)</strong>
                </div>
              </div>

              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="w-full py-3 bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Showroom Location & Appointments</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Primary Footer */}
      <Footer />

      {/* Mobile Sticky Navigation */}
      <MobileBottomBar />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <SizeGuideModal />
      <StoreLocationModal />
      <AdminDashboard />

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
