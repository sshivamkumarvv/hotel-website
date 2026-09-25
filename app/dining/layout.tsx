import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Riverside Dining & Gourmet Buffet',
  description: `Savor gourmet cuisine and farm-to-table buffet meals beside the pristine river stream at ${RESORT_CONFIG.name}, ${RESORT_CONFIG.addressShort}.`,
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
