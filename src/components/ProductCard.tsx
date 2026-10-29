import React, { useState } from 'react';
import { Eye, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product, ProductSize } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForModal } = useStore();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-zinc-900/60 rounded-xl border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 overflow-hidden"
    >
      {/* Visual Image Container (65-75% presence) */}
      <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden cursor-pointer" onClick={() => setSelectedProductForModal(product)}>
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 p-4 text-center">
            <span className="font-serif-luxury text-amber-400 text-lg mb-1">Zara Traders</span>
            <span className="text-xs text-zinc-400">{product.name}</span>
          </div>
        )}

        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Minimal Unboxed Status Kicker on Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.isTrending ? (
            <span className="text-[11px] font-semibold text-amber-300 tracking-wider uppercase bg-zinc-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/30">
              Trending
            </span>
          ) : product.isBestSeller ? (
            <span className="text-[11px] font-semibold text-amber-300 tracking-wider uppercase bg-zinc-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/30">
              Best Seller
            </span>
          ) : (
            <span />
          )}

          {discountPercent > 0 && (
            <span className="text-[11px] font-mono font-bold text-amber-400 tracking-wide bg-zinc-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-zinc-800">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Floating Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(product);
            }}
            className="pointer-events-auto px-4 py-2 bg-zinc-900/90 hover:bg-zinc-900 text-white border border-amber-400/40 rounded-lg text-xs font-medium flex items-center gap-2 backdrop-blur-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span className="text-amber-400/90 font-medium">{product.category}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>{product.fit}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="flex items-center text-amber-400 text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => setSelectedProductForModal(product)}
          className="font-serif-luxury text-base font-semibold text-zinc-100 hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Fabric & Color Sub-line */}
        <p className="text-xs text-zinc-400 line-clamp-1">
          {product.fabric}
        </p>

        {/* Pricing & Stock Line */}
        <div className="pt-1 flex items-baseline justify-between border-t border-zinc-800/60">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-amber-300 tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-xs text-zinc-500 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <span className={`text-[11px] font-mono ${product.stock > 0 ? 'text-zinc-400' : 'text-rose-400 font-semibold'}`}>
            {product.stock > 0 ? (
              product.stock <= 5 ? `Only ${product.stock} left` : 'In Stock'
            ) : 'Sold Out'}
          </span>
        </div>

        {/* Size Selection & Add to Cart Action */}
        <div className="pt-1 flex items-center justify-between gap-2">
          {/* Sizes */}
          <div className="flex items-center gap-1">
            {product.sizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`w-6 h-6 rounded text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                  selectedSize === size
                    ? 'bg-amber-400 text-zinc-950 font-bold'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
                title={`Size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product, selectedSize, 1)}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              product.stock > 0
                ? 'bg-zinc-800 hover:bg-gold-gradient hover:text-zinc-950 text-zinc-200 border border-zinc-700 hover:border-amber-400/50'
                : 'bg-zinc-900 text-zinc-600 border border-zinc-900 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
