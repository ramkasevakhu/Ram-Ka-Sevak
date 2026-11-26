import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy) | राम का सेवक',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] text-[#3B1F0A] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-4">
        <Link href="/" className="text-sm font-bold text-kesariya-700 underline">
          ← मुख्य पृष्ठ पर लौटें
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black">गोपनीयता नीति (Privacy Policy)</h1>
        <p className="text-sm text-[#5C4E44] leading-relaxed">
          {SITE_CONFIG.domain} पर आपकी निजता हमारे लिए सर्वोपरि है। दान करते समय दिया गया आपका फ़ोन नंबर और ईमेल केवल रसीद और आवश्यक संपर्क के लिए सुरक्षित रखा जाता है और इसे कभी भी सार्वजनिक वेबसाइट पर नहीं दिखाया जाता।
        </p>
        <p className="text-sm text-[#5C4E44] leading-relaxed">
          यदि आप &ldquo;नाम गुप्त रखें (Anonymous)&rdquo; विकल्प चुनते हैं, तो आपका नाम भी सार्वजनिक सहयोगी सूची में प्रदर्शित नहीं किया जाता।
        </p>
        <p className="text-sm text-[#5C4E44]">
          किसी भी प्रश्न के लिए संपर्क करें: <strong>{SITE_CONFIG.officialEmail}</strong>
        </p>
      </div>
    </main>
  );
}
