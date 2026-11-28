'use client';

import React, { useState } from 'react';
import { Wrench, Shield, Lock, ChevronDown, ChevronUp, LogIn } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface MaintenanceViewProps {
  message: string;
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({ message }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'गलत यूज़रनेम या पासवर्ड।');
      } else {
        window.location.reload();
      }
    } catch {
      setError('नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFFDF9] via-[#FFF6E5] to-[#FFFDF9] px-4 py-10 text-[#3B1F0A]">
      <div className="w-full max-w-md bg-white rounded-3xl border-2 border-amber-200 shadow-[0_20px_50px_-15px_rgba(124,45,18,0.18)] p-6 sm:p-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-kesariya-600 to-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
          <Wrench className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-kesariya-800 text-xs font-extrabold">
            <span>🏹 {SITE_CONFIG.name}</span>
            <span>•</span>
            <span>@{SITE_CONFIG.creatorUsername}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            वेबसाइट रखरखाव मोड में है
          </h1>
          <p className="text-sm sm:text-base text-[#6B5E55] leading-relaxed">
            {message}
          </p>
        </div>

        <div className="pt-2 border-t border-amber-100">
          <button
            type="button"
            onClick={() => setShowLogin((prev) => !prev)}
            className="w-full min-h-[44px] px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-sm font-extrabold text-[#3B1F0A] inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Shield className="w-4 h-4 text-kesariya-600" />
            <span>एडमिन लॉगिन (Admin Access)</span>
            {showLogin ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showLogin && (
            <form onSubmit={handleLogin} className="mt-4 text-left space-y-3 bg-[#FFFDF9] p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#6B5E55]">
                <Lock className="w-3.5 h-3.5 text-kesariya-600" />
                <span>रखरखाव मोड में वेबसाइट देखने के लिए ID व पासवर्ड दर्ज करें</span>
              </div>

              <div>
                <label htmlFor="maint-user" className="block text-xs font-bold mb-1">
                  एडमिन ID / यूज़रनेम
                </label>
                <input
                  id="maint-user"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 focus:border-kesariya-600 focus:outline-none text-sm bg-white"
                />
              </div>

              <div>
                <label htmlFor="maint-pass" className="block text-xs font-bold mb-1">
                  पासवर्ड
                </label>
                <input
                  id="maint-pass"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 focus:border-kesariya-600 focus:outline-none text-sm bg-white"
                />
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] rounded-xl bg-kesariya-600 hover:bg-kesariya-700 text-white font-black text-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'जाँच हो रही है...' : 'लॉगिन करें और वेबसाइट देखें'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
