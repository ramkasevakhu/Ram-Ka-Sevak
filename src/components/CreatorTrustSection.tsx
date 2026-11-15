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
  ShieldCheck,
  Heart
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
            <span>100% प्रामाणिक व पारदर्शी सेवा</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            रील्स से लेकर ज़मीनी हक़ीक़त तक
            <span className="block mt-1 bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              प्रत्यक्ष सेवा, निष्कपट भाव
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Social media reels par aapne hamara zameeni kaam dekha hai. 
            <strong> {SITE_CONFIG.domain} </strong> ka maksad hai ki bina kisi bicholiye ke, sidha zarooratmand tak prabhu ki seva pahuche.
          </p>
        </div>

        {/* Unified High-Trust Creator & Reels Showcase (Cleaned, No Fake Drama Box) */}
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
                  Ground Seva Lead
                </span>
                <span className="text-xs font-bold text-kesariya-700">
                  @{SITE_CONFIG.creatorUsername}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                राम का सेवक (Ram Ka Sevak)
              </h3>
              
              <p className="text-xs sm:text-sm text-kesariya-700 font-bold mt-0.5 mb-3">
                सेवा ही भक्ति है • Ground Action by {SITE_CONFIG.creatorName} (@{SITE_CONFIG.creatorUsername})
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80">
                "Humara lakshya spasht hai — sadak par koi bhookha na tarse, koi mook jeev bina ilaj ke na dam tode, aur kisi garib parivaar ka sadasya paiso ki kami se hospital me la-ilaaj na rahe. Har ek bhent ko hum prabhu Ram ka aashirwaad maan kar ground par lagate hain."
              </p>
            </div>
          </div>

          {/* Social Proof & Reels Links Banner */}
          <div className="pt-6 border-t border-amber-200/80">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                ऑफिशियल सोशल मीडिया व रील्स प्रमाण (Verified Handles)
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Live Ground Updates
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
                    <span className="text-[10px] text-slate-400 block font-semibold leading-none">Direct Email</span>
                    <span className="text-xs font-black text-slate-800 group-hover:text-amber-700 truncate">
                      Inquiries
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
                <h5 className="font-extrabold text-slate-900 text-sm">देखें ग्राउंड सेवा की असली रील्स</h5>
                <p className="text-xs text-slate-600">Har hafte naye logo aur be-sahara jeevo ki sahayata video updates.</p>
              </div>
            </div>

            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-kesariya-600 hover:bg-kesariya-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:scale-102 transition-transform"
            >
              <span>रील्स देखें (@{SITE_CONFIG.creatorUsername})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
