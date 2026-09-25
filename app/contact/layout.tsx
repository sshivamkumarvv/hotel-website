import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact & 24/7 Reservation Desk',
  description: `Contact ${RESORT_CONFIG.name} reservation desk at ${RESORT_CONFIG.phone}. Check availability, instant quotes, and directions.`,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
