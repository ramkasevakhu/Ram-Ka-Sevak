'use client';

import React, { useState } from 'react';
import { 
  Utensils, 
  HeartHandshake, 
  Activity, 
  ShieldAlert, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Heart
} from 'lucide-react';
import { SEVA_CATEGORIES } from '@/lib/constants';
import { SevaCategory } from '@/lib/types';

interface SevaCategoriesProps {
  onDonateClick: (category: SevaCategory, amount: number, quantity: number, unitLabel: string) => void;
}

export const SevaCategories: React.FC<SevaCategoriesProps> = ({ onDonateClick }) => {
  // State to hold quantity and custom amounts for each category
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'roadside-relief': 5, // Default 5 people
    'animal-welfare': 5,  // Default 5 animals
    'medical-emergency': 1, // Default 1 kit/support
    'disaster-relief': 2, // Default 2 family kits
  });

  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({
    'roadside-relief': '',
    'animal-welfare': '',
    'medical-emergency': '',
    'disaster-relief': '',
  });

  const [isCustomMode, setIsCustomMode] = useState<Record<string, boolean>>({
    'roadside-relief': false,
    'animal-welfare': false,
    'medical-emergency': false,
    'disaster-relief': false,
  });

  const handleQuantityChange = (categoryId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[categoryId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [categoryId]: next };
    });
    // Turn off custom mode if using unit counter
    setIsCustomMode(prev => ({ ...prev, [categoryId]: false }));
  };

  const handlePresetSelect = (categoryId: string, count: number) => {
    setQuantities(prev => ({ ...prev, [categoryId]: count }));
    setIsCustomMode(prev => ({ ...prev, [categoryId]: false }));
  };

  const handleCustomAmountChange = (categoryId: string, val: string) => {
    // Only numbers allowed
    const sanitized = val.replace(/\D/g, '');
    setCustomAmounts(prev => ({ ...prev, [categoryId]: sanitized }));
    if (sanitized) {
      setIsCustomMode(prev => ({ ...prev, [categoryId]: true }));
    }
  };

  const getEffectiveAmount = (category: SevaCategory): number => {
    const isCustom = isCustomMode[category.id];
    const customVal = customAmounts[category.id];
    if (isCustom && customVal && parseInt(customVal, 10) > 0) {
      return parseInt(customVal, 10);
    }
    const qty = quantities[category.id] || 1;
    return qty * category.unitConfig.unitCost;
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-kesariya-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-rose-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-orange-600" />;
      default:
        return <Heart className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="seva-categories" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs sm:text-sm font-bold text-amber-800 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-kesariya-600" />
            <span>सदाबहार सेवा संकल्प • ४ मुख्य स्तंभ</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            जिस सेवा में आपका मन हो, 
            <span className="bg-gradient-to-r from-kesariya-600 to-amber-600 bg-clip-text text-transparent">
              {' '}उसमें अपना योगदान दें
            </span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Ye 4 seva kosh evergreen hain. Har kosh me aap <strong className="text-slate-800">vyakti/janwar ki sankhya (quantity)</strong> chun kar live calculate kar sakte hain ki aapka kitna yogdan kitne zarooratmand tak pahunchega.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {SEVA_CATEGORIES.map((cat, idx) => {
            const qty = quantities[cat.id] || 1;
            const isCustom = isCustomMode[cat.id];
            const currentAmount = getEffectiveAmount(cat);

            return (
              <div
                key={cat.id}
                className="glass-3d-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-amber-200/70 hover:border-kesariya-400/80 relative overflow-hidden"
              >
                {/* Top Subtle Number Badge */}
                <div className="absolute top-4 right-6 text-5xl font-black text-amber-200/30 select-none pointer-events-none">
                  0{idx + 1}
                </div>

                <div>
                  {/* Category Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 shadow-sm">
                      {renderIcon(cat.iconName)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-kesariya-100 text-kesariya-800">
                          {cat.badgeHindi}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {cat.badgeEnglish}
                        </span>
                      </div>

                      {/* Bilingual Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                        {cat.titleHindi}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-amber-700 tracking-wide mt-0.5">
                        {cat.titleEnglish}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Trust Highlights Checklist */}
                  <div className="space-y-2 mb-6 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/50 text-xs sm:text-sm text-slate-700">
                    {cat.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Quantity / Unit Calculator Box */}
                  <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                          मल्टीप्लायर कैलकुलेटर (Quantity Multiplier)
                        </span>
                        <p className="text-xs text-slate-500">
                          {cat.unitConfig.unitDescription}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400">दर प्रति यूनिट</span>
                        <div className="text-sm font-bold text-slate-800">
                          ₹{cat.unitConfig.unitCost} / {cat.unitConfig.unitLabelHindi}
                        </div>
                      </div>
                    </div>

                    {/* Presets Button Chips */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {cat.unitConfig.presets.map((preset) => {
                        const isSelected = !isCustom && qty === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handlePresetSelect(cat.id, preset)}
                            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-kesariya-600 text-white shadow-md shadow-kesariya-600/30 scale-105'
                                : 'bg-slate-100 hover:bg-amber-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {preset} {cat.unitConfig.unitLabelHindi} (₹{preset * cat.unitConfig.unitCost})
                          </button>
                        );
                      })}
                    </div>

                    {/* Stepper Controls & Custom Switch */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Plus Minus Stepper */}
                      <div className="flex items-center justify-between w-full sm:w-auto bg-slate-50 border border-amber-200 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(cat.id, -1)}
                          disabled={qty <= 1 || isCustom}
                          className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-amber-50 flex items-center justify-center font-bold text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <div className="px-4 text-center">
                          <span className="text-base font-black text-slate-900">{isCustom ? '-' : qty}</span>
                          <span className="text-xs text-slate-500 block leading-none">
                            {cat.unitConfig.unitLabelHindi}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleQuantityChange(cat.id, 1)}
                          disabled={isCustom}
                          className="w-9 h-9 rounded-lg bg-white border border-slate-200 hover:bg-amber-50 flex items-center justify-center font-bold text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom Amount Input Option */}
                      <div className="relative w-full sm:flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                          ₹
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder={`Custom राशि (Min ₹${cat.minAmount})`}
                          value={customAmounts[cat.id] || ''}
                          onChange={(e) => handleCustomAmountChange(cat.id, e.target.value)}
                          className={`w-full pl-7 pr-3 py-2 text-sm rounded-xl border transition-all ${
                            isCustom
                              ? 'border-kesariya-500 ring-2 ring-kesariya-200 bg-amber-50/40 text-slate-900 font-bold'
                              : 'border-slate-200 bg-white text-slate-600 placeholder-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Calculated Live Impact Banner */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-500">कुल सहयोग प्रभाव:</span>
                      <span className="font-extrabold text-kesariya-700">
                        {isCustom 
                          ? `₹${currentAmount} का पावन सहयोग`
                          : `${qty} ${cat.unitConfig.unitLabelHindi} (${cat.unitConfig.unitLabelEnglish}) का संपूर्ण खर्च`}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Bottom Total & Donate Action Button */}
                <div className="pt-2 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      कुल सेवा राशि (Total Amount):
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900">
                      ₹{currentAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDonateClick(
                      cat, 
                      currentAmount, 
                      isCustom ? 1 : qty, 
                      isCustom ? 'कस्टम सहयोग' : cat.unitConfig.unitLabelHindi
                    )}
                    className="w-full sm:w-auto btn-divine-3d text-white font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <span>इस कोष में सेवा करें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Evergreen Assurance Note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-amber-50/80 border border-amber-200 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            🚩 <strong>सदाबहार सेवा संकल्प:</strong> Yeh charo kosh saal ke 365 din active rehte hain. Aap kisi bhi samay, kisi bhi shubh avasar (Janmadin, Anniversaries, Punyatithi ya Pavitra Tyoharo) par inme apna yogdan de sakte hain.
          </p>
        </div>

      </div>
    </section>
  );
};
