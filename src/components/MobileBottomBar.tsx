import React from 'react';
import { Home, Shirt, ShoppingBag, MapPin, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomBar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsAdminOpen, setIsLocationModalOpen } = useStore();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80 px-4 py-2">
      <div className="flex items-center justify-around text-[10px]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-amber-300 py-1 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => scrollToSection('collection-section')}
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-amber-300 py-1 transition-colors"
        >
          <Shirt className="w-4 h-4" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-amber-400 py-1 font-semibold"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-gold-gradient text-zinc-950 font-mono text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>

        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-amber-300 py-1 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span>Delhi Store</span>
        </button>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-amber-300 py-1 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
};
