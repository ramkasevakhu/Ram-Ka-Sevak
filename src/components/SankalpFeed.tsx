'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';
import { INITIAL_COMMUNITY_BLESSINGS } from '@/lib/constants';
import { SankalpBlessing } from '@/lib/types';

export const SankalpFeed: React.FC = () => {
  const [blessings, setBlessings] = useState<SankalpBlessing[]>(INITIAL_COMMUNITY_BLESSINGS);

  useEffect(() => {
    const fetchBlessings = async () => {
      try {
        const res = await fetch('/api/sankalp');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setBlessings(data);
          }
        }
      } catch (e) {
        // Fallback remains initial data
      }
    };

    fetchBlessings();
  }, []);

  // Duplicate for seamless infinite loop
  const marqueeItems = [...blessings, ...blessings];

  return (
    <section id="sankalp-wall" className="py-16 lg:py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs sm:text-sm font-bold text-amber-800 mb-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-kesariya-600" />
          <span>लाइव जन-आशीर्वाद • Community Blessings</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          दानी सज्जनों के
          <span className="bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
            {' '}शुभ संकल्प व प्रार्थनाएं
          </span>
        </h2>

        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Jo log dil se is pavitra abhiyan me jude hain, unka aashirwaad aur ground impact (Auto-scroll feed).
        </p>
      </div>

      {/* Horizontal Auto-Scrolling Carousel with Edge Fade Masks */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left & Right Gradient Fog Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="animate-marquee flex items-stretch gap-5 py-4 px-4 cursor-pointer">
          {marqueeItems.map((b, idx) => (
            <div
              key={`${b.id}-${idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 p-6 rounded-3xl bg-white border-2 border-amber-200/90 shadow-md hover:shadow-xl hover:border-kesariya-400 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Donor & Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-kesariya-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                      {b.donorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
                        {b.donorName}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {b.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Category & Units Badge */}
                <div className="mb-3">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-2.5 py-1 rounded-lg">
                    {b.categoryName}
                  </span>
                  <div className="text-xs font-semibold text-slate-700 mt-1.5">
                    यूनिट: <span className="text-kesariya-700 font-bold">{b.unitsText}</span>
                  </div>
                </div>

                {/* Message */}
                {b.message && (
                  <p className="text-xs text-slate-600 italic bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 mb-4 line-clamp-3">
                    "{b.message}"
                  </p>
                )}
              </div>

              {/* Amount Donated */}
              <div className="flex items-center justify-between pt-3 border-t border-amber-100 text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-kesariya-500 text-kesariya-500" />
                  पावन सहयोग
                </span>
                <span className="font-black text-base text-slate-900">
                  ₹{b.amount.toLocaleString('en-IN')}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      <div className="text-center mt-6 text-xs text-slate-400 font-medium">
        👆 कार्ड पर माउस रखने (Hover / Tap) से स्क्रॉल रुक जाएगा
      </div>
    </section>
  );
};
