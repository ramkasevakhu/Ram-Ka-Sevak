'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, AlertCircle, RefreshCw } from 'lucide-react';
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

  const [paymentBanner, setPaymentBanner] = useState<{
    type: 'pending' | 'failed';
    message: string;
    orderId?: string;
  } | null>(null);

  const [blessingDetails, setBlessingDetails] = useState<{
    donorName: string;
    categoryName: string;
    unitsText: string;
    amount: number;
    transactionRef: string;
    message?: string;
  } | null>(null);

  const fetchPublicData = () => {
    fetch('/api/public/data')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.videos)) setVideos(data.videos);
        if (data.impactCounters) setImpactCounters(data.impactCounters);
        if (data.transparency) setTransparency(data.transparency);
        if (Array.isArray(data.recentSupporters)) setSupporters(data.recentSupporters);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchPublicData();

    // Handle ZapUPI redirect back (?payment_status=...&order_id=...)
    const params = new URLSearchParams(window.location.search);
    const pStatus = params.get('payment_status');
    const orderId = params.get('order_id');

    if (orderId) {
      if (pStatus === 'failed' || pStatus === 'timeout') {
        setPaymentBanner({
          type: 'failed',
          orderId,
          message:
            pStatus === 'timeout'
              ? 'भुगतान का समय समाप्त हो गया। कृपया दोबारा प्रयास करें।'
              : 'भुगतान पूरा नहीं हो सका। कृपया दोबारा प्रयास करें।',
        });
      } else {
        // Verify server-to-server with ZapUPI /api/order-status
        fetch('/api/payment/check-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.verified && data.status === 'success') {
              setBlessingDetails({
                donorName: data.donor_name || 'श्रद्धालु दाता',
                categoryName: data.category_name || 'सेवा सहयोग',
                unitsText: data.unit_label || `₹${data.amount} सेवा सहयोग`,
                amount: Number(data.amount) || 250,
                transactionRef: data.utr || orderId,
                message: data.sankalp_message || '',
              });
              fetchPublicData();
            } else if (data.status === 'failed') {
              setPaymentBanner({
                type: 'failed',
                orderId,
                message: 'भुगतान विफल रहा। यदि राशि कट गई हो तो कुछ समय प्रतीक्षा करें या दोबारा प्रयास करें।',
              });
            } else {
              setPaymentBanner({
                type: 'pending',
                orderId,
                message: 'आपके भुगतान की बैंक पुष्टि प्रतीक्षारत है।',
              });
            }
          })
          .catch(() => {
            setPaymentBanner({
              type: 'pending',
              orderId,
              message: 'भुगतान स्थिति जाँचने में समय लग रहा है। कृपया पुनः जाँचें।',
            });
          });
      }

      // Clean URL query params without reloading
      window.history.replaceState({}, '', '/');
    }
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

  const handleRecheckOrder = async (orderId: string) => {
    const res = await fetch('/api/payment/check-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId }),
    });
    const data = await res.json();
    if (data.verified && data.status === 'success') {
      setPaymentBanner(null);
      setBlessingDetails({
        donorName: data.donor_name || 'श्रद्धालु दाता',
        categoryName: data.category_name || 'सेवा सहयोग',
        unitsText: data.unit_label || `₹${data.amount} सेवा सहयोग`,
        amount: Number(data.amount) || 250,
        transactionRef: data.utr || orderId,
        message: data.sankalp_message || '',
      });
      fetchPublicData();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar onDonateClick={scrollToDaan} />

      {/* Redirect Payment Status Banner (if failed/pending) */}
      {paymentBanner && (
        <div className="bg-amber-50 border-b border-amber-300 px-4 py-3">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2 font-bold text-[#3B1F0A]">
              <AlertCircle className="w-4 h-4 text-kesariya-600 shrink-0" />
              <span>{paymentBanner.message}</span>
            </div>
            <div className="flex items-center gap-2">
              {paymentBanner.type === 'pending' && paymentBanner.orderId && (
                <button
                  type="button"
                  onClick={() => handleRecheckOrder(paymentBanner.orderId!)}
                  className="min-h-[40px] px-3.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                >
                  स्थिति पुनः जाँचें
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setPaymentBanner(null);
                  scrollToDaan();
                }}
                className="min-h-[40px] px-3.5 rounded-xl bg-kesariya-600 text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>दोबारा प्रयास करें</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* 2. Hero */}
        <HeroSection
          onDonateClick={scrollToDaan}
          onWatchVideosClick={scrollToVideos}
        />

        {/* 3. Impact Counters */}
        <ImpactCounters counters={impactCounters} />

        {/* 4. Daan Karein (4-step mobile-first + ZapUPI) */}
        <DaanSection
          selectedCategoryId={selectedCategoryId}
          onSelectCategoryId={setSelectedCategoryId}
          selectedAmount={selectedAmount}
          onSelectAmount={setSelectedAmount}
          onPaymentSuccess={(details) => setBlessingDetails(details)}
        />

        {/* 5. Ground Proof (Embedded Videos — auto-hidden if empty) */}
        <GroundProofVideos videos={videos} />

        {/* 6. 4 Seva Sankalp Cards */}
        <SevaProjects onSelectSeva={handleSelectSeva} />

        {/* 7. Transparency + Recent Supporters */}
        <TransparencySection transparency={transparency} supporters={supporters} />

        {/* 8. About + Legal Status (once) */}
        <CreatorTrustSection onWatchVideosClick={scrollToVideos} />

        {/* 9. 12 Kathayein (default 3, collapsible) */}
        <UniversalStories />
      </main>

      {/* 10. Contact + Footer */}
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
            <span>₹{selectedAmount.toLocaleString('en-IN')} • सहयोग करें</span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </button>
      </div>
    </div>
  );
}
