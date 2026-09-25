import type { Metadata } from 'next';
import './globals.css';
import ClientShell from '@/components/ClientShell';
import { RESORT_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL('https://glenorariverresort.com'),
  title: {
    default: `${RESORT_CONFIG.name} | Luxury Riverside Resort in Tapovan, Rishikesh`,
    template: `%s | ${RESORT_CONFIG.name}`,
  },
  description:
    `Experience luxury amidst nature at ${RESORT_CONFIG.name}, located along the river stream in ${RESORT_CONFIG.addressShort}. Luxury cottages, mountain swimming pool, buffet dining, bonfire, river rafting, and all-inclusive packages from ₹1,499.`,
  keywords: [
    RESORT_CONFIG.name,
    'The Glenora River Resort Rishikesh',
    'Tapovan Resort Rishikesh',
    'Laxman Jhula Road Resort',
    'River Resort Rishikesh',
    'Luxury Cottages Rishikesh',
    'River Rafting Rishikesh',
    'Resort with Swimming Pool Rishikesh',
    'Destination Wedding Rishikesh',
    'Best Resort in Tapovan',
  ],
  authors: [{ name: RESORT_CONFIG.name }],
  creator: RESORT_CONFIG.name,
  publisher: RESORT_CONFIG.name,
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://glenorariverresort.com',
  },
  openGraph: {
    title: `${RESORT_CONFIG.name} | Tapovan, Rishikesh`,
    description: RESORT_CONFIG.tagline,
    url: 'https://glenorariverresort.com',
    siteName: RESORT_CONFIG.name,
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: `${RESORT_CONFIG.name} Tapovan Rishikesh`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${RESORT_CONFIG.name} | Luxury Resort in Tapovan, Rishikesh`,
    description: RESORT_CONFIG.tagline,
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: RESORT_CONFIG.name,
  description: RESORT_CONFIG.tagline,
  image: 'https://glenorariverresort.com/images/hero.jpg',
  telephone: RESORT_CONFIG.phone,
  email: RESORT_CONFIG.email,
  priceRange: '₹1,499 - ₹5,999',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Laxman Jhula Road',
    addressLocality: 'Tapovan, Rishikesh',
    addressRegion: 'Uttarakhand',
    postalCode: '249192',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 30.1348,
    longitude: 78.3245,
  },
  url: 'https://glenorariverresort.com',
  starRating: {
    '@type': 'Rating',
    ratingValue: '4.9',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Riverside Access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Bonfire & Acoustic Music', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Complimentary Buffet Breakfast', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free Secure Parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: '24/7 Power Backup', value: true },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#FCFBF9] text-gray-900">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
