'use client';

import React from 'react';
import { Compass, Car, Train, Plane, Phone, Sparkles } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';

export default function LocationPage() {
  const distances = [
    { name: 'River Ganga Bank & Ghat', distance: '200 Meters', desc: 'Direct walking path from resort cottages' },
    { name: 'Laxman Jhula', distance: '500 Meters', desc: '5 min scenic walk' },
    { name: 'Ram Jhula & Swarg Ashram', distance: '1.8 KM', desc: '10 min walk along the river promenade' },
    { name: 'Triveni Ghat (Maha Aarti)', distance: '4.5 KM', desc: '15 min drive' },
    { name: 'Rishikesh Railway Station (YNRK)', distance: '5.5 KM', desc: '18 min drive' },
    { name: 'Shivpuri (White Water Rafting)', distance: '12 KM', desc: '20 min drive' },
    { name: 'Dehradun Jolly Grant Airport (DED)', distance: '21 KM', desc: '35 min drive' },
    { name: 'Delhi NCR', distance: '235 KM', desc: '4.5 - 5 hours via Delhi-Meerut Expressway' },
  ];

  return (
    <div className="bg-[#FCFBF9] py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/3 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 animate-float shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>FIND YOUR WAY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Location & Directions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Centrally situated at {RESORT_CONFIG.address}.
          </p>
        </div>

        {/* Map & Distance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 reveal-on-scroll">
          
          {/* Left Column: Key Distances */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 mb-6 text-amber-700 font-bold text-base">
                <Compass className="w-5 h-5 text-amber-600" />
                <span>Distances & Travel Times from Tapovan</span>
              </div>

              <div className="space-y-3.5 text-sm">
                {distances.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-amber-50/40 hover:bg-amber-100/60 border border-amber-100 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-xs font-extrabold text-amber-800 bg-white px-3 py-1 rounded-full shadow-2xs shrink-0 border border-amber-200/60">
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistance card */}
            <div className="bg-gradient-to-br from-[#78350F] via-[#92400E] to-[#B45309] text-white rounded-3xl p-6 shadow-xl text-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-300/10 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-serif font-bold text-base mb-1">Need Driving Directions on Call?</h3>
              <p className="text-amber-100/90 text-xs mb-4">
                Call our front desk for live navigation guidance or to arrange pickup from Rishikesh station or airport.
              </p>
              <a
                href={`tel:${RESORT_CONFIG.phone}`}
                className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-amber-900 font-bold text-xs shadow-md"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Call {RESORT_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-amber-900/10 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
            <iframe
              title={`${RESORT_CONFIG.name} Tapovan Rishikesh Map`}
              src={RESORT_CONFIG.mapEmbedUrl}
              width="100%"
              height="530"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* How to Reach Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll">
          <div className="card-hover bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">By Car / Self-Drive</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Located directly off Laxman Jhula Road in Tapovan, the cultural and cafe heart of Rishikesh. Wide access road with secure on-site private parking for guests.
            </p>
          </div>

          <div className="card-hover bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Train className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">By Train</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Just 5.5 KM (18 mins) from Yog Nagari Rishikesh (YNRK) station and 26 KM from Haridwar Junction. Cabs, autos, and shared e-rickshaws run continuously to Tapovan.
            </p>
          </div>

          <div className="card-hover bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">By Flight</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dehradun Jolly Grant Airport (DED) is only 21 KM (35 mins) away via scenic highway. We provide direct airport shuttle pickup and drop-off upon advance request.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
