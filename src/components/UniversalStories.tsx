'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { UNIVERSAL_COMPASSION_STORIES } from '@/lib/constants';

interface UniversalStoriesProps {
  onExploreSeva: () => void;
}

export const UniversalStories: React.FC<UniversalStoriesProps> = ({ onExploreSeva }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filters = [
    'All',
    'Ramayana (Sanatan)',
    'Mahabharata',
    'Mahadev (Lord Shiva)',
    'Sikh Tradition',
    'Islamic Tradition',
    'Buddhist Wisdom',
    'Jain Philosophy',
    'Christian Teachings',
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
            <span>12 Timeless Lessons • इतिहास और धर्म ग्रंथों की पावन सीख</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            दीन-दुखियों की सेवा ही सबसे बड़ा धर्म है:
            <span className="block mt-1 bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              Universal Wisdom Across World Faiths
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Ramayan aur Mahabharat se lekar Guru Nanak Dev Ji, Islam, Bhagwan Buddha, Mahavira aur Jesus Christ tak — har dharam aur granth ka ek hi sandesh hai: <strong>"Bhookhe ko khana khilana aur bejubaan jeevon ki jaan bachana hi sansaar ka sarvochha punya hai."</strong>
          </p>
        </div>

        {/* Filter Pills */}
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
              {filter === 'All' ? `All Stories (12)` : filter}
            </button>
          ))}
        </div>

        {/* Informative Header Bar (Without Misplaced Arrow Buttons) */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-900 bg-amber-100/70 px-3.5 py-1.5 rounded-xl border border-amber-200">
            <span>📖</span>
            <span>12 प्रेरक प्रसंग ({filteredStories.length} Inspiring Lessons)</span>
          </div>

          <div className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
            <span>Swipe karein ya arrows dabayein</span>
            <span className="text-base">👉</span>
          </div>
        </div>

        {/* Carousel Container with Arrows in the PROPER PLACE (Floating on the cards track) */}
        <div className="relative group">
          
          {/* Left Navigation Arrow - Positioned Directly on the Carousel Cards */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 border-2 border-amber-300 text-slate-800 flex items-center justify-center shadow-xl hover:bg-kesariya-600 hover:text-white hover:border-kesariya-600 active:scale-90 transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow - Positioned Directly on the Carousel Cards */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 border-2 border-amber-300 text-slate-800 flex items-center justify-center shadow-xl hover:bg-kesariya-600 hover:text-white hover:border-kesariya-600 active:scale-90 transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Next story"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Horizontal Scrollable Carousel Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-6 pt-2 px-1 sm:px-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          >
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="w-[300px] sm:w-[380px] shrink-0 snap-start glass-3d-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-2 border-amber-200 hover:border-kesariya-400 shadow-md transition-all"
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

                {/* Core Teaching Highlight Box */}
                <div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 font-bold mb-4 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-kesariya-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{story.coreTeaching}</span>
                  </div>

                  <button
                    type="button"
                    onClick={onExploreSeva}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-kesariya-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <Heart className="w-3.5 h-3.5 text-amber-400" />
                    <span>Is Prerna Se Judein (Support Seva)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Buttons Bar (Clean controls below track for phone users) */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-1">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-kesariya-600" /> Previous
          </button>
          <span className="text-[11px] text-slate-400 font-bold">• Swipe to explore •</span>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
          >
            Next <ChevronRight className="w-4 h-4 text-kesariya-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
