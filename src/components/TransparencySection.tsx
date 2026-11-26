'use client';

import React from 'react';
import { TransparencyData, PublicSupporter } from '@/lib/types';
import { Heart, IndianRupee } from 'lucide-react';

interface TransparencySectionProps {
  transparency: TransparencyData;
  supporters: PublicSupporter[];
}

export const TransparencySection: React.FC<TransparencySectionProps> = ({
  transparency,
  supporters,
}) => {
  const income = Math.max(0, transparency.incomeAmount || 0);
  const expense = Math.max(0, transparency.expenseAmount || 0);
  const balance = income - expense;
  const expensePercent = income > 0 ? Math.min(100, Math.round((expense / income) * 100)) : 0;

  return (
    <section id="transparency" className="py-10 sm:py-14 px-4 bg-[#FFF7EA]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Income / Expense */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-amber-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#3B1F0A]">
              मासिक हिसाब-किताब
            </h2>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
              {transparency.monthLabel}
            </span>
          </div>

          <div className="space-y-3 my-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-sm font-bold text-emerald-900">कुल प्राप्त सहयोग (आया)</span>
              <span className="text-lg font-black text-emerald-700 flex items-center">
                <IndianRupee className="w-4 h-4" />
                {income.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-50 border border-orange-200">
              <span className="text-sm font-bold text-orange-950">सेवा में व्यय (खर्च)</span>
              <span className="text-lg font-black text-kesariya-700 flex items-center">
                <IndianRupee className="w-4 h-4" />
                {expense.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 text-sm font-bold text-[#5C4E44]">
              <span>शेष राशि (अगले माह के लिए)</span>
              <span className="font-black text-[#3B1F0A]">
                ₹{balance.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-amber-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-kesariya-600 rounded-full"
              style={{ width: `${expensePercent}%` }}
            />
          </div>
          <p className="text-xs text-[#6B5E55] leading-relaxed">
            {transparency.notes}
          </p>
        </div>

        {/* Recent Supporters */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#3B1F0A]">
              हाल के सेवा सहयोगी
            </h2>
            <Heart className="w-5 h-5 text-kesariya-600 fill-kesariya-600" />
          </div>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
            {supporters.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-[#FFFDF9] border border-amber-100 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-black text-[#3B1F0A] truncate">
                    {item.donor_name}
                  </div>
                  <div className="text-xs font-bold text-kesariya-700">
                    {item.category_name} {item.units_text ? `• ${item.units_text}` : ''}
                  </div>
                  {item.message && (
                    <p className="text-xs text-[#6B5E55] mt-1 line-clamp-2">
                      “{item.message}”
                    </p>
                  )}
                </div>
                <div className="text-base font-black text-emerald-700 shrink-0">
                  ₹{Number(item.amount).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
