'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Heart, 
  Smartphone, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { DetailedSevaCategory } from '@/lib/constants';

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
  const [donorEmail, setDonorEmail] = useState('');
  const [sankalpMessage, setSankalpMessage] = useState('');
  
  // Payment states
  const [step, setStep] = useState<'form' | 'paying'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear polling on unmount or close
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  if (!isOpen || !category) return null;

  // Handle strictly 10 digits phone input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setDonorPhone(onlyDigits);
  };

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!isAnonymous && !donorName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!donorPhone || donorPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    const finalDonorName = isAnonymous ? 'Anonymous Donor' : (donorName.trim() || 'Supporter');

    try {
      // 1. Create order via ZapUPI backend API
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          sevaId: category.id,
          sevaName: category.titleEnglish || category.titleHindi,
          packageLabel: quantityText,
          donorName: finalDonorName,
          donorPhone: donorPhone.trim(),
          donorEmail: donorEmail.trim(),
          message: sankalpMessage.trim(),
          isAnonymous,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.order_id) {
        throw new Error(data.error || 'Failed to initiate payment. Please try again.');
      }

      const orderId = data.order_id;
      setActiveOrderId(orderId);
      setPaymentUrl(data.payment_url);
      setStep('paying');

      // If on mobile device, open payment cashier link
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && data.payment_url) {
        window.open(data.payment_url, '_blank');
      }

      // 2. Start polling for real bank verification (Every 3 seconds)
      // Guarantees real bank verification - no fake payments pass
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

      pollIntervalRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch('/api/payment/check-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_id: orderId }),
          });
          const statusData = await statusRes.json();

          if (statusData.verified) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

            // Payment Verified from Bank! Show Blessing Modal
            onPaymentSuccess({
              donorName: finalDonorName,
              categoryName: category.titleEnglish || category.titleHindi,
              unitsText: quantityText,
              amount,
              transactionRef: statusData.utr || orderId,
              message: sankalpMessage.trim(),
            });
          }
        } catch (pollErr) {
          console.log('Status polling...', pollErr);
        }
      }, 3000);

    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to payment gateway.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualCheck = async () => {
    if (!activeOrderId) return;
    setIsSubmitting(true);
    try {
      const statusRes = await fetch('/api/payment/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: activeOrderId }),
      });
      const statusData = await statusRes.json();

      if (statusData.verified) {
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        const finalDonorName = isAnonymous ? 'Anonymous Donor' : (donorName.trim() || 'Supporter');
        onPaymentSuccess({
          donorName: finalDonorName,
          categoryName: category.titleEnglish || category.titleHindi,
          unitsText: quantityText,
          amount,
          transactionRef: statusData.utr || activeOrderId,
          message: sankalpMessage.trim(),
        });
      } else {
        setErrorMsg('Payment not verified by your bank yet. If you have already paid, please wait 10-15 seconds and try again.');
      }
    } catch (err) {
      setErrorMsg('Error verifying status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-white border-2 border-amber-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-kesariya-600 to-amber-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚩</span>
            <div>
              <h3 className="text-base font-black leading-tight tracking-wide">
                Seva Contribution (Seva Daan)
              </h3>
              <p className="text-[11px] text-amber-100 font-medium">
                {category.titleEnglish || category.titleHindi}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Package Banner */}
        <div className="bg-amber-50/80 px-6 py-3 border-b border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-500 block">
              Selected Seva:
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {quantityText}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase text-slate-500 block">Amount:</span>
            <span className="text-lg font-black text-kesariya-700">
              ₹{amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'form' ? (
            /* STEP 1: Donor Details Form */
            <form onSubmit={handleStartPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? 'Anonymous Donor' : 'e.g. Rahul Sharma'}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Number (10 Digits) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={donorPhone}
                    onChange={handlePhoneChange}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address (Optional, for receipt)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Message / Prayer (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Write a prayer, dedication, or seva note..."
                  value={sankalpMessage}
                  onChange={(e) => setSankalpMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-kesariya-600 focus:ring-kesariya-500"
                  />
                  <span>Donate anonymously (hide my name on public lists)</span>
                </label>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {errorMsg}
                </p>
              )}

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Secure Payment:</strong> Direct transfer via PhonePe, Google Pay, Paytm, BHIM or any UPI app. Instant bank verification.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-divine-3d text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm disabled:opacity-50 shadow-md cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Connecting to UPI Gateway...</span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Pay via UPI (₹{amount.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: Live Payment Cashier & Status Waiting */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-3xl">
                💳
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Waiting for Payment Confirmation...
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Click the button below to complete the payment via PhonePe, Google Pay, Paytm or any UPI app.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-sm mx-auto">
                {paymentUrl && (
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-divine-3d text-white font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Open in UPI App / Paytm Cashier ↗</span>
                  </a>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <Clock className="w-4 h-4 animate-spin text-amber-600" />
                  <span>This page will automatically confirm once your payment is received by the bank.</span>
                </div>

                <button
                  type="button"
                  onClick={handleManualCheck}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Verifying with bank...' : 'I have completed payment (Verify Now)'}
                </button>
              </div>

              {errorMsg && (
                <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 max-w-sm mx-auto">
                  {errorMsg}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                    setStep('form');
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
                >
                  ← Go back or edit details
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};