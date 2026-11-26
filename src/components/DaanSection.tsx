'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ShieldCheck,
  Video,
  Info,
  Smartphone,
  Clock,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { DETAILED_SEVA_CATEGORIES, DetailedSevaCategory, SITE_CONFIG } from '@/lib/constants';

interface DaanSectionProps {
  selectedCategoryId: string;
  onSelectCategoryId: (id: string) => void;
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
  onPaymentSuccess: (details: {
    donorName: string;
    categoryName: string;
    unitsText: string;
    amount: number;
    transactionRef: string;
    message?: string;
  }) => void;
}

export const DaanSection: React.FC<DaanSectionProps> = ({
  selectedCategoryId,
  onSelectCategoryId,
  selectedAmount,
  onSelectAmount,
  onPaymentSuccess,
}) => {
  const category: DetailedSevaCategory =
    DETAILED_SEVA_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    DETAILED_SEVA_CATEGORIES[0];

  const [customInput, setCustomInput] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorContact, setDonorContact] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');

  const [paymentStep, setPaymentStep] = useState<'details' | 'paying'>('details');
  const [gatewayMode, setGatewayMode] = useState<'zapupi' | 'direct_upi_fallback'>('zapupi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fallbackNotice, setFallbackNotice] = useState('');

  const [orderId, setOrderId] = useState<string | null>(null);
  const [upiPayload, setUpiPayload] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [upiId, setUpiId] = useState<string>(SITE_CONFIG.defaultUpiId);
  const [countdown, setCountdown] = useState<number>(300);
  const [paymentStatusMsg, setPaymentStatusMsg] = useState<'idle' | 'pending' | 'failed'>('idle');

  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (paymentStep === 'paying') {
      setCountdown(300);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [paymentStep]);

  const matchedOption = category.options.find((o) => o.amount === selectedAmount);
  const liveImpactSummary = matchedOption
    ? `₹${selectedAmount.toLocaleString('en-IN')} = ${matchedOption.impactLine}`
    : category.id === 'roadside-relief'
    ? `₹${selectedAmount.toLocaleString('en-IN')} = लगभग ${Math.max(1, Math.floor(selectedAmount / 50))} लोगों का गरम भोजन`
    : `₹${selectedAmount.toLocaleString('en-IN')} = ${category.shortName} सहयोग`;

  const handlePresetClick = (amt: number) => {
    setCustomInput('');
    onSelectAmount(amt);
    setErrorMsg('');
  };

  const handleCustomChange = (val: string) => {
    const clean = val.replace(/\D/g, '');
    setCustomInput(clean);
    const num = parseInt(clean, 10);
    if (num > 0) {
      onSelectAmount(num);
      setErrorMsg('');
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setFallbackNotice('');
    setPaymentStatusMsg('idle');

    if (!selectedAmount || selectedAmount < 50) {
      setErrorMsg('कृपया कम से कम ₹50 की सहयोग राशि दर्ज करें।');
      return;
    }
    if (!donorName.trim()) {
      setErrorMsg('कृपया अपना नाम दर्ज करें।');
      return;
    }

    const cleanContact = donorContact.trim();
    const isEmail = cleanContact.includes('@');
    const phoneDigits = isEmail ? '' : cleanContact.replace(/\D/g, '').slice(0, 10);
    const emailVal = isEmail ? cleanContact : '';

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedAmount,
          sevaId: category.id,
          sevaName: category.shortName,
          packageLabel: matchedOption?.impactLine || `₹${selectedAmount} सेवा सहयोग`,
          donorName: donorName.trim(),
          donorPhone: phoneDigits,
          donorEmail: emailVal,
          message: message.trim(),
          isAnonymous,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'भुगतान प्रारंभ नहीं हो सका।');
      }

      setOrderId(data.order_id);
      setUpiPayload(data.upi_payload);
      setQrImageUrl(data.qr_image_url);
      setPaymentUrl(data.payment_url || null);
      if (data.upi_id) setUpiId(data.upi_id);
      setGatewayMode(data.mode);
      if (data.fallback && data.fallback_reason) {
        setFallbackNotice(data.fallback_reason);
      }
      setPaymentStep('paying');

      // Start live ZapUPI verification polling every 2.5s
      if (data.mode === 'zapupi') {
        if (pollRef.current) clearInterval(pollRef.current);
        pollRef.current = setInterval(async () => {
          try {
            const stRes = await fetch('/api/payment/check-status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ order_id: data.order_id }),
            });
            const stData = await stRes.json();
            if (stData.verified && stData.status === 'success') {
              if (pollRef.current) clearInterval(pollRef.current);
              onPaymentSuccess({
                donorName: isAnonymous ? 'गुप्त दानी' : donorName.trim(),
                categoryName: category.shortName,
                unitsText: matchedOption?.impactLine || `₹${selectedAmount} सेवा सहयोग`,
                amount: selectedAmount,
                transactionRef: stData.utr || data.order_id,
                message: message.trim(),
              });
              setPaymentStep('details');
            } else if (stData.status === 'failed') {
              if (pollRef.current) clearInterval(pollRef.current);
              setPaymentStatusMsg('failed');
            }
          } catch {
            // Keep polling silently
          }
        }, 2500);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'कनेक्शन त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenUpiApp = (app: 'gpay' | 'phonepe' | 'paytm' | 'any') => {
    if (!upiPayload) return;
    const params = upiPayload.split('?')[1] || '';
    let url = upiPayload;
    if (app === 'gpay') url = `gpay://upi/pay?${params}`;
    else if (app === 'phonepe') url = `phonepe://pay?${params}`;
    else if (app === 'paytm') url = `paytmmp://pay?${params}`;
    window.location.href = url;
  };

  const handleManualCheckOrConfirm = async () => {
    if (!orderId) return;
    setIsSubmitting(true);
    setPaymentStatusMsg('idle');
    try {
      if (gatewayMode === 'zapupi') {
        const stRes = await fetch('/api/payment/check-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId }),
        });
        const stData = await stRes.json();

        if (stData.verified && stData.status === 'success') {
          if (pollRef.current) clearInterval(pollRef.current);
          onPaymentSuccess({
            donorName: isAnonymous ? 'गुप्त दानी' : donorName.trim(),
            categoryName: category.shortName,
            unitsText: matchedOption?.impactLine || `₹${selectedAmount} सेवा सहयोग`,
            amount: selectedAmount,
            transactionRef: stData.utr || orderId,
            message: message.trim(),
          });
          setPaymentStep('details');
        } else if (stData.status === 'failed') {
          setPaymentStatusMsg('failed');
        } else {
          setPaymentStatusMsg('pending');
        }
      } else {
        await fetch('/api/donate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            donorName: donorName.trim(),
            categoryId: category.id,
            categoryName: category.shortName,
            quantity: 1,
            unitLabel: matchedOption?.impactLine || `₹${selectedAmount} सेवा`,
            amount: selectedAmount,
            paymentMethod: 'Direct UPI (Fallback)',
            transactionRef: orderId,
            sankalpMessage: message.trim(),
            isAnonymous,
            status: 'pending',
          }),
        });
        onPaymentSuccess({
          donorName: isAnonymous ? 'गुप्त दानी' : donorName.trim(),
          categoryName: category.shortName,
          unitsText: matchedOption?.impactLine || `₹${selectedAmount} सेवा सहयोग`,
          amount: selectedAmount,
          transactionRef: orderId,
          message: message.trim(),
        });
        setPaymentStep('details');
      }
    } catch {
      setPaymentStatusMsg('failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setPaymentStatusMsg('idle');
    setErrorMsg('');
    setFallbackNotice('');
    setPaymentStep('details');
  };

  return (
    <section id="daan-section" className="py-8 sm:py-12 px-4 bg-[#FFF7EA]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
            4 आसान चरणों में सेवा सहयोग करें
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E55] mt-1">
            त्वरित और सुरक्षित UPI भुगतान
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-md p-4 sm:p-6 space-y-6">
          {/* STEP 1: Seva Chuno */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-black text-[#3B1F0A]">
                1. सेवा चुनें
              </span>
              <span className="text-xs font-bold text-[#6B5E55] sm:hidden">
                स्वाइप करें →
              </span>
            </div>

            <div className="flex sm:grid sm:grid-cols-4 gap-2 overflow-x-auto pb-1 no-scrollbar snap-x">
              {DETAILED_SEVA_CATEGORIES.map((cat) => {
                const active = cat.id === category.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategoryId(cat.id);
                      setPaymentStep('details');
                    }}
                    className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-sm sm:text-base font-extrabold whitespace-nowrap shrink-0 snap-start border-2 transition-all cursor-pointer ${
                      active
                        ? 'bg-kesariya-600 text-white border-kesariya-600 shadow-sm'
                        : 'bg-amber-50/70 text-[#3B1F0A] border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    {cat.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Amount Chuno */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-black text-[#3B1F0A]">
                2. राशि चुनें
              </span>
              <span className="text-xs font-bold text-kesariya-700 bg-amber-100 px-2.5 py-1 rounded-full">
                {category.unitLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {category.options.map((opt) => {
                const active = !customInput && selectedAmount === opt.amount;
                return (
                  <button
                    key={opt.amount}
                    type="button"
                    onClick={() => handlePresetClick(opt.amount)}
                    className={`min-h-[68px] p-3 rounded-2xl text-left border-2 relative transition-all cursor-pointer ${
                      active
                        ? 'border-kesariya-600 bg-amber-50 ring-2 ring-kesariya-200'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    {opt.popular && (
                      <span className="absolute -top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                        लोकप्रिय
                      </span>
                    )}
                    <div className="text-xl font-black text-[#3B1F0A]">
                      ₹{opt.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs font-semibold text-[#6B5E55] mt-0.5 leading-snug">
                      {opt.impactLine}
                    </div>
                  </button>
                );
              })}

              <div className="col-span-2 sm:col-span-1 flex items-center relative">
                <span className="absolute left-3.5 text-base font-black text-kesariya-700">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="अन्य राशि दर्ज करें (न्यूनतम ₹50)"
                  placeholder="अन्य राशि (न्यूनतम ₹50)"
                  value={customInput}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className="w-full min-h-[52px] pl-8 pr-3 rounded-2xl border-2 border-slate-200 focus:border-kesariya-600 focus:outline-none text-base font-bold text-[#3B1F0A]"
                />
              </div>
            </div>

            <div className="mt-3 p-3 rounded-2xl bg-amber-100/80 border border-amber-300 text-sm sm:text-base font-black text-[#3B1F0A] text-center">
              {liveImpactSummary}
            </div>

            <details className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/40 group">
              <summary className="min-h-[48px] px-4 flex items-center justify-between text-sm font-bold text-[#3B1F0A] cursor-pointer list-none">
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-kesariya-600 shrink-0" />
                  <span>{category.menuAccordionTitle}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-[#6B5E55] transition-transform group-open:rotate-180" />
              </summary>
              <ul className="px-4 pb-3.5 pt-1 space-y-1.5 text-sm text-[#5C4E44]">
                {category.menuAccordionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* STEP 3 & 4 */}
          {paymentStep === 'details' ? (
            <form onSubmit={handleCreatePayment} className="space-y-4">
              <div className="text-sm font-black text-[#3B1F0A]">
                3. आपका विवरण
              </div>

              <div>
                <label htmlFor="donor-name" className="block text-sm font-bold text-[#3B1F0A] mb-1">
                  आपका नाम <span className="text-red-600">*</span>
                </label>
                <input
                  id="donor-name"
                  type="text"
                  required
                  placeholder="उदा. राहुल शर्मा"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 rounded-xl border-2 border-slate-200 focus:border-kesariya-600 focus:outline-none text-base text-[#3B1F0A]"
                />
              </div>

              <div>
                <label htmlFor="donor-contact" className="block text-sm font-bold text-[#3B1F0A] mb-1">
                  फ़ोन या ईमेल (वैकल्पिक)
                </label>
                <input
                  id="donor-contact"
                  type="text"
                  placeholder="मोबाइल नंबर या ईमेल (रसीद के लिए)"
                  value={donorContact}
                  onChange={(e) => setDonorContact(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 rounded-xl border-2 border-slate-200 focus:border-kesariya-600 focus:outline-none text-base text-[#3B1F0A]"
                />
              </div>

              <div>
                <label htmlFor="donor-message" className="block text-sm font-bold text-[#3B1F0A] mb-1">
                  संदेश / प्रार्थना (वैकल्पिक)
                </label>
                <input
                  id="donor-message"
                  type="text"
                  placeholder="कोई विशेष प्रार्थना या शुभकामना लिखें..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 rounded-xl border-2 border-slate-200 focus:border-kesariya-600 focus:outline-none text-base text-[#3B1F0A]"
                />
              </div>

              <label className="flex items-center gap-3 min-h-[48px] cursor-pointer select-none text-sm font-bold text-[#5C4E44]">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded accent-kesariya-600"
                />
                <span>नाम गुप्त रखें (वेबसाइट पर नाम न दिखाएँ)</span>
              </label>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm font-bold text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] rounded-2xl bg-kesariya-600 hover:bg-kesariya-700 active:scale-[0.98] text-white font-black text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>QR कोड तैयार हो रहा है...</span>
                  </>
                ) : (
                  <>
                    <span>₹{selectedAmount.toLocaleString('en-IN')} • भुगतान करें</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 4: Live ZapUPI QR + Intent Buttons + Auto Polling */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-[#3B1F0A]">
                  4. UPI द्वारा भुगतान करें (₹{selectedAmount.toLocaleString('en-IN')})
                </span>
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg">
                  {formatTimer(countdown)}
                </span>
              </div>

              {fallbackNotice && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-sm font-bold text-amber-900">
                  {fallbackNotice}
                </div>
              )}

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenUpiApp('gpay')}
                  className="min-h-[48px] rounded-xl border-2 border-slate-200 hover:border-kesariya-500 bg-white font-extrabold text-sm sm:text-base text-[#3B1F0A] cursor-pointer"
                >
                  GPay
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenUpiApp('phonepe')}
                  className="min-h-[48px] rounded-xl border-2 border-slate-200 hover:border-kesariya-500 bg-white font-extrabold text-sm sm:text-base text-[#3B1F0A] cursor-pointer"
                >
                  PhonePe
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenUpiApp('paytm')}
                  className="min-h-[48px] rounded-xl border-2 border-slate-200 hover:border-kesariya-500 bg-white font-extrabold text-sm sm:text-base text-[#3B1F0A] cursor-pointer"
                >
                  Paytm
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleOpenUpiApp('any')}
                className="w-full min-h-[48px] rounded-xl bg-amber-100 hover:bg-amber-200 text-[#3B1F0A] font-extrabold text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-5 h-5 text-kesariya-700" />
                <span>किसी भी UPI ऐप से भुगतान करें</span>
              </button>

              {qrImageUrl && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
                  <img
                    src={qrImageUrl}
                    alt="UPI भुगतान QR कोड"
                    width={200}
                    height={200}
                    className="w-44 h-44 mx-auto rounded-xl bg-white p-2 border border-amber-200"
                  />
                  {gatewayMode === 'zapupi' ? (
                    <p className="text-xs font-bold text-emerald-700 mt-2 flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>भुगतान करते ही रसीद अपने आप खुल जाएगी...</span>
                    </p>
                  ) : (
                    <p className="text-xs font-bold text-[#5C4E44] mt-2">
                      UPI ID: <span className="font-mono text-[#3B1F0A]">{upiId}</span>
                    </p>
                  )}
                </div>
              )}

              {paymentStatusMsg === 'pending' && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-sm font-bold text-amber-900">
                  बैंक से पुष्टि अभी प्रतीक्षारत है। यदि आपने भुगतान कर दिया है, तो 5 सेकंड बाद पुनः जाँचें।
                </div>
              )}

              {paymentStatusMsg === 'failed' && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm font-bold text-red-700 flex items-center justify-between gap-2">
                  <span>भुगतान विफल रहा।</span>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="min-h-[40px] px-3 rounded-lg bg-red-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>दोबारा प्रयास करें</span>
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleManualCheckOrConfirm}
                  disabled={isSubmitting}
                  className="flex-1 min-h-[50px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting
                    ? 'जाँच हो रही है...'
                    : gatewayMode === 'zapupi'
                    ? 'मैंने भुगतान कर दिया है (जाँचें) ✓'
                    : 'मैंने भुगतान कर दिया है ✓'}
                </button>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="min-h-[50px] px-4 rounded-2xl border border-slate-300 text-sm font-bold text-slate-700 cursor-pointer"
                >
                  ← वापस जाएँ
                </button>
              </div>

              {paymentUrl && (
                <div className="text-center">
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-kesariya-700 underline inline-flex items-center gap-1"
                  >
                    <span>ZapUPI पेमेंट पेज खोलें</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Trust Strip */}
          <div className="pt-3 border-t border-amber-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-[#5C4E44]">
            <div className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-kesariya-600 shrink-0" />
              <span>हर सेवा का वीडियो प्रमाण</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>व्यक्तिगत सेवा पहल (80G उपलब्ध नहीं)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>सुरक्षित UPI भुगतान</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
