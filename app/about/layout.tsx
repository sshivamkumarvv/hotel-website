import type { Metadata } from 'next';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Our Sanctuary',
  description: `Learn the story of ${RESORT_CONFIG.name} — where natural Himalayan serenity meets premier hospitality in ${RESORT_CONFIG.addressShort}.`,
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
