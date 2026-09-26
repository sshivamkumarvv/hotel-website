'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Calendar,
  Users,
  Phone,
  User,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Loader2,
  RotateCcw,
  Moon,
  ShieldCheck,
  BedDouble,
  ChevronDown,
  Calculator,
  Tag,
} from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';
import { submitInquiry } from '@/lib/googleSheet';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

const GUEST_OPTIONS = [
  { id: '1-2 Guests', label: '1-2 Guests', sub: 'Couples & Solo' },
  { id: '3-4 Guests', label: '3-4 Guests', sub: 'Small Family' },
  { id: '5-8 Guests', label: '5-8 Guests', sub: 'Friends Group' },
  { id: '8+ Guests', label: '8+ Guests', sub: 'Celebrations' },
];

export default function BookingModal({
  isOpen,
  onClose,
  defaultPackage = 'All-Inclusive Stay Package (₹1,499/person)',
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    roomType: defaultPackage,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Today's date formatted as YYYY-MM-DD for min date constraints
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  // Update selected room/package when defaultPackage prop changes or modal opens
  useEffect(() => {
    if (defaultPackage) {
      setFormData((prev) => ({
        ...prev,
        roomType: defaultPackage,
      }));
    }
  }, [defaultPackage, isOpen]);

  // Lock body scroll on mobile and desktop when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Calculate number of nights between checkIn and checkOut
  const nights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [formData.checkIn, formData.checkOut]);

  // Live Price Calculator
  const priceEstimate = useMemo(() => {
    const pkg = formData.roomType || '';
    let unitRate = 1499;
    let type: 'per_person' | 'per_room' | 'custom' = 'per_person';
    let rateLabel = '₹1,499 / person';
    let perk = 'Includes all 4 buffet meals & evening bonfire';

    if (pkg.includes('All-Inclusive')) {
      unitRate = 1499;
      type = 'per_person';
      rateLabel = '₹1,499 / person / night';
      perk = 'Includes 4-meal buffet (Breakfast, Lunch, Hi-Tea, Dinner) & Bonfire';
    } else if (pkg.includes('Romance')) {
      unitRate = 3499;
      type = 'per_room';
      rateLabel = '₹3,499 / couple / night';
      perk = 'Includes riverside candlelight dinner & flower arrangement';
    } else if (pkg.includes('Adventure')) {
      unitRate = 2199;
      type = 'per_person';
      rateLabel = '₹2,199 / person / night';
      perk = 'Includes 16KM river rafting session & 3-meal buffet';
    } else if (pkg.includes('Premium')) {
      unitRate = 3999;
      type = 'per_room';
      rateLabel = '₹3,999 / room / night';
      perk = 'Includes private river-view deck & buffet breakfast';
    } else if (pkg.includes('Deluxe')) {
      unitRate = 2999;
      type = 'per_room';
      rateLabel = '₹2,999 / room / night';
      perk = 'Includes mountain-view balcony & buffet breakfast';
    } else if (pkg.includes('Villa')) {
      unitRate = 5999;
      type = 'per_room';
      rateLabel = '₹5,999 / villa / night';
      perk = 'Accommodates up to 4 adults with private garden patio';
    } else if (pkg.includes('Quad')) {
      unitRate = 4999;
      type = 'per_room';
      rateLabel = '₹4,999 / cottage / night';
      perk = 'Accommodates 4-5 adults with pool access';
    } else if (pkg.includes('Dining')) {
      unitRate = 899;
      type = 'per_person';
      rateLabel = '₹899 / person';
      perk = 'Riverside evening high-tea & buffet dinner spread';
    } else if (pkg.includes('Wedding') || pkg.includes('Corporate') || pkg.includes('Event')) {
      type = 'custom';
      rateLabel = 'Bespoke Event Quote';
      perk = 'Dedicated event coordinator & custom catering package';
    }

    // Number of guests
    let guestCount = 2;
    if (formData.guests.startsWith('1-2')) guestCount = 2;
    else if (formData.guests.startsWith('3-4')) guestCount = 3;
    else if (formData.guests.startsWith('5-8')) guestCount = 6;
    else if (formData.guests.startsWith('8+')) guestCount = 10;

    const stayNights = Math.max(nights, 1);

    if (type === 'custom') {
      return {
        isCustom: true,
        rateLabel,
        perk,
        formattedTotal: 'Custom Quote via WhatsApp',
        formula: 'Group & event pricing with bespoke menus',
      };
    }

    const subtotal = type === 'per_person' ? unitRate * guestCount * stayNights : unitRate * stayNights;
    const discount = Math.round(subtotal * 0.05); // 5% direct booking benefit
    const total = subtotal - discount;

    const formula =
      type === 'per_person'
        ? `₹${unitRate.toLocaleString('en-IN')} × ${guestCount} Guests × ${stayNights} ${stayNights === 1 ? 'Night' : 'Nights'}`
        : `₹${unitRate.toLocaleString('en-IN')} × ${stayNights} ${stayNights === 1 ? 'Night' : 'Nights'}`;

    return {
      isCustom: false,
      subtotal,
      discount,
      total,
      formula,
      perk,
      rateLabel,
      formattedTotal: `₹${total.toLocaleString('en-IN')}`,
      formattedSubtotal: `₹${subtotal.toLocaleString('en-IN')}`,
    };
  }, [formData.roomType, formData.guests, nights]);

  // Smart check-in handler: auto-advance checkout if needed
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    let nextCheckOut = formData.checkOut;

    if (newCheckIn) {
      const inDate = new Date(newCheckIn);
      const outDate = formData.checkOut ? new Date(formData.checkOut) : null;

      // If checkout is empty or before checkin, automatically suggest next day
      if (!outDate || outDate <= inDate) {
        const nextDay = new Date(inDate);
        nextDay.setDate(nextDay.getDate() + 1);
        nextCheckOut = nextDay.toISOString().split('T')[0];
      }
    }

    setFormData((prev) => ({
      ...prev,
      checkIn: newCheckIn,
      checkOut: nextCheckOut,
    }));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const quoteStr = priceEstimate.isCustom
      ? 'Special Event Quotation'
      : `${priceEstimate.formattedTotal} (Direct Rate)`;

    // Save inquiry to Google Sheet
    await submitInquiry({
      name: formData.name,
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      roomType: `${formData.roomType} [Est: ${quoteStr}]`,
      message: formData.message,
      source: 'Popup Booking Modal',
    });

    setIsSubmitting(false);
    setSubmitted(true);

    const nightStr = nights > 0 ? ` (${nights} ${nights === 1 ? 'Night' : 'Nights'})` : '';
    const text = `*New Stay Inquiry - ${RESORT_CONFIG.name}*
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📅 Check-in: ${formData.checkIn || 'To be decided'}
📅 Check-out: ${formData.checkOut || 'To be decided'}${nightStr}
👥 Guests: ${formData.guests}
🏨 Category/Package: ${formData.roomType}
💰 Estimated Total: ${quoteStr}
💬 Note: ${formData.message || 'None'}`;

    const waUrl = RESORT_CONFIG.whatsappUrl(text);
    window.open(waUrl, '_blank');
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '2 Guests',
      roomType: defaultPackage || 'All-Inclusive Stay Package (₹1,499/person)',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md p-0 sm:p-4 animate-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[90vh] bg-[#FCFBF9] rounded-t-[28px] sm:rounded-3xl shadow-2xl border-t sm:border border-amber-900/15 flex flex-col overflow-hidden animate-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull / Swipe Indicator */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden shrink-0">
          <div className="w-12 h-1.5 bg-gray-300/80 rounded-full" />
        </div>

        {/* Ambient Warm Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-5 sm:px-7 pt-3 sm:pt-6 pb-3 border-b border-amber-900/10 shrink-0 bg-[#FCFBF9]/90 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/70 border border-amber-200/80 text-[11px] font-bold tracking-wider uppercase text-amber-800 mb-1">
                <Sparkles className="w-3 h-3 fill-amber-600 text-amber-600" />
                <span>Instant Stay Quote</span>
              </div>
              <h2
                id="booking-modal-title"
                className="text-xl sm:text-2xl font-serif font-bold text-gray-900 leading-snug"
              >
                Reserve Your Stay
              </h2>
              <p className="text-xs text-gray-600 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Direct booking discount applies automatically.
              </p>
            </div>

            {/* Accessible Touch Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-amber-100/70 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto overscroll-contain px-5 sm:px-7 py-4 sm:py-5 flex-1">
          {submitted ? (
            <div className="py-6 sm:py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-600/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Inquiry Sent!</h3>
                <p className="text-gray-600 text-xs sm:text-sm max-w-sm mx-auto mt-1.5 leading-relaxed">
                  Your reservation request for <span className="font-semibold text-gray-800">{formData.name}</span> has been forwarded to our desk on WhatsApp.
                </p>
              </div>

              {/* Inquiry Summary Card */}
              <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3.5 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between text-gray-600">
                  <span>Selected Package:</span>
                  <span className="font-medium text-gray-900 truncate max-w-[200px]">{formData.roomType}</span>
                </div>
                {formData.checkIn && (
                  <div className="flex justify-between text-gray-600">
                    <span>Dates:</span>
                    <span className="font-medium text-gray-900">
                      {formData.checkIn} to {formData.checkOut || 'Open'} {nights > 0 && `(${nights}N)`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Group:</span>
                  <span className="font-medium text-gray-900">{formData.guests}</span>
                </div>
                <div className="flex justify-between text-gray-600 pt-1 border-t border-amber-200/60">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-amber-900">
                    {priceEstimate.isCustom ? 'Custom Group Quote' : `${priceEstimate.formattedTotal} (Direct Rate)`}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-300 transition-all shadow-xs active:scale-98"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Inquiry</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
                >
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category / Package Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Selected Accommodation or Package
                </label>
                <div className="relative">
                  <BedDouble className="w-4 h-4 text-amber-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-800 shadow-2xs appearance-none transition-all"
                  >
                    {/* If a custom package was passed from a button and isn't standard, list it first */}
                    {defaultPackage &&
                      ![
                        'All-Inclusive Stay Package (₹1,499/person)',
                        'Premium Room (River View)',
                        'Deluxe Room (Mountain View)',
                        'Grand Mountain Villa',
                        'Quad Family Cottage',
                        'Destination Wedding Event',
                        'Corporate Offsite Event',
                      ].includes(defaultPackage) && (
                        <option value={defaultPackage}>{defaultPackage}</option>
                      )}

                    <optgroup label="Stay Packages (Best Value)">
                      <option value="All-Inclusive Stay Package (₹1,499/person)">
                        All-Inclusive Stay Package (₹1,499/person)
                      </option>
                      <option value="Riverside Romance Package (₹3,499/couple)">
                        Riverside Romance Package (₹3,499/couple)
                      </option>
                      <option value="Himalayan Adventure Package (₹2,199/person)">
                        Himalayan Adventure Package (₹2,199/person)
                      </option>
                    </optgroup>

                    <optgroup label="Rooms & Cottages">
                      <option value="Premium Room (River View)">Premium Room (River View)</option>
                      <option value="Deluxe Room (Mountain View)">Deluxe Room (Mountain View)</option>
                      <option value="Grand Mountain Villa">Grand Mountain Villa</option>
                      <option value="Quad Family Cottage">Quad Family Cottage</option>
                    </optgroup>

                    <optgroup label="Special Events">
                      <option value="Destination Wedding Event">Destination Wedding Event</option>
                      <option value="Corporate Offsite Event">Corporate Offsite Event</option>
                      <option value="Dining & Bonfire Experience">Dining & Bonfire Experience</option>
                    </optgroup>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Guest / Group Size Selector (Touch-Friendly Pills) */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                  Group Size / Number of Guests
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {GUEST_OPTIONS.map((opt) => {
                    const isSelected = formData.guests.startsWith(opt.id.split(' ')[0]);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: opt.id })}
                        className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/90 border-amber-500 ring-1 ring-amber-500 text-amber-900 shadow-2xs font-semibold'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{opt.label}</span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-gray-600 font-normal mt-0.5">
                          {opt.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Night Counter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-800">
                    Stay Dates
                  </span>
                  {nights > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full animate-in fade-in">
                      <Moon className="w-3 h-3 text-amber-600" />
                      <span>
                        {nights} {nights === 1 ? 'Night' : 'Nights'}
                      </span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {/* Check-in Field */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Check-in
                    </label>
                    <div className="relative flex items-center">
                      <Calendar className="w-4 h-4 text-amber-700 absolute left-3 pointer-events-none z-10" />
                      <input
                        type="date"
                        min={todayStr}
                        value={formData.checkIn}
                        onChange={handleCheckInChange}
                        onClick={(e) => {
                          try {
                            (e.currentTarget as HTMLInputElement).showPicker?.();
                          } catch {}
                        }}
                        aria-label="Check-in Date"
                        className="w-full pl-9 pr-2.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs font-medium text-gray-800 cursor-pointer transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Check-out Field */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Check-out
                    </label>
                    <div className="relative flex items-center">
                      <Calendar className="w-4 h-4 text-amber-700 absolute left-3 pointer-events-none z-10" />
                      <input
                        type="date"
                        min={formData.checkIn || todayStr}
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        onClick={(e) => {
                          try {
                            (e.currentTarget as HTMLInputElement).showPicker?.();
                          } catch {}
                        }}
                        aria-label="Check-out Date"
                        className="w-full pl-9 pr-2.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs font-medium text-gray-800 cursor-pointer transition-all [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative flex rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500 shadow-2xs">
                    <span className="inline-flex items-center px-2.5 text-xs text-gray-500 bg-gray-50 border-r border-gray-200 font-medium select-none">
                      +91
                    </span>
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      placeholder="10-digit number"
                      value={formData.phone.replace(/^(\+91)/, '')}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, phone: val });
                      }}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Special Requests / Inquiries (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Need river rafting, bonfire, Jain food, or extra bed?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs resize-none"
                />
              </div>

              {/* Interactive Price & Cost Calculator Preview */}
              <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/70 to-orange-500/5 rounded-2xl p-3 sm:p-3.5 border border-amber-300/70 text-xs shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <Calculator className="w-3.5 h-3.5 text-amber-700" />
                    <span>Estimated Stay Cost</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <Tag className="w-2.5 h-2.5" />
                    <span>Direct Booking -5% Applied</span>
                  </span>
                </div>

                <div className="pt-1.5 border-t border-amber-200/60 flex items-baseline justify-between gap-3">
                  <div className="space-y-0.5 text-gray-600 min-w-0">
                    <div className="font-medium text-gray-800 truncate sm:text-clip">{priceEstimate.formula}</div>
                    <div className="text-[10px] text-amber-800 flex items-center gap-1 line-clamp-1">
                      <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-600 shrink-0" />
                      <span>{priceEstimate.perk}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base sm:text-lg font-extrabold text-amber-950 font-serif leading-none">
                      {priceEstimate.formattedTotal}
                    </div>
                    {!priceEstimate.isCustom && (
                      <div className="text-[10px] text-gray-600 mt-0.5">
                        <span className="line-through text-gray-600 mr-1">{priceEstimate.formattedSubtotal}</span>
                        <span className="text-emerald-700 font-semibold">(Save ₹{priceEstimate.discount?.toLocaleString('en-IN')})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions & Submit */}
              <div className="pt-1.5 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shimmer-btn w-full min-h-[48px] flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-[0_4px_18px_rgba(217,119,6,0.35)] hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white stroke-none" />
                      <span>Send Instant Inquiry via WhatsApp</span>
                    </>
                  )}
                </button>

                {/* Direct Call / Concierge Trust Banner */}
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 pt-1 px-1">
                  <div className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Best Price Guarantee</span>
                  </div>

                  <a
                    href={`tel:${RESORT_CONFIG.phoneRaw}`}
                    className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-900 font-semibold hover:underline"
                  >
                    <Phone className="w-3 h-3 text-amber-600" />
                    <span>Call Desk: {RESORT_CONFIG.phone}</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
