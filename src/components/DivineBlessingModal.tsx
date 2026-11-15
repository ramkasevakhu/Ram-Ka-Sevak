'use client';

import React, { useEffect, useRef } from 'react';
import { 
  X, 
  CheckCircle, 
  Share2, 
  Printer, 
  Sparkles, 
  Heart,
  ShieldCheck 
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface DivineBlessingModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  details,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas Petal & Golden Blessing Shower Animation
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Petals / Golden particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      rotation: number;
      rotSpeed: number;
    }[] = [];

    const colors = ['#f59e0b', '#f97316', '#fbbf24', '#f43f5e', '#fed7aa', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 4 - 2,
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        
        // Draw petal / leaf shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  if (!isOpen || !details) return null;

  const receiptDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const shareText = `Maine ${SITE_CONFIG.domain} par "${details.categoryName}" ke liye ₹${details.amount} ka seva sahyog kiya. सेवा ही भक्ति है! Support 100% genuine grassroots seva: https://${SITE_CONFIG.domain} (@${SITE_CONFIG.creatorUsername})`;

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
      {/* Flower & Golden Shower Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-10 w-full h-full"
      />

      <div className="relative z-20 w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden my-6">
        
        {/* Top Divine Blessing Banner */}
        <div className="bg-gradient-to-r from-kesariya-600 via-amber-500 to-kesariya-700 px-6 py-6 text-white text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-kesariya-600 shadow-xl mb-3">
            <span className="text-2xl">🚩</span>
          </div>

          <h3 className="text-2xl font-black tracking-tight">
            Jai Shri Ram! (जय श्री राम)
          </h3>
          <p className="text-sm font-semibold text-amber-100 mt-1">
            Aapka Pavitra Seva Sankalp Prapt Hua
          </p>
          <p className="text-xs text-amber-200 italic mt-0.5">
            ॥ धर्मो रक्षति रक्षितः • सेवा ही भक्ति है ॥
          </p>
        </div>

        {/* Digital Printable Seva Receipt */}
        <div id="seva-receipt" className="p-6 space-y-5 bg-amber-50/30">
          
          <div className="border-2 border-dashed border-amber-300 rounded-2xl p-4 bg-white shadow-xs space-y-3">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Digital Seva Receipt (डिजिटल सेवा पावती)
                </span>
                <div className="text-xs font-mono font-bold text-slate-800">
                  Ref: {details.transactionRef}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Date:</span>
                <span className="text-xs font-bold text-slate-700">{receiptDate}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Sevak (Donor Name):</span>
                <span className="font-extrabold text-slate-900">{details.donorName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Seva Sankalp:</span>
                <span className="font-bold text-amber-800">{details.categoryName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Impact Units:</span>
                <span className="font-bold text-slate-800">{details.unitsText}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-800">Daan Rashi:</span>
                <span className="text-xl font-black text-kesariya-700">
                  ₹{details.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {details.message && (
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 italic bg-amber-50/50 p-2 rounded-lg">
                "{details.message}"
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Grassroots Seva
              </span>
              <span>By @{SITE_CONFIG.creatorUsername}</span>
            </div>

          </div>

          <p className="text-xs text-center text-slate-600 leading-relaxed">
            Prabhu Shri Ram aapko aur aapke parivar ko sada sukhi aur swasth rakhein. Aapka sahyog seedha zameen par pahunchakar video update reels par share kiya jayega.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp Par Share</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Save / Print</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors cursor-pointer text-center"
          >
            Homepage Par Wapas Jayein
          </button>

        </div>

      </div>
    </div>
  );
};
