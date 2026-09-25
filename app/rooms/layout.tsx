import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Luxury Rooms & Riverfront Cottages',
  description: `Explore deluxe cottages, premium suites, and mountain villas at ${RESORT_CONFIG.name} in ${RESORT_CONFIG.addressShort}. Transparent pricing starting from ₹2,499.`,
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
