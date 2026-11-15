'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { UniversalStories } from '@/components/UniversalStories';
import { SevaProjects } from '@/components/SevaProjects';
import { CreatorTrustSection } from '@/components/CreatorTrustSection';
import { SankalpFeed } from '@/components/SankalpFeed';
import { Footer } from '@/components/Footer';
import { PaymentModal } from '@/components/PaymentModal';
import { DivineBlessingModal } from '@/components/DivineBlessingModal';
import { DETAILED_SEVA_CATEGORIES, DetailedSevaCategory } from '@/lib/constants';
import { Heart, ArrowRight } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<DetailedSevaCategory | null>(DETAILED_SEVA_CATEGORIES[0]);
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [selectedQuantityText, setSelectedQuantityText] = useState<string>('5 Logon ka Khana');
  const [selectedExactBreakdown, setSelectedExactBreakdown] = useState<string>('5 Complete Hot Meal Packs sadak par beghar buzurgon ko direct handover');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBlessingModalOpen, setIsBlessingModalOpen] = useState(false);
  const [blessingDetails, setBlessingDetails] = useState<{
    donorName: string;
    categoryName: string;
    unitsText: string;
    amount: number;
    transactionRef: string;
    message?: string;
  } | null>(null);

  const handleOpenDonate = (
    cat: DetailedSevaCategory,
    amount: number,
    quantityText: string,
    exactWhatIsGiven: string
  ) => {
    setSelectedCategory(cat);
    setSelectedAmount(amount);
    setSelectedQuantityText(quantityText);
    setSelectedExactBreakdown(exactWhatIsGiven);
    setIsPaymentModalOpen(true);
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('seva-projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePaymentSuccess = (details: {
    donorName: string;
    categoryName: string;
    unitsText: string;
    amount: number;
    transactionRef: string;
    message?: string;
  }) => {
    setIsPaymentModalOpen(false);
    setBlessingDetails(details);
    setIsBlessingModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between">
      {/* 1. Navigation */}
      <Navbar onOpenDonateModal={() => setIsPaymentModalOpen(true)} />

      {/* 2. Hero Section (25% Pure Hindi + 60% Hinglish + 15% English) */}
      <HeroSection />

      {/* 3. 12 Universal Compassion Stories Carousel (Floating side arrows on carousel cards) */}
      <UniversalStories onExploreSeva={handleScrollToProjects} />

      {/* 4. 4 Sacred Seva Sankalp (Fixed overflow, donation terminology, clear breakdown) */}
      <SevaProjects onDonateClick={handleOpenDonate} />

      {/* 5. Creator Trust & 100% Genuine Ground Verification (@vipuone) */}
      <CreatorTrustSection />

      {/* 6. Community Sankalp Wall (Horizontal Auto-Scrolling Carousel) */}
      <SankalpFeed />

      {/* 7. Footer */}
      <Footer />

      {/* 8. Payment & UPI Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        category={selectedCategory}
        amount={selectedAmount}
        quantityText={selectedQuantityText}
        exactWhatIsGiven={selectedExactBreakdown}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 9. Divine Blessing & Seva Receipt Modal */}
      <DivineBlessingModal
        isOpen={isBlessingModalOpen}
        onClose={() => setIsBlessingModalOpen(false)}
        details={blessingDetails}
      />

      {/* 10. Floating Mobile Donate Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
        <button
          onClick={() => {
            const cat = selectedCategory || DETAILED_SEVA_CATEGORIES[0];
            handleOpenDonate(
              cat, 
              cat.options[1]?.amount || 250, 
              cat.options[1]?.label || '5 Logon ka Khana',
              cat.options[1]?.whatIsGiven || '5 Complete Hot Meal Packs'
            );
          }}
          className="w-full bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 text-white font-black py-3.5 px-5 rounded-2xl flex items-center justify-between shadow-[0_10px_30px_rgba(234,88,12,0.45)] border border-amber-300/40 active:scale-98 transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-base">
              🚩
            </div>
            <div className="text-left">
              <span className="text-[11px] font-bold text-amber-200 block uppercase tracking-wider leading-none">
                सेवा ही भक्ति है
              </span>
              <span className="text-sm font-extrabold text-white leading-tight">
                Support Seva (सहयोग करें)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold bg-white text-kesariya-700 px-3.5 py-1.5 rounded-xl shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-kesariya-600" />
            <span>Daan Karein</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </main>
  );
}
