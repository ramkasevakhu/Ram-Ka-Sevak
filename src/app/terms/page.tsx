import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'नियम व शर्तें (Terms of Service) | राम का सेवक',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] text-[#3B1F0A] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-4">
        <Link href="/" className="text-sm font-bold text-kesariya-700 underline">
          ← मुख्य पृष्ठ पर लौटें
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black">नियम व शर्तें (Terms &amp; Conditions)</h1>
        <p className="text-sm text-[#5C4E44] leading-relaxed">
          राम का सेवक ({SITE_CONFIG.domain}) विपु (@{SITE_CONFIG.creatorUsername}) और साथियों द्वारा संचालित एक व्यक्तिगत ज़मीनी सेवा पहल है। यह कोई पंजीकृत NGO या ट्रस्ट नहीं है।
        </p>
        <p className="text-sm text-[#5C4E44] leading-relaxed">
          इस वेबसाइट के माध्यम से किया गया प्रत्येक सहयोग स्वैच्छिक है और सीधे अन्नदान, गौ व पशु सेवा, चिकित्सा सहायता एवं आपदा राहत में उपयोग किया जाता है। यहाँ किए गए दान पर आयकर अधिनियम की धारा 80G के अंतर्गत कोई कर छूट उपलब्ध नहीं है।
        </p>
      </div>
    </main>
  );
}
