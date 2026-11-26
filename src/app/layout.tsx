import type { Metadata } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_CONFIG.domain}`),
  title: 'राम का सेवक (Ram Ka Sevak) | @vipuone • ऋषिकेश, उत्तराखंड',
  description:
    'ऋषिकेश, उत्तराखंड से संचालित राम का सेवक (@vipuone) की ज़मीनी सेवा पहल — सड़क पर अन्नदान, गौ व पशु सेवा, चिकित्सा सहायता और आपदा राहत।',
  keywords: [
    'राम का सेवक',
    'Ram Ka Sevak',
    'vipuone',
    'ramkasevak.org',
    'Rishikesh Uttarakhand seva',
    'अन्नदान ऋषिकेश',
    'गौ सेवा उत्तराखंड',
    'चिकित्सा सहायता',
    'आपदा राहत',
  ],
  openGraph: {
    title: 'राम का सेवक | @vipuone • ऋषिकेश, उत्तराखंड',
    description:
      'कोई भूखा न सोए। ऋषिकेश, उत्तराखंड में अन्नदान, पशु सेवा और चिकित्सा सहायता से जुड़ें।',
    url: `https://${SITE_CONFIG.domain}`,
    siteName: 'राम का सेवक',
    locale: 'hi_IN',
    type: 'website',
    images: [
      {
        url: '/images/annadaan-seva.jpg',
        width: 1200,
        height: 630,
        alt: 'ऋषिकेश में राम का सेवक अन्नदान सेवा',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'राम का सेवक (Ram Ka Sevak)',
    url: `https://${SITE_CONFIG.domain}`,
    email: SITE_CONFIG.officialEmail,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rishikesh',
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN',
    },
    areaServed: 'Rishikesh, Uttarakhand, India',
    sameAs: [
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.youtube,
      SITE_CONFIG.socialLinks.facebook,
    ],
  };

  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
