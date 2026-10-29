import React, { useState } from 'react';
import { ShoppingBag, MapPin, ShieldCheck, SlidersHorizontal, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    setIsAdminOpen,
    setIsLocationModalOpen,
    setCategory,
    setSortBy
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Slim Promotional Bar (<= 40px, dismissible) */}
      {!bannerDismissed && (
        <div className="bg-zinc-950 border-b border-amber-500/20 px-4 py-2 text-xs flex items-center justify-between text-zinc-300">
          <div className="flex-1 text-center truncate">
            <span className="text-amber-400 font-semibold mr-1.5">Delhi Brahumpuri Store Offer:</span>
            <span>Use code <strong className="text-amber-300 font-mono tracking-wider">ZARAGOLD</strong> for Flat ₹500 Off · Free Express Delivery</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-zinc-400 hover:text-zinc-100 p-0.5 ml-2 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 text links) — Zone 3 (1 primary action) */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif-luxury text-xl sm:text-2xl font-black tracking-widest text-gold-gradient whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            ZARA TRADERS
          </a>

          {/* Zone 2: 4-5 concise single-line text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <button
              onClick={() => scrollToSection('collection-section')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Collection
            </button>
            <button
              onClick={() => {
                setSortBy('trending');
                scrollToSection('collection-section');
              }}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Trending
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Delhi Showroom
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Admin Portal
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-zinc-950 bg-gold-gradient rounded-md hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-amber-500/10"
              aria-label={`Shopping Bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-zinc-950" />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-mono font-bold bg-zinc-950 text-amber-300 px-1.5 py-0.5 rounded text-[11px]">
                {cartCount}
              </span>
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline text-zinc-900 border-l border-zinc-900/30 pl-2 tabular-nums">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-amber-300 hover:bg-zinc-900 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 mt-3 pt-3 pb-2 space-y-1">
            <button
              onClick={() => scrollToSection('collection-section')}
              className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:text-amber-300 hover:bg-zinc-900 rounded-md"
            >
              Collection
            </button>
            <button
              onClick={() => {
                setSortBy('trending');
                scrollToSection('collection-section');
              }}
              className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:text-amber-300 hover:bg-zinc-900 rounded-md"
            >
              Trending Styles
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:text-amber-300 hover:bg-zinc-900 rounded-md"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => handleNavClick(() => setIsLocationModalOpen(true))}
              className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:text-amber-300 hover:bg-zinc-900 rounded-md flex items-center justify-between"
            >
              <span>Delhi Showroom (Brahumpuri)</span>
              <MapPin className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => handleNavClick(() => setIsAdminOpen(true))}
              className="w-full text-left px-3 py-2 text-sm text-amber-400 hover:bg-zinc-900 rounded-md flex items-center justify-between font-medium"
            >
              <span>Store Admin & Inventory</span>
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>
    </>
  );
};
