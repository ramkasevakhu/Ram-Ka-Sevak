'use client';

import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Mail, 
  Heart, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer id="contact-transparency" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sanskrit Pavitra Shloka Banner */}
        <div className="text-center pb-12 border-b border-slate-800">
          <p className="text-amber-400 font-bold tracking-widest text-sm sm:text-base mb-2">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
          </p>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            "Sabhi sukhi rahein, sabhi nirogi rahein, sabka kalyan ho aur kisi ko koi dukh na ho."
          </p>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-12 border-b border-slate-800">
          
          {/* Brand & Vision */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-kesariya-600 flex items-center justify-center text-xl shadow-md text-white">
                🏹
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  RAM KA SEVAK
                </span>
                <span className="text-xs text-amber-400 font-bold block">
                  सेवा ही भक्ति है • {SITE_CONFIG.domain}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              Prabhu Shri Ram ki paavan prerna se chalaayi jaa rahi zameeni seva initiative. Roadside beghar buzurgon ko garam bhojan, bejubaan pashuon ki dekhbhaal, emergency hospital ilaj aur aafat rahat me 100% imaandaari aur zero middlemen commission.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Grassroots Seva By @{SITE_CONFIG.creatorUsername}</span>
            </div>
          </div>

          {/* Seva Sankalp List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              हमारे 4 पवित्र सेवा संकल्प
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>• 01. Annadaan & Street Food Seva</li>
              <li>• 02. Gau Mata & Stray Animal Care</li>
              <li>• 03. Emergency Medical & Hospital Aid</li>
              <li>• 04. Disaster & Calamity Emergency Relief</li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Official Contact & Social Links
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={`mailto:${SITE_CONFIG.officialEmail}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{SITE_CONFIG.officialEmail}</span>
              </a>

              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Instagram: @{SITE_CONFIG.creatorUsername}</span>
              </a>

              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <span>YouTube: @{SITE_CONFIG.creatorUsername}</span>
              </a>

              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Facebook: {SITE_CONFIG.creatorUsername}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>{SITE_CONFIG.domain}</strong>. All Rights Reserved. Ground Seva by @{SITE_CONFIG.creatorUsername}.
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>निस्वार्थ भाव से समर्पित</span>
            <Heart className="w-3.5 h-3.5 fill-kesariya-500 text-kesariya-500" />
            <span>जय श्री राम</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
