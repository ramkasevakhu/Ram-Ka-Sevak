'use client';

import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Video,
  ShieldCheck
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const CreatorTrustSection: React.FC = () => {
  return (
    <section id="creator-trust" className="py-14 lg:py-20 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/60 border-t border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs sm:text-sm font-bold text-emerald-800 mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Genuine Grassroots Seva • Direct Accountability</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Social Media Reels Se Zameeni Haqeeqat Tak
            <span className="block mt-1 bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              Direct Ground Action, Bina Kisi Commission Ke
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Aapne Instagram reels par humara ground distribution work dekha hai. 
            <strong> {SITE_CONFIG.domain} </strong> humara official seva platform hai jahan aapka ek-ek rupaya seedha zarooratmand tak pahunchta hai bina kisi middleman ya NGO cut ke.
          </p>
        </div>

        {/* Unified High-Trust Creator & Reels Showcase */}
        <div className="max-w-4xl mx-auto glass-3d-card rounded-3xl p-6 sm:p-10 border-2 border-amber-300/80 shadow-xl">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
            {/* Real User Profile Photo Uploaded by Vipu */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-kesariya-500 to-amber-300 shadow-xl shadow-kesariya-600/20">
              <img
                src="/vipu-profile.jpg"
                alt="Vipu - Ram Ka Sevak"
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
              <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white font-bold shadow-md">
                ✓
              </span>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                  Individual Seva Lead • 5-Member Ground Team
                </span>
                <span className="text-xs font-bold text-kesariya-700">
                  @{SITE_CONFIG.creatorUsername}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                राम का सेवक (Ram Ka Sevak)
              </h3>
              
              <p className="text-xs sm:text-sm text-kesariya-700 font-bold mt-0.5 mb-3">
                सेवा ही भक्ति है • Ground Action by {SITE_CONFIG.creatorName} (@{SITE_CONFIG.creatorUsername}) & 5-Member Team
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
                &ldquo;हमारा संकल्प बिल्कुल स्पष्ट है: न कोई सड़क पर भूखा सोए, न कोई बेज़ुबान पशु बिना दवाई के तड़पे, और न किसी गरीब परिवार का अस्पताल इलाज रुके। हर एक सहयोग को हम प्रभु का आशीर्वाद मानकर सीधे ज़मीन पर ज़रूरतमंद तक पहुँचाते हैं।&rdquo;
              </p>

              {/* Payment Gateway & Compliance Explanation (Why Individual, Not Trust/NGO) */}
              <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-amber-300/80 shadow-2xs space-y-2.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    पहल की संरचना व वैधानिक स्थिति (About Team & Legal Status)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80">
                    <strong className="text-amber-950 block mb-1">
                      1. व्यक्तिगत व 5 लोगों की ऑन-ग्राउंड टीम:
                    </strong>
                    यह कोई औपचारिक पंजीकृत NGO या कॉर्पोरेट ट्रस्ट नहीं है। इसे <strong>विपु (@vipuone) और हमारी 5 समर्पित युवाओं की टीम</strong> व्यक्तिगत रूप से ज़मीन पर संचालित करती है, ताकि 100% सहयोग बिना किसी प्रशासनिक कटौती या मध्यस्थ के सीधे राशन और सेवा में लगे।
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                    <strong className="text-emerald-950 block mb-1">
                      2. पेमेंट गेटवे व वित्तीय स्पष्टता (No 80G Claim):
                    </strong>
                    यहाँ दिया जाने वाला प्रत्येक सहयोग धर्मार्थ व स्वैच्छिक है। व्यक्तिगत सेवा पहल होने के कारण इस पर 80G या टैक्स छूट उपलब्ध नहीं है। प्रत्येक कार्य की वीडियो रिकॉर्डिंग और दैनिक हिसाब सोशल मीडिया रील्स पर सार्वजनिक रहता है।
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof & Reels Links Banner */}
          <div className="pt-6 border-t border-amber-200/80">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Verified Social Channels & Ground Evidence
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Live Ground Updates Dekhein
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Instagram */}
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-pink-50/70 border border-slate-200 hover:border-pink-300 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold leading-none">Instagram Reels</span>
                    <span className="text-xs font-black text-slate-800 group-hover:text-pink-600">
                      @{SITE_CONFIG.creatorUsername}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600" />
              </a>

              {/* YouTube */}
              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-red-50/70 border border-slate-200 hover:border-red-300 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold leading-none">YouTube Channel</span>
                    <span className="text-xs font-black text-slate-800 group-hover:text-red-600">
                      @{SITE_CONFIG.creatorUsername}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600" />
              </a>

              {/* Facebook */}
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold leading-none">Facebook Page</span>
                    <span className="text-xs font-black text-slate-800 group-hover:text-blue-600">
                      {SITE_CONFIG.creatorUsername}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </a>

              {/* Official Email */}
              <a
                href={`mailto:${SITE_CONFIG.officialEmail}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold leading-none">Official Email</span>
                    <span className="text-xs font-black text-slate-800 group-hover:text-amber-700 truncate">
                      {SITE_CONFIG.officialEmail}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700" />
              </a>
            </div>
          </div>

          {/* Quick Reel Watch Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-kesariya-500/10 to-amber-500/10 border border-amber-300 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-kesariya-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-slate-900 text-sm">Watch Weekly Ground Seva Reels</h5>
                <p className="text-xs text-slate-600">Food distribution, Gau Mata seva aur hospital patient relief ki live video documentation dekhein.</p>
              </div>
            </div>

            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-kesariya-600 hover:bg-kesariya-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:scale-102 transition-transform"
            >
              <span>Watch Reels (@{SITE_CONFIG.creatorUsername})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
