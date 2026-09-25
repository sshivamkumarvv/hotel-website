import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All-Inclusive Stay & Adventure Packages (From ₹1,499)',
  description: `Book all-inclusive weekend packages with 4 buffet meals, bonfire, swimming pool, and river rafting at ${RESORT_CONFIG.name}, ${RESORT_CONFIG.addressShort}.`,
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
