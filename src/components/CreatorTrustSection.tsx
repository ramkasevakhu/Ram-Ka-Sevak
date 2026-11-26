'use client';

import React from 'react';
import { Video, ShieldCheck, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface CreatorTrustSectionProps {
  onWatchVideosClick: () => void;
}

export const CreatorTrustSection: React.FC<CreatorTrustSectionProps> = ({
  onWatchVideosClick,
}) => {
  return (
    <section id="about-legal" className="py-10 sm:py-14 px-4 bg-white border-t border-amber-200/70">
      <div className="max-w-4xl mx-auto bg-[#FFFDF9] rounded-3xl border-2 border-amber-200 p-5 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src="/vipu-profile.jpg"
            alt="विपु (@vipuone) - राम का सेवक, ऋषिकेश"
            width={112}
            height={112}
            loading="lazy"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-amber-300 shrink-0"
          />

          <div className="flex-1 space-y-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>व्यक्तिगत ज़मीनी पहल • @{SITE_CONFIG.creatorUsername}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
                हमारे बारे में व वैधानिक स्थिति
              </h2>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-[#6B5E55] mt-1">
                <MapPin className="w-3.5 h-3.5 text-kesariya-600" />
                <span>{SITE_CONFIG.locationHindi}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#5C4E44] leading-relaxed">
              मैं <strong>{SITE_CONFIG.creatorName} (@{SITE_CONFIG.creatorUsername})</strong> और हमारी टीम मिलकर ऋषिकेश, उत्तराखंड में सड़क पर बेघर बुज़ुर्गों को भोजन, घायल पशुओं का इलाज और गरीब मरीज़ों को दवा सहायता पहुँचाती है।
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-[#3B1F0A] leading-relaxed text-left">
              <strong className="text-[#3B1F0A] block mb-1">पारदर्शिता सूचना (Transparency):</strong>
              यह पंजीकृत NGO/Trust नहीं है, व्यक्तिगत सेवा पहल है। 80G/टैक्स छूट उपलब्ध नहीं। प्रत्येक सेवा कार्य का वीडियो प्रमाण वेबसाइट व Instagram रील्स पर साझा किया जाता है।
            </div>

            <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-2.5">
              <button
                type="button"
                onClick={onWatchVideosClick}
                className="min-h-[48px] px-5 rounded-xl bg-kesariya-600 hover:bg-kesariya-700 text-white font-extrabold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>सेवा के वीडियो देखें</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
