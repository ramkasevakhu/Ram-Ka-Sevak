'use client';

import React from 'react';
import { Utensils, HeartHandshake, IndianRupee } from 'lucide-react';
import { ImpactCounters as ImpactCountersType } from '@/lib/types';

interface ImpactCountersProps {
  counters: ImpactCountersType;
}

export const ImpactCounters: React.FC<ImpactCountersProps> = ({ counters }) => {
  const items = [
    {
      label: 'लोगों को भोजन',
      value: counters.mealsServed.toLocaleString('en-IN') + '+',
      icon: Utensils,
      accent: 'bg-orange-100 text-kesariya-700',
    },
    {
      label: 'पशुओं का इलाज',
      value: counters.animalsTreated.toLocaleString('en-IN') + '+',
      icon: HeartHandshake,
      accent: 'bg-amber-100 text-amber-800',
    },
    {
      label: 'कुल सेवा सहयोग',
      value: '₹' + counters.totalDonationsAmount.toLocaleString('en-IN'),
      icon: IndianRupee,
      accent: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <section aria-label="सेवा प्रभाव आंकड़े" className="py-5 px-4 bg-[#FFFDF9] border-y border-amber-200/70">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2.5 sm:gap-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-3 sm:p-5 border border-amber-200/80 shadow-xs text-center flex flex-col items-center justify-center"
            >
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${item.accent} flex items-center justify-center mb-1.5`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-base sm:text-2xl font-black text-[#3B1F0A] leading-tight">
                {item.value}
              </div>
              <div className="text-[11px] sm:text-sm font-bold text-[#6B5E55] mt-0.5 leading-snug">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
