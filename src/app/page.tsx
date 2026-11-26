'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ImpactCounters } from '@/components/ImpactCounters';
import { DaanSection } from '@/components/DaanSection';
import { GroundProofVideos } from '@/components/GroundProofVideos';
import { SevaProjects } from '@/components/SevaProjects';
import { TransparencySection } from '@/components/TransparencySection';
import { CreatorTrustSection } from '@/components/CreatorTrustSection';
import { UniversalStories } from '@/components/UniversalStories';
import { Footer } from '@/components/Footer';
import { DivineBlessingModal } from '@/components/DivineBlessingModal';
import {
  DEFAULT_IMPACT_COUNTERS,
  DEFAULT_TRANSPARENCY,
  INITIAL_COMMUNITY_BLESSINGS,
} from '@/lib/constants';
import {
  ImpactCounters as ImpactCountersType,
  PublicSupporter,
  TransparencyData,
  VideoItem,
} from '@/lib/types';

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('roadside-relief');
  const [selectedAmount, setSelectedAmount] = useState<number>(250);

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [impactCounters, setImpactCounters] = useState<ImpactCountersType>(DEFAULT_IMPACT_COUNTERS);
  const [transparency, setTransparency] = useState<TransparencyData>(DEFAULT_TRANSPARENCY);
  const [supporters, setSupporters] = useState<PublicSupporter[]>(INITIAL_COMMUNITY_BLESSINGS);

  const [blessingDetails, setBlessingDetails] = useState<{
    donorName: string;
    categoryName: string;
    unitsText: string;
    amount: number;
    transactionRef: string;
    message?: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/public/data')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.videos)) setVideos(data.videos);
        if (data.impactCounters) setImpactCounters(data.impactCounters);
        if (data.transparency) setTransparency(data.transparency);
        if (Array.isArray(data.recentSupporters)) setSupporters(data.recentSupporters);
      })
      .catch(() => {
        // Fallback defaults already set
      });
  }, []);

  const scrollToDaan = () => {
    const el = document.getElementById('daan-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVideos = () => {
    const el = document.getElementById('ground-proof');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const aboutEl = document.getElementById('about-legal');
      if (aboutEl) aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSeva = (catId: string, defaultAmt: number) => {
    setSelectedCategoryId(catId);
    setSelectedAmount(defaultAmt);
    scrollToDaan();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar onDonateClick={scrollToDaan} />

      <main className="flex-1">
        {/* 1. Hero */}
        <HeroSection
          onDonateClick={scrollToDaan}
          onWatchVideosClick={scrollToVideos}
        />

        {/* 2. Impact Counters */}
        <ImpactCounters counters={impactCounters} />

        {/* 3. Daan Karein (4-step mobile-first) */}
        <DaanSection
          selectedCategoryId={selectedCategoryId}
          onSelectCategoryId={setSelectedCategoryId}
          selectedAmount={selectedAmount}
          onSelectAmount={setSelectedAmount}
          onPaymentSuccess={(details) => setBlessingDetails(details)}
        />

        {/* 4. Ground Proof (Embedded Videos — auto-hidden if empty) */}
        <GroundProofVideos videos={videos} />

        {/* 5. 4 Seva Sankalp Cards */}
        <SevaProjects onSelectSeva={handleSelectSeva} />

        {/* 6. Transparency + Recent Supporters */}
        <TransparencySection transparency={transparency} supporters={supporters} />

        {/* 7. About + Legal Status (once) */}
        <CreatorTrustSection onWatchVideosClick={scrollToVideos} />

        {/* 8. 12 Kathayein (default 3, collapsible) */}
        <UniversalStories />
      </main>

      {/* 9. Contact + Footer */}
      <Footer onWatchVideosClick={scrollToVideos} />

      {/* Thank-you Screen */}
      <DivineBlessingModal
        isOpen={Boolean(blessingDetails)}
        onClose={() => setBlessingDetails(null)}
        onWatchVideo={scrollToVideos}
        details={blessingDetails}
      />

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden">
        <button
          type="button"
          onClick={scrollToDaan}
          className="w-full min-h-[52px] px-5 rounded-2xl bg-kesariya-600 hover:bg-kesariya-700 active:scale-[0.98] text-white font-black text-base flex items-center justify-between shadow-lg border border-amber-300/40 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4 fill-white shrink-0" />
            <span>₹{selectedAmount.toLocaleString('en-IN')} • दान करें</span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </button>
      </div>
    </div>
  );
}
