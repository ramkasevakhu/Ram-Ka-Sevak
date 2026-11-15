'use client';

import React from 'react';
import { ShieldCheck, Video, ArrowDown } from 'lucide-react';
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
            <span>सच्ची ज़मीनी सेवा • 100% Direct Ground Action</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="text-amber-600 font-extrabold tracking-widest text-xs sm:text-sm uppercase mb-3.5 flex items-center justify-center gap-2">
            <span>🚩</span>
            <span>॥ मर्यादा पुरुषोत्तम प्रभु श्री राम की पावन प्रेरणा ॥</span>
            <span>🚩</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] mb-6">
            सेवा ही भक्ति है:
            <span className="block mt-2 bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 bg-clip-text text-transparent">
              भूखों को अन्नदान, मूक जीवों की रक्षा व असहायों का सहारा
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-8">
            संसार के हर धर्म और महापुरुषों ने सिखाया है कि दुखी, बेसहारा और मूक जीवों की सेवा से बढ़कर कोई पूजा नहीं है।
            हम सोशल मीडिया रील्स के ज़रिए ज़मीन पर उतरकर सीधे ज़रूरतमंदों तक भोजन, दवा और सहारा पहुँचाते हैं।
          </p>

          {/* Humble Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={scrollToMission}
              className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>हमारा सेवा प्रकल्प देखें</span>
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </button>

            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-amber-300 font-extrabold text-slate-800 text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Video className="w-4 h-4 text-pink-600" />
              <span>ग्राउंड रील्स देखें (@{SITE_CONFIG.creatorUsername})</span>
            </a>
          </div>
        </div>

        {/* Authentic Indian Seva Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 mb-14">
          
          {/* Indian Food / Annadaan */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
              alt="Indian Annadaan Seva"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                अन्नदान सेवा
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                ताज़ा भरपेट भोजन
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 font-semibold hidden sm:block">4 रोटी, सब्ज़ी, दाल-चावल</p>
            </div>
          </div>

          {/* Indian Desi Cow / Gau-Mata */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80"
              alt="Indian Sacred Cow Seva"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                मूक जीव व गौ सेवा
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                गौ-ग्रास व डॉग फीडिंग
              </h4>
              <p className="text-xs text-amber-200/90 mt-1 font-semibold hidden sm:block">दूध, रोटी, चारा व दवा</p>
            </div>
          </div>

          {/* Indian Doctor / Medical Support */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
              alt="Indian Hospital Patient Support"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-300">
                आपातकालीन चिकित्सा
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                दवा व डॉक्टर सहायता
              </h4>
              <p className="text-xs text-rose-200/90 mt-1 font-semibold hidden sm:block">सीधे अस्पताल पर्ची भुगतान</p>
            </div>
          </div>

          {/* Indian Disaster / Relief Supplies */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-amber-200/90 shadow-md h-48 sm:h-64 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1605289982774-9a6fef564df8?auto=format&fit=crop&w=600&q=80"
              alt="Disaster Relief Packaging"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-300">
                आपदा राहत कोष
              </span>
              <h4 className="font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                बाढ़ व विपदा राहत
              </h4>
              <p className="text-xs text-orange-200/90 mt-1 font-semibold hidden sm:block">तिरपाल, राशन व स्वच्छ जल</p>
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
              <h4 className="font-extrabold text-slate-900 text-sm">100% निस्वार्थ जनसेवा</h4>
              <p className="text-xs text-slate-500 mt-0.5">हर सहयोग सीधे भोजन, दवा व बेज़ुबान जीवों पर खर्च</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 font-black text-lg">
              02
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">प्रत्यक्ष ज़मीनी वीडियो प्रमाण</h4>
              <p className="text-xs text-slate-500 mt-0.5">रील्स पर हर ग्राउंड सेवा का सच्चा व पारदर्शी अपडेट</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-800 shrink-0 font-black text-lg">
              03
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">0% बिचोलिया • सीधा उपयोग</h4>
              <p className="text-xs text-slate-500 mt-0.5">सीधे ग्राउंड पर हाथ से ज़रूरतमंदों तक सामान वितरण</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
