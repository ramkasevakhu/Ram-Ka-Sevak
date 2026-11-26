'use client';

import React from 'react';
import { Heart, Play } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface HeroSectionProps {
  onDonateClick: () => void;
  onWatchVideosClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDonateClick,
  onWatchVideosClick,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#FFF7EA] to-[#FFFDF9] pt-5 pb-8 sm:pt-10 sm:pb-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Text + CTAs */}
        <div className="lg:col-span-6 text-center lg:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-extrabold text-amber-900 mb-3">
            ॥ जय श्री राम ॥ • @{SITE_CONFIG.creatorUsername}
          </span>

          <h1 className="text-[32px] sm:text-4xl lg:text-5xl font-black text-[#3B1F0A] leading-[1.18] tracking-tight mb-2.5">
            कोई भूखा न सोए।
          </h1>

          <p className="text-base sm:text-lg text-[#5C4E44] leading-relaxed mb-5">
            ऋषिकेश में सड़क पर ज़रूरतमंदों को गरम भोजन, घायल पशुओं का इलाज और गरीब मरीज़ों को दवा सहायता।
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onDonateClick}
              className="min-h-[52px] px-6 rounded-2xl bg-kesariya-600 hover:bg-kesariya-700 active:scale-[0.98] text-white font-black text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white shrink-0" />
              <span>सहयोग करें</span>
            </button>

            <button
              type="button"
              onClick={onWatchVideosClick}
              className="min-h-[52px] px-6 rounded-2xl bg-white hover:bg-amber-50 active:scale-[0.98] text-[#3B1F0A] border-2 border-amber-300 font-extrabold text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-kesariya-600 text-kesariya-600 shrink-0" />
              <span>सेवा के वीडियो देखें</span>
            </button>
          </div>
        </div>

        {/* Real Seva Photo Card (16:9, prevents CLS) */}
        <div className="lg:col-span-6">
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-200 shadow-md bg-amber-100">
            <img
              src="/images/annadaan-seva.jpg"
              alt="ऋषिकेश में राम का सेवक ज़मीनी अन्नदान सेवा"
              width={800}
              height={450}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs sm:text-sm font-bold">
              <span>@{SITE_CONFIG.creatorUsername} • ज़मीनी सेवा</span>
              <button
                type="button"
                onClick={onWatchVideosClick}
                className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs font-extrabold cursor-pointer"
              >
                ▶ वीडियो देखें
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
