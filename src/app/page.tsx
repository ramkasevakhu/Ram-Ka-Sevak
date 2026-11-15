'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { SevaCategories } from '@/components/SevaCategories';
import { CreatorTrustSection } from '@/components/CreatorTrustSection';
import { SankalpFeed } from '@/components/SankalpFeed';
import { Footer } from '@/components/Footer';
import { PaymentModal } from '@/components/PaymentModal';
import { DivineBlessingModal } from '@/components/DivineBlessingModal';
import { SEVA_CATEGORIES } from '@/lib/constants';
import { SevaCategory } from '@/lib/types';
import { Heart, Sparkles } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<SevaCategory | null>(SEVA_CATEGORIES[0]);
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
    cat: SevaCategory,
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
      <HeroSection 
        onSelectCategory={(cat) => handleOpenDonate(cat, cat.minAmount * 5, 5, cat.unitConfig.unitLabelHindi)} 
      />

      {/* 4 Evergreen Seva Categories with Multiplier Live Calculator */}
      <SevaCategories onDonateClick={handleOpenDonate} />

      {/* Creator Trust & 100% Genuine Ground Verification (@vipuone) */}
      <CreatorTrustSection />

      {/* Community Sankalp Wall */}
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

      {/* Mobile Sticky Quick Donate Floating Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
        <button
          onClick={() => {
            const cat = selectedCategory || SEVA_CATEGORIES[0];
            handleOpenDonate(cat, 250, 5, cat.unitConfig.unitLabelHindi);
          }}
          className="w-full btn-divine-3d text-white font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-between shadow-2xl border-2 border-white/60"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span className="text-sm">जय श्री राम • सेवा संकल्प लें</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-black/20 px-2.5 py-1 rounded-lg">
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>दान करें</span>
          </div>
        </button>
      </div>
    </main>
  );
}
