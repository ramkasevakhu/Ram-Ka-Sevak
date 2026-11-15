'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X, ShieldCheck, Mail, Sparkles, BookOpen, Layers } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface NavbarProps {
  onOpenDonateModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonateModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-amber-200/60 shadow-[0_4px_25px_-5px_rgba(245,158,11,0.06)] transition-all">
      {/* Top Divine Announcement Bar */}
      <div className="bg-gradient-to-r from-kesariya-600 via-amber-500 to-kesariya-700 text-white text-xs sm:text-sm py-2 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
        <span>
          🚩 <strong className="tracking-wider">सेवा ही भक्ति है</strong> • प्रभु श्री राम की पावन प्रेरणा से निस्वार्थ जनसेवा
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand (Clean, Luxury, No .ORG badge) */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* 3D Sacred Emblem */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-kesariya-500 to-kesariya-600 flex items-center justify-center shadow-lg shadow-kesariya-500/25 border-2 border-white transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-kesariya-500/40">
              <span className="text-2xl select-none" role="img" aria-label="Ram Bow">🏹</span>
              <div className="absolute -inset-1 rounded-2xl bg-amber-400/30 blur-md -z-10 group-hover:blur-lg transition-all"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-kesariya-700 transition-colors">
                RAM KA SEVAK
              </span>
              <span className="text-[11px] text-amber-700 font-bold tracking-wider uppercase">
                सेवा ही भक्ति है • {SITE_CONFIG.domain}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with English numbers */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
            <button
              onClick={() => scrollToSection('ram-seva-stories')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>राम भक्ति कथाएं</span>
            </button>
            <button
              onClick={() => scrollToSection('seva-categories')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-kesariya-600" />
              <span>4 Seva Causes</span>
            </button>
            <button
              onClick={() => scrollToSection('creator-trust')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ground Proof</span>
            </button>
            <button
              onClick={() => scrollToSection('sankalp-wall')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              आशीर्वाद वॉल
            </button>
            <button
              onClick={() => scrollToSection('contact-transparency')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-amber-600" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenDonateModal || (() => scrollToSection('seva-categories'))}
              className="btn-divine-3d text-white font-black text-sm px-7 py-3 rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
              <span>अभी सेवा करें</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              onClick={onOpenDonateModal || (() => scrollToSection('seva-categories'))}
              className="bg-gradient-to-r from-kesariya-600 to-amber-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-kesariya-600/25 active:scale-95 transition-transform"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>दान करें</span>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-slate-800 hover:text-kesariya-600 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Ultra-Premium Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b-2 border-amber-300 px-5 pt-4 pb-8 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 px-3 pt-1">
            नेविगेशन मेनू
          </div>

          <button
            onClick={() => scrollToSection('ram-seva-stories')}
            className="flex items-center gap-3 w-full text-left py-3 px-3.5 rounded-2xl text-sm font-bold text-slate-800 hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-slate-900 leading-tight">राम भक्ति व सेवा कथाएं</span>
              <span className="text-[11px] text-slate-400 font-normal">शबरी, जटायु व गिलहरी की प्रेरणा</span>
            </div>
          </button>

          <button
            onClick={() => scrollToSection('seva-categories')}
            className="flex items-center gap-3 w-full text-left py-3 px-3.5 rounded-2xl text-sm font-bold text-slate-800 hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200"
          >
            <div className="w-9 h-9 rounded-xl bg-kesariya-100 text-kesariya-700 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-slate-900 leading-tight">4 Seva Causes (सदाबहार कोष)</span>
              <span className="text-[11px] text-slate-400 font-normal">अन्नदान, मूक जीव, चिकित्सा व आपदा</span>
            </div>
          </button>

          <button
            onClick={() => scrollToSection('creator-trust')}
            className="flex items-center gap-3 w-full text-left py-3 px-3.5 rounded-2xl text-sm font-bold text-slate-800 hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-slate-900 leading-tight">Ground Seva Proof</span>
              <span className="text-[11px] text-slate-400 font-normal">रील्स व ज़मीनी पारदर्शिता</span>
            </div>
          </button>

          <button
            onClick={() => scrollToSection('sankalp-wall')}
            className="flex items-center gap-3 w-full text-left py-3 px-3.5 rounded-2xl text-sm font-bold text-slate-800 hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-slate-900 leading-tight">आशीर्वाद वॉल (Live Feed)</span>
              <span className="text-[11px] text-slate-400 font-normal">दानी सज्जनों की प्रार्थनाएं</span>
            </div>
          </button>

          <button
            onClick={() => scrollToSection('contact-transparency')}
            className="flex items-center gap-3 w-full text-left py-3 px-3.5 rounded-2xl text-sm font-bold text-slate-800 hover:bg-amber-50/80 transition-colors border border-transparent hover:border-amber-200"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-slate-900 leading-tight">Contact & Inquiries</span>
              <span className="text-[11px] text-slate-400 font-normal">{SITE_CONFIG.officialEmail}</span>
            </div>
          </button>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDonateModal) onOpenDonateModal();
                else scrollToSection('seva-categories');
              }}
              className="w-full btn-divine-3d text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl text-base"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>पवित्र सेवा संकल्प लें (Donate Now)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
