'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, ShieldCheck, MessageCircle } from 'lucide-react';
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

  return (
    <section id="sankalp-wall" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs sm:text-sm font-bold text-amber-800 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-kesariya-600" />
            <span>पावन संकल्प व जन-आशीर्वाद</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            सेवक परिवार के
            <span className="bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              {' '}शुभ संकल्प व प्रार्थनाएं
            </span>
          </h2>

          <p className="mt-3 text-base text-slate-600">
            Jo log dil se is pavitra abhiyan me jude hain, unka aashirwaad aur ground impact.
          </p>
        </div>

        {/* Blessings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blessings.map((b) => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Donor & Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-kesariya-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {b.donorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">
                        {b.donorName}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {b.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
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
                    यूनिट: <span className="text-kesariya-700">{b.unitsText}</span>
                  </div>
                </div>

                {/* Message */}
                {b.message && (
                  <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-amber-100 mb-4">
                    "{b.message}"
                  </p>
                )}
              </div>

              {/* Amount Donated */}
              <div className="flex items-center justify-between pt-3 border-t border-amber-100/80 text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-kesariya-500 text-kesariya-500" />
                  पावन सहयोग
                </span>
                <span className="font-extrabold text-sm text-slate-900">
                  ₹{b.amount.toLocaleString('en-IN')}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
