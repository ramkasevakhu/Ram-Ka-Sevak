'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Instagram, 
  Youtube, 
  Facebook, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  CheckCircle,
  Video
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const CreatorTrustSection: React.FC = () => {
  return (
    <section id="creator-trust" className="py-16 lg:py-24 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/70 border-t border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs sm:text-sm font-bold text-emerald-800 mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% प्रामाणिक व पारदर्शी सेवा</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            रील्स से लेकर ज़मीनी हक़ीक़त तक
            <span className="block mt-1 bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              ग्राउंड सेवा की पहचान — @{SITE_CONFIG.creatorUsername}
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Aapne Instagram aur YouTube par hamara ground kaam dekha hai. 
            <strong> {SITE_CONFIG.domain} </strong> ko isliye banaya gaya hai taaki Prabhu Shri Ram ki sakshi me har ek rupaye ka hisaab aur direct ground seva ho sake.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Creator Identity Card */}
          <div className="lg:col-span-5 glass-3d-card rounded-3xl p-8 border-2 border-amber-200">
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-kesariya-500 to-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-white">
                V
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {SITE_CONFIG.creatorName} ({SITE_CONFIG.creatorUsername})
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-kesariya-700 font-semibold">
                  Founder & Ground Sevak • {SITE_CONFIG.domain}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              "Mera lakshya hai ki sadak par koi bhookha na soye, koi ghayal jeev bina dawai ke na tadpe, aur kisi garib parivaar ka sadasya paiso ki kami se hospital me la-ilaaj na rahe. Har ek bhent ko hum prabhu ka aashirwaad maan kar ground par lagate hain."
            </p>

            {/* Verified Social Handles */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                ऑफिशियल सोशल मीडिया व संपर्क
              </span>

              {/* Instagram */}
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-pink-50 border border-slate-200 hover:border-pink-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block leading-none">Instagram Reels</span>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-pink-600">
                      @{SITE_CONFIG.creatorUsername}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-pink-600" />
              </a>

              {/* YouTube */}
              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block leading-none">YouTube Channel</span>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-red-600">
                      @{SITE_CONFIG.creatorUsername}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
              </a>

              {/* Facebook */}
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block leading-none">Facebook Page</span>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600">
                      {SITE_CONFIG.creatorUsername}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </a>

              {/* Official Email */}
              <a
                href={`mailto:${SITE_CONFIG.officialEmail}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block leading-none">Official Inquiry Email</span>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-amber-700">
                      {SITE_CONFIG.officialEmail}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-700" />
              </a>
            </div>

          </div>

          {/* Right Column: Zero Fake Transparency Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-xl bg-amber-100 text-kesariya-700">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  हमार संकल्प: १००% शुद्ध सेवा (No Fake Drama)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>सच्चा ग्राउंड वर्क</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Rozana sadak par jaakar seedhe haatho se garibo ko khana aur bimaar jeevo ko ilaj milta hai.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>कोई फ़र्ज़ी टाइमर नहीं</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Yahan koi fake countdown ya fabricated pressure nahi banaya jata. Yeh hamesha chalne wali pavitra seva hai.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>सीधा UPI भुगतान</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    0% platform commission — aapka paisa seedhe seva account me transfer hota hai.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>डिजिटल सेवा रसीद</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Har donor ko turant unke yogdan aur sankalp ki verified digital receipt milti hai.
                  </p>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-kesariya-500/10 to-amber-500/10 border border-amber-300 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-kesariya-600 text-white flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">देखें ग्राउंड सेवा की ताज़ा रील्स</h5>
                    <p className="text-xs text-slate-600">Har hafte naye logo aur be-sahara jeevo ki sahayata video updates.</p>
                  </div>
                </div>

                <a
                  href={SITE_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-kesariya-600 hover:bg-kesariya-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <span>रील्स देखें</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
