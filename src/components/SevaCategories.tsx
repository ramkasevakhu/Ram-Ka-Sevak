'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Heart
} from 'lucide-react';
import { SEVA_CATEGORIES, ExtendedSevaCategory } from '@/lib/constants';

interface SevaCategoriesProps {
  onDonateClick: (category: ExtendedSevaCategory, amount: number, quantity: number, unitLabel: string) => void;
}

export const SevaCategories: React.FC<SevaCategoriesProps> = ({ onDonateClick }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'roadside-relief': 5,
    'animal-welfare': 5,
    'medical-emergency': 1,
    'disaster-relief': 2,
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
    setIsCustomMode(prev => ({ ...prev, [categoryId]: false }));
  };

  const handlePresetSelect = (categoryId: string, count: number) => {
    setQuantities(prev => ({ ...prev, [categoryId]: count }));
    setIsCustomMode(prev => ({ ...prev, [categoryId]: false }));
  };

  const handleCustomAmountChange = (categoryId: string, val: string) => {
    const sanitized = val.replace(/\D/g, '');
    setCustomAmounts(prev => ({ ...prev, [categoryId]: sanitized }));
    if (sanitized) {
      setIsCustomMode(prev => ({ ...prev, [categoryId]: true }));
    }
  };

  const getEffectiveAmount = (category: ExtendedSevaCategory): number => {
    const isCustom = isCustomMode[category.id];
    const customVal = customAmounts[category.id];
    if (isCustom && customVal && parseInt(customVal, 10) > 0) {
      return parseInt(customVal, 10);
    }
    const qty = quantities[category.id] || 1;
    return qty * category.unitConfig.unitCost;
  };

  return (
    <section id="seva-categories" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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
            ये 4 सेवा कोष सदाबहार (Evergreen) हैं। आप जितने व्यक्तियों या मूक जीवों को भोजन या इलाज देना चाहते हैं, उसका सीधा हिसाब यहाँ से चुन सकते हैं।
          </p>
        </div>

        {/* 4 Cards Grid with Real Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {SEVA_CATEGORIES.map((cat, idx) => {
            const qty = quantities[cat.id] || 1;
            const isCustom = isCustomMode[cat.id];
            const currentAmount = getEffectiveAmount(cat);

            return (
              <div
                key={cat.id}
                className="glass-3d-card rounded-3xl overflow-hidden flex flex-col justify-between border-2 border-amber-200/80 hover:border-kesariya-400/90 shadow-md transition-all"
              >
                <div>
                  {/* Real Photo Top Banner */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cat.imageUrl}
                      alt={cat.imageAlt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>
                    
                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-slate-950 shadow-md">
                        {cat.highlightTag}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 text-4xl font-black text-white/30 select-none">
                      0{idx + 1}
                    </div>

                    {/* Banner Title Details */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-amber-200">
                          {cat.badgeEnglish}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-200">
                          {cat.badgeHindi}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {cat.titleEnglish}
                      </h3>
                      <p className="text-xs text-amber-300 font-semibold mt-0.5">
                        {cat.titleHindi}
                      </p>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-7">
                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Trust Highlights Checklist */}
                    <div className="space-y-2 mb-6 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 text-xs sm:text-sm text-slate-700">
                      {cat.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Quantity / Unit Calculator Box */}
                    <div className="bg-white rounded-2xl p-5 border-2 border-amber-200/90 shadow-xs mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                            मल्टीप्लायर कैलकुलेटर (Live Impact Calculator)
                          </span>
                          <p className="text-xs text-slate-500">
                            {cat.unitConfig.unitDescription}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] text-slate-400">लागत प्रति यूनिट</span>
                          <div className="text-sm font-black text-slate-900">
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
                        <span className="text-slate-500">कुल सेवा प्रभाव:</span>
                        <span className="font-extrabold text-kesariya-700">
                          {isCustom 
                            ? `₹${currentAmount} का पावन सहयोग`
                            : `${qty} ${cat.unitConfig.unitLabelHindi} का संपूर्ण खर्च`}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Bottom Total & Donate Action Button */}
                <div className="p-6 sm:p-7 pt-0 border-t border-amber-100/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
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
                    className="w-full sm:w-auto btn-divine-3d text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    <span>इस कोष में सेवा करें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Evergreen Note */}
        <div className="mt-12 text-center p-5 rounded-2xl bg-amber-50/90 border border-amber-200 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-700 font-semibold">
            🚩 <strong>सदाबहार सेवा संकल्प:</strong> ये चारों कोष 365 दिन सक्रिय रहते हैं। अपने जन्मदिन, वर्षगांठ या किसी भी शुभ अवसर पर आप इनमें सीधा योगदान दे सकते हैं।
          </p>
        </div>

      </div>
    </section>
  );
};
