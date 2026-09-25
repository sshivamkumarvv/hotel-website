'use client';

import React from 'react';
import Image from 'next/image';
import {
  Waves,
  Flame,
  Gamepad2,
  Trophy,
  Trees,
  Wifi,
  Car,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';

export default function FacilitiesPage() {
  const resortFacilities = [
    {
      title: 'Swimming Pool',
      desc: 'Crystal clear outdoor pool',
      icon: Waves,
    },
    {
      title: 'Bonfire & Music',
      desc: 'Vibrant evening vibes',
      icon: Flame,
    },
    {
      title: 'Indoor Games',
      desc: 'Recreation center',
      icon: Gamepad2,
    },
    {
      title: 'Outdoor Sports',
      desc: 'Cricket & Badminton',
      icon: Trophy,
    },
    {
      title: 'Garden Seating',
      desc: 'Lush green open areas',
      icon: Trees,
    },
    {
      title: 'Free Wi-Fi',
      desc: 'Stay connected',
      icon: Wifi,
    },
    {
      title: 'Free Parking',
      desc: 'Secure private parking',
      icon: Car,
    },
    {
      title: 'Power Backup',
      desc: 'Uninterrupted comfort',
      icon: Zap,
    },
    {
      title: 'CCTV Security',
      desc: '24/7 Surveillance',
      icon: ShieldCheck,
    },
  ];

  const adventureActivities = [
    {
      title: 'River Rafting',
      subtitle: 'AVAILABLE NEARBY',
      image: '/images/rafting.jpg',
      distance: '15 min drive',
      description: 'Conquer the Grade III & IV rapids of the Ganges with certified river guides.',
    },
    {
      title: 'Zipline',
      subtitle: 'AVAILABLE NEARBY',
      image: '/images/zipline.jpg',
      distance: '10 min drive',
      description: 'Soar 200 feet above the river canyon at speeds up to 140 km/h.',
    },
    {
      title: 'Paragliding',
      subtitle: 'AVAILABLE NEARBY',
      image: '/images/paragliding.jpg',
      distance: '20 min drive',
      description: 'Experience bird-eye Himalayan views with tandem tandem paragliding flights.',
    },
    {
      title: 'Bungee Jumping',
      subtitle: 'AVAILABLE NEARBY',
      image: '/images/bungee.jpg',
      distance: '20 min drive',
      description: "Jump from India's highest fixed bungee platform (83 meters) in Rishikesh.",
    },
  ];

  return (
    <div className="bg-[#FCFBF9] py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/4 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 animate-float shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>RESORT FEATURES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Facilities & Adventures
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Curated experiences to make your stay memorable at {RESORT_CONFIG.name}.
          </p>
        </div>

        {/* 3x3 Grid of Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 reveal-on-scroll">
          {resortFacilities.map((facility, idx) => {
            const IconComponent = facility.icon;
            return (
              <div
                key={idx}
                className="card-hover bg-white rounded-3xl p-8 text-center border border-amber-900/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-amber-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 text-amber-700 flex items-center justify-center mx-auto mb-5 shadow-2xs group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {facility.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {facility.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Section: | Adventure Activities */}
        <div className="mb-20 reveal-on-scroll">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-amber-600 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900 tracking-tight">
              Adventure Activities
            </h2>
          </div>

          {/* 4 Adventure Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adventureActivities.map((act, idx) => (
              <div
                key={idx}
                onClick={() => openBookingModal(`${act.title} Adventure Inquiry`)}
                className="group relative rounded-3xl overflow-hidden shadow-lg aspect-4/5 cursor-pointer bg-gray-900 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(217,119,6,0.3)]"
              >
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold tracking-tight mb-1 text-white group-hover:text-amber-400 transition-colors">
                    {act.title}
                  </h3>
                  <span className="text-[11px] font-bold tracking-widest text-amber-200/90 uppercase block mb-2">
                    {act.subtitle}
                  </span>
                  <p className="text-xs text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adventure Assistance Box */}
        <div className="bg-[#090D16] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-amber-950/40 relative overflow-hidden reveal-on-scroll">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Looking to Book Rafting or Bungee Jumping?
            </h3>
            <p className="text-sm text-gray-300 max-w-xl">
              Our front desk organizes verified adventure slots with certified gear, priority booking, and round-trip transfers.
            </p>
          </div>
          <button
            onClick={() => openBookingModal('Adventure Activities Booking')}
            className="shimmer-btn px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shrink-0 shadow-[0_6px_25px_rgba(217,119,6,0.35)] transition-all relative z-10"
          >
            Inquire Adventure Slots
          </button>
        </div>

      </div>
    </div>
  );
}
