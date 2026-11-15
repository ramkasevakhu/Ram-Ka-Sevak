'use client';

import React from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { RAM_SEVA_STORIES, SITE_CONFIG } from '@/lib/constants';

interface RamSevaStoriesProps {
  onDonateNow: () => void;
}

export const RamSevaStories: React.FC<RamSevaStoriesProps> = ({ onDonateNow }) => {
  return (
    <section id="ram-seva-stories" className="py-16 lg:py-24 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-xs sm:text-sm font-black text-amber-900 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-kesariya-600" />
            <span>पावन प्रेरणा • {SITE_CONFIG.tagline}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            प्रभु श्री राम का दिव्य संदेश:
            <span className="block mt-1 bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              सेवा ही भक्ति है, सेवा से बड़ा कोई धर्म नहीं
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            मर्यादा पुरुषोत्तम प्रभु श्री राम ने अपने जीवन के हर प्रसंग में यही सिखाया कि भूखों को अन्न देना, मूक जीवों की रक्षा करना और असहायों की मदद करना ही सबसे बड़ी ईश्वर भक्ति है।
          </p>
        </div>

        {/* 3 Divine Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {RAM_SEVA_STORIES.map((story) => (
            <div
              key={story.id}
              className="glass-3d-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-amber-200/80 hover:border-kesariya-400/90 relative"
            >
              <div>
                {/* Story Emoji Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 flex items-center justify-center text-3xl mb-5 shadow-sm">
                  {story.icon}
                </div>

                <div className="mb-2">
                  <span className="text-xs font-bold text-kesariya-700 uppercase tracking-wider">
                    {story.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mt-1">
                    {story.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed my-4">
                  {story.description}
                </p>
              </div>

              {/* Moral Box */}
              <div className="pt-4 border-t border-amber-200/60 mt-2">
                <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                  <span className="text-kesariya-600 text-base">🚩</span>
                  <span>{story.moral}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Powerful Conversion Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-kesariya-600 to-kesariya-700 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>गिलहरी जैसा छोटा सहयोग भी प्रभु को स्वीकार्य है</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-2">
              बड़ा दानी होने का इंतज़ार मत कीजिए — ₹50 से शुरुआत करें
            </h3>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              अगर आप केवल 1 व्यक्ति को भोजन (₹50) या 1 मूक जीव को आहार (₹50) भी देते हैं, तो प्रभु श्री राम की नज़रों में आपका यह संकल्प किसी महायज्ञ से कम नहीं है।
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={onDonateNow}
              className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-white text-kesariya-700 hover:bg-amber-50 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-kesariya-600 text-kesariya-600" />
              <span>आज ही सेवा संकल्प लें</span>
              <ArrowRight className="w-4 h-4 text-kesariya-600" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
