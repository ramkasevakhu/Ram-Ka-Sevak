'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Heart, 
  Smartphone, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  QrCode,
  CheckCircle2,
  AlertCircle
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
  const [upiPayload, setUpiPayload] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [upiId, setUpiId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(300); // 5 minutes

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount or close
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Countdown timer for active payment screen
  useEffect(() => {
    if (step === 'paying') {
      setCountdown(300);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [step]);

  if (!isOpen || !category) return null;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Limit mobile to strictly 10 digits
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
      setUpiPayload(data.upi_payload);
      setQrImageUrl(data.qr_image_url);
      setUpiId(data.upi_id);
      setStep('paying');

      // 2. Start polling for REAL bank verification (every 2.5 seconds)
      // Only passes when bank confirms payment and provides UTR
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

      pollIntervalRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch('/api/payment/check-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_id: orderId }),
          });
          const statusData = await statusRes.json();

          // ONLY trigger success if bank genuinely verified it with a valid UTR
          if (statusData.verified && statusData.status === 'success' && statusData.utr) {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

            // Payment genuinely verified from Bank! Show Blessing Modal
            onPaymentSuccess({
              donorName: finalDonorName,
              categoryName: category.titleEnglish || category.titleHindi,
              unitsText: quantityText,
              amount,
              transactionRef: statusData.utr,
              message: sankalpMessage.trim(),
            });
          }
        } catch (pollErr) {
          console.log('Status polling...', pollErr);
        }
      }, 2500);

    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to payment gateway.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualCheck = async () => {
    if (!activeOrderId) return;
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const statusRes = await fetch('/api/payment/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: activeOrderId }),
      });
      const statusData = await statusRes.json();

      if (statusData.verified && statusData.status === 'success' && statusData.utr) {
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        const finalDonorName = isAnonymous ? 'Anonymous Donor' : (donorName.trim() || 'Supporter');
        onPaymentSuccess({
          donorName: finalDonorName,
          categoryName: category.titleEnglish || category.titleHindi,
          unitsText: quantityText,
          amount,
          transactionRef: statusData.utr,
          message: sankalpMessage.trim(),
        });
      } else {
        setErrorMsg('Payment not received by bank yet. If you just completed the payment in your UPI app, please wait 5-10 seconds and click again.');
      }
    } catch (err) {
      setErrorMsg('Error checking status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct open UPI App handler
  const handleOpenUpiApp = (specificScheme?: string) => {
    if (!upiPayload && !paymentUrl) return;

    if (specificScheme && upiPayload) {
      const params = upiPayload.split('?')[1] || '';
      let targetUrl = upiPayload;
      if (specificScheme === 'phonepe') {
        targetUrl = `phonepe://pay?${params}`;
      } else if (specificScheme === 'gpay') {
        targetUrl = `gpay://upi/pay?${params}`;
      } else if (specificScheme === 'paytm') {
        targetUrl = `paytmmp://pay?${params}`;
      }
      window.location.href = targetUrl;
      return;
    }

    if (upiPayload) {
      window.location.href = upiPayload;
    } else if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-white border-2 border-amber-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header - Saffron Theme */}
        <div className="bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 px-6 py-4 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl drop-shadow-sm">🚩</span>
            <div>
              <h3 className="text-base font-black leading-tight tracking-wide">
                Seva Contribution • Ram Ka Sevak
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
        <div className="bg-amber-50/90 px-6 py-3 border-b border-amber-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Selected Seva:
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {quantityText}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Amount:</span>
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
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-kesariya-600 focus:ring-kesariya-500"
                  />
                  <span>Donate anonymously (hide my name on public records)</span>
                </label>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
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
                  <span>Generating Payment Details...</span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Proceed to Pay ₹{amount.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: In-App Saffron/Ram Themed Payment Screen */
            <div className="space-y-4 py-1 animate-in fade-in duration-200">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Clock className="w-4 h-4 text-kesariya-600 animate-spin" />
                  <span>Time Remaining:</span>
                  <span className="font-mono text-kesariya-700 bg-amber-200/60 px-2 py-0.5 rounded-md">
                    {formatTime(countdown)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live Gateway</span>
                </div>
              </div>

              {/* QR Code Container (Ram Ka Sevak Saffron Theme) */}
              <div className="bg-gradient-to-b from-amber-50/60 via-orange-50/40 to-amber-50/60 border-2 border-amber-300 rounded-3xl p-5 text-center shadow-inner">
                {qrImageUrl ? (
                  <div className="relative inline-block mx-auto p-3 bg-white rounded-2xl shadow-md border-2 border-amber-400">
                    <img 
                      src={qrImageUrl} 
                      alt="UPI QR Code" 
                      className="w-48 h-48 sm:w-52 sm:h-52 mx-auto rounded-lg"
                    />
                    {/* Center Saffron Badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-kesariya-600 to-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-sm">
                        🚩
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-48 h-48 mx-auto flex items-center justify-center bg-white rounded-2xl border border-amber-200">
                    <Clock className="w-8 h-8 text-amber-500 animate-spin" />
                  </div>
                )}

                <div className="mt-3">
                  <p className="text-xs font-bold text-slate-800">
                    Scan with any UPI App
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Google Pay • PhonePe • Paytm • BHIM • Cred
                  </p>
                </div>
              </div>

              {/* Mobile UPI App Direct Pay Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenUpiApp()}
                  className="w-full btn-divine-3d text-white font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Open in UPI App (Pay ₹{amount.toLocaleString('en-IN')})</span>
                </button>

                {/* Quick App Badges */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenUpiApp('gpay')}
                    className="py-2 px-1 text-[11px] font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Google Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenUpiApp('phonepe')}
                    className="py-2 px-1 text-[11px] font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                  >
                    <span>PhonePe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenUpiApp('paytm')}
                    className="py-2 px-1 text-[11px] font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Paytm</span>
                  </button>
                </div>
              </div>

              {/* Live Status Note */}
              <div className="flex items-center justify-center gap-2 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                <Clock className="w-4 h-4 text-kesariya-600 animate-spin shrink-0" />
                <span>
                  Waiting for bank confirmation... This page automatically updates once you complete the payment.
                </span>
              </div>

              {/* Manual Bank Status Check Button */}
              <button
                type="button"
                onClick={handleManualCheck}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Verifying with Bank...' : 'I Have Paid (Verify Bank Status)'}
              </button>

              {errorMsg && (
                <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Footer Links */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={() => {
                    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
                    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
                    setStep('form');
                  }}
                  className="hover:text-slate-800 underline cursor-pointer"
                >
                  ← Edit Details
                </button>

                {paymentUrl && (
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kesariya-700 flex items-center gap-1 underline cursor-pointer"
                  >
                    <span>Trouble paying? Open Hosted Cashier</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};