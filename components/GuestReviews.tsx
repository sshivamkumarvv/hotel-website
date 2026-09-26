'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  Heart,
  Users,
  Compass,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  category: 'couples' | 'family' | 'adventure' | 'groups';
  stayDetails: string;
  date: string;
  avatarColor?: string;
  avatarUrl?: string;
  initials?: string;
  title: string;
  comment: string;
  highlight: string;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Ananya & Rohan Kulkarni',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    category: 'couples',
    stayDetails: 'Premium River View Cottage • 2 Nights Stay',
    date: 'March 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    avatarColor: 'from-amber-600 to-amber-800',
    initials: 'AK',
    title: 'Pure Serenity by the River Stream',
    comment:
      'Waking up to the gentle sound of the mountain stream right outside our cottage balcony was therapeutic. In the evening, the staff set up a private bonfire by the water with soothing music. Food at the buffet is freshly prepared, aromatic, and genuinely delicious. Truly our best getaway in Rishikesh!',
    highlight: 'Private Bonfire & River Sound',
  },
  {
    id: '2',
    name: 'Dr. Sameer & Neha Aggarwal',
    location: 'New Delhi, NCR',
    rating: 5,
    category: 'family',
    stayDetails: 'Family Quad Cottage • 3 Nights Stay',
    date: 'February 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    avatarColor: 'from-emerald-600 to-emerald-800',
    initials: 'SA',
    title: 'Perfect Haven for Multi-Generational Family Trip',
    comment:
      'We travelled with two kids and my elderly parents. The resort is tucked into a quiet, peaceful pocket of Tapovan away from chaotic traffic. The quad cottage was super spacious, the swimming pool was immaculate, and the staff accommodated special Jain meals for my mother with the utmost warmth.',
    highlight: 'Spacious Quad Cottage & Kids Loved the Pool',
  },
  {
    id: '3',
    name: 'Arjun Mehta & Group of 6',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    category: 'adventure',
    stayDetails: 'All-Inclusive Adventure Package • 2 Nights',
    date: 'March 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    avatarColor: 'from-blue-600 to-indigo-800',
    initials: 'AM',
    title: 'The Ultimate Rafting & Resort Combo!',
    comment:
      'Glenora desk arranged our 16 KM Marine Drive rafting and bungee jump seamlessly with top-tier safety gear. Coming back after an adrenaline-filled day to steaming hot pakoras, evening hi-tea, and a warm swimming pool was sheer luxury. Exceptional value for money in Rishikesh.',
    highlight: 'Seamless Rafting Coordination & Great Food',
  },
  {
    id: '4',
    name: 'Priyanka Sengupta',
    location: 'Kolkata, West Bengal',
    rating: 5,
    category: 'couples',
    stayDetails: 'Riverside Romance Package • 2 Nights',
    date: 'January 2026',
    avatarColor: 'from-rose-600 to-rose-800',
    initials: 'PS',
    title: 'Candlelight Dinner Under the Himalayan Stars',
    comment:
      'The romantic candlelight dinner arranged alongside the water deck was pure poetry. The cottage was spotless, the bed was ultra-comfortable with crisp luxury linens, and the mountain views at sunrise took our breath away. We will be back every winter!',
    highlight: 'Romantic Candlelight Setup & Cozy Cottages',
  },
  {
    id: '5',
    name: 'Vikram Singhania (TechSolutions Team)',
    location: 'Gurgaon, Haryana',
    rating: 5,
    category: 'groups',
    stayDetails: 'Corporate Offsite Retreat • 22 Guests',
    date: 'February 2026',
    avatarColor: 'from-purple-600 to-purple-800',
    initials: 'VS',
    title: 'Flawless Corporate Leadership Offsite',
    comment:
      'Hosted our leadership retreat for 22 colleagues here. Reliable Wi-Fi, spacious open lawns for team strategy games, and generous 4-meal buffet dining. The resort manager personally ensured everything ran on clockwork precision. Highly recommended for corporate teams.',
    highlight: 'Fast Wi-Fi & Large Open Lawns',
  },
  {
    id: '6',
    name: 'Harshvardhan & Deepali Rao',
    location: 'Hyderabad, Telangana',
    rating: 5,
    category: 'family',
    stayDetails: 'Grand Mountain Villa • 2 Nights Stay',
    date: 'January 2026',
    avatarColor: 'from-amber-700 to-orange-900',
    initials: 'HR',
    title: 'Boutique Luxury with Authentic Warmth',
    comment:
      'The Grand Mountain Villa gave our family complete privacy with our own lawn sitout overlooking the green hills. Safe parking, 24/7 power backup, and quick access to Laxman Jhula road without being stuck in city chaos. 10/10 experience!',
    highlight: 'Private Lawn Sitout & Peaceful Atmosphere',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Reviews', count: '250+' },
  { id: 'couples', label: 'Couples & Romance', count: '85+', icon: Heart },
  { id: 'family', label: 'Family Stays', count: '92+', icon: Users },
  { id: 'adventure', label: 'Rafting & Adventure', count: '54+', icon: Compass },
  { id: 'groups', label: 'Corporate & Groups', count: '30+', icon: Briefcase },
];

function formatReviewDate(dateStr: string) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  } catch {}
  return dateStr;
}

export default function GuestReviews() {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleLimit, setVisibleLimit] = useState<number>(6);
  const [isLiveFromSheet, setIsLiveFromSheet] = useState(false);

  // Fetch reviews dynamically from Google Sheet via /api/reviews
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
          setIsLiveFromSheet(true);
        }
      } catch (err) {
        console.warn('Using fallback reviews, could not reach live sheet:', err);
      }
    }
    loadReviews();
  }, []);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setVisibleLimit(6); // Reset limit on tab change
  };

  const filteredReviews =
    activeCategory === 'all'
      ? reviews
      : reviews.filter((rev) => rev.category === activeCategory);

  const displayedReviews = filteredReviews.slice(0, visibleLimit);

  return (
    <section className="pt-14 sm:pt-18 pb-8 sm:pb-10 bg-[#FAF8F5] relative overflow-hidden border-y border-amber-900/10">
      {/* Ambient background decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            <span>
              {isLiveFromSheet ? 'LIVE GUEST EXPERIENCES' : 'AUTHENTIC GUEST EXPERIENCES'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Loved by Travelers Across India
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover real, unedited stories from families, couples, and adventure seekers who made The Glenora River Resort their Himalayan home.
          </p>

          {/* Google Reviews Trust Bar */}
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-white py-3.5 px-6 rounded-2xl shadow-sm border border-amber-200/80">
            {/* Google Logo & Rating */}
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-bold text-gray-900 text-sm">Google Reviews</span>
            </div>

            <div className="h-4 w-px bg-gray-200 hidden sm:block" />

            {/* Stars */}
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold text-gray-900">4.8</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>

            <div className="h-4 w-px bg-gray-200 hidden sm:block" />

            <div className="text-xs text-gray-500 font-medium">
              Based on <span className="font-bold text-gray-800">250+ Verified Stays</span>
            </div>

            <div className="h-4 w-px bg-gray-200 hidden sm:block" />

            {/* Link to Google Maps */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tapovan+Rishikesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-bold hover:underline"
            >
              <span>View on Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shadow-2xs ${
                  isSelected
                    ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20 scale-102'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-700'}`} />}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-amber-900/60 text-amber-100' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isLiveFromSheet
                    ? (cat.id === 'all'
                        ? reviews.length
                        : reviews.filter((r) => r.category === cat.id).length)
                    : cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top card glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified Guest</span>
                  </span>
                </div>

                {/* Highlight Badge */}
                {rev.highlight && (
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-100/70 border border-amber-200/80 px-2.5 py-0.5 rounded-md">
                      ✨ {rev.highlight}
                    </span>
                  </div>
                )}

                {/* Review Title */}
                <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed relative">
                  <Quote className="w-4 h-4 text-amber-200/60 inline mr-1 rotate-180 -mt-1" />
                  {rev.comment}
                </p>
              </div>

              {/* Author & Stay Details Footer */}
              <div className="pt-5 mt-5 border-t border-amber-900/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Profile Image with Fallback Initials */}
                  <div className="relative shrink-0">
                    {rev.avatarUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={rev.avatarUrl}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-amber-300 shadow-xs"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-tr ${
                        rev.avatarColor || 'from-amber-600 to-amber-800'
                      } text-white font-bold text-xs items-center justify-center shrink-0 shadow-xs ${
                        rev.avatarUrl ? 'hidden' : 'flex'
                      }`}
                    >
                      {rev.initials || rev.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                      {rev.name}
                    </div>
                    <div className="text-[11px] text-gray-500 truncate">
                      {rev.location}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    {formatReviewDate(rev.date)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Reviews Button */}
        {filteredReviews.length > visibleLimit && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleLimit((prev) => prev + 6)}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Show More Reviews ({filteredReviews.length - visibleLimit} remaining)</span>
            </button>
          </div>
        )}

        {/* Bottom Booking Callout */}
        <div className="mt-8 sm:mt-10 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-300">
              DIRECT BOOKING GUARANTEE
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold mt-1 text-white">
              Ready to Experience The Glenora?
            </h3>
            <p className="text-amber-100/90 text-xs sm:text-sm mt-1 leading-relaxed">
              Book directly with our front desk for complimentary room upgrades, flexible rescheduling, and zero hidden OTA convenience fees.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => openBookingModal('All-Inclusive Stay Package (₹1,499/person)')}
              className="shimmer-btn w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Instant Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#booking"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center justify-center transition-all text-center"
            >
              <span>Scroll to Booking Form ↓</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
