import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Destination Weddings & Corporate Offsites',
  description: `Celebrate dreamy destination weddings and productive corporate retreats amidst the foothills at ${RESORT_CONFIG.name}, ${RESORT_CONFIG.addressShort}.`,
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
