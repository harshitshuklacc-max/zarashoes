import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, Navigation, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const StoreLocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, showNotification } = useStore();
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentPhone, setAppointmentPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentCategory, setAppointmentCategory] = useState('Wedding Sherwani & Ethnic');
  const [isBooked, setIsBooked] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentName.trim() || !appointmentPhone.trim()) {
      showNotification('Please enter your name and phone number.');
      return;
    }
    setIsBooked(true);
    showNotification('VIP Tailoring appointment requested! Our Brahumpuri team will WhatsApp you.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-6 text-zinc-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Zara Traders Flagship Showroom</h3>
              <p className="text-xs text-zinc-400">Brahumpuri Main Road, Delhi</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsLocationModalOpen(false);
              setIsBooked(false);
            }}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Store Highlights Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Physical Address</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Zara Traders Menswear Store,
              <br />
              Brahumpuri Main Road (Near Metro Connectivity),
              <br />
              North East Delhi, Delhi - 110053
            </p>
            <a
              href="https://maps.google.com/?q=Brahumpuri+Main+Road+Delhi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-amber-400 hover:underline pt-1 font-medium"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Clock className="w-4 h-4" />
              <span>Showroom Timings</span>
            </div>
            <p className="text-zinc-300">
              Monday - Sunday: <strong>10:30 AM – 9:30 PM</strong>
              <br />
              <span className="text-amber-400 font-semibold">Open All 7 Days</span>
            </p>
            <div className="pt-1 flex items-center gap-2 text-zinc-400">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Store Line: <strong>+91 98110 00000</strong></span>
            </div>
          </div>
        </div>

        {/* Book Free Tailoring & Fitting Session */}
        <div className="p-5 bg-gold-dark-gradient border border-amber-500/30 rounded-xl space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="font-serif-luxury text-sm font-bold text-amber-300">
              Book a Free Master Tailor Fitting Session
            </h4>
          </div>
          <p className="text-xs text-zinc-300">
            Visiting for an upcoming wedding, festival, or corporate wardrobe revamp? Reserve dedicated stylist attention and bespoke sizing trials in our Brahumpuri private fitting room.
          </p>

          {!isBooked ? (
            <form onSubmit={handleBookAppointment} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={appointmentName}
                onChange={e => setAppointmentName(e.target.value)}
                className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-400"
              />
              <input
                type="tel"
                required
                placeholder="Mobile / WhatsApp"
                value={appointmentPhone}
                onChange={e => setAppointmentPhone(e.target.value)}
                className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gold-gradient text-zinc-950 font-bold uppercase tracking-wider rounded-lg hover:brightness-110 cursor-pointer"
              >
                Reserve Slot
              </button>
            </form>
          ) : (
            <div className="p-3 bg-zinc-950/80 rounded-lg border border-amber-500/40 flex items-center gap-2 text-xs text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Appointment reserved! Our Brahumpuri concierge will contact you shortly on WhatsApp.</span>
            </div>
          )}
        </div>

        {/* Quick WhatsApp Concierge Button */}
        <div className="text-center pt-2">
          <a
            href="https://wa.me/919811000000?text=Hello%20Zara%20Traders,%20I%20am%20interested%20in%20your%20mens%20collection"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat Directly on WhatsApp (+91 98110 00000)</span>
          </a>
        </div>

      </div>
    </div>
  );
};
