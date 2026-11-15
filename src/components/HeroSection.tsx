'use client';

import React from 'react';
import { ShieldCheck, Video, ArrowDown, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  const scrollToMission = () => {
    const el = document.getElementById('seva-projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-14 lg:pt-16 lg:pb-20 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30">
      
      {/* Background Divine Golden Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-amber-200/40 via-kesariya-100/20 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Sacred Tagline Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-amber-300 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-kesariya-700 font-extrabold uppercase tracking-wide">
              {SITE_CONFIG.tagline}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">{SITE_CONFIG.domain}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-xs font-bold text-amber-900">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>100% Direct Ground Action • Har Rupaye Ka Hisaab</span>
          </div>
        </div>

        {/* Main Headline (25% Pure Hindi + 60% Hinglish + 15% English) */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="text-amber-600 font-extrabold tracking-widest text-xs sm:text-sm uppercase mb-3.5 flex items-center justify-center gap-2">
            <span>🚩</span>
            <span>॥ मर्यादा पुरुषोत्तम प्रभु श्री राम की पावन प्रेरणा ॥</span>
            <span>🚩</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] mb-6">
            मानव सेवा ही सबसे बड़ा धर्म है:
            <span className="block mt-2 bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 bg-clip-text text-transparent">
              Bhookhe ko Annadaan, Bejubaan Pashuon ki Raksha aur Free Medical Aid
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-8">
            Har dharm aur granth ka ek hi paavan sandesh hai — kisi majboor aur zarooratmand ki madad karna hi Ishwar ki sacchi pooja hai. 
            Hum Instagram reels (@{SITE_CONFIG.creatorUsername}) ke madhyam se directly zameen par utarkar roadside beghar buzurgon ko garam thali khana, injured animals ka ilaaj aur gareeb marizon ko dawaaiyan deliver karte hain.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={scrollToMission}
              className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>4 Pavitra Seva Sankalp Dekhein</span>
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </button>

            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 font-extrabold text-slate-800 text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Video className="w-4 h-4 text-pink-600" />
              <span>Watch Ground Reels (@{SITE_CONFIG.creatorUsername})</span>
            </a>
          </div>
        </div>

        {/* Authentic Indian Seva Photo Grid (Replacing 'Project' with 'Seva 01', etc.) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 mb-14">
          
          {/* Annadaan / Food Relief */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="/images/annadaan-seva.jpg"
              alt="Annadaan Hot Meal Seva"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                Seva 01 • Food Relief
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                Annadaan & Garam Thali
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 font-semibold hidden sm:block">4 Tazi Roti, Sabzi, Dal-Chawal</p>
            </div>
          </div>

          {/* Desi Cow / Animal Care */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="/images/gau-pashu-seva.jpg"
              alt="Cow & Stray Animal Care"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                Seva 02 • Animal Care
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                Gau Seva & Street Dogs
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 font-semibold hidden sm:block">Doodh, Roti, Chara & First-Aid</p>
            </div>
          </div>

          {/* Medical Support */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="/images/medical-seva.jpg"
              alt="Hospital Patient Support"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-300">
                Seva 03 • Medical Aid
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                Doctor & Hospital Support
              </h4>
              <p className="text-xs text-rose-200/90 mt-1 font-semibold hidden sm:block">Direct Chemist & Bed Relief</p>
            </div>
          </div>

          {/* Disaster Relief Supplies */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="/images/disaster-seva.jpg"
              alt="Disaster Relief Packaging"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-300">
                Seva 04 • Disaster Aid
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                Aapda & Emergency Relief
              </h4>
              <p className="text-xs text-orange-200/90 mt-1 font-semibold hidden sm:block">Tripal, Sukha Ration & Saaf Paani</p>
            </div>
          </div>

        </div>

        {/* 3 Real Human Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-black text-lg">
              01
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">100% Grassroots Seva</h4>
              <p className="text-xs text-slate-500 mt-0.5">Aapka diya har ek rupaya directly garam khana, davaai aur pashu chara me lagta hai.</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 font-black text-lg">
              02
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">Direct Video Proof on Reels</h4>
              <p className="text-xs text-slate-500 mt-0.5">Har hafte social media (@{SITE_CONFIG.creatorUsername}) par transparent ground video updates.</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-800 shrink-0 font-black text-lg">
              03
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">0% Middlemen • Direct Handover</h4>
              <p className="text-xs text-slate-500 mt-0.5">Seedha zarooratmand ke haathon me madad, zero commission ya cut.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
