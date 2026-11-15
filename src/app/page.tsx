'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { RamSevaStories } from '@/components/RamSevaStories';
import { SevaCategories } from '@/components/SevaCategories';
import { CreatorTrustSection } from '@/components/CreatorTrustSection';
import { SankalpFeed } from '@/components/SankalpFeed';
import { Footer } from '@/components/Footer';
import { PaymentModal } from '@/components/PaymentModal';
import { DivineBlessingModal } from '@/components/DivineBlessingModal';
import { SEVA_CATEGORIES, ExtendedSevaCategory } from '@/lib/constants';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<ExtendedSevaCategory | null>(SEVA_CATEGORIES[0]);
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(5);
  const [selectedUnitLabel, setSelectedUnitLabel] = useState<string>('व्यक्ति का भोजन');

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

  // Triggered from SevaCategories or Quick Select
  const handleOpenDonate = (
    cat: ExtendedSevaCategory,
    amount: number,
    quantity: number,
    unitLabel: string
  ) => {
    setSelectedCategory(cat);
    setSelectedAmount(amount);
    setSelectedQuantity(quantity);
    setSelectedUnitLabel(unitLabel);
    setIsPaymentModalOpen(true);
  };

  const handleScrollToCategories = () => {
    const el = document.getElementById('seva-categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Triggered when user confirms payment
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
      {/* Navigation */}
      <Navbar onOpenDonateModal={() => setIsPaymentModalOpen(true)} />

      {/* Hero Section */}
      <HeroSection />

      {/* Bhagwan Shri Ram Seva Stories (High Conversion & Inspiration) */}
      <RamSevaStories onDonateNow={handleScrollToCategories} />

      {/* 4 Evergreen Seva Categories with Multiplier Live Calculator & Real Photography */}
      <SevaCategories onDonateClick={handleOpenDonate} />

      {/* Creator Trust & 100% Genuine Ground Verification */}
      <CreatorTrustSection />

      {/* Community Sankalp Wall (Horizontal Auto-Scrolling Carousel) */}
      <SankalpFeed />

      {/* Pavitra Footer */}
      <Footer />

      {/* Payment & UPI Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        category={selectedCategory}
        amount={selectedAmount}
        quantity={selectedQuantity}
        unitLabel={selectedUnitLabel}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Divine Blessing & Seva Receipt Modal */}
      <DivineBlessingModal
        isOpen={isBlessingModalOpen}
        onClose={() => setIsBlessingModalOpen(false)}
        details={blessingDetails}
      />

      {/* Ultra-Premium Floating Mobile Donate Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
        <button
          onClick={() => {
            const cat = selectedCategory || SEVA_CATEGORIES[0];
            handleOpenDonate(cat, 250, 5, cat.unitConfig.unitLabelHindi);
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
                पवित्र दान / सेवा संकल्प
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold bg-white text-kesariya-700 px-3.5 py-1.5 rounded-xl shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-kesariya-600" />
            <span>दान करें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </main>
  );
}
