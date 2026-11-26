import type { Metadata } from 'next';
import { Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_CONFIG.domain}`),
  title: 'राम का सेवक (Ram Ka Sevak) | @vipuone ज़मीनी सेवा पहल',
  description:
    'प्रभु श्री राम की प्रेरणा से अन्नदान, गौ व पशु सेवा, आपातकालीन चिकित्सा सहायता और आपदा राहत। हर सेवा का वीडियो प्रमाण।',
  keywords: [
    'राम का सेवक',
    'Ram Ka Sevak',
    'vipuone',
    'ramkasevak.org',
    'अन्नदान',
    'गौ सेवा',
    'चिकित्सा सहायता',
    'आपदा राहत',
  ],
  openGraph: {
    title: 'राम का सेवक | @vipuone ज़मीनी सेवा पहल',
    description:
      'कोई भूखा न सोए, हर बेज़ुबान को सहारा मिले। ₹50 से सेवा में जुड़ें।',
    url: `https://${SITE_CONFIG.domain}`,
    siteName: 'राम का सेवक',
    locale: 'hi_IN',
    type: 'website',
    images: [
      {
        url: '/images/annadaan-seva.jpg',
        width: 1200,
        height: 630,
        alt: 'राम का सेवक अन्नदान सेवा',
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
    '@type': 'Organization',
    name: 'राम का सेवक (Ram Ka Sevak)',
    url: `https://${SITE_CONFIG.domain}`,
    email: SITE_CONFIG.officialEmail,
    sameAs: [
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.youtube,
      SITE_CONFIG.socialLinks.facebook,
    ],
  };

  return (
    <html lang="hi" className="scroll-smooth">
      <body className={`${notoDevanagari.className} min-h-screen flex flex-col antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
