import type { Metadata } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'राम का सेवक (Ram Ka Sevak) | Ground Seva by @vipuone',
  description: 'प्रभु श्री राम की पावन प्रेरणा से सड़क पर अन्नदान, मूक जीव व गौ सेवा, आपातकालीन चिकित्सा और प्राकृतिक आपदा राहत कोष। 100% प्रामाणिक ग्राउंड सेवा by @vipuone (ramkasevak.org).',
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
    title: 'राम का सेवक | Har Zarooratmand Ka Sahara',
    description: '100% Genuine Ground Seva by @vipuone. अन्नदान, गौ सेवा, अस्पताल चिकित्सा और आपदा राहत।',
    url: `https://${SITE_CONFIG.domain}`,
    siteName: 'Ram Ka Sevak',
    locale: 'hi_IN',
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
