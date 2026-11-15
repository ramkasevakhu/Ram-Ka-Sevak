'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Heart, BookOpen } from 'lucide-react';
import { UNIVERSAL_COMPASSION_STORIES, CompassionStory } from '@/lib/constants';

interface UniversalStoriesProps {
  onExploreSeva: () => void;
}

export const UniversalStories: React.FC<UniversalStoriesProps> = ({ onExploreSeva }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filters = [
    'All',
    'सनातन (रामायण)',
    'महाभारत',
    'सनातन (महादेव)',
    'सिख परंपरा',
    'इस्लामिक शिक्षा',
    'बौद्ध दर्शन',
    'जैन दर्शन',
    'ईसाई शिक्षा',
  ];

  const filteredStories = selectedFilter === 'All'
    ? UNIVERSAL_COMPASSION_STORIES
    : UNIVERSAL_COMPASSION_STORIES.filter(s => s.faithCategory === selectedFilter);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="universal-stories" className="py-14 lg:py-20 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-xs sm:text-sm font-black text-amber-900 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-kesariya-600" />
            <span>इतिहास व धर्म ग्रंथों की 12 अमर सीख</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            सेवा ही सबसे बड़ा धर्म है:
            <span className="block mt-1 bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              सभी धर्मों व महापुरुषों की पावन प्रेरणा
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600">
            रामायण, महाभारत, महादेव, गुरु नानक, इस्लाम, बुद्ध, महावीर व ईसा मसीह—हर धर्म का एक ही सार है: <strong>"भूखे को अन्न और मूक जीव पर दया से बड़ा कोई पुण्य नहीं।"</strong>
          </p>
        </div>

        {/* Filter Pills (Scrollable horizontally) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar justify-start sm:justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-kesariya-600 text-white shadow-md shadow-kesariya-600/30'
                  : 'bg-slate-100 hover:bg-amber-100 text-slate-700 border border-slate-200'
              }`}
            >
              {filter === 'All' ? `सभी कथाएं (12)` : filter}
            </button>
          ))}
        </div>

        {/* Slider Controls Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            स्वाइप या एरो से आगे-पीछे देखें ({filteredStories.length} प्रेरक प्रसंग)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-slate-700 flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-slate-700 flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="w-[310px] sm:w-[380px] shrink-0 snap-start glass-3d-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-2 border-amber-200 hover:border-kesariya-400 shadow-md transition-all"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-3xl shadow-xs">
                    {story.icon}
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200 block">
                      {story.faithCategory}
                    </span>
                    <span className="text-[10px] font-bold text-kesariya-700 uppercase tracking-wider mt-1 block">
                      {story.tag}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs font-bold text-amber-700 mt-0.5 mb-3">
                  {story.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {story.description}
                </p>
              </div>

              {/* Core Moral Box */}
              <div className="pt-3 border-t border-amber-100">
                <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs font-bold text-amber-950 flex items-start gap-2">
                  <span className="text-kesariya-600 text-base leading-none">🚩</span>
                  <span className="leading-snug">{story.coreTeaching}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Small Bottom Callout Banner */}
        <div className="mt-8 rounded-2xl bg-amber-100/70 border border-amber-300 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤝</span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                सभी धर्मों का एक ही सार: दान और सेवा से धन कभी घटता नहीं
              </h4>
              <p className="text-xs text-slate-600">
                चाहे ₹50 का 1 भोजन हो या गाय को चारा, आपका हर सहयोग सीधे ज़रूरतमंद तक पहुँचता है।
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExploreSeva}
            className="shrink-0 px-6 py-2.5 rounded-xl bg-kesariya-600 hover:bg-kesariya-700 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            सेवा प्रकल्प देखें
          </button>
        </div>

      </div>
    </section>
  );
};
