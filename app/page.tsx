'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Users,
  Phone,
  User,
  ArrowRight,
  Check,
  Star,
  MapPin,
  Waves,
  Flame,
  Gamepad2,
  Trophy,
  Trees,
  Wifi,
  Car,
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { openBookingModal } from '@/lib/booking';
import { RESORT_CONFIG } from '@/lib/constants';
import { submitInquiry } from '@/lib/googleSheet';
import GuestReviews from '@/components/GuestReviews';

export default function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Quick booking form state on page
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    roomType: 'All-Inclusive Stay Package (₹1,499)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Submit lead to Google Sheets
    await submitInquiry({
      name: formState.name,
      phone: formState.phone,
      checkIn: formState.checkIn,
      checkOut: formState.checkOut,
      guests: formState.guests,
      roomType: formState.roomType,
      message: formState.message,
      source: 'Homepage Book Your Stay Form',
    });

    setIsSubmitting(false);
    setSubmitted(true);

    // 2. Open WhatsApp with pre-filled booking details
    const text = `*Direct Booking Inquiry - ${RESORT_CONFIG.name}*
👤 Name: ${formState.name}
📞 Phone: ${formState.phone}
📅 Check-in: ${formState.checkIn || 'Not specified'}
📅 Check-out: ${formState.checkOut || 'Not specified'}
👥 Guests: ${formState.guests}
🏨 Room: ${formState.roomType}
💬 Note: ${formState.message || 'None'}`;

    window.open(RESORT_CONFIG.whatsappUrl(text), '_blank');
  };

  const handleResetForm = () => {
    setFormState({
      name: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '2 Guests',
      roomType: 'All-Inclusive Stay Package (₹1,499)',
      message: '',
    });
    setSubmitted(false);
  };

  const galleryImages = [
    { src: '/images/resort_night.jpg', title: 'Twilight Cottages & Lighting', category: 'resort' },
    { src: '/images/cottages.jpg', title: 'Mountain View Cottages', category: 'resort' },
    { src: '/images/pool_day.jpg', title: 'Crystal Swimming Pool', category: 'pool' },
    { src: '/images/room_premium.jpg', title: 'Premium Cottage Suite', category: 'rooms' },
    { src: '/images/wedding.jpg', title: 'Riverside Wedding Setup', category: 'events' },
    { src: '/images/bonfire.jpg', title: 'Evening Bonfire & Music', category: 'dining' },
  ];

  const accommodations = [
    {
      name: 'Premium Rooms',
      price: '₹2,499',
      unit: '/ night',
      image: '/images/room_premium.jpg',
      badge: 'POPULAR',
      features: ['Mountain & River View', 'King Bed & Luxury Linen', 'High-Speed Wi-Fi', '24/7 Power Backup'],
    },
    {
      name: 'Deluxe Rooms',
      price: '₹3,499',
      unit: '/ night',
      image: '/images/room_deluxe.jpg',
      badge: 'BEST SELLER',
      features: ['Private Balcony Deck', 'King Bed & Ambient Lights', 'Air Conditioned Comfort', 'Complimentary Breakfast'],
    },
    {
      name: 'Grand Garden Mountain Villa',
      price: '₹5,999',
      unit: '/ night',
      image: '/images/room_villa.jpg',
      badge: 'LUXURY SUITE',
      features: ['Private Mountain Deck', 'Spacious Living Lounge', 'Pool & River View', 'Accommodates 4-5 Guests'],
    },
  ];

  const facilities = [
    { title: 'Swimming Pool', desc: 'Crystal clear outdoor pool', icon: Waves },
    { title: 'Bonfire & Music', desc: 'Vibrant evening vibes', icon: Flame },
    { title: 'Indoor Games', desc: 'Recreation center', icon: Gamepad2 },
    { title: 'Outdoor Sports', desc: 'Cricket & Badminton', icon: Trophy },
    { title: 'Garden Seating', desc: 'Lush green open areas', icon: Trees },
    { title: 'Free Wi-Fi', desc: 'Stay connected', icon: Wifi },
    { title: 'Free Parking', desc: 'Secure private parking', icon: Car },
    { title: 'Power Backup', desc: 'Uninterrupted comfort', icon: Zap },
    { title: 'CCTV Security', desc: '24/7 Surveillance', icon: ShieldCheck },
  ];

  const adventures = [
    { title: 'River Rafting', sub: 'AVAILABLE NEARBY', img: '/images/rafting.jpg' },
    { title: 'Zipline', sub: 'AVAILABLE NEARBY', img: '/images/zipline.jpg' },
    { title: 'Paragliding', sub: 'AVAILABLE NEARBY', img: '/images/paragliding.jpg' },
    { title: 'Bungee Jumping', sub: 'AVAILABLE NEARBY', img: '/images/bungee.jpg' },
  ];

  return (
    <div className="bg-[#FCFBF9] text-gray-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt={`${RESORT_CONFIG.name} Rishikesh`}
            fill
            priority
            className="object-cover scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle multi-layer luxury overlay with amber touch */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/20 via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 reveal-on-scroll">
          
          {/* Floating Luxury Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 animate-float shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>WELCOME TO PARADISE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            Luxury Amidst <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Nature</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-xs">
            Nestled in the foothills of the Himalayas, experience tranquility and luxury along the pristine river stream in Tapovan, Laxman Jhula Road, Rishikesh.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openBookingModal('Direct Stay Inquiry')}
              className="shimmer-btn w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-base shadow-[0_10px_30px_rgba(217,119,6,0.45)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.55)] transition-all active:scale-95 flex items-center justify-center gap-2.5"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/rooms"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/30 transition-all text-center hover:scale-105"
            >
              Explore Rooms
            </Link>
          </div>

          {/* Quick Floating Highlights */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white text-left">
            <div className="bg-black/35 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
              <span className="text-amber-400 text-xs font-bold block uppercase tracking-wider">Location</span>
              <span className="text-sm font-semibold text-gray-100">Tapovan, Rishikesh</span>
            </div>
            <div className="bg-black/35 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
              <span className="text-amber-400 text-xs font-bold block uppercase tracking-wider">Packages From</span>
              <span className="text-sm font-semibold text-gray-100">₹1,499 / person</span>
            </div>
            <div className="bg-black/35 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
              <span className="text-amber-400 text-xs font-bold block uppercase tracking-wider">Dining</span>
              <span className="text-sm font-semibold text-gray-100">All 4 Buffet Meals</span>
            </div>
            <div className="bg-black/35 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
              <span className="text-amber-400 text-xs font-bold block uppercase tracking-wider">Vibe</span>
              <span className="text-sm font-semibold text-gray-100">Pool & Bonfire Music</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SECTION: A SANCTUARY OF PEACE & LUXURY */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Cottages Photo with hover zoom */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(217,119,6,0.12)] border border-amber-900/10 aspect-4/3 group">
              <Image
                src="/images/resort_night.jpg"
                alt={`${RESORT_CONFIG.name} Sanctuary`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                  Tapovan, Rishikesh
                </span>
                <p className="text-lg font-serif font-bold">Unwind by the Himalayan River Stream</p>
              </div>
            </div>
          </div>

          {/* Right: Story & Stats */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>ABOUT OUR RESORT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 tracking-tight leading-tight">
                A Sanctuary of Peace & Luxury
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {RESORT_CONFIG.name} is a tranquil luxury mountain oasis located in Tapovan, Laxman Jhula Road, Rishikesh. Surrounded by lush Himalayan foothills and bordering a serene river stream, we offer an authentic Himalayan sanctuary where crisp mountain air meets refined hospitality.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Whether you are taking a dip in our mountain swimming pool, enjoying mouthwatering farm-fresh buffets under the starry sky, or gathering around our crackling evening bonfire with acoustic tunes, every moment is crafted to rejuvenate your soul.
            </p>

            {/* Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="card-hover p-4 rounded-2xl bg-white border border-amber-100 shadow-2xs text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 block">
                  100%
                </span>
                <span className="text-xs text-gray-500 font-medium">Guest Satisfaction</span>
              </div>
              <div className="card-hover p-4 rounded-2xl bg-white border border-amber-100 shadow-2xs text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 block">
                  24hrs
                </span>
                <span className="text-xs text-gray-500 font-medium">Room Service</span>
              </div>
              <div className="card-hover p-4 rounded-2xl bg-white border border-amber-100 shadow-2xs text-center col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 block">
                  4.9★
                </span>
                <span className="text-xs text-gray-500 font-medium">Verified Reviews</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors group"
              >
                <span>Read Full Story About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION: GLIMPSE OF RESORT */}
      <section className="py-16 sm:py-20 bg-white border-y border-amber-900/10 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block">
              PHOTO GALLERY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 tracking-tight mt-3">
              Glimpse of Resort
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              A visual journey through our slice of Himalayan paradise.
            </p>
          </div>

          {/* 6 Photo Grid with Zoom & Lightbox */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(img.src)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-4/3 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-xs sm:text-sm font-semibold">{img.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-amber-700 transition-colors"
            >
              <span>Explore all facilities & adventures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECTION: LUXURIOUS ACCOMMODATIONS */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>COMFORT & ELEGANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 tracking-tight">
            Luxurious Accommodations
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Each cottage offers private serene views of the surrounding mountains and river.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accommodations.map((room, idx) => (
            <div
              key={idx}
              className="card-hover bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:border-amber-300 flex flex-col justify-between group"
            >
              <div>
                {/* Room Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[11px] font-bold text-amber-900 px-3 py-1 rounded-full shadow-xs border border-amber-200">
                    {room.badge}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-xl font-serif font-bold text-gray-900">{room.name}</h3>
                  </div>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-xs text-gray-500">Starts at</span>
                    <span className="text-2xl font-extrabold text-amber-700">{room.price}</span>
                    <span className="text-xs text-gray-500">{room.unit}</span>
                  </div>

                  {/* Amenities List */}
                  <ul className="space-y-2.5 pt-3 border-t border-amber-100/60">
                    {room.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openBookingModal(room.name)}
                  className="w-full py-3 rounded-xl bg-gray-900 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-amber-800/30 text-amber-900 hover:bg-amber-50 font-semibold text-xs transition-colors"
          >
            <span>View All Room Types & Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. SECTION: FACILITIES & ADVENTURES */}
      <section className="py-20 bg-white border-t border-amber-900/10 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block">
              RESORT FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 tracking-tight mt-3">
              Facilities & Adventures
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Curated experiences to make your stay memorable.
            </p>
          </div>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {facilities.map((fac, idx) => {
              const IconComp = fac.icon;
              return (
                <div
                  key={idx}
                  className="card-hover bg-[#FCFBF9] rounded-3xl p-6 text-center border border-amber-900/10 shadow-xs hover:border-amber-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{fac.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{fac.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Adventure Activities Subsection */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-7 bg-amber-600 rounded-full" />
              <h3 className="text-2xl font-serif font-bold text-gray-900">Adventure Activities</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {adventures.map((adv, idx) => (
                <div
                  key={idx}
                  onClick={() => openBookingModal(`${adv.title} Adventure Inquiry`)}
                  className="group relative rounded-3xl overflow-hidden shadow-md aspect-4/5 cursor-pointer bg-gray-900 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(217,119,6,0.25)]"
                >
                  <Image
                    src={adv.img}
                    alt={adv.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h4 className="text-lg font-bold group-hover:text-amber-300 transition-colors">
                      {adv.title}
                    </h4>
                    <span className="text-[10px] font-bold tracking-widest text-amber-200/90 uppercase block">
                      {adv.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. SECTION: LOCATION & ACCESSIBILITY */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block">
            FIND US
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 tracking-tight mt-3">
            Location & Accessibility
          </h2>
          <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>{RESORT_CONFIG.addressShort}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Key Distances Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 mb-4 text-amber-700 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Key Distances</span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 text-amber-950 font-semibold border border-amber-100">
                  <span>River Ganga Bank & Ghat</span>
                  <span className="text-xs bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">200 Meters</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700">
                  <span>Laxman Jhula</span>
                  <span className="text-xs font-semibold text-gray-500">500 Meters</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700">
                  <span>Ram Jhula & Swarg Ashram</span>
                  <span className="text-xs font-semibold text-gray-500">1.8 KM</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700">
                  <span>Triveni Ghat (Maha Aarti)</span>
                  <span className="text-xs font-semibold text-gray-500">4.5 KM</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700">
                  <span>Rishikesh Railway Station</span>
                  <span className="text-xs font-semibold text-gray-500">5.5 KM</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-gray-700">
                  <span>Dehradun Airport (Jolly Grant)</span>
                  <span className="text-xs font-semibold text-gray-500">21 KM</span>
                </div>
              </div>
            </div>

            {/* Travel Guidance Box */}
            <div className="bg-[#FFFBEB] border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
              <div className="w-1.5 self-stretch bg-amber-500 rounded-full shrink-0" />
              <div className="text-xs text-amber-950 leading-relaxed">
                <p className="font-bold mb-1">Travel Tip:</p>
                <p>
                  Conveniently reached via Laxman Jhula Road in Tapovan. Located right in the tourism and cafe hub of Rishikesh with secure on-site parking for personal cars & tempo travellers.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-3 border border-amber-900/10 shadow-[0_10px_35px_rgba(0,0,0,0.05)] overflow-hidden">
              <iframe
                title={`${RESORT_CONFIG.name} Map Location`}
                src={RESORT_CONFIG.mapEmbedUrl}
                width="100%"
                height="420"
                style={{ border: 0, borderRadius: '1.25rem' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6.5 SECTION: VERIFIED GOOGLE GUEST REVIEWS */}
      <GuestReviews />

      {/* 7. SECTION: BOOK YOUR STAY */}
      <section className="pt-10 sm:pt-14 pb-20 sm:pb-24 bg-white border-t border-amber-900/10" id="booking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
              RESERVE YOUR DATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-gray-900 tracking-tight">
              Book Your Stay
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Direct WhatsApp Booking - Fastest response & Best Price Guarantee!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            
            {/* Left Form Card */}
            <div className="lg:col-span-7 bg-[#FCFBF9] rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-amber-700 font-bold text-sm">
                <MessageCircle className="w-4 h-4 fill-amber-600 stroke-none" />
                <span>Instant Inquiry via WhatsApp & Google Sheets</span>
              </div>

              {submitted ? (
                <div className="py-10 px-4 text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce duration-1000">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900">
                      Thank You, {formState.name || 'Guest'}!
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
                      Your booking inquiry has been recorded into our reservation spreadsheet and forwarded to our booking desk.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                    <a
                      href={RESORT_CONFIG.whatsappUrl(
                        `*Direct Booking Inquiry - ${RESORT_CONFIG.name}*\n👤 Name: ${formState.name}\n📞 Phone: ${formState.phone}\n📅 Check-in: ${formState.checkIn || 'Not specified'}\n📅 Check-out: ${formState.checkOut || 'Not specified'}\n👥 Guests: ${formState.guests}\n🏨 Room: ${formState.roomType}\n💬 Note: ${formState.message || 'None'}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shimmer-btn w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                      <span>Open WhatsApp Chat</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Fill Form Again</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Aman Verma"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={formState.checkIn}
                        onChange={(e) => setFormState({ ...formState, checkIn: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={formState.checkOut}
                        onChange={(e) => setFormState({ ...formState, checkOut: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Guests
                      </label>
                      <select
                        value={formState.guests}
                        onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>1-2 Guests</option>
                        <option>3-4 Guests</option>
                        <option>5-8 Guests</option>
                        <option>8+ Guests (Group/Event)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Room Category
                      </label>
                      <select
                        value={formState.roomType}
                        onChange={(e) => setFormState({ ...formState, roomType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>All-Inclusive Stay Package (₹1,499)</option>
                        <option>Premium Room (₹2,499)</option>
                        <option>Deluxe Room (₹3,499)</option>
                        <option>Grand Mountain Villa (₹5,999)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Special Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Require river rafting slots and extra bed"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="shimmer-btn w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                          <span>Send Inquiry on WhatsApp</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-gray-400 mt-2">
                      Direct confirmation from {RESORT_CONFIG.name} management.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Contact Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-[#78350F] via-[#92400E] to-[#B45309] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />
                <span className="text-xs uppercase font-bold tracking-widest text-amber-200">
                  INSTANT ASSISTANCE
                </span>
                <h3 className="text-2xl font-serif font-bold mt-1 mb-3">Contact Directly</h3>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed mb-6">
                  Call our 24/7 reservation desk for instant availability check and group quotation.
                </p>

                <a
                  href={`tel:${RESORT_CONFIG.phone}`}
                  className="shimmer-btn w-full py-3.5 rounded-xl bg-white text-amber-900 font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-amber-50 transition-colors"
                >
                  <Phone className="w-4 h-4 fill-amber-900 stroke-none" />
                  <span>Call {RESORT_CONFIG.phone}</span>
                </a>

                <div className="mt-6 pt-6 border-t border-amber-600/60 space-y-2 text-xs text-amber-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Reservation Team: Open 24 Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-300" />
                    <span>Immediate WhatsApp Quote with Photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-300" />
                    <span>Zero Booking Platform Fees</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[70vh]">
            <Image
              src={selectedPhoto}
              alt="Resort gallery enlarged preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

    </div>
  );
}
