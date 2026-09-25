'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Trees, Waves, Sparkles } from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="bg-[#FCFBF9] py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/3 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 animate-float shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>OUR STORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            About {RESORT_CONFIG.namePart1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Crafted with passion to bring you harmony, comfort, and the raw beauty of the Himalayas.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 reveal-on-scroll">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 border border-amber-900/10 group">
            <Image
              src="/images/cottages.jpg"
              alt={`${RESORT_CONFIG.name} Valley View`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-snug">
              A Riverside Paradise in Tapovan, Rishikesh
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Founded with the vision to create a peaceful sanctuary along the sacred Himalayan river stream, {RESORT_CONFIG.name} is nestled on Laxman Jhula Road in Tapovan, Rishikesh.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Here, mornings begin with the therapeutic melodies of flowing water and chirping Himalayan birds. Afternoons are spent swimming in our crystal-clear mountain pool or embarking on thrilling white-water rafting, while evenings come alive with warm bonfires, acoustic guitar sessions, and stargazing under pollution-free skies.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openBookingModal('About Us Inquiry')}
                className="shimmer-btn px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-md transition-colors"
              >
                Plan Your Getaway
              </button>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 reveal-on-scroll">
          <div className="card-hover bg-white rounded-3xl p-8 border border-amber-900/10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Eco-Conscious Living</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Constructed using natural stone and certified timber. We practice zero single-use plastic, rainwater recharge, and farm-to-table sourcing.
            </p>
          </div>

          <div className="card-hover bg-white rounded-3xl p-8 border border-amber-900/10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Pahadi Hospitality</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Our local Garhwali team treats every traveler like family. Experience the legendary warmth, genuine care, and flavors of Uttarakhand.
            </p>
          </div>

          <div className="card-hover bg-white rounded-3xl p-8 border border-amber-900/10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Direct River Stream</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              No long treks or steep hikes needed. Walk just 50 steps from your cottage directly onto the shallow pebble riverbed for a rejuvenating dip.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
