import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'दान व रिफंड नीति (Refund Policy) | राम का सेवक',
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF9] text-[#3B1F0A] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-4">
        <Link href="/" className="text-sm font-bold text-kesariya-700 underline">
          ← मुख्य पृष्ठ पर लौटें
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black">दान व रिफंड नीति (Donation &amp; Refund Policy)</h1>
        <p className="text-sm text-[#5C4E44] leading-relaxed">
          चूँकि सभी सेवा सहयोग तुरंत ज़मीनी कार्यों (भोजन, पशु चारा, दवाइयाँ) में उपयोग किए जाते हैं, इसलिए सामान्यतः एक बार किया गया स्वैच्छिक दान वापस (Refund) नहीं किया जाता।
        </p>
        <p className="text-sm text-[#5C4E44] leading-relaxed">
          यदि किसी तकनीकी त्रुटि के कारण दो बार भुगतान हो गया हो या गलत राशि कट गई हो, तो कृपया 48 घंटों के भीतर ट्रांज़ैक्शन ID के साथ <strong>{SITE_CONFIG.officialEmail}</strong> पर ईमेल करें। जाँच के बाद 5–7 कार्यदिवसों में राशि लौटाई जाएगी।
        </p>
      </div>
    </main>
  );
}
