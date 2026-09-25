import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Location & How to Reach Tapovan, Rishikesh',
  description: `Find directions, driving routes, train and flight connectivity to ${RESORT_CONFIG.name} located at ${RESORT_CONFIG.address}.`,
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
