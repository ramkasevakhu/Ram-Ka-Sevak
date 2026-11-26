'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Video } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface FooterProps {
  onWatchVideosClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onWatchVideosClick }) => {
  const scrollToVideos = () => {
    if (onWatchVideosClick) {
      onWatchVideosClick();
      return;
    }
    const el = document.getElementById('ground-proof');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact-footer" className="bg-[#2B1708] text-amber-100 pt-10 pb-24 sm:pb-10 px-4 border-t-4 border-kesariya-600">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏹</span>
              <div>
                <div className="text-lg font-black text-white">{SITE_CONFIG.name}</div>
                <div className="text-xs text-amber-300 font-bold">{SITE_CONFIG.tagline}</div>
              </div>
            </div>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              ऋषिकेश, उत्तराखंड से संचालित व्यक्तिगत ज़मीनी सेवा पहल।
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">संपर्क करें</h3>
            <div className="space-y-2 text-sm">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp पर बात करें</span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.officialEmail}`}
                className="flex items-center gap-2 text-amber-100 hover:text-white"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SITE_CONFIG.officialEmail}</span>
              </a>

              <div className="flex items-start gap-2 text-amber-200/80">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.locationHindi}</span>
              </div>
            </div>
          </div>

          {/* Quick Links, Social & Policies */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">त्वरित लिंक व नीतियाँ</h3>
            <div className="flex flex-wrap gap-2">
              {['Instagram', 'YouTube', 'Facebook'].map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={scrollToVideos}
                  className="min-h-[40px] px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-amber-300" />
                  <span>{platform}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs font-bold text-amber-200">
              <Link href="/privacy" className="hover:text-white underline underline-offset-4">
                गोपनीयता नीति
              </Link>
              <Link href="/terms" className="hover:text-white underline underline-offset-4">
                नियम व शर्तें
              </Link>
              <Link href="/refund-policy" className="hover:text-white underline underline-offset-4">
                दान व रिफंड नीति
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-300/80">
          <span>© {new Date().getFullYear()} {SITE_CONFIG.domain} • @{SITE_CONFIG.creatorUsername}</span>
          <span>{SITE_CONFIG.locationHindi} • कोई 80G छूट नहीं</span>
        </div>
      </div>
    </footer>
  );
};
