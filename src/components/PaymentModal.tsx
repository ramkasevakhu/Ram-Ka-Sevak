'use client';

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Heart, 
  ShieldCheck, 
  Smartphone, 
  QrCode,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { SITE_CONFIG, DetailedSevaCategory } from '@/lib/constants';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: DetailedSevaCategory | null;
  amount: number;
  quantityText: string;
  exactWhatIsGiven: string;
  onPaymentSuccess: (details: {
    donorName: string;
    categoryName: string;
    unitsText: string;
    amount: number;
    transactionRef: string;
    message?: string;
  }) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  category,
  amount,
  quantityText,
  exactWhatIsGiven,
  onPaymentSuccess,
}) => {
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorPhone, setDonorPhone] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [sankalpMessage, setSankalpMessage] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !category) return null;

  const upiId = SITE_CONFIG.defaultUpiId;
  const upiName = SITE_CONFIG.defaultUpiName;
  const note = `Ram Ka Sevak - ${category.titleEnglish}`;

  // Standard UPI deep link specification
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  // QuickChart QR Code API for high quality sharp QR
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(upiDeepLink)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalDonorName = isAnonymous ? 'Anonymous Sevak (गुप्त दानी)' : (donorName.trim() || 'Devoted Donor');

    try {
      await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: finalDonorName,
          donorPhone: donorPhone.trim(),
          categoryId: category.id,
          categoryName: category.titleEnglish,
          quantity: 1,
          unitLabel: quantityText,
          amount,
          paymentMethod: 'UPI',
          transactionRef: transactionRef.trim() || 'UPI-DIRECT',
          sankalpMessage: sankalpMessage.trim(),
          isAnonymous,
          status: 'verified',
        }),
      });
    } catch (err) {
      console.warn('Database save note:', err);
    } finally {
      setIsSubmitting(false);
      onPaymentSuccess({
        donorName: finalDonorName,
        categoryName: category.titleEnglish,
        unitsText: quantityText,
        amount,
        transactionRef: transactionRef.trim() || `RKS-${Math.floor(100000 + Math.random() * 900000)}`,
        message: sankalpMessage.trim(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-kesariya-600 via-amber-500 to-kesariya-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛕</span>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">
                पवित्र सेवा संकल्प (Seva Contribution)
              </h3>
              <p className="text-xs text-amber-100">
                {SITE_CONFIG.domain} • Ram Ka Sevak Grassroots Relief Fund
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Category & Amount Summary Banner */}
        <div className="bg-amber-50/90 px-6 py-4 border-b border-amber-200">
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
                Chuna Gaya Seva Sankalp:
              </span>
              <div className="text-sm sm:text-base font-black text-slate-900">
                {category.titleEnglish} ({quantityText})
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">Daan Rashi:</span>
              <span className="text-2xl font-black text-kesariya-700">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-white/80 p-2 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">{exactWhatIsGiven}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* 1. Mobile 1-Click UPI Intent Apps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-4 h-4 text-kesariya-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1-Click UPI Payment (Direct Mobile Apps)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href={upiDeepLink}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-500 bg-slate-50 hover:bg-purple-50 flex flex-col items-center justify-center text-center transition-all group"
              >
                <span className="text-xs font-bold text-purple-700 group-hover:scale-105 transition-transform">
                  PhonePe
                </span>
                <span className="text-[10px] text-slate-400">Direct Pay</span>
              </a>

              <a
                href={upiDeepLink}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50 flex flex-col items-center justify-center text-center transition-all group"
              >
                <span className="text-xs font-bold text-blue-600 group-hover:scale-105 transition-transform">
                  Google Pay
                </span>
                <span className="text-[10px] text-slate-400">Direct Pay</span>
              </a>

              <a
                href={upiDeepLink}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-cyan-500 bg-slate-50 hover:bg-cyan-50 flex flex-col items-center justify-center text-center transition-all group"
              >
                <span className="text-xs font-bold text-cyan-700 group-hover:scale-105 transition-transform">
                  Paytm UPI
                </span>
                <span className="text-[10px] text-slate-400">Direct Pay</span>
              </a>

              <a
                href={upiDeepLink}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-kesariya-500 bg-slate-50 hover:bg-amber-50 flex flex-col items-center justify-center text-center transition-all group"
              >
                <span className="text-xs font-bold text-kesariya-600 group-hover:scale-105 transition-transform">
                  BHIM / Any
                </span>
                <span className="text-[10px] text-slate-400">Any App</span>
              </a>
            </div>
          </div>

          {/* 2. QR Code & Direct UPI ID */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center gap-4">
            
            <div className="w-36 h-36 bg-white p-2 rounded-xl border-2 border-amber-300 shadow-sm shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCodeUrl}
                alt="Scan to Pay via UPI"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center sm:text-left flex-1 space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-800">
                <QrCode className="w-4 h-4 text-kesariya-600" />
                <span>Kisi bhi UPI App se QR Scan Karein</span>
              </div>
              
              <p className="text-xs text-slate-500">
                GPay, PhonePe, Paytm ya CRED se scan karke ₹{amount} seedha seva account me transfer karein.
              </p>

              {/* Copy UPI Box */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-mono font-bold text-slate-800">
                <span className="truncate flex-1">{upiId}</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="p-1 rounded-md text-kesariya-600 hover:bg-amber-50 flex items-center gap-1 cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* 3. Donor Details Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Aapka Shubh Naam (Donor Name):
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-kesariya-600 focus:ring-kesariya-500"
                />
                <span className="font-medium">Gupt Daan (गुप्त दान)</span>
              </label>
            </div>

            {!isAnonymous && (
              <input
                type="text"
                placeholder="e.g. Amit Sharma / Priya Rathore"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-kesariya-500 focus:ring-2 focus:ring-kesariya-100 transition-all text-slate-900"
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  WhatsApp Number (Video proof & receipt pane ke liye):
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-kesariya-500 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  UPI UTR / Ref Number (Optional):
                </label>
                <input
                  type="text"
                  placeholder="12-digit UTR Number"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-kesariya-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Koi Prarthana ya Dua Sandesh (Optional):
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Prabhu Shri Ram sabhi ka kalyan karein aur sabko swasth rakhein! 🙏"
                value={sankalpMessage}
                onChange={(e) => setSankalpMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-kesariya-500 text-slate-900 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-divine-3d text-white font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>{isSubmitting ? 'Sankalp Darj Ho Raha Hai...' : 'Payment Complete Kiya • Digital Receipt Payein'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Direct Impact • 0% Middlemen Commission • Direct Grassroots Delivery</span>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
