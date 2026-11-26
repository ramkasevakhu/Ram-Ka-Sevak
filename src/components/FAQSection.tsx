'use client';

import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'क्या ₹50 में सचमुच एक व्यक्ति का भोजन हो जाता है?',
    answer:
      'हाँ। स्थानीय स्तर पर ताज़ा राशन, सब्ज़ी और रोटियाँ बनवाकर सीधे ज़रूरतमंद लोगों तक पहुँचाई जाती हैं, जिससे ₹50 में 1 व्यक्ति को गरम थाली मिल जाती है।',
  },
  {
    question: 'क्या यह पंजीकृत NGO या ट्रस्ट है? क्या 80G टैक्स छूट मिलेगी?',
    answer:
      'नहीं। यह पंजीकृत NGO/Trust नहीं है, व्यक्तिगत सेवा पहल है। 80G/टैक्स छूट उपलब्ध नहीं। यह पहल ऋषिकेश से सीधे ज़मीनी स्तर पर चलाई जाती है।',
  },
  {
    question: 'मुझे कैसे पता चलेगा कि मेरा सहयोग सही जगह लगा?',
    answer:
      'हर सेवा कार्य के वीडियो और रील्स Instagram (@vipuone) तथा वेबसाइट के ज़मीनी प्रमाण भाग में साझा किए जाते हैं। साथ ही मासिक हिसाब भी वेबसाइट पर उपलब्ध रहता है।',
  },
  {
    question: 'भुगतान कैसे किया जाता है और क्या यह सुरक्षित है?',
    answer:
      'आप GPay, PhonePe, Paytm या किसी भी UPI ऐप से सुरक्षित भुगतान कर सकते हैं। कोई अतिरिक्त शुल्क नहीं लगता।',
  },
  {
    question: 'क्या मैं किसी विशेष अवसर (जन्मदिन या पुण्यतिथि) पर सेवा करा सकता हूँ?',
    answer:
      'जी हाँ। दान करते समय "संदेश / प्रार्थना" बॉक्स में अपना संकल्प लिखें या WhatsApp पर संपर्क करें।',
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-10 sm:py-14 px-4 bg-[#FFFDF9] border-t border-amber-200/70">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-7">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-kesariya-700" />
            <span>सामान्य प्रश्न</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
            अक्सर पूछे जाने वाले सवाल
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden"
            >
              <summary className="min-h-[52px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-sm sm:text-base font-black text-[#3B1F0A] cursor-pointer list-none">
                <span>{item.question}</span>
                <ChevronDown className="w-5 h-5 text-kesariya-600 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 sm:px-5 pb-4 pt-1 text-sm text-[#5C4E44] leading-relaxed border-t border-amber-100">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
