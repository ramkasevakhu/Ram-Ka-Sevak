'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { UNIVERSAL_COMPASSION_STORIES } from '@/lib/constants';

export const UniversalStories: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleStories = showAll
    ? UNIVERSAL_COMPASSION_STORIES
    : UNIVERSAL_COMPASSION_STORIES.slice(0, 3);

  return (
    <section id="kathayein" className="py-10 sm:py-14 px-4 bg-[#FFF7EA]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-7">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-kesariya-700" />
            <span>12 पावन प्रेरणा प्रसंग</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
            सेवा की 12 पावन कथाएँ
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E55] mt-1">
            सभी धर्मों और ग्रंथों का एक ही संदेश — दीन-दुखियों की सेवा ही परम धर्म है
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleStories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-2xl border border-amber-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl" aria-hidden="true">{story.icon}</span>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                    {story.faithCategory}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#3B1F0A] leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs font-bold text-kesariya-700 mt-0.5 mb-2">
                  {story.subtitle}
                </p>
                <p className="text-sm text-[#5C4E44] leading-relaxed">
                  {story.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-100 text-xs font-extrabold text-[#3B1F0A]">
                ॥ {story.coreTeaching} ॥
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="min-h-[48px] px-6 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 text-[#3B1F0A] font-extrabold text-sm sm:text-base inline-flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {showAll ? (
              <>
                <span>कम देखें</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>और देखें (बाकी 9 कथाएँ)</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
