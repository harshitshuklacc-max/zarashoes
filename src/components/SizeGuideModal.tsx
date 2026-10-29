import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-luxury text-xl font-bold text-white">Zara Traders Menswear Sizing Guide</h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400">
          All measurements are in inches. Custom tailored fittings are also offered in our Brahumpuri showroom for wedding sherwanis and bespoke blazers.
        </p>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-zinc-800 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-900/80 text-amber-400 uppercase tracking-wider font-mono">
              <tr>
                <th className="py-3 px-4 border-b border-zinc-800">Size</th>
                <th className="py-3 px-4 border-b border-zinc-800">Chest (in)</th>
                <th className="py-3 px-4 border-b border-zinc-800">Shoulder (in)</th>
                <th className="py-3 px-4 border-b border-zinc-800">Waist (in)</th>
                <th className="py-3 px-4 border-b border-zinc-800">Length (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono tabular-nums text-zinc-300">
              <tr className="hover:bg-zinc-900/30">
                <td className="py-3 px-4 font-bold text-amber-300">S (38)</td>
                <td className="py-3 px-4">38 - 39"</td>
                <td className="py-3 px-4">17.0"</td>
                <td className="py-3 px-4">30 - 32"</td>
                <td className="py-3 px-4">28.5"</td>
              </tr>
              <tr className="hover:bg-zinc-900/30">
                <td className="py-3 px-4 font-bold text-amber-300">M (40)</td>
                <td className="py-3 px-4">40 - 41"</td>
                <td className="py-3 px-4">17.5"</td>
                <td className="py-3 px-4">32 - 34"</td>
                <td className="py-3 px-4">29.0"</td>
              </tr>
              <tr className="hover:bg-zinc-900/30">
                <td className="py-3 px-4 font-bold text-amber-300">L (42)</td>
                <td className="py-3 px-4">42 - 43"</td>
                <td className="py-3 px-4">18.2"</td>
                <td className="py-3 px-4">34 - 36"</td>
                <td className="py-3 px-4">30.0"</td>
              </tr>
              <tr className="hover:bg-zinc-900/30">
                <td className="py-3 px-4 font-bold text-amber-300">XL (44)</td>
                <td className="py-3 px-4">44 - 45"</td>
                <td className="py-3 px-4">19.0"</td>
                <td className="py-3 px-4">36 - 38"</td>
                <td className="py-3 px-4">30.5"</td>
              </tr>
              <tr className="hover:bg-zinc-900/30">
                <td className="py-3 px-4 font-bold text-amber-300">XXL (46)</td>
                <td className="py-3 px-4">46 - 48"</td>
                <td className="py-3 px-4">19.8"</td>
                <td className="py-3 px-4">38 - 42"</td>
                <td className="py-3 px-4">31.5"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 p-3 bg-zinc-900/40 rounded-lg border border-zinc-800 text-xs text-zinc-300">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Need help finding your exact size? Call our Brahumpuri master tailor at <strong>+91 98110 00000</strong> for instant phone assistance.</span>
        </div>

        <div className="text-right">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-5 py-2 bg-gold-gradient text-zinc-950 font-semibold text-xs tracking-wider uppercase rounded-md hover:brightness-110 cursor-pointer"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
