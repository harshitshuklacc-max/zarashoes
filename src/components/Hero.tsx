import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, MapPin, Truck, RefreshCw } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockProducts';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setIsLocationModalOpen, setSortBy } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('collection-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-zinc-950 overflow-hidden border-b border-zinc-800">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Location & Guarantee Kicker (clean unboxed text) */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Brahumpuri Main Road, Delhi
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-amber-400">Best Price Guaranteed</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Where Delhi’s Royal Heritage Meets Modern Streetwear.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans-clean max-w-xl">
              Experience Zara Traders’ signature menswear collection. From bespoke handcrafted wedding sherwanis and Italian-tailored blazers to heavy-duty urban streetwear tees.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="px-6 py-3.5 bg-gold-gradient text-zinc-950 font-semibold text-xs tracking-wider uppercase rounded-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <span>Explore Collection</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="px-6 py-3.5 bg-zinc-900 border border-zinc-700 hover:border-amber-400/50 text-zinc-200 hover:text-white font-medium text-xs tracking-wider uppercase rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Visit Showroom</span>
              </button>
            </div>

            {/* Subtle Brand Note */}
            <div className="pt-2 text-xs text-zinc-500 flex items-center gap-4">
              <span>👕 100% Fine Fabric Sourced</span>
              <span>·</span>
              <span>📍 Live in Delhi Since 2012</span>
              <span>·</span>
              <span>⭐ 4.9/5 Rated Store</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black/80 group">
              <img
                src={HERO_IMAGE}
                alt="Zara Traders Luxury Men's Wear Delhi Campaign"
                className="w-full h-[380px] sm:h-[480px] lg:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle Gold Hairline Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />

              {/* In-Frame Tag */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <div>
                  <p className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">Autumn / Winter Edition</p>
                  <p className="font-serif-luxury text-lg font-bold text-white">Zara Traders Signature Series</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-zinc-400 block">Delhi NCR Delivery</span>
                  <span className="text-sm font-semibold text-amber-300">Same Day Dispatch</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof / Guarantee Strip Below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-zinc-800/80">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">Best Price Guaranteed</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Direct boutique pricing without distributor markups</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">Supreme Fabric Grade</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Heavy cotton, Egyptian linen, & micro-velvets</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
            <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">Fast Delhi & Pan-India</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">Free express courier on prepaid & UPI orders</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
            <RefreshCw className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">Hassle-Free Exchange</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">7-day doorstep size replacement guaranteed</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
