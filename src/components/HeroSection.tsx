'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  const [selectedChip, setSelectedChip] = useState<number>(50);

  const scrollToDonate = (amount: number = 50) => {
    setSelectedChip(amount);
    const el = document.getElementById('seva-projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    // Select matching amount chip in the existing donate section
    setTimeout(() => {
      const buttons = document.querySelectorAll('#seva-projects button');
      for (const btn of Array.from(buttons)) {
        if (btn.textContent && btn.textContent.includes(`₹${amount}`)) {
          (btn as HTMLButtonElement).click();
          break;
        }
      }
    }, 350);
  };

  return (
    <section className="relative overflow-hidden bg-[#FFF8EC] pt-8 sm:pt-12 pb-16 sm:pb-20">
      
      {/* Halka Saffron Glow (Poora gradient nahi) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(232, 117, 26, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        
        {/* 1. Chhota tag upar */}
        <div className="inline-block px-3.5 py-1 rounded-full bg-amber-100/70 border border-amber-200/90 text-xs font-black text-amber-900 tracking-wider mb-4 shadow-2xs font-devanagari">
          ॥ जय श्री राम ॥
        </div>

        {/* 2. Heading (Devanagari, ek hi rang, 36-40px, color #3B1F0A) */}
        <h1 
          className="text-[36px] sm:text-[40px] font-black leading-[1.15] text-[#3B1F0A] mb-3 tracking-tight font-devanagari"
          style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif" }}
        >
          कोई भूखा न सोए।
        </h1>

        {/* 3. Subtext (max 2-3 line, 16-17px, grey-brown #6B5E55, line-height 1.6) */}
        <p className="text-[16px] sm:text-[17px] text-[#6B5E55] leading-[1.6] max-w-md mx-auto mb-6 font-normal">
          रोज़ सड़क पर बुज़ुर्गों को गरम खाना, घायल बेज़ुबानों का इलाज और मरीज़ों को दवा। ₹50 से आप भी जुड़ सकते हैं।
        </p>

        {/* 4. Rounded Photo/Video Card (16:9) */}
        <div className="w-full max-w-md mx-auto mb-5">
          <a
            href={SITE_CONFIG.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md bg-slate-900 cursor-pointer"
            aria-label="सेवा की रील देखें"
          >
            {/* Placeholder photo for real reel photo */}
            <img
              src="/images/annadaan-seva.jpg"
              alt="@vipuone • सेवा की रील"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Center Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 group-hover:bg-[#E8751A] text-[#E8751A] group-hover:text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              </div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold font-devanagari">
              <span className="flex items-center gap-1.5 drop-shadow-sm">
                <span>@{SITE_CONFIG.creatorUsername}</span>
                <span className="opacity-80">•</span>
                <span>सेवा की रील</span>
              </span>
              <span className="text-[11px] text-amber-300 font-semibold underline underline-offset-2">
                Reel देखें ↗
              </span>
            </div>
          </a>
        </div>

        {/* 5. 3 Amount Chips (₹50, ₹250, ₹500) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-5 max-w-md mx-auto">
          {[50, 250, 500].map((amt) => {
            const isSelected = selectedChip === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => scrollToDonate(amt)}
                className={`flex-1 py-2.5 px-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-black transition-all cursor-pointer border-2 ${
                  isSelected
                    ? 'border-[#E8751A] bg-amber-100 text-[#3B1F0A] shadow-xs scale-[1.02]'
                    : 'border-amber-200 bg-white hover:border-amber-300 hover:bg-amber-50 text-slate-800'
                }`}
              >
                ₹{amt}
              </button>
            );
          })}
        </div>

        {/* 6. Ek hi bada saffron button (#E8751A, min 52px height, full-width on mobile) */}
        <div className="w-full max-w-md mx-auto mb-4">
          <button
            type="button"
            onClick={() => scrollToDonate(50)}
            className="w-full min-h-[52px] h-[54px] rounded-2xl bg-[#E8751A] hover:bg-[#d66713] active:scale-[0.98] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer font-devanagari tracking-wide"
          >
            <span>₹50 से एक थाली दान करें</span>
          </button>
        </div>

        {/* 7. Text link under button (Instagram link) */}
        <div className="mb-5">
          <a
            href={SITE_CONFIG.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#E8751A] transition-colors cursor-pointer font-devanagari"
          >
            <span>▶</span>
            <span className="underline underline-offset-4">सेवा के वीडियो देखें</span>
          </a>
        </div>

        {/* 8. Sabse neeche ek line trust */}
        <div className="text-xs font-semibold text-[#6B5E55] flex items-center justify-center gap-1 font-devanagari">
          <span>🎥 हर सेवा का वीडियो प्रमाण</span>
        </div>

      </div>
    </section>
  );
};
