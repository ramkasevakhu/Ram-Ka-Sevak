'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface NavbarProps {
  onDonateClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDonateClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDonate = () => {
    setMobileMenuOpen(false);
    if (onDonateClick) {
      onDonateClick();
    } else {
      scrollToSection('daan-section');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top banner hidden on mobile to keep header 56-64px */}
      <div className="hidden sm:flex bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 text-white text-xs py-1 px-4 items-center justify-center font-bold tracking-wide">
        <span>🚩 {SITE_CONFIG.tagline} • प्रभु श्री राम की प्रेरणा से ज़मीनी सेवा (@{SITE_CONFIG.creatorUsername})</span>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-kesariya-500 to-kesariya-600 flex items-center justify-center shadow-sm border border-white shrink-0">
              <span className="text-lg sm:text-xl select-none" role="img" aria-label="धनुष">🏹</span>
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#3B1F0A] block leading-none truncate">
                राम का सेवक
              </span>
              <span className="text-[11px] text-kesariya-700 font-bold block mt-0.5 truncate">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-slate-700">
            <button
              type="button"
              onClick={() => scrollToSection('daan-section')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              दान करें
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('seva-sankalp')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              4 सेवा संकल्प
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('ground-proof')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              सेवा वीडियो
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about-legal')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              पारदर्शिता
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kathayein')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              प्रेरक कथाएँ
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="hover:text-kesariya-600 transition-colors cursor-pointer"
            >
              सवाल-जवाब
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDonate}
              className="min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-5 rounded-xl bg-kesariya-600 hover:bg-kesariya-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
              <span>दान करें</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-[#3B1F0A] flex items-center justify-center cursor-pointer"
              aria-label="मेनू खोलें"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="मोबाइल नेविगेशन"
          className="lg:hidden bg-[#FFFDF9] border-t border-amber-200 px-4 py-4 space-y-1.5 shadow-lg"
        >
          {[
            { id: 'daan-section', label: 'दान करें (4 आसान चरण)' },
            { id: 'seva-sankalp', label: '4 सेवा संकल्प' },
            { id: 'ground-proof', label: 'ज़मीनी प्रमाण (सेवा वीडियो)' },
            { id: 'about-legal', label: 'हमारे बारे में व पारदर्शिता' },
            { id: 'transparency', label: 'मासिक हिसाब व सहयोगी' },
            { id: 'kathayein', label: 'प्रेरक कथाएँ' },
            { id: 'faq', label: 'अक्सर पूछे जाने वाले सवाल' },
            { id: 'contact-footer', label: 'संपर्क करें' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="w-full min-h-[48px] text-left px-3.5 rounded-xl text-base font-bold text-[#3B1F0A] hover:bg-amber-50 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
