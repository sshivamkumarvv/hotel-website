'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { RESORT_CONFIG } from '@/lib/constants';

interface NavbarProps {
  onOpenBooking?: () => void;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Rooms', href: '/rooms' },
  { name: 'Dining', href: '/dining' },
  { name: 'Events', href: '/events' },
  { name: 'Packages', href: '/packages' },
  { name: 'Facilities', href: '/facilities' },
  { name: 'Location', href: '/location' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FCFBF9]/95 backdrop-blur-md border-b border-amber-900/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-xs group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Sparkles className="w-4 h-4 fill-white" />
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-gray-900 transition-colors">
                {RESORT_CONFIG.namePart1}{' '}
                <span className="text-amber-600 font-sans font-semibold">
                  {RESORT_CONFIG.namePart2}
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-all duration-300 px-3.5 py-1.5 rounded-full relative ${
                      isActive
                        ? 'bg-amber-100/80 text-amber-800 font-semibold shadow-xs border border-amber-200/80'
                        : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50/60'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-600 rounded-full -mb-1 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button: Call Now */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${RESORT_CONFIG.phone}`}
                className="shimmer-btn inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_4px_16px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_22px_rgba(217,119,6,0.45)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-white stroke-none animate-bounce" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile menu button and call trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${RESORT_CONFIG.phone}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700 sm:hidden shadow-md active:scale-95 transition-transform"
                aria-label="Call Now"
              >
                <Phone className="w-4 h-4 fill-white stroke-none" />
              </a>

              {/* Hamburger Button with large tap target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2.5 rounded-xl text-gray-800 bg-amber-50/80 hover:bg-amber-100 hover:text-amber-700 active:scale-90 transition-all border border-amber-200/60 cursor-pointer touch-manipulation z-50 flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[2.5]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[2.5]" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-20 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="relative z-50 bg-[#FCFBF9] border-b border-amber-900/15 shadow-2xl px-5 pt-4 pb-8 max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-200 shadow-2xs'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700 active:bg-amber-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-5 border-t border-amber-200/70 flex flex-col gap-3">
              <a
                href={`tel:${RESORT_CONFIG.phone}`}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white py-3.5 rounded-xl font-bold shadow-md active:scale-98 transition-all"
              >
                <Phone className="w-4 h-4 fill-white stroke-none" />
                <span>Call {RESORT_CONFIG.phone}</span>
              </a>
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book / Inquire Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
