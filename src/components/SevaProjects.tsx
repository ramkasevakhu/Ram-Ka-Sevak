'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Heart,
  Utensils, 
  HeartHandshake, 
  Activity, 
  ShieldAlert,
  Info
} from 'lucide-react';
import { DETAILED_SEVA_CATEGORIES, DetailedSevaCategory } from '@/lib/constants';

interface SevaProjectsProps {
  onDonateClick: (
    category: DetailedSevaCategory, 
    amount: number, 
    quantityText: string,
    exactWhatIsGiven: string
  ) => void;
}

export const SevaProjects: React.FC<SevaProjectsProps> = ({ onDonateClick }) => {
  const [activeTab, setActiveTab] = useState<string>('roadside-relief');
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<Record<string, number>>({
    'roadside-relief': 1, // 5 persons
    'animal-welfare': 1,  // 1 cow
    'medical-emergency': 0, // 500 medicine
    'disaster-relief': 0, // 250 ration
  });

  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({
    'roadside-relief': '',
    'animal-welfare': '',
    'medical-emergency': '',
    'disaster-relief': '',
  });

  const currentCategory = DETAILED_SEVA_CATEGORIES.find(c => c.id === activeTab) || DETAILED_SEVA_CATEGORIES[0];
  const currentOptionIdx = selectedOptionIdx[currentCategory.id] ?? 0;
  const isCustom = Boolean(customAmounts[currentCategory.id]);
  
  const selectedOption = currentCategory.options[currentOptionIdx] || currentCategory.options[0];
  const finalAmount = isCustom 
    ? parseInt(customAmounts[currentCategory.id], 10) || currentCategory.unitCost 
    : selectedOption.amount;

  const handleSelectOption = (catId: string, idx: number) => {
    setSelectedOptionIdx(prev => ({ ...prev, [catId]: idx }));
    setCustomAmounts(prev => ({ ...prev, [catId]: '' }));
  };

  const handleCustomChange = (catId: string, val: string) => {
    const sanitized = val.replace(/\D/g, '');
    setCustomAmounts(prev => ({ ...prev, [catId]: sanitized }));
  };

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'roadside-relief':
        return <Utensils className="w-4 h-4" />;
      case 'animal-welfare':
        return <HeartHandshake className="w-4 h-4" />;
      case 'medical-emergency':
        return <Activity className="w-4 h-4" />;
      case 'disaster-relief':
        return <ShieldAlert className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <section id="seva-projects" className="py-14 lg:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs sm:text-sm font-bold text-amber-800 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-kesariya-600" />
            <span>पारदर्शी ज़मीनी प्रकल्प • 100% Direct Impact</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            हमारे ४ मुख्य सेवा प्रकल्प
            <span className="block mt-1 bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              कहाँ, कैसे और क्या मदद दी जाती है
            </span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            हम हर एक पैसे का स्पष्ट हिसाब रखते हैं। नीचे देखें कि आपके दिए गए सहयोग से किसको क्या सामग्री या इलाज मिलता है।
          </p>
        </div>

        {/* Horizontal Project Selector Tabs (Compact & Responsive) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar justify-start lg:justify-center">
          {DETAILED_SEVA_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer border-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-kesariya-600 to-amber-600 text-white border-amber-300 shadow-lg shadow-kesariya-600/25 scale-102'
                    : 'bg-amber-50/70 hover:bg-amber-100 text-slate-700 border-amber-200/80'
                }`}
              >
                {getTabIcon(cat.id)}
                <span>{cat.titleHindi}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Card (Side-by-Side Horizontal Layout to Prevent Long Page) */}
        <div className="glass-3d-card rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Photo & Exact Breakdown (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-amber-50/50 to-white p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-amber-200 flex flex-col justify-between">
            <div>
              {/* Image Header with Badge */}
              <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden mb-6 shadow-md border-2 border-white">
                <img
                  src={currentCategory.imageUrl}
                  alt={currentCategory.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 inline-block mb-1">
                    {currentCategory.badgeHindi}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black leading-tight text-white">
                    {currentCategory.titleEnglish}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {currentCategory.shortDesc}
              </p>

              {/* Exact Physical Breakdown Checklist */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-xs space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wide mb-1">
                  <Info className="w-4 h-4 text-kesariya-600" />
                  <span>{currentCategory.exactBreakdownTitle}</span>
                </div>

                {currentCategory.exactBreakdownItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 text-[11px] text-slate-500 font-medium">
              🚩 100% ज़मीनी सेवा • बिना किसी बिचोलिए के सीधे ज़रूरतमंद तक सामग्री वितरण
            </div>
          </div>

          {/* Right Column: Horizontal Amount & Package Selector (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  सहयोग राशि चुनें (Select Amount / Quantity)
                </span>
                <span className="text-xs font-bold text-kesariya-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {currentCategory.unitName}
                </span>
              </div>

              {/* Compact Horizontal Chips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentCategory.options.map((opt, idx) => {
                  const isSelected = !isCustom && currentOptionIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(currentCategory.id, idx)}
                      className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border-2 relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-kesariya-500 bg-amber-50/60 shadow-md ring-2 ring-kesariya-200'
                          : 'border-slate-200 hover:border-amber-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-extrabold text-slate-900">
                          {opt.label}
                        </span>
                        <span className="text-sm font-black text-kesariya-700">
                          ₹{opt.amount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-tight">
                        {opt.whatIsGiven}
                      </p>

                      {opt.popular && (
                        <span className="absolute -top-2.5 right-3 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                          लोकप्रिय
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Field (Horizontal) */}
              <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 mb-6 flex flex-col sm:flex-row items-center gap-3">
                <span className="text-xs font-bold text-slate-700 shrink-0">
                  अपनी इच्छानुसार राशि लिखें:
                </span>
                <div className="relative w-full sm:flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder={`न्यूनतम ₹${currentCategory.unitCost}`}
                    value={customAmounts[currentCategory.id] || ''}
                    onChange={(e) => handleCustomChange(currentCategory.id, e.target.value)}
                    className="w-full pl-7 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white text-slate-900 font-bold"
                  />
                </div>
              </div>

              {/* Live Impact Confirmation Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>आपका चुना गया सहयोग:</span>
                  <span>सीधा ज़मीनी वितरण</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-sm sm:text-base font-bold text-amber-300">
                    {isCustom 
                      ? `₹${finalAmount} की पावन सेवा` 
                      : selectedOption.whatIsGiven}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white ml-2">
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Donate Button */}
            <button
              type="button"
              onClick={() => onDonateClick(
                currentCategory, 
                finalAmount, 
                isCustom ? 'कस्टम सहयोग' : selectedOption.label,
                isCustom ? `₹${finalAmount} की सीधी सेवा` : selectedOption.whatIsGiven
              )}
              className="w-full btn-divine-3d text-white font-black text-base py-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer shadow-xl hover:scale-101 transition-transform"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>इस प्रकल्प में सेवा संकल्प लें (Proceed)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
