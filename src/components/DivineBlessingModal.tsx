'use client';

import React from 'react';
import { X, Share2, Video, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface DivineBlessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchVideo: () => void;
  details: {
    donorName: string;
    categoryName: string;
    unitsText: string;
    amount: number;
    transactionRef: string;
    message?: string;
  } | null;
}

export const DivineBlessingModal: React.FC<DivineBlessingModalProps> = ({
  isOpen,
  onClose,
  onWatchVideo,
  details,
}) => {
  if (!isOpen || !details) return null;

  const shareText = `मैंने ${SITE_CONFIG.domain} पर "${details.categoryName}" के लिए ₹${details.amount.toLocaleString('en-IN')} का सेवा सहयोग किया। सेवा ही भक्ति है! https://${SITE_CONFIG.domain}`;

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="thankyou-heading"
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl border-2 border-amber-300 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-kesariya-600 to-amber-600 px-5 py-6 text-white text-center relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="बंद करें"
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-2.5 shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 id="thankyou-heading" className="text-2xl font-black">
            धन्यवाद {details.donorName}!
          </h3>
          <p className="text-sm text-amber-100 mt-1">
            आपका सेवा सहयोग सफलतापूर्वक प्राप्त हुआ
          </p>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B5E55]">ट्रांज़ैक्शन ID:</span>
              <span className="font-mono font-bold text-[#3B1F0A]">{details.transactionRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B5E55]">सेवा:</span>
              <span className="font-bold text-[#3B1F0A]">{details.categoryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B5E55]">प्रभाव:</span>
              <span className="font-bold text-[#3B1F0A]">{details.unitsText}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-amber-200">
              <span className="font-bold text-[#3B1F0A]">राशि:</span>
              <span className="text-lg font-black text-kesariya-700">
                ₹{details.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp पर शेयर करें</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onWatchVideo();
              }}
              className="w-full min-h-[48px] rounded-xl bg-amber-100 hover:bg-amber-200 text-[#3B1F0A] font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4 text-kesariya-700" />
              <span>इस सेवा का वीडियो देखें</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
