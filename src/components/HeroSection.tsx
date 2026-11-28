'use client';

import React from 'react';
import { Heart, Play } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { parseVideoUrl } from '@/lib/videoUtils';

// Add a YouTube/Instagram/Facebook URL here when ready to play a video in Hero
const HERO_VIDEO_URL = '';

interface HeroSectionProps {
  onDonateClick: () => void;
  onWatchVideosClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDonateClick,
  onWatchVideosClick,
}) => {
  const parsedHeroVideo = HERO_VIDEO_URL ? parseVideoUrl(HERO_VIDEO_URL) : null;

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

        {/* Hero Video (when configured) or 4-Seva Banner Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[3/2] w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-200 shadow-md bg-amber-50">
            {parsedHeroVideo?.valid && parsedHeroVideo.embedUrl ? (
              <iframe
                src={
                  parsedHeroVideo.platform === 'youtube'
                    ? `${parsedHeroVideo.embedUrl}&autoplay=1&mute=1&loop=1&playlist=${parsedHeroVideo.videoId}`
                    : parsedHeroVideo.embedUrl
                }
                title="राम का सेवक — ज़मीनी सेवा वीडियो"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <img
                src="/images/hero-seva.jpg"
                alt="सेवा ही परमो धर्म — राम का सेवक 4 प्रमुख सेवाएँ"
                width={1200}
                height={800}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
