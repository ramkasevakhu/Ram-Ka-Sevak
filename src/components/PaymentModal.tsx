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
  amount: initialAmount,
  quantityText: initialQuantityText,
  exactWhatIsGiven,
  onPaymentSuccess,
}) => {
  // Amount & Custom Amount states
  const [currentAmount, setCurrentAmount] = useState<number>(initialAmount || 250);
  const [customAmountStr, setCustomAmountStr] = useState<string>(String(initialAmount || 250));
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Donor form states
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [sankalpMessage, setSankalpMessage] = useState('');
  
  // Payment gateway states
  const [step, setStep] = useState<'form' | 'paying'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [upiPayload, setUpiPayload] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(300); // 5 minutes

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when modal opens or initial amount changes
  useEffect(() => {
    const startAmt = initialAmount > 0 ? initialAmount : 250;
    setCurrentAmount(startAmt);
    setCustomAmountStr(String(startAmt));
    setIsCustom(false);
    setErrorMsg('');
    setStep('form');
  }, [initialAmount, isOpen]);

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

  // Smart dynamic label calculation based on amount and category
  const calculateDynamicLabel = (cat: DetailedSevaCategory, amt: number) => {
    // If exact preset match exists in category options
    const exactMatch = cat.options.find((opt) => opt.amount === amt);
    if (exactMatch) {
      return exactMatch.label;
    }

    // Annadaan Seva (₹50 = 1 Thali Bhojan)
    if (
      cat.id === 'roadside-relief' || 
      cat.titleHindi?.includes('अन्नदान') || 
      cat.titleEnglish?.toLowerCase().includes('food')
    ) {
      const thaliCount = Math.floor(amt / 50);
      if (thaliCount <= 0) {
        return `भोजन सेवा सहयोग (₹${amt})`;
      }
      if (thaliCount === 1) {
        return `1 Vyakti ka Khana (1 Thali)`;
      }
      return `${thaliCount} Logon ka Khana (${thaliCount} Thali Bhojan)`;
    }

    // Gau & Animal Seva (₹150 = 1 day care)
    if (
      cat.id === 'animal-care' || 
      cat.titleHindi?.includes('गौ') || 
      cat.titleEnglish?.toLowerCase().includes('animal')
    ) {
      const days = Math.floor(amt / 150);
      if (days >= 1) {
        return `${days} Din ka Chara & Pashu Seva`;
      }
      return `Gau & Pashu Seva Sahyog`;
    }

    // Medical Relief
    if (
      cat.id === 'medical-cases' || 
      cat.titleHindi?.includes('इलाज') || 
      cat.titleEnglish?.toLowerCase().includes('medical')
    ) {
      return `Emergency Medical Relief (दवा व इलाज)`;
    }

    // Disaster Relief
    if (
      cat.id === 'disaster-fund' || 
      cat.titleHindi?.includes('आपदा') || 
      cat.titleEnglish?.toLowerCase().includes('disaster')
    ) {
      return `Aapatkaleen Rahat Sahyog (आपदा राहत)`;
    }

    return `₹${amt.toLocaleString('en-IN')} Seva Sankalp`;
  };

  const currentQuantityText = calculateDynamicLabel(category, currentAmount);

  // Handle Preset Chip Click
  const handleSelectPreset = (presetAmt: number) => {
    setIsCustom(false);
    setCurrentAmount(presetAmt);
    setCustomAmountStr(String(presetAmt));
    setErrorMsg('');
  };

  // Handle Custom Amount Input Change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value.replace(/\D/g, ''); // numbers only
    setCustomAmountStr(valStr);
    setIsCustom(true);

    const valNum = Number(valStr);
    if (valNum > 0) {
      setCurrentAmount(valNum);
      setErrorMsg('');
    }
  };

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
    if (!currentAmount || currentAmount < 10) {
      setErrorMsg('कृपया कम से कम ₹10 की राशि दर्ज करें। (Minimum ₹10 required)');
      return;
    }

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
          amount: currentAmount,
          sevaId: category.id,
          sevaName: category.titleEnglish || category.titleHindi,
          packageLabel: currentQuantityText,
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
      setStep('paying');

      // 2. Start polling for REAL bank verification (every 2.5 seconds)
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
              unitsText: currentQuantityText,
              amount: currentAmount,
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
          unitsText: currentQuantityText,
          amount: currentAmount,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-hidden">
      <div className="relative w-full max-w-md max-h-[94vh] flex flex-col rounded-2xl sm:rounded-3xl bg-white border-2 border-amber-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* COMPACT TOP HEADER */}
        <div className="shrink-0 bg-gradient-to-r from-kesariya-600 via-amber-600 to-kesariya-700 px-4 py-2.5 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl drop-shadow-sm">🚩</span>
            <div>
              <h3 className="text-xs sm:text-sm font-black tracking-wide leading-tight">
                Ram Ka Sevak • Seva Daan
              </h3>
              <p className="text-[10px] sm:text-[11px] text-amber-100 font-medium">
                {category.titleHindi || category.titleEnglish}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SELECTED SEVA CARD - Prominent Package & Dynamic Amount Banner */}
        <div className="shrink-0 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2.5 border-b border-amber-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg shrink-0">🍛</span>
            <div className="truncate">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800/80 block leading-none mb-0.5">
                Seva Sankalp:
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate block">
                {currentQuantityText}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0 pl-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800/80 block leading-none mb-0.5">
              Total Amount
            </span>
            <span className="text-base sm:text-lg font-black text-kesariya-700">
              ₹{currentAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* SCROLLABLE MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {step === 'form' ? (
            /* STEP 1: Donor Details & Amount Selection Form */
            <form onSubmit={handleStartPayment} className="space-y-3 sm:space-y-3.5">
              
              {/* AMOUNT SELECTOR & CUSTOM AMOUNT BOX */}
              <div className="bg-amber-50/60 p-2.5 rounded-2xl border border-amber-200">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] sm:text-xs font-bold text-slate-800">
                    सहयोग राशि चुनें (Select or Enter Amount):
                  </label>
                  <span className="text-[10px] font-bold text-kesariya-700 bg-amber-200/60 px-2 py-0.5 rounded-full">
                    ₹50 = 1 Thali
                  </span>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mb-2">
                  {[50, 250, 500, 1100, 2100, 5100].map((amt) => {
                    const isSelected = !isCustom && currentAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleSelectPreset(amt)}
                        className={`py-1.5 px-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-kesariya-600 text-white border-kesariya-600 shadow-xs scale-102'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50'
                        }`}
                      >
                        ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input Box */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-kesariya-700">
                    ₹
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="मनचाही राशि दर्ज करें (Enter any custom amount)..."
                    value={customAmountStr}
                    onChange={handleCustomAmountChange}
                    className="w-full text-xs font-bold pl-7 pr-3 py-2 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                  />
                </div>
              </div>

              {/* Donor Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700 block mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? 'Anonymous Donor' : 'e.g. Rahul Sharma'}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700 block mb-1">
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
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] sm:text-xs font-bold text-slate-700 block mb-1">
                  Email Address (Optional, for receipt)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] sm:text-xs font-bold text-slate-700 block mb-1">
                  Message / Prayer (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Write a prayer, dedication, or seva note..."
                  value={sankalpMessage}
                  onChange={(e) => setSankalpMessage(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-kesariya-500 bg-white"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer text-[11px] sm:text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-kesariya-600 focus:ring-kesariya-500 w-3.5 h-3.5"
                  />
                  <span>Donate anonymously (hide my name on public lists)</span>
                </label>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded-xl border border-red-200 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[10px] sm:text-[11px] text-slate-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>100% Secure Payment:</strong> Direct UPI via PhonePe, GPay, Paytm, BHIM.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-divine-3d text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50 shadow-md cursor-pointer mt-1"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Loading QR Code...</span>
                  </span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Proceed to Pay ₹{currentAmount.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: Mobile-Optimized Saffron/Ram Themed Payment Screen */
            <div className="space-y-3 py-1">
              
              {/* Header Live Timer Badge */}
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Clock className="w-3.5 h-3.5 text-kesariya-600 animate-spin" />
                  <span>Time Remaining:</span>
                  <span className="font-mono text-kesariya-700 bg-amber-200/60 px-1.5 py-0.5 rounded text-xs font-bold">
                    {formatTime(countdown)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live Gateway</span>
                </div>
              </div>

              {/* Mobile UPI App Direct Pay Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleOpenUpiApp()}
                  className="w-full btn-divine-3d text-white font-black py-3 px-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Open in UPI App (Pay ₹{currentAmount.toLocaleString('en-IN')})</span>
                </button>

                {/* Quick App Badges */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenUpiApp('gpay')}
                    className="py-1.5 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>Google Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenUpiApp('phonepe')}
                    className="py-1.5 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>PhonePe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenUpiApp('paytm')}
                    className="py-1.5 px-1 text-[10px] sm:text-[11px] font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>Paytm</span>
                  </button>
                </div>
              </div>

              {/* Compact Saffron QR Code Card */}
              <div className="bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/50 border border-amber-300 rounded-2xl p-3 text-center shadow-inner">
                {qrImageUrl ? (
                  <div className="relative inline-block mx-auto p-2 bg-white rounded-xl shadow-md border border-amber-300">
                    <img 
                      src={qrImageUrl} 
                      alt="UPI QR Code" 
                      className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded"
                    />
                    {/* Center Flag Badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-kesariya-600 to-amber-500 border-2 border-white shadow-md flex items-center justify-center text-xs">
                        🚩
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-36 h-36 mx-auto flex items-center justify-center bg-white rounded-xl border border-amber-200">
                    <Clock className="w-6 h-6 text-amber-500 animate-spin" />
                  </div>
                )}

                <div className="mt-1.5">
                  <p className="text-[11px] font-bold text-slate-800">
                    Scan with any UPI App
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Google Pay • PhonePe • Paytm • BHIM • Cred
                  </p>
                </div>
              </div>

              {/* Waiting Status Note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-xl border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-kesariya-600 animate-spin shrink-0" />
                <span>
                  Waiting for bank confirmation... Auto-verifies after payment.
                </span>
              </div>

              {/* Manual Bank Check Button */}
              <button
                type="button"
                onClick={handleManualCheck}
                disabled={isSubmitting}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Verifying with Bank...' : 'I Have Paid (Verify Bank Status)'}
              </button>

              {errorMsg && (
                <div className="text-xs text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Footer Links */}
              <div className="pt-0.5 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
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
                    <span>Trouble? Open Hosted Cashier</span>
                    <ExternalLink className="w-2.5 h-2.5" />
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