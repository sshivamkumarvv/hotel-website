import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Resort Amenities & Adventure Activities',
  description: `Swimming pool, river stream access, bonfire, music, indoor games, river rafting, and 24/7 power backup at ${RESORT_CONFIG.name}.`,
};

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
