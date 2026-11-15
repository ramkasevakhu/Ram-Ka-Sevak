'use client';

import React from 'react';
import { ShieldCheck, Heart, Sparkles, ArrowDown, Users, Flame } from 'lucide-react';
import { SITE_CONFIG, SEVA_CATEGORIES } from '@/lib/constants';
import { SevaCategory } from '@/lib/types';

interface HeroSectionProps {
  onSelectCategory: (category: SevaCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory }) => {
  const scrollToCategories = () => {
    const el = document.getElementById('seva-categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40">
      
      {/* Decorative Divine Aura Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-200/35 via-kesariya-100/20 to-transparent blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Subtle Sacred Geometry Motif */}
      <div className="absolute -top-10 right-5 lg:right-20 w-72 h-72 rounded-full border border-amber-300/30 -z-10 animate-float opacity-40 pointer-events-none"></div>
      <div className="absolute top-40 left-5 lg:left-10 w-48 h-48 rounded-full border border-kesariya-300/25 -z-10 animate-float opacity-30 pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust & Identity Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-amber-300/80 shadow-sm text-xs sm:text-sm font-semibold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-4.5"></span>
            <span className="text-kesariya-700 font-bold">100% Genuine Ground Seva</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">Reels by <strong>@{SITE_CONFIG.creatorUsername}</strong></span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-xs font-semibold text-amber-900">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>Zero Fake Timers • Lifetime Evergreen</span>
          </div>
        </div>

        {/* Main Divine Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="text-amber-600 font-bold tracking-widest text-xs sm:text-sm uppercase">
              ॥ मर्यादा पुरुषोत्तम प्रभु श्री राम की पावन प्रेरणा ॥
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18] mb-6">
            सड़क से अस्पताल तक, हर ज़रूरतमंद का सहारा
            <span className="block mt-2 bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 bg-clip-text text-transparent">
              — राम का सेवक ({SITE_CONFIG.domain})
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            Social media reels (<strong className="text-slate-900">@{SITE_CONFIG.creatorUsername}</strong>) par aapne hamara ground work dekha hai.
            Yahan aap bina kisi bicholiye ke, sidhe footpath ke zarooratmand logo, be-sahara mook jeevo aur emergency marizo tak apni bhent pahucha sakte hain.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={scrollToCategories}
              className="btn-divine-3d text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center cursor-pointer shadow-xl"
            >
              <Heart className="w-5 h-5 fill-white text-white" />
              <span>पवित्र सेवा कोष चुनें (Select Seva)</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/95 hover:bg-slate-50 border-2 border-amber-300/80 font-bold text-slate-800 text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-lg">📸</span>
              <span>Reels Proof (@{SITE_CONFIG.creatorUsername})</span>
            </a>
          </div>

          {/* 3 Key Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/80 border border-amber-200/70 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">४ पक्के सेवा कोष</h4>
                <p className="text-xs text-slate-500 mt-0.5">Kabhi expire na hone wale 4 evergreen relief pillars.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-amber-200/70 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">०% बिचोलिया / १००% सेवा</h4>
                <p className="text-xs text-slate-500 mt-0.5">Sidha ground par ration, dava aur chara seva me lagat.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-amber-200/70 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">मल्टीप्लायर कैलकुलेटर</h4>
                <p className="text-xs text-slate-500 mt-0.5">1, 5, 10 ya 50 logo ko khana khilane ka direct hisaab.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
