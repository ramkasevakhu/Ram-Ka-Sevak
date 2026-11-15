import type { Metadata } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Ram Ka Sevak | Ground Seva Initiative by @vipuone',
  description: '100% Grassroots Seva inspired by Prabhu Shri Ram. Street food relief (Annadaan), animal care, emergency hospital aid, and disaster relief fund by @vipuone (ramkasevak.org). सेवा ही भक्ति है।',
  keywords: [
    'Ram Ka Sevak',
    'vipuone',
    'ramkasevak.org',
    'annadaan',
    'gau seva',
    'street dog feeding',
    'medical emergency help',
    'disaster relief India',
    'genuine donation',
    'shri ram donation',
  ],
  authors: [{ name: 'Vipu (@vipuone)' }],
  openGraph: {
    title: 'Ram Ka Sevak | Ground Seva Initiative by @vipuone',
    description: '100% Genuine Grassroots Seva by @vipuone. Street food relief, cow care, hospital medical aid, and emergency disaster response.',
    url: `https://${SITE_CONFIG.domain}`,
    siteName: 'Ram Ka Sevak',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body className="bg-divine-pattern min-h-screen flex flex-col antialiased selection:bg-amber-200 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
