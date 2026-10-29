import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const FREE_SHIPPING_THRESHOLD = 1999;

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateCartQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    showNotification
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      showNotification(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'fixed'
      ? appliedCoupon.discountValue
      : Math.round((cartSubtotal * appliedCoupon.discountValue) / 100)
    : 0;

  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 150;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif-luxury text-lg font-bold text-white tracking-wide">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono bg-zinc-900 border border-zinc-800 text-amber-400 px-2 py-0.5 rounded">
                {cartCount} {cartCount === 1 ? 'piece' : 'pieces'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="px-5 py-3 bg-zinc-900/60 border-b border-zinc-800/80 text-xs">
              <div className="flex justify-between text-zinc-300 mb-1.5">
                {amountToFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-amber-300 font-mono">₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for <span className="text-amber-400 font-semibold">Free Express Shipping</span>
                  </span>
                ) : (
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <span>🎉 Free Delhi & Pan-India Express Shipping Unlocked!</span>
                  </span>
                )}
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-gradient transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-zinc-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8 text-amber-500/40" />
                </div>
                <h3 className="font-serif-luxury text-base font-semibold text-zinc-200">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Discover trending Delhi menswear, Italian blazers, and luxury royal ethnic wear in our catalog.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-md hover:brightness-110 cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.size}`} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-top rounded-lg bg-zinc-900 border border-zinc-800 shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-zinc-100 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-zinc-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                        <span>Size: <strong className="text-amber-400 font-mono">{item.size}</strong></span>
                        <span>·</span>
                        <span>{item.product.fit}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/40">
                      <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded-md">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.size, -1)}
                          className="p-1 hover:text-amber-400 transition-colors cursor-pointer text-zinc-400"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-zinc-100 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.size, 1)}
                          className="p-1 hover:text-amber-400 transition-colors cursor-pointer text-zinc-400"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-amber-300 tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code (e.g. ZARAGOLD)"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-200 uppercase font-mono placeholder:normal-case placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/60"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-zinc-900 border border-amber-500/30 hover:bg-amber-400/10 text-amber-400 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2.5 bg-amber-400/10 border border-amber-400/30 rounded-md text-xs">
                    <div className="flex items-center gap-1.5 text-amber-300 font-mono">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-zinc-400">(-₹{discountAmount.toLocaleString('en-IN')})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-zinc-200 tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Express Delhi/NCR)</span>
                  <span className={shippingFee === 0 ? 'text-amber-400 font-semibold' : 'text-zinc-200 tabular-nums'}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between text-sm font-bold text-white font-mono">
                  <span>Total Payable</span>
                  <span className="text-amber-300 text-base tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-gold-gradient hover:brightness-110 active:scale-[0.98] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>UPI · Cards · Netbanking · Cash on Delivery</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
