import Link from 'next/link';
import { Home, Phone, ArrowRight, Compass } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-[#FCFBF9] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center shadow-lg border border-amber-200">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            PAGE NOT FOUND • 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            Lost in the Foothills?
          </h1>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            The page you are looking for doesn't exist or has moved. Let's guide you back to paradise.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="shimmer-btn px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={`tel:${RESORT_CONFIG.phone}`}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center gap-2 border border-amber-200 shadow-2xs transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Support ({RESORT_CONFIG.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
