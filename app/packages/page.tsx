'use client';

import React from 'react';
import { Check, Info, ShieldCheck, Sparkles, Zap, Users, Compass, HelpCircle, Star } from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';

export default function PackagesPage() {
  const packageFeatures = [
    { title: 'Breakfast, Lunch, Dinner & Snacks', bold: true },
    { title: 'Mountain View Rooms', bold: false },
    { title: 'Access to Swimming Pool', bold: false },
    { title: 'Bonfire & Music Access', bold: false },
    { title: 'Complimentary Wi-Fi', bold: false },
    { title: 'Secure Parking', bold: false },
    { title: '24/7 Power Backup', bold: false },
    { title: 'Indoor/Outdoor Games', bold: false },
  ];

  const additionalPackages = [
    {
      name: 'Adventure Rafting Package',
      tag: 'THRILL SEEKER',
      price: '₹2,499',
      unit: '/ person',
      desc: 'Stay + All Meals + 16 KM White Water Rafting + Cliff Jump',
      features: [
        'All meals included (Buffet)',
        '16 KM River Rafting in Ganga',
        'Body Surfing & Cliff Jumping',
        'Evening Bonfire with Acoustic Music',
        'Swimming Pool Access',
      ],
      popular: false,
    },
    {
      name: 'Romantic Riverside Escape',
      tag: 'FOR COUPLES',
      price: '₹5,499',
      unit: '/ couple',
      desc: 'Deluxe Private Cottage + Candlelight Dinner + Cake & Decor',
      features: [
        'Private Mountain & Stream View Cottage',
        'Candlelight Dinner Setup by the River',
        'Complimentary Welcome Cake',
        'All 4 Meals (Breakfast, Lunch, Snacks, Dinner)',
        'Late Checkout till 1:00 PM',
      ],
      popular: false,
    },
    {
      name: 'Corporate & Group Offsite',
      tag: 'TEAMS & GROUPS',
      price: '₹1,899',
      unit: '/ person',
      desc: 'Designed for team-building, offsites, and large family getaways',
      features: [
        'Quad / Triple Sharing Cottages',
        'Conference & Projector Setup',
        'Team Building Games & Badminton',
        'Live DJ / Music & River Bonfire',
        'Customized Buffet Menu & Snacks',
      ],
      popular: false,
    },
  ];

  return (
    <div className="bg-[#FCFBF9] py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with Animated Badge */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 animate-float shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>BEST VALUE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Transparent Packages
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            All-inclusive stays starting at an unbeatable price at {RESORT_CONFIG.name}.
          </p>
        </div>

        {/* Main Featured Card with Royal Amber-Gold Gradient */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(217,119,6,0.12)] border border-amber-100 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(217,119,6,0.18)] hover:-translate-y-1 reveal-on-scroll">
          
          {/* Card Top Banner (Deep Royal Gold & Amber Gradient) */}
          <div className="bg-gradient-to-br from-[#78350F] via-[#92400E] to-[#B45309] text-white text-center py-10 px-6 sm:px-10 relative overflow-hidden">
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_5s_infinite]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-amber-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-white/20 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Most Popular Choice</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              All-Inclusive Stay Package
            </h2>
            <p className="text-amber-100/90 text-sm sm:text-base mt-2">
              Accommodation + All Meals + Amenities
            </p>

            {/* Pricing */}
            <div className="mt-6 flex items-baseline justify-center gap-1">
              <span className="text-amber-200 text-base sm:text-lg font-medium mr-1">
                Starts @
              </span>
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                ₹1,499
              </span>
              <span className="text-amber-200 text-sm sm:text-base font-normal ml-1">
                / person
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-amber-200/80 mt-1">
              *Terms & conditions apply
            </p>
          </div>

          {/* Card Bottom Body */}
          <div className="p-6 sm:p-10 space-y-8 bg-gradient-to-b from-white to-[#FCFBF9]">
            
            {/* Features 2-column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {packageFeatures.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Please Note Callout Box */}
            <div className="bg-[#FFFBEB] border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
              <div className="w-1.5 self-stretch bg-amber-500 rounded-full shrink-0" />
              <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                <p className="font-bold text-amber-900 mb-0.5">Please Note:</p>
                <p>
                  Final pricing may vary based on room category (Premium/Deluxe/Quad), specific travel dates, and group size. Contact us for the best customized quote.
                </p>
              </div>
            </div>

            {/* CTA Button with shimmer animation */}
            <div className="text-center pt-2">
              <button
                onClick={() => openBookingModal('All-Inclusive Stay Package (₹1,499/person)')}
                className="shimmer-btn w-full sm:w-auto inline-flex items-center justify-center px-10 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-sm sm:text-base shadow-[0_6px_25px_rgba(217,119,6,0.35)] hover:shadow-[0_10px_30px_rgba(217,119,6,0.45)] transition-all active:scale-98"
              >
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>

        {/* Additional Specialized Packages */}
        <div className="mt-20 reveal-on-scroll">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              TAILORED EXPERIENCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-3">
              Explore More Package Options
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Whether you seek adrenaline thrills, romantic solitude, or group offsites, we have the perfect itinerary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="card-hover bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 inline-block mb-3">
                    {pkg.tag}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed min-h-[36px]">
                    {pkg.desc}
                  </p>

                  <div className="mt-5 mb-6 flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-700">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-gray-500 ml-1.5">{pkg.unit}</span>
                  </div>

                  <ul className="space-y-3 border-t border-amber-100/60 pt-5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => openBookingModal(pkg.name)}
                    className="w-full py-2.5 rounded-xl border border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white font-semibold text-xs transition-colors shadow-2xs"
                  >
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Highlights */}
        <div className="mt-20 bg-white rounded-3xl p-8 sm:p-10 border border-amber-100 shadow-sm reveal-on-scroll">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
            What Every Stay Includes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 hover:border-amber-300 transition-colors">
              <Zap className="w-6 h-6 text-amber-600 mb-2" />
              <h4 className="font-semibold text-sm text-gray-900">100% Power Backup</h4>
              <p className="text-xs text-gray-500 mt-1">Silent heavy generator ensures uninterrupted power in the valley.</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 hover:border-amber-300 transition-colors">
              <Sparkles className="w-6 h-6 text-amber-600 mb-2" />
              <h4 className="font-semibold text-sm text-gray-900">Fresh Mountain Water</h4>
              <p className="text-xs text-gray-500 mt-1">Direct from pure Himalayan streams, double filtered & RO purified.</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 hover:border-amber-300 transition-colors">
              <ShieldCheck className="w-6 h-6 text-amber-600 mb-2" />
              <h4 className="font-semibold text-sm text-gray-900">Gated & CCTV Secured</h4>
              <p className="text-xs text-gray-500 mt-1">Safe compound with 24/7 security staff and private parking.</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 hover:border-amber-300 transition-colors">
              <Compass className="w-6 h-6 text-amber-600 mb-2" />
              <h4 className="font-semibold text-sm text-gray-900">Direct River Access</h4>
              <p className="text-xs text-gray-500 mt-1">Just 50 steps down to crystal clear mountain stream waters.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
