'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Sparkles, RotateCcw, Loader2 } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';
import { submitInquiry } from '@/lib/googleSheet';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Booking Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Submit lead to Google Sheets via API
    await submitInquiry({
      name: form.name,
      phone: form.phone,
      email: form.email,
      subject: form.subject,
      message: form.message,
      source: 'Contact Page',
    });

    setIsSubmitting(false);
    setSubmitted(true);

    // 2. Open WhatsApp with prefilled message
    const text = `*Website Contact Inquiry - ${RESORT_CONFIG.name}*
👤 Name: ${form.name}
📞 Phone: ${form.phone}
✉️ Email: ${form.email || 'N/A'}
📌 Subject: ${form.subject}
💬 Message: ${form.message}`;

    window.open(RESORT_CONFIG.whatsappUrl(text), '_blank');
  };

  const handleResetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      subject: 'Booking Inquiry',
      message: '',
    });
    setSubmitted(false);
  };

  const faqs = [
    {
      q: 'What are the check-in and check-out timings?',
      a: 'Check-in is at 12:00 PM and check-out is at 10:30 AM. Early check-in or late check-out is subject to cottage availability.',
    },
    {
      q: 'Is pure vegetarian / Jain / Satvik food available?',
      a: 'Yes, absolutely! We serve freshly prepared vegetarian, non-vegetarian, Jain, and Satvik meals. Please inform us of dietary restrictions when booking.',
    },
    {
      q: 'How far is the river from the cottages?',
      a: 'The river stream is located just 50 meters down a gentle stone path right inside the resort property.',
    },
    {
      q: 'Is there parking and power backup?',
      a: 'Yes, we provide secure free private parking inside the gated compound and 100% 24/7 power backup through a silent generator.',
    },
    {
      q: 'Can you arrange River Rafting and Bungee Jumping?',
      a: 'Yes! We arrange verified adventure slots for River Rafting, Bungee Jumping at Jumpin Heights, Zipline, and Paragliding with round-trip transfers.',
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
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
            Contact & Inquiries
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Have questions or looking for customized group quotes for {RESORT_CONFIG.name}? We are here 24/7.
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20 reveal-on-scroll">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <a
              href={`tel:${RESORT_CONFIG.phone}`}
              className="card-hover block p-6 rounded-3xl bg-white border border-amber-900/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-amber-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                    Call Direct (24/7)
                  </span>
                  <span className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {RESORT_CONFIG.phone}
                  </span>
                </div>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={RESORT_CONFIG.whatsappUrl(`Hello ${RESORT_CONFIG.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover block p-6 rounded-3xl bg-white border border-amber-900/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-emerald-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                    Instant WhatsApp Chat
                  </span>
                  <span className="text-lg font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">
                    Chat with Reservations
                  </span>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${RESORT_CONFIG.email}`}
              className="card-hover block p-6 rounded-3xl bg-white border border-amber-900/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-amber-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                    Official Email
                  </span>
                  <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors break-all">
                    {RESORT_CONFIG.email}
                  </span>
                </div>
              </div>
            </a>

            {/* Address Card */}
            <div className="card-hover p-6 rounded-3xl bg-white border border-amber-900/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
                    Resort Address
                  </span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    {RESORT_CONFIG.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {RESORT_CONFIG.address}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-amber-900/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and our team will get in touch with you immediately.
            </p>

            {submitted ? (
              <div className="py-10 px-4 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce duration-1000">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    Thank You, {form.name || 'Guest'}!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
                    Your inquiry has been recorded and forwarded to our reservation team. We will get back to you shortly.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <a
                    href={RESORT_CONFIG.whatsappUrl(
                      `Hello ${RESORT_CONFIG.name}! I just submitted an inquiry on the website under ${form.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-btn w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                  
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Fill Form Again</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ankit Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address (optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ankit@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option>Room & Stay Booking</option>
                      <option>Transparent Package (₹1,499)</option>
                      <option>Destination Wedding</option>
                      <option>Corporate Offsite</option>
                      <option>River Rafting & Adventures</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your dates, number of guests, or any specific questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shimmer-btn w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 disabled:opacity-70 text-white font-bold text-sm shadow-[0_6px_22px_rgba(217,119,6,0.35)] transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving & Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs Accordion Section */}
        <div className="max-w-4xl mx-auto pt-6 reveal-on-scroll">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-gray-900 mt-3">
              Have Questions? We Have Answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="card-hover bg-white rounded-2xl p-6 border border-amber-900/10 shadow-2xs hover:border-amber-300"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
