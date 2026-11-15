'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X, ShieldCheck, Mail, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-all">
      {/* Top Divine Announcement Bar with Tagline */}
      <div className="bg-gradient-to-r from-kesariya-600 via-amber-500 to-kesariya-700 text-white text-xs sm:text-sm py-2 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
        <span>
          🚩 <strong className="tracking-wider">सेवा ही भक्ति है</strong> • प्रभु श्री राम की पावन प्रेरणा से निस्वार्थ जनसेवा
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* 3D Sacred Emblem */}
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-kesariya-500 to-kesariya-700 flex items-center justify-center shadow-md shadow-kesariya-500/20 border-2 border-white transform transition-transform group-hover:scale-105">
              <span className="text-2xl select-none" role="img" aria-label="Ram Bow">🏹</span>
              <div className="absolute -inset-0.5 rounded-2xl bg-amber-400/30 blur-sm -z-10 group-hover:blur-md transition-all"></div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-kesariya-700 transition-colors">
                  RAM KA SEVAK
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  .ORG
                </span>
              </div>
              <span className="text-xs text-amber-700 font-semibold tracking-wide">
                सेवा ही भक्ति है • {SITE_CONFIG.domain}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <button
              onClick={() => scrollToSection('ram-seva-stories')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-base">🛕</span>
              <span>राम भक्ति व सेवा</span>
            </button>
            <button
              onClick={() => scrollToSection('seva-categories')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              ४ सेवा कोष (Seva Causes)
            </button>
            <button
              onClick={() => scrollToSection('creator-trust')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ग्राउंड वर्क (Ground Seva)
            </button>
            <button
              onClick={() => scrollToSection('sankalp-wall')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              आशीर्वाद वॉल
            </button>
            <button
              onClick={() => scrollToSection('contact-transparency')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Mail className="w-4 h-4 text-amber-600" />
              संपर्क
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenDonateModal || (() => scrollToSection('seva-categories'))}
              className="btn-divine-3d text-white font-extrabold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>अभी सेवा करें</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenDonateModal || (() => scrollToSection('seva-categories'))}
              className="bg-kesariya-600 hover:bg-kesariya-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>दान करें</span>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-amber-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <button
            onClick={() => scrollToSection('ram-seva-stories')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-semibold text-slate-800 hover:bg-amber-50"
          >
            🛕 राम भक्ति व सेवा की कहानियां
          </button>
          <button
            onClick={() => scrollToSection('seva-categories')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-semibold text-slate-800 hover:bg-amber-50"
          >
            ४ पावन सेवा कोष (4 Evergreen Causes)
          </button>
          <button
            onClick={() => scrollToSection('creator-trust')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-semibold text-slate-800 hover:bg-amber-50"
          >
            ग्राउंड सेवा प्रमाण (Ground Proof)
          </button>
          <button
            onClick={() => scrollToSection('sankalp-wall')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-semibold text-slate-800 hover:bg-amber-50"
          >
            आशीर्वाद वॉल (Community Blessings)
          </button>
          <button
            onClick={() => scrollToSection('contact-transparency')}
            className="block w-full text-left py-2 px-3 rounded-lg text-base font-semibold text-slate-800 hover:bg-amber-50"
          >
            संपर्क व पारदर्शिता
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDonateModal) onOpenDonateModal();
                else scrollToSection('seva-categories');
              }}
              className="w-full btn-divine-3d text-white font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>पवित्र दान / सेवा संकल्प लें</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
