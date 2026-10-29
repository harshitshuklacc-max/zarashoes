import React from 'react';
import { X, CheckCircle, Package, Truck, Printer, Share2, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    latestOrder,
    loyaltyPoints
  } = useStore();

  if (!isOrderSuccessOpen || !latestOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-6 text-zinc-200">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
            <CheckCircle className="w-9 h-9" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Payment & Order Confirmed
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Thank you, {latestOrder.customerName}!
          </h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Your exclusive menswear order has been routed to our Brahumpuri Main Road flagship hub in Delhi for priority packing and tailoring inspection.
          </p>
        </div>

        {/* Order Identifier & Tracking Bar */}
        <div className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-zinc-500 block">Order Number</span>
              <span className="font-mono text-sm font-bold text-white">{latestOrder.id}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Delhi Dispatch Code</span>
              <span className="font-mono text-sm font-bold text-amber-300">{latestOrder.trackingCode}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Estimated Arrival</span>
              <span className="font-semibold text-white">{latestOrder.estimatedDelivery}</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="space-y-1">
              <div className="h-1.5 bg-amber-400 rounded-full" />
              <span className="text-amber-400 font-semibold">Order Placed</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-amber-400/40 rounded-full" />
              <span className="text-zinc-400">Packing at Brahumpuri</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-zinc-800 rounded-full" />
              <span className="text-zinc-500">Out for Delivery</span>
            </div>
          </div>
        </div>

        {/* Itemized Receipt Summary */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Order Items
          </h4>
          <div className="divide-y divide-zinc-800/60 border border-zinc-800 rounded-xl bg-zinc-900/30 p-3 max-h-48 overflow-y-auto">
            {latestOrder.items.map((item, idx) => (
              <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-12 object-cover rounded bg-zinc-900 border border-zinc-800"
                  />
                  <div>
                    <span className="font-medium text-zinc-100 block line-clamp-1">{item.product.name}</span>
                    <span className="text-zinc-500 text-[11px]">Size {item.size} · Qty {item.quantity}</span>
                  </div>
                </div>
                <span className="font-mono text-zinc-200 tabular-nums">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Reward Box */}
        <div className="p-3.5 bg-gold-dark-gradient border border-amber-500/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-300">Zara Gold Privilege Club</p>
              <p className="text-[11px] text-zinc-400">
                You earned <strong className="text-white font-mono">+{latestOrder.loyaltyPointsEarned} points</strong> on this order. Total balance: <span className="text-amber-400 font-mono font-bold">{loyaltyPoints} points</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Address & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-400 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800">
          <div>
            <span className="font-semibold text-zinc-300 block mb-0.5">Delivery Destination:</span>
            <p className="text-zinc-400">{latestOrder.address}</p>
            <p className="text-zinc-400">{latestOrder.city}, {latestOrder.state} - {latestOrder.pincode}</p>
            <p className="text-zinc-400 mt-1">Phone: {latestOrder.phone}</p>
          </div>
          <div>
            <span className="font-semibold text-zinc-300 block mb-0.5">Payment Information:</span>
            <p className="text-zinc-400 uppercase font-mono">Method: {latestOrder.paymentMethod}</p>
            <p className="text-zinc-400">Status: <strong className="text-amber-400">{latestOrder.paymentStatus}</strong></p>
            <p className="text-zinc-200 font-mono font-bold text-sm mt-1">
              Total Paid: ₹{latestOrder.totalAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="w-full sm:flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Invoice Receipt</span>
          </button>

          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full sm:flex-1 py-2.5 bg-gold-gradient text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
