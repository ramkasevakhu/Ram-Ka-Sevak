'use client';

import React from 'react';
import { DETAILED_SEVA_CATEGORIES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

interface SevaProjectsProps {
  onSelectSeva: (categoryId: string, defaultAmount: number) => void;
}

export const SevaProjects: React.FC<SevaProjectsProps> = ({ onSelectSeva }) => {
  return (
    <section id="seva-sankalp" className="py-10 sm:py-14 px-4 bg-[#FFFDF9]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
            हमारे 4 सेवा संकल्प
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E55] mt-1">
            प्रत्येक सेवा में आपका सहयोग सीधे ज़रूरतमंदों तक पहुँचता है
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DETAILED_SEVA_CATEGORIES.map((seva) => {
            const defaultOpt = seva.options.find((o) => o.popular) || seva.options[0];
            return (
              <div
                key={seva.id}
                className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-amber-100 overflow-hidden">
                    <img
                      src={seva.imageUrl}
                      alt={seva.imageAlt}
                      width={640}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[#3B1F0A] text-xs font-black shadow-xs">
                      {seva.tabNumber}. {seva.shortName}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-black text-[#3B1F0A] mb-1">
                      {seva.titleHindi}
                    </h3>
                    <p className="text-sm text-[#5C4E44] leading-snug mb-3">
                      {seva.shortDesc}
                    </p>
                    <div className="text-xs font-extrabold text-kesariya-700 bg-amber-50 px-2.5 py-1.5 rounded-lg inline-block">
                      शुरुआत ₹{seva.unitCost} से • {seva.unitLabel}
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <button
                    type="button"
                    onClick={() => onSelectSeva(seva.id, defaultOpt.amount)}
                    className="w-full min-h-[48px] rounded-xl bg-amber-100 hover:bg-kesariya-600 hover:text-white text-[#3B1F0A] font-extrabold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>सेवा चुनें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
