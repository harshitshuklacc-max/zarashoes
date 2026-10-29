import React from 'react';
import { MapPin, Phone, ShieldCheck, Mail, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setIsLocationModalOpen, setIsAdminOpen, setIsSizeGuideOpen } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 text-xs pb-16 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Address Column */}
          <div className="space-y-4">
            <span className="font-serif-luxury text-xl font-black tracking-widest text-gold-gradient block">
              ZARA TRADERS
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Distinguished Men’s Wear & Trending Styles. Sourcing elite textiles and crafting precision silhouettes in Delhi.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Brahumpuri Main Road, North East Delhi, Delhi - 110053</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98110 00000 (10:30 AM - 9:30 PM)</span>
              </div>
            </div>
          </div>

          {/* Menswear Collections */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold text-white tracking-wider uppercase">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#collection-section" className="hover:text-amber-300 transition-colors">
                  Imperial Wedding Sherwanis
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:text-amber-300 transition-colors">
                  Double-Breasted Italian Blazers
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:text-amber-300 transition-colors">
                  Egyptian Cotton & Pure Linen Shirts
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:text-amber-300 transition-colors">
                  Urban Heavyweight Streetwear Tees
                </a>
              </li>
              <li>
                <a href="#collection-section" className="hover:text-amber-300 transition-colors">
                  Sartorial Stretch Trousers
                </a>
              </li>
            </ul>
          </div>

          {/* Patron Services & Loyalty */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold text-white tracking-wider uppercase">
              Client Privileges
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Delhi Sizing & Measurement Chart
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Book Private Fitting in Brahumpuri
                </button>
              </li>
              <li>
                <span className="text-zinc-400">
                  Zara Gold Privilege Rewards (10 pts/₹100)
                </span>
              </li>
              <li>
                <span className="text-zinc-400">
                  7-Day Hassle-Free Size Exchange
                </span>
              </li>
              <li>
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Store Staff & Inventory Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantee Column */}
          <div className="space-y-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h4 className="font-serif-luxury text-sm font-bold text-white">
                Best Price Guarantee
              </h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Zara Traders guarantees the finest fabric weaves, genuine metal hardware, and master tailoring at competitive prices direct from our Brahumpuri workshop.
            </p>
            <div className="pt-2 text-[11px] text-amber-400 font-mono">
              PAN-INDIA COURIER & SAME-DAY DELHI DISPATCH
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-500">
            © {new Date().getFullYear()} ZARA TRADERS. Brahumpuri Main Road, Delhi. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
