'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = `Hello ${RESORT_CONFIG.name}! I would like to inquire about room availability, packages and bookings.`;
  const whatsappUrl = RESORT_CONFIG.whatsappUrl(defaultMessage);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {/* Friendly tooltip bubble with subtle float animation */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-gray-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-amber-200/80 animate-float">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span className="font-medium text-gray-800">Quick WhatsApp Inquiry!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 ml-1 transition-colors"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Radar Wave Animation */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 radar-wave pointer-events-none" />
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative z-10 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 group"
        >
          <MessageCircle className="w-7 h-7 fill-white stroke-none group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
}
