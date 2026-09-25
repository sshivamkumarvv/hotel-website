'use client';

import React from 'react';
import Image from 'next/image';
import { Coffee, Utensils, Sparkles, Soup, Leaf, Flame, HeartHandshake } from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';

export default function DiningPage() {
  const mealServices = [
    {
      title: 'Breakfast',
      desc: 'Start your day with fresh fruits and hot dishes',
      time: '08:00 AM – 10:30 AM',
      icon: Coffee,
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Lunch',
      desc: 'Hearty Indian meals with seasonal vegetables',
      time: '01:00 PM – 03:00 PM',
      icon: Utensils,
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Evening Snacks',
      desc: 'Tea/Coffee with crispy bites by the river',
      time: '05:00 PM – 06:30 PM',
      icon: Sparkles,
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Dinner',
      desc: 'Sumptuous buffet under the stars',
      time: '08:30 PM – 10:30 PM',
      icon: Soup,
      iconBg: 'bg-amber-100 text-amber-700',
    },
  ];

  const mealOptions = [
    {
      title: 'Vegetarian',
      subtitle: 'Fresh & Organic',
      icon: Leaf,
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Non-Vegetarian',
      subtitle: 'Chef Special',
      icon: Utensils,
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Jain Food',
      subtitle: 'On Request',
      icon: Leaf,
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Satvik',
      subtitle: 'Pure & Traditional',
      icon: Sparkles,
      iconBg: 'bg-amber-100 text-amber-700',
    },
  ];

  return (
    <div className="bg-[#FCFBF9] py-16 sm:py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-12 right-1/4 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 animate-float shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>FARM TO TABLE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Dining & Meals
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Wholesome, hygienic, and delicious meals prepared with local ingredients at {RESORT_CONFIG.name}.
          </p>
        </div>

        {/* Two Column Section matching Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 reveal-on-scroll">
          
          {/* Left: Cottages & Garden Dining Photo with zoom effect */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(217,119,6,0.12)] border border-amber-100 aspect-4/3 group">
              <Image
                src="/images/cottages.jpg"
                alt={`${RESORT_CONFIG.name} Cottages and Garden Dining`}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg text-xs text-gray-700 flex items-center justify-between border border-amber-100">
                <div>
                  <span className="font-bold text-gray-900 block text-sm">Riverside Garden Seating</span>
                  <span>Enjoy meals with panoramic mountain air & chirping birds</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold text-[11px] border border-amber-200">
                  Fresh Air Dining
                </span>
              </div>
            </div>
          </div>

          {/* Right: All Day Dining Service */}
          <div className="lg:col-span-6 space-y-6">
            <div className="mb-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900 tracking-tight">
                All Day Dining Service
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Buffet meals served warm in our dining deck, crafted by experienced mountain chefs.
              </p>
            </div>

            <div className="space-y-4">
              {mealServices.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={idx}
                    className="card-hover flex items-start gap-4 p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs hover:border-amber-300"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-gray-900">
                          {service.title}
                        </h3>
                        <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/50">
                          {service.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 4 Dietary Preference Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 reveal-on-scroll">
          {mealOptions.map((opt, idx) => {
            const IconComponent = opt.icon;
            return (
              <div
                key={idx}
                className="card-hover bg-white rounded-3xl p-6 text-center border border-amber-900/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div
                  className={`w-14 h-14 rounded-full ${opt.iconBg} flex items-center justify-center mx-auto mb-4 shadow-2xs`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {opt.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {opt.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Special Experiences & Chef Specials Banner */}
        <div className="bg-gradient-to-br from-[#78350F] via-[#92400E] to-[#B45309] text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden relative reveal-on-scroll">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-200">
              SPECIAL EVENINGS
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold mt-2">
              Riverside Barbecue & Bonfire Buffet
            </h3>
            <p className="text-sm sm:text-base text-amber-100/90 mt-3 leading-relaxed">
              As dusk settles over the Himalayas, gather around crackling firewood with live acoustic rhythms, sizzling kebabs, roasted corn, and warm Pahadi tea.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => openBookingModal('Dining & Bonfire Experience')}
                className="shimmer-btn px-6 py-3 rounded-full bg-white text-amber-900 font-bold text-sm shadow-lg hover:bg-amber-50 transition-colors"
              >
                Reserve Dining Experience
              </button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-x-12 translate-y-12">
            <Flame className="w-96 h-96" />
          </div>
        </div>

      </div>
    </div>
  );
}
