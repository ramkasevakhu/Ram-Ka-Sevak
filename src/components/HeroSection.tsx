'use client';

import React from 'react';
import { ShieldCheck, Heart, Sparkles, ArrowDown, Users, Flame } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  const scrollToCategories = () => {
    const el = document.getElementById('seva-categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStories = () => {
    const el = document.getElementById('ram-seva-stories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/30">
      
      {/* Background Divine Golden Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-amber-200/40 via-kesariya-100/20 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-amber-300/80 shadow-xs text-xs sm:text-sm font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-kesariya-700 font-extrabold uppercase tracking-wide">
              {SITE_CONFIG.tagline}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">{SITE_CONFIG.domain}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-xs font-bold text-amber-900">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>100% Genuine Ground Action</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="text-amber-600 font-extrabold tracking-widest text-xs sm:text-sm uppercase mb-3.5 flex items-center justify-center gap-2">
            <span>🚩</span>
            <span>॥ मर्यादा पुरुषोत्तम प्रभु श्री राम की पावन प्रेरणा ॥</span>
            <span>🚩</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] mb-6">
            सेवा ही भक्ति है:
            <span className="block mt-2 bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 bg-clip-text text-transparent">
              भूखों को अन्नदान, मूक जीवों की रक्षा व मरीज़ों का सहारा
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-9">
            प्रभु श्री राम ने सिखाया है कि दुखी, बे-सहारा और मूक जीवों की सेवा से बड़ी कोई पूजा नहीं है।
            यहाँ आपका <strong className="text-slate-900 font-extrabold">₹50 का भी सहयोग</strong> सीधे सड़क किनारे भूखों, बेसहारा गौ-माता और गंभीर मरीज़ों तक पहुँचता है।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={scrollToCategories}
              className="btn-divine-3d text-white font-extrabold text-base sm:text-lg px-9 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center cursor-pointer shadow-xl hover:scale-102 transition-transform"
            >
              <Heart className="w-5 h-5 fill-white text-white" />
              <span>4 Seva Causes देखें (Donate Now)</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              onClick={scrollToStories}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-amber-50/80 border-2 border-amber-300 font-extrabold text-slate-800 text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span>📖</span>
              <span>प्रभु राम की सेवा कथाएं (Inspiration)</span>
            </button>
          </div>
        </div>

        {/* Visual Realistic Photo Collage Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 mb-16">
          
          {/* Photo 1: Annadaan */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-52 sm:h-72 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"
              alt="Annadaan Hot Meals"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                01 • अन्नदान सेवा
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                ताज़ा भरपेट भोजन
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 font-semibold hidden sm:block">1 Meal = ₹50</p>
            </div>
          </div>

          {/* Photo 2: Gau & Street Dogs */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-52 sm:h-72 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80"
              alt="Animal & Cow Care"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                02 • मूक जीव व गौ सेवा
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                गौ-ग्रास व डॉग फीडिंग
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 font-semibold hidden sm:block">1 Animal Feed = ₹50</p>
            </div>
          </div>

          {/* Photo 3: Medical Emergency */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-52 sm:h-72 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
              alt="Hospital Patient Support"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-300">
                03 • आपातकालीन चिकित्सा
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                दवा व ऑपरेशन सहायता
              </h4>
              <p className="text-xs text-rose-200/90 mt-1 font-semibold hidden sm:block">Hospital Bed & Surgery</p>
            </div>
          </div>

          {/* Photo 4: Disaster Relief */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-52 sm:h-72 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80"
              alt="Disaster Relief Kits"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-300">
                04 • आपदा राहत कोष
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                बाढ़ व विपदा राहत किट
              </h4>
              <p className="text-xs text-orange-200/90 mt-1 font-semibold hidden sm:block">1 Relief Kit = ₹250</p>
            </div>
          </div>

        </div>

        {/* 3 Core Trust Badges with English Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-black text-lg">
              01
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">4 Evergreen Seva Causes</h4>
              <p className="text-xs text-slate-500 mt-0.5">कभी एक्सपायर न होने वाले 4 लाइफटाइम पिलर्स</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 font-black text-lg">
              02
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">Live Multiplier Calculator</h4>
              <p className="text-xs text-slate-500 mt-0.5">1, 5, 10 या 50 व्यक्तियों के भोजन का सीधा हिसाब</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-800 shrink-0 font-black text-lg">
              03
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">0% Commission • 100% Seva</h4>
              <p className="text-xs text-slate-500 mt-0.5">सीधा UPI द्वारा 100% ज़मीनी सेवा में उपयोग</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
