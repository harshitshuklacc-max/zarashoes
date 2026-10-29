import React, { useState } from 'react';
import { X, Star, ShieldCheck, MapPin, Ruler, Check, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductSize } from '../types/store';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    setIsCheckoutOpen,
    setIsSizeGuideOpen,
    setIsLocationModalOpen
  } = useStore();

  const product = selectedProductForModal;

  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setSelectedProductForModal(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Product Image Gallery */}
          <div className="md:col-span-6 bg-zinc-900 relative flex items-center justify-center min-h-[360px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top max-h-[550px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:hidden" />
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="text-amber-400 uppercase tracking-widest font-semibold">{product.category}</span>
                <span>·</span>
                <span className="font-mono text-zinc-500">SKU: {product.sku}</span>
                <span>·</span>
                <span className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Product Title */}
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-snug">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-mono text-sm text-zinc-500 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed font-sans-clean">
                {product.description}
              </p>

              {/* Size Selector with Size Chart Trigger */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">Select Size:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Delhi Sizing Guide</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 h-10 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center ${
                        selectedSize === size
                          ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/50'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications List */}
              <div className="pt-2 text-xs space-y-1.5 text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 font-medium">Fabric:</span>
                  <span className="text-zinc-300">{product.fabric}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 font-medium">Fit Profile:</span>
                  <span className="text-zinc-300">{product.fit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 font-medium">Availability:</span>
                  <span className={product.stock > 0 ? 'text-amber-400 font-medium' : 'text-rose-400'}>
                    {product.stock > 0 ? `${product.stock} units in Brahumpuri Stockroom` : 'Temporarily Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Physical Trial Notice */}
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-zinc-300">
                  <span>Available for trial at our flagship store: </span>
                  <strong className="text-white">Brahumpuri Main Road, Delhi</strong>.
                  <button
                    onClick={() => {
                      setSelectedProductForModal(null);
                      setIsLocationModalOpen(true);
                    }}
                    className="text-amber-400 hover:underline ml-1 cursor-pointer font-medium"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
              <button
                disabled={product.stock <= 0}
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  setSelectedProductForModal(null);
                }}
                className="w-full sm:flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-400/40 text-amber-300 font-semibold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                disabled={product.stock <= 0}
                onClick={handleBuyNow}
                className="w-full sm:flex-1 py-3.5 bg-gold-gradient hover:brightness-110 active:scale-[0.98] text-zinc-950 font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Buy Now with Express</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
