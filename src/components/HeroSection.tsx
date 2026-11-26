'use client';

import React from 'react';
import { Camera, Heart, Play, ShieldCheck, Video, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface HeroSectionProps {
  onDonateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDonateClick,
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
            सिर्फ़ <strong className="text-kesariya-700">₹50 में 1 ज़रूरतमंद की गरम थाली</strong> — ऋषिकेश में सड़क पर भोजन वितरण, घायल पशुओं का इलाज और गरीब मरीज़ों को दवा सहायता।
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onDonateClick}
              className="min-h-[52px] px-6 rounded-2xl bg-kesariya-600 hover:bg-kesariya-700 active:scale-[0.98] text-white font-black text-base flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white shrink-0" />
              <span>दान करें</span>
            </button>

            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[52px] px-6 rounded-2xl bg-white hover:bg-amber-50 active:scale-[0.98] text-[#3B1F0A] border-2 border-amber-300 font-extrabold text-base flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 fill-kesariya-600 text-kesariya-600 shrink-0" />
              <span>सेवा के वीडियो देखें</span>
            </a>
          </div>

          {/* 3 Trust Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-extrabold text-[#3B1F0A]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% सीधी सेवा</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 shadow-xs">
              <Video className="w-3.5 h-3.5 text-kesariya-600 shrink-0" />
              <span>रील्स पर वीडियो प्रमाण</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>कोई बिचौलिया नहीं</span>
            </span>
          </div>
        </div>

        {/* Hero Photo Slot (16:9, prevents CLS) */}
        <div className="lg:col-span-6">
          {/* TODO: Replace this placeholder with real photo at /public/images/hero.jpg (recommended 1200x675 WebP/JPG, fetchPriority="high") */}
          <div
            role="img"
            aria-label="ऋषिकेश में राम का सेवक ज़मीनी सेवा फोटो स्थान"
            className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-dashed border-amber-400 bg-gradient-to-br from-amber-50 via-[#FFF7EA] to-orange-100/70 shadow-sm flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-center justify-center mb-3">
              <Camera className="w-7 h-7 text-kesariya-600" />
            </div>
            <p className="text-base sm:text-lg font-black text-[#3B1F0A]">
              असली सेवा फोटो यहाँ दिखेगी
            </p>
            <p className="text-xs sm:text-sm text-[#6B5E55] mt-1 max-w-sm">
              कृपया अपनी असली सेवा फोटो <code className="px-1.5 py-0.5 rounded bg-white border border-amber-200 font-mono text-xs">/public/images/hero.jpg</code> पर अपलोड करें
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-amber-200 text-xs font-extrabold text-kesariya-700">
              @{SITE_CONFIG.creatorUsername} • ऋषिकेश, उत्तराखंड
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
