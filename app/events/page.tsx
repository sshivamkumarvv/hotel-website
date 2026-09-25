'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Users, Music, Sparkles, ArrowUpRight } from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';

export default function EventsPage() {
  const eventCategories = [
    {
      id: 'wedding',
      title: 'Destination Weddings',
      icon: Heart,
      iconBg: 'bg-rose-100 text-rose-500',
      image: '/images/wedding.jpg',
      alt: 'Destination wedding mandap in Rishikesh',
      description:
        'Exchange vows against the backdrop of the majestic Himalayas and the flowing river. A perfect setting for your special day.',
    },
    {
      id: 'corporate',
      title: 'Corporate Retreats',
      icon: Users,
      iconBg: 'bg-amber-100 text-amber-700',
      image: '/images/corporate.jpg',
      alt: 'Corporate retreat in Rishikesh',
      description:
        'Inspire your team with offsites that blend productivity with adventure. Conference facilities available with outdoor team building.',
    },
    {
      id: 'music',
      title: 'Music & Cultural Nights',
      icon: Music,
      iconBg: 'bg-amber-100 text-amber-700',
      image: '/images/bonfire.jpg',
      alt: 'Music and cultural bonfire night',
      description:
        'Experience local culture and vibrant evenings with live acoustic bonfire and music sessions under the starry sky.',
    },
    {
      id: 'wellness',
      title: 'Wellness & Yoga Retreats',
      icon: Sparkles,
      iconBg: 'bg-amber-100 text-amber-700',
      image: '/images/yoga.jpg',
      alt: 'Yoga and wellness retreat in Rishikesh',
      description:
        'Find inner peace with group yoga sessions on our open riverside decks, surrounded by pure nature.',
    },
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
            <span>CELEBRATE LIFE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Events & Celebrations
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            From intimate gatherings to grand celebrations, {RESORT_CONFIG.name} offers the perfect canvas for your events.
          </p>
        </div>

        {/* 2x2 Grid of Event Cards matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 reveal-on-scroll">
          {eventCategories.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="card-hover bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-[0_10px_35px_rgba(0,0,0,0.05)] flex flex-col justify-between group"
              >
                <div>
                  {/* Title & Icon Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div
                      className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-5 h-5 fill-current" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                      {item.title}
                    </h2>
                  </div>

                  {/* Event Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-16/9 mb-5 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* View Gallery Link */}
                <div className="pt-2">
                  <button
                    onClick={() => openBookingModal(`${item.title} Event Quote`)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-900 group-hover:translate-x-1.5 transition-all"
                  >
                    <span>View Gallery & Plan</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Planning an Event Callout Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-amber-100 shadow-[0_15px_40px_rgba(217,119,6,0.06)] max-w-4xl mx-auto reveal-on-scroll">
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900 tracking-tight">
            Planning an Event?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl mx-auto">
            Contact our dedicated event team to design customized arrangements for your group.
          </p>
          <div className="mt-6">
            <button
              onClick={() => openBookingModal('Event & Celebration Package')}
              className="shimmer-btn inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-[0_6px_25px_rgba(217,119,6,0.35)] transition-all active:scale-98"
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Event Amenities & Capacity Overview */}
        <div className="mt-16 bg-[#090D16] text-white rounded-3xl p-8 sm:p-12 border border-amber-950/40 relative overflow-hidden reveal-on-scroll">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left relative z-10">
            <div>
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-400 block mb-1">
                250+
              </span>
              <span className="text-sm font-semibold text-gray-200 block">Lawn & Deck Capacity</span>
              <p className="text-xs text-amber-200/70 mt-1">Open riverside green lawns for wedding receptions & celebrations.</p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-400 block mb-1">
                60+
              </span>
              <span className="text-sm font-semibold text-gray-200 block">Indoor Conference Hall</span>
              <p className="text-xs text-amber-200/70 mt-1">Projector, audio system, and climate control for business offsites.</p>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-400 block mb-1">
                100%
              </span>
              <span className="text-sm font-semibold text-gray-200 block">Custom Catering</span>
              <p className="text-xs text-amber-200/70 mt-1">Live counters, chaat stalls, multi-cuisine buffets & bar setups.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
