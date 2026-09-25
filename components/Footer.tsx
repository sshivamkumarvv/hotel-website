import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#090D16] text-gray-300 pt-16 pb-12 border-t border-amber-950/40 relative overflow-hidden">
      {/* Subtle ambient gold glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 fill-white" />
              </span>
              <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                {RESORT_CONFIG.namePart1}
                <span className="text-amber-400 font-sans block text-lg font-semibold -mt-1">
                  {RESORT_CONFIG.namePart2}
                </span>
              </h3>
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {RESORT_CONFIG.tagline}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-amber-600 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-amber-900/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(217,119,6,0.4)]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-amber-600 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-amber-900/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(217,119,6,0.4)]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-amber-600 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-amber-900/30 hover:scale-110 hover:shadow-[0_0_15px_rgba(217,119,6,0.4)]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-semibold text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/dining" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Dining & Meals
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Transparent Packages
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Facilities & Adventures
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Events & Celebrations
                </Link>
              </li>
              <li>
                <Link href="/location" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Location & Map
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-amber-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-base font-semibold text-amber-400">
              Contact Information
            </h4>
            
            <div className="space-y-3">
              {/* Address card */}
              <div className="bg-[#111726] border border-amber-950/50 rounded-2xl p-4 flex items-start gap-3.5 hover:border-amber-700/50 transition-colors">
                <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-200">{RESORT_CONFIG.addressShort}</p>
                </div>
              </div>

              {/* Phone card */}
              <a
                href={`tel:${RESORT_CONFIG.phone}`}
                className="bg-[#111726] border border-amber-950/50 rounded-2xl p-4 flex items-center gap-3.5 hover:border-amber-500/60 hover:bg-[#161e30] transition-all group"
              >
                <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-sm font-semibold text-gray-100 group-hover:text-amber-400 transition-colors">
                  {RESORT_CONFIG.phone}
                </span>
              </a>

              {/* Email card */}
              <a
                href={`mailto:${RESORT_CONFIG.email}`}
                className="bg-[#111726] border border-amber-950/50 rounded-2xl p-4 flex items-center gap-3.5 hover:border-amber-500/60 hover:bg-[#161e30] transition-all group"
              >
                <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-sm font-semibold text-gray-100 group-hover:text-amber-400 transition-colors">
                  {RESORT_CONFIG.email}
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 text-center text-xs text-gray-500">
          <p>© 2026 {RESORT_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
