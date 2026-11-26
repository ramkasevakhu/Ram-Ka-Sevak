'use client';

import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, BookOpen } from 'lucide-react';
import { UNIVERSAL_COMPASSION_STORIES } from '@/lib/constants';

export const UniversalStories: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleSlide = (dir: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const step = Math.min(340, trackRef.current.clientWidth * 0.85);
    trackRef.current.scrollBy({
      left: dir === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  return (
    <section id="kathayein" className="py-10 sm:py-12 px-4 bg-[#FFF7EA]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-kesariya-700" />
              <span>सभी धर्मों की सेवा-भावना</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
              प्रेरक कथाएँ
            </h2>
            <p className="text-sm text-[#6B5E55] mt-1">
              दीन-दुखियों की सेवा ही सभी ग्रंथों का परम संदेश है
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
            {!isExpanded && (
              <>
                <button
                  type="button"
                  onClick={() => handleSlide('prev')}
                  aria-label="पिछली कथा"
                  className="w-10 h-10 rounded-full border border-amber-300 bg-white hover:bg-kesariya-600 hover:text-white text-[#3B1F0A] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSlide('next')}
                  aria-label="अगली कथा"
                  className="w-10 h-10 rounded-full border border-amber-300 bg-white hover:bg-kesariya-600 hover:text-white text-[#3B1F0A] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="min-h-[40px] px-4 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-[#3B1F0A] font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <span>स्लाइडर में देखें</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>सभी 12 देखें</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className={
            isExpanded
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar'
          }
        >
          {UNIVERSAL_COMPASSION_STORIES.map((story) => (
            <article
              key={story.id}
              className={`bg-white rounded-2xl border border-amber-200 p-4 shadow-xs flex flex-col justify-between ${
                isExpanded
                  ? ''
                  : 'w-[82vw] max-w-[310px] sm:w-[300px] shrink-0 snap-start'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xl" aria-hidden="true">{story.icon}</span>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {story.faithCategory}
                  </span>
                </div>
                <h3 className="text-base font-black text-[#3B1F0A] leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs font-bold text-kesariya-700 mt-0.5 mb-2">
                  {story.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#5C4E44] leading-relaxed line-clamp-3">
                  {story.summary}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-amber-100 text-xs font-extrabold text-[#3B1F0A]">
                ॥ {story.coreTeaching} ॥
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
