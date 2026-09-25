'use client';

import React, { useState } from 'react';
import { X, Calendar, Users, Phone, User, CheckCircle2, MessageCircle, Sparkles, Loader2, RotateCcw } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';
import { submitInquiry } from '@/lib/googleSheet';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultPackage = 'All-Inclusive Stay Package',
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    roomType: defaultPackage || 'Premium Room',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save inquiry to Google Sheet
    await submitInquiry({
      name: formData.name,
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      roomType: formData.roomType,
      message: formData.message,
      source: 'Popup Booking Modal',
    });

    setIsSubmitting(false);
    setSubmitted(true);

    const text = `*New Stay Inquiry - ${RESORT_CONFIG.name}*
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📅 Check-in: ${formData.checkIn || 'To be decided'}
📅 Check-out: ${formData.checkOut || 'To be decided'}
👥 Guests: ${formData.guests}
🏨 Category/Package: ${formData.roomType}
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
      roomType: defaultPackage || 'Premium Room',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-lg bg-[#FCFBF9] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden border border-amber-900/15 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-amber-100/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce duration-1000">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">Inquiry Recorded!</h3>
            <p className="text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
              Your inquiry has been recorded in our reservation database and forwarded to our booking team via WhatsApp.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleResetForm}
                className="flex-1 px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-200 transition-all shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Fill Form Again</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-amber-700 mb-1">
                <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>RESERVATION & QUOTATION</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">Get Custom Quote</h2>
              <p className="text-xs text-gray-500 mt-1">
                Direct booking discount applied automatically. Contact our reservation team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Guests / Group Size
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white shadow-2xs"
                    >
                      <option>1-2 Guests (Couple)</option>
                      <option>3-4 Guests (Family)</option>
                      <option>5-10 Guests (Group)</option>
                      <option>10+ Guests (Corporate / Wedding)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Room or Package
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white shadow-2xs"
                  >
                    <option>All-Inclusive Stay Package (₹1,499/person)</option>
                    <option>Premium Room (River View)</option>
                    <option>Deluxe Room (Mountain View)</option>
                    <option>Grand Mountain Villa</option>
                    <option>Quad Family Cottage</option>
                    <option>Destination Wedding Event</option>
                    <option>Corporate Offsite Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Special Notes / Requests (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Need river rafting, bonfire setup, Jain meal, or extra bed?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shimmer-btn w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white py-3 rounded-xl font-bold text-sm shadow-[0_4px_18px_rgba(217,119,6,0.35)] hover:shadow-lg transition-all active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Recording Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                      <span>Send Inquiry via WhatsApp</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  Fast response guaranteed from {RESORT_CONFIG.name}.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
