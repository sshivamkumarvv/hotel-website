'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import BookingModal from './BookingModal';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('All-Inclusive Stay Package');

  useEffect(() => {
    const handleOpenBooking = (e: CustomEvent<{ packageName?: string }>) => {
      if (e.detail?.packageName) {
        setSelectedPackage(e.detail.packageName);
      }
      setBookingModalOpen(true);
    };

    window.addEventListener('open-booking-modal' as any, handleOpenBooking);
    return () => {
      window.removeEventListener('open-booking-modal' as any, handleOpenBooking);
    };
  }, []);

  // Scroll reveal IntersectionObserver that triggers as sections enter the viewport
  useEffect(() => {
    // Select all elements marked with .reveal-on-scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (!('IntersectionObserver' in window)) {
      // Fallback: reveal all if observer is unsupported
      revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px', // triggers slightly before full view
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF9] selection:bg-amber-100 selection:text-amber-900">
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />
      
      {/* Page entrance animation on every route change via key={pathname} */}
      <main key={pathname} className="flex-1 animate-page-enter">
        {children}
      </main>

      <Footer />
      <FloatingWhatsApp />

      <BookingModal
        isOpen={bookingModalOpen}
        defaultPackage={selectedPackage}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
