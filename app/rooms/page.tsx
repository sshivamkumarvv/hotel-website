'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Sparkles } from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';

export default function RoomsPage() {
  const [filter, setFilter] = useState('all');

  const rooms = [
    {
      id: 'deluxe',
      type: 'deluxe',
      title: 'Deluxe Cottage Room',
      tagline: 'Cozy retreat with forest & hill views',
      price: '₹2,999',
      unit: '/ night',
      capacity: '2 Adults + 1 Child',
      bed: 'King Bed / Twin Beds',
      view: 'Himalayan Forest View',
      image: '/images/room_deluxe.jpg',
      amenities: [
        'Air Conditioning & Heating',
        'Private Balcony Sitout',
        'High-Speed Wi-Fi',
        'Hot & Cold Running Water 24/7',
        'Electric Kettle with Tea/Coffee kit',
        'Complimentary Buffet Breakfast',
      ],
    },
    {
      id: 'premium',
      type: 'premium',
      title: 'Premium River View Cottage',
      tagline: 'Direct views of the flowing mountain stream',
      price: '₹3,999',
      unit: '/ night',
      capacity: '2 Adults + 1 Extra Guest',
      bed: 'Luxury King Size Bed',
      view: 'Pristine Stream & Mountain View',
      image: '/images/room_premium.jpg',
      amenities: [
        'Large Glass Windows with River Panoramas',
        'Private Riverside Wooden Deck',
        'Premium Spring Mattress & Soft Linens',
        'Smart Flat TV with Streaming Apps',
        'Complimentary Breakfast & Evening Hi-Tea',
        '24/7 Room Service & Housekeeping',
      ],
    },
    {
      id: 'villa',
      type: 'villa',
      title: 'Grand Mountain Villa',
      tagline: 'Private spacious sanctuary with direct lawn access',
      price: '₹5,999',
      unit: '/ night',
      capacity: 'Up to 4 Adults',
      bed: '1 King Bed + 1 Queen Bed / Daybed',
      view: 'Panoramic Pool & Mountain View',
      image: '/images/room_villa.jpg',
      amenities: [
        'Separate Living Area & Lounge',
        'Private Garden Patio with Sun Loungers',
        'En-Suite Luxury Bathroom with Rain Shower',
        'Mini Fridge & Snack Bar',
        'All 4 Meals Buffet Inclusions available',
        'Dedicated Resort Butler on Call',
      ],
    },
    {
      id: 'quad',
      type: 'quad',
      title: 'Family & Group Quad Cottage',
      tagline: 'Perfect for families and group of friends',
      price: '₹4,999',
      unit: '/ night',
      capacity: '4 - 5 Adults',
      bed: '2 Queen Beds + Extra Mattress',
      view: 'Valley & Lawn View',
      image: '/images/room_quad.jpg',
      amenities: [
        'Spacious room area with ample luggage space',
        'Two Queen Sized Beds',
        'High-Speed Wi-Fi & Work Desk',
        '24/7 Power Backup & Hot Showers',
        'Swimming Pool & Bonfire Access',
        'Ideal for Rafting & Adventure Groups',
      ],
    },
  ];

  const filteredRooms = filter === 'all' ? rooms : rooms.filter((r) => r.type === filter);

  return (
    <div className="bg-[#FCFBF9] py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 animate-float shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>ACCOMMODATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Rooms & Cottages
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Handcrafted wooden and stone cottages that blend rustic charm with modern luxury at {RESORT_CONFIG.name}.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 reveal-on-scroll">
          {[
            { id: 'all', label: 'All Cottages' },
            { id: 'deluxe', label: 'Deluxe' },
            { id: 'premium', label: 'Premium River View' },
            { id: 'villa', label: 'Grand Villa' },
            { id: 'quad', label: 'Family Quad' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-amber-50 border border-amber-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Room Listings */}
        <div className="space-y-12 reveal-on-scroll">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="card-hover bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Room Image */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-gray-100">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                  {room.view}
                </div>
              </div>

              {/* Room Content */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900">
                      {room.title}
                    </h2>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-amber-700">
                        {room.price}
                      </span>
                      <span className="text-xs text-gray-500">{room.unit}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 mb-6 font-medium">
                    {room.tagline} • Capacity: {room.capacity} • {room.bed}
                  </p>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
                    Room Amenities & Inclusions:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {room.amenities.map((amenity, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-amber-100/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-400">
                    Free Cancellation up to 48 hrs prior
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => openBookingModal(`Book ${room.title}`)}
                      className="shimmer-btn w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                    >
                      Book This Room
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
