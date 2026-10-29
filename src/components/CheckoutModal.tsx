import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Banknote, Landmark, CheckCircle, ArrowRight, Lock, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod } from '../types/store';

const FREE_SHIPPING_THRESHOLD = 1999;

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    appliedCoupon,
    createOrder,
    setIsOrderSuccessOpen,
    showNotification
  } = useStore();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+91 98110 ');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110053'); // Brahumpuri pincode by default

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountType === 'fixed'
      ? appliedCoupon.discountValue
      : Math.round((cartSubtotal * appliedCoupon.discountValue) / 100)
    : 0;

  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 150;
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handlePincodeChange = (val: string) => {
    setPincode(val);
    if (val === '110053') {
      setCity('North East Delhi (Brahumpuri / Yamuna Vihar)');
      setState('Delhi');
    } else if (val.startsWith('110')) {
      setCity('Delhi');
      setState('Delhi');
    } else if (val.startsWith('201')) {
      setCity('Noida / Ghaziabad');
      setState('Uttar Pradesh');
    } else if (val.startsWith('122')) {
      setCity('Gurugram');
      setState('Haryana');
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name for order dispatch.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('Please provide your complete delivery street address.');
      return;
    }

    if (paymentMethod === 'upi' && selectedUpiApp !== 'qr' && !upiId.includes('@')) {
      setErrorMessage('Please enter a valid UPI VPA ID (e.g. yourname@oksbi).');
      return;
    }

    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16 || cardExpiry.length < 5 || cardCvv.length < 3) {
        setErrorMessage('Please enter complete debit/credit card details.');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate secure 256-bit payment gateway authorization
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = createOrder({
        customerName,
        phone,
        email: email || `${phone.replace(/\D/g, '')}@zaracustomer.com`,
        address,
        landmark,
        city,
        state,
        pincode,
        items: cart,
        subtotal: cartSubtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        couponApplied: appliedCoupon?.code,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending COD' : 'Paid',
        orderStatus: 'New',
        estimatedDelivery: pincode.startsWith('110') ? 'Tomorrow, between 11 AM - 5 PM' : '2-3 Business Days'
      });

      setIsCheckoutOpen(false);
      setIsOrderSuccessOpen(true);
      showNotification(`Order placed successfully! Order ID: ${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                Zara Traders Secure Checkout
              </h2>
              <p className="text-xs text-zinc-400">256-Bit Encrypted Payment & Delhi Express Delivery</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-6">
          
          {/* Section 1: Customer Contact & Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <MapPin className="w-4 h-4" />
              <span>1. Delivery Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">WhatsApp / Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98110 00000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address (for invoice receipt)</label>
                <input
                  type="email"
                  placeholder="vikram@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-300 mb-1">Street Address / House No. / Building *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 302, Brahumpuri Main Road, Near Metro Pillar / Chowk"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="Near Brahumpuri Post Office / Temple"
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="110053"
                  value={pincode}
                  onChange={e => handlePincodeChange(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Integration */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>2. Select Secure Payment Method</span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'upi'
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <QrCode className="w-5 h-5 mb-2 text-amber-400" />
                <span className="text-xs font-semibold">UPI / QR Code</span>
                <span className="text-[10px] text-zinc-400">GPay, PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'card'
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <CreditCard className="w-5 h-5 mb-2 text-amber-400" />
                <span className="text-xs font-semibold">Debit / Credit</span>
                <span className="text-[10px] text-zinc-400">Visa, RuPay, MC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'netbanking'
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <Landmark className="w-5 h-5 mb-2 text-amber-400" />
                <span className="text-xs font-semibold">Net Banking</span>
                <span className="text-[10px] text-zinc-400">All Major Banks</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <Banknote className="w-5 h-5 mb-2 text-amber-400" />
                <span className="text-xs font-semibold">Cash On Delivery</span>
                <span className="text-[10px] text-zinc-400">Pay at Doorstep</span>
              </button>
            </div>

            {/* UPI Details Box */}
            {paymentMethod === 'upi' && (
              <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUpiApp('qr')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                      selectedUpiApp === 'qr' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    Scan Store QR Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedUpiApp('gpay')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                      selectedUpiApp !== 'qr' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    Enter UPI ID / VPA
                  </button>
                </div>

                {selectedUpiApp === 'qr' ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                    {/* Simulated Authentic UPI QR Graphic */}
                    <div className="w-32 h-32 bg-white p-2 rounded-lg flex flex-col items-center justify-center shrink-0 shadow">
                      <div className="w-full h-full border-2 border-zinc-950 p-1 flex flex-col justify-between relative">
                        <div className="flex justify-between">
                          <div className="w-6 h-6 bg-zinc-950 rounded-xs" />
                          <div className="w-6 h-6 bg-zinc-950 rounded-xs" />
                        </div>
                        <div className="text-center font-bold font-mono text-[8px] text-zinc-950">
                          ZARA TRADERS
                          <br />
                          ₹{totalAmount.toLocaleString('en-IN')}
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="w-6 h-6 bg-zinc-950 rounded-xs" />
                          <div className="w-4 h-4 bg-amber-600 rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5 text-zinc-300">
                      <p className="font-semibold text-white">Scan using GPay, PhonePe, Paytm, or BHIM</p>
                      <p className="text-zinc-400">
                        Merchant: <strong className="text-amber-400">ZARA TRADERS DELHI</strong>
                      </p>
                      <p className="font-mono text-zinc-400 text-[11px]">UPI ID: <span className="text-zinc-200">zaratradersdelhi@icici</span></p>
                      <p className="text-[11px] text-zinc-500">Scan & pay ₹{totalAmount.toLocaleString('en-IN')}, then click Place Order below.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Enter your UPI VPA ID</label>
                    <input
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-zinc-500 mt-1">Payment authorization request will be sent to your UPI app.</p>
                  </div>
                )}
              </div>
            )}

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">16-Digit Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="4532 8920 1234 5678"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="08/28"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Name on Card</label>
                  <input
                    type="text"
                    placeholder="Same as shown on card"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            {/* Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-2">
                <p className="font-semibold text-white">Popular Indian Banks Supported:</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">HDFC Bank</div>
                  <div className="p-2 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">State Bank of India</div>
                  <div className="p-2 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">ICICI Bank</div>
                  <div className="p-2 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">Axis Bank</div>
                  <div className="p-2 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">Kotak Mahindra</div>
                  <div className="p-2 bg-zinc-950 rounded border border-zinc-800 text-zinc-300">Punjab National</div>
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1.5">
                <p className="font-semibold text-amber-300">Cash on Delivery Verified for Delhi & NCR</p>
                <p className="text-zinc-400">
                  You can pay cash or scan the delivery executive's UPI QR code upon arrival at your doorstep in {city}.
                </p>
              </div>
            )}
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 bg-rose-950/60 border border-rose-700/60 rounded-lg text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Order Summary & Submit Button */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 font-mono">
              <span>Payable Amount: </span>
              <strong className="text-amber-300 text-lg tabular-nums">₹{totalAmount.toLocaleString('en-IN')}</strong>
              {appliedCoupon && <span className="text-amber-400 ml-2">({appliedCoupon.code} applied)</span>}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-gradient hover:brightness-110 active:scale-[0.98] text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <span>Confirm & Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
