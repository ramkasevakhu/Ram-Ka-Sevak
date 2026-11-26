'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  LogOut,
  Video,
  IndianRupee,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Download,
  Search,
  Shield,
} from 'lucide-react';
import { DETAILED_SEVA_CATEGORIES } from '@/lib/constants';
import { DonationRecord, ImpactCounters, TransparencyData, VideoItem } from '@/lib/types';
import { parseVideoUrl } from '@/lib/videoUtils';

type Tab = 'videos' | 'donations' | 'content';

interface DonationStats {
  totalAmount: number;
  monthAmount: number;
  totalDonors: number;
  avgAmount: number;
  topDonors: { name: string; total: number }[];
}

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>('videos');

  // Videos state
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [vidTitle, setVidTitle] = useState('');
  const [vidUrl, setVidUrl] = useState('');
  const [vidCategory, setVidCategory] = useState('annadaan');
  const [vidDate, setVidDate] = useState(new Date().toISOString().slice(0, 10));
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoMsg, setVideoMsg] = useState('');

  // Donations state
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [stats, setStats] = useState<DonationStats>({
    totalAmount: 0,
    monthAmount: 0,
    totalDonors: 0,
    avgAmount: 0,
    topDonors: [],
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [showManualForm, setShowManualForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState<DonationRecord | null>(null);
  const [manualForm, setManualForm] = useState({
    donor_name: '',
    donor_phone: '',
    donor_email: '',
    category_id: 'roadside-relief',
    amount: '250',
    payment_method: 'UPI (Manual)',
    transaction_ref: '',
    status: 'success',
    admin_note: '',
    is_anonymous: false,
  });

  // Site content state
  const [counters, setCounters] = useState<ImpactCounters>({
    mealsServed: 12450,
    animalsTreated: 3280,
    totalDonationsAmount: 485000,
  });
  const [transparency, setTransparency] = useState<TransparencyData>({
    monthLabel: 'नवंबर 2026',
    incomeAmount: 68500,
    expenseAmount: 66200,
    notes: '',
  });
  const [contentMsg, setContentMsg] = useState('');

  // Confirmation modal
  const [confirmState, setConfirmState] = useState<{
    message: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  const loadVideos = useCallback(async () => {
    const res = await fetch('/api/admin/videos');
    if (res.ok) {
      const data = await res.json();
      setVideos(data.videos || []);
    }
  }, []);

  const loadDonations = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterStatus !== 'all') params.set('status', filterStatus);
    if (filterCategory !== 'all') params.set('category', filterCategory);
    if (filterFrom) params.set('from', filterFrom);
    if (filterTo) params.set('to', filterTo);
    if (searchQ.trim()) params.set('q', searchQ.trim());

    const res = await fetch(`/api/admin/donations?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setDonations(data.donations || []);
      if (data.stats) setStats(data.stats);
    }
  }, [filterStatus, filterCategory, filterFrom, filterTo, searchQ]);

  const loadContent = useCallback(async () => {
    const res = await fetch('/api/admin/content');
    if (res.ok) {
      const data = await res.json();
      if (data.impactCounters) setCounters(data.impactCounters);
      if (data.transparency) setTransparency(data.transparency);
    }
  }, []);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
          loadVideos();
          loadDonations();
          loadContent();
        }
      })
      .finally(() => setAuthChecked(true));
  }, [loadVideos, loadDonations, loadContent]);

  useEffect(() => {
    if (authenticated) {
      loadDonations();
    }
  }, [authenticated, loadDonations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'लॉगिन विफल रहा।');
      } else {
        setAuthenticated(true);
        setPassword('');
        loadVideos();
        loadDonations();
        loadContent();
      }
    } catch {
      setLoginError('नेटवर्क त्रुटि।');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/session', { method: 'POST' });
    setAuthenticated(false);
  };

  const detectedPlatform = vidUrl.trim() ? parseVideoUrl(vidUrl) : null;

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setVideoMsg('');
    const method = editingVideoId ? 'PATCH' : 'POST';
    const payload = editingVideoId
      ? { id: editingVideoId, title: vidTitle, url: vidUrl, category: vidCategory, video_date: vidDate }
      : { title: vidTitle, url: vidUrl, category: vidCategory, video_date: vidDate };

    const res = await fetch('/api/admin/videos', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setVideoMsg(data.error || 'त्रुटि हुई।');
      return;
    }

    setVidTitle('');
    setVidUrl('');
    setEditingVideoId(null);
    setVideoMsg('वीडियो सहेजा गया।');
    loadVideos();
  };

  const handleToggleVideoVisibility = async (v: VideoItem) => {
    await fetch('/api/admin/videos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: v.id, is_visible: !v.is_visible }),
    });
    loadVideos();
  };

  const handleMoveVideo = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= videos.length) return;
    const current = videos[index];
    const swapWith = videos[target];

    await Promise.all([
      fetch('/api/admin/videos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: current.id, sort_order: swapWith.sort_order }),
      }),
      fetch('/api/admin/videos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: swapWith.id, sort_order: current.sort_order }),
      }),
    ]);
    loadVideos();
  };

  const handleSaveDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    const cat = DETAILED_SEVA_CATEGORIES.find((c) => c.id === manualForm.category_id);
    const payload = {
      ...manualForm,
      category_name: cat?.shortName || 'अन्नदान',
      amount: Number(manualForm.amount),
    };

    const res = await fetch('/api/admin/donations', {
      method: editingDonation ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingDonation ? { id: editingDonation.id, ...payload } : payload),
    });

    if (res.ok) {
      setShowManualForm(false);
      setEditingDonation(null);
      setManualForm({
        donor_name: '',
        donor_phone: '',
        donor_email: '',
        category_id: 'roadside-relief',
        amount: '250',
        payment_method: 'UPI (Manual)',
        transaction_ref: '',
        status: 'success',
        admin_note: '',
        is_anonymous: false,
      });
      loadDonations();
    }
  };

  const handleExportCsv = () => {
    const headers = [
      'Date',
      'Donor Name',
      'Phone',
      'Email',
      'Amount',
      'Seva',
      'Payment Method',
      'Transaction ID',
      'Status',
      'Anonymous',
      'Note',
    ];
    const rows = donations.map((d) => [
      new Date(d.created_at).toLocaleString('en-IN'),
      d.donor_name,
      d.donor_phone || '',
      d.donor_email || '',
      d.amount,
      d.category_name,
      d.payment_method,
      d.transaction_ref || '',
      d.status,
      d.is_anonymous ? 'Yes' : 'No',
      (d.admin_note || '').replace(/"/g, '""'),
    ]);

    const csv =
      '\uFEFF' +
      [headers, ...rows]
        .map((r) => r.map((cell) => `"${String(cell)}"`).join(','))
        .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ramkasevak-donations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setContentMsg('');
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ impactCounters: counters, transparency }),
    });
    setContentMsg(res.ok ? 'सामग्री सफलतापूर्वक अपडेट हुई।' : 'अपडेट करने में त्रुटि हुई।');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] text-[#3B1F0A] font-bold">
        लोड हो रहा है...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF7EA] px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-lg space-y-4"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-kesariya-600 text-white flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-[#3B1F0A]">राम का सेवक • एडमिन लॉगिन</h1>
            <p className="text-xs text-[#6B5E55] mt-1">केवल अधिकृत प्रबंधक के लिए</p>
          </div>

          <div>
            <label htmlFor="admin-user" className="block text-sm font-bold text-[#3B1F0A] mb-1">
              यूज़रनेम
            </label>
            <input
              id="admin-user"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full min-h-[48px] px-3.5 rounded-xl border-2 border-slate-200 focus:border-kesariya-600 focus:outline-none text-base"
            />
          </div>

          <div>
            <label htmlFor="admin-pass" className="block text-sm font-bold text-[#3B1F0A] mb-1">
              पासवर्ड
            </label>
            <input
              id="admin-pass"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-[48px] px-3.5 rounded-xl border-2 border-slate-200 focus:border-kesariya-600 focus:outline-none text-base"
            />
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm font-bold text-red-700">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full min-h-[48px] rounded-xl bg-kesariya-600 hover:bg-kesariya-700 text-white font-black text-base cursor-pointer disabled:opacity-60"
          >
            {loginLoading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#3B1F0A]">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-amber-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="font-black text-lg">🏹 राम का सेवक • एडमिन पैनल</div>
          <button
            type="button"
            onClick={handleLogout}
            className="min-h-[40px] px-3.5 rounded-xl border border-slate-300 text-sm font-bold flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
          >
            <LogOut className="w-4 h-4" />
            <span>लॉगआउट</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'videos' as Tab, label: 'वीडियो प्रबंधन', icon: Video },
            { id: 'donations' as Tab, label: 'दान व दाता', icon: IndianRupee },
            { id: 'content' as Tab, label: 'आंकड़े व हिसाब', icon: Settings },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`min-h-[48px] px-4 rounded-xl font-extrabold text-sm flex items-center gap-2 shrink-0 cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-kesariya-600 text-white'
                    : 'bg-amber-50 text-[#3B1F0A] border border-amber-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB A: VIDEO MANAGEMENT */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <form
              onSubmit={handleSaveVideo}
              className="bg-white rounded-2xl border border-amber-200 p-4 sm:p-6 space-y-4"
            >
              <h2 className="text-lg font-black">
                {editingVideoId ? 'वीडियो संपादित करें' : 'नया वीडियो जोड़ें'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="वीडियो का शीर्षक"
                  value={vidTitle}
                  onChange={(e) => setVidTitle(e.target.value)}
                  className="min-h-[48px] px-3.5 rounded-xl border border-slate-300 text-base"
                />
                <input
                  type="url"
                  required
                  placeholder="YouTube, Instagram Reel या Facebook वीडियो URL"
                  value={vidUrl}
                  onChange={(e) => setVidUrl(e.target.value)}
                  className="min-h-[48px] px-3.5 rounded-xl border border-slate-300 text-base"
                />
                <select
                  value={vidCategory}
                  onChange={(e) => setVidCategory(e.target.value)}
                  className="min-h-[48px] px-3.5 rounded-xl border border-slate-300 text-base bg-white"
                >
                  <option value="अन्नदान">अन्नदान</option>
                  <option value="गौ व पशु सेवा">गौ व पशु सेवा</option>
                  <option value="चिकित्सा सेवा">चिकित्सा सेवा</option>
                  <option value="आपदा राहत">आपदा राहत</option>
                </select>
                <input
                  type="date"
                  value={vidDate}
                  onChange={(e) => setVidDate(e.target.value)}
                  className="min-h-[48px] px-3.5 rounded-xl border border-slate-300 text-base"
                />
              </div>

              {detectedPlatform && (
                <div
                  className={`text-xs font-bold px-3 py-2 rounded-lg ${
                    detectedPlatform.valid
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {detectedPlatform.valid
                    ? `पहचाना गया प्लेटफ़ॉर्म: ${detectedPlatform.platform?.toUpperCase()}`
                    : detectedPlatform.error}
                </div>
              )}

              {videoMsg && <p className="text-sm font-bold text-emerald-700">{videoMsg}</p>}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="min-h-[48px] px-5 rounded-xl bg-kesariya-600 text-white font-black text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingVideoId ? 'अपडेट करें' : 'वीडियो जोड़ें'}</span>
                </button>
                {editingVideoId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingVideoId(null);
                      setVidTitle('');
                      setVidUrl('');
                    }}
                    className="min-h-[48px] px-4 rounded-xl border border-slate-300 text-sm font-bold cursor-pointer"
                  >
                    रद्द करें
                  </button>
                )}
              </div>
            </form>

            {/* Videos List */}
            <div className="space-y-3">
              {videos.map((v, idx) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-bold text-kesariya-700">
                      <span className="uppercase">{v.platform}</span>
                      <span>• {v.category}</span>
                      <span>• {v.video_date}</span>
                      {!v.is_visible && (
                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded">छुपा हुआ</span>
                      )}
                    </div>
                    <div className="font-black text-base truncate">{v.title}</div>
                    <div className="text-xs text-slate-500 truncate">{v.url}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveVideo(idx, -1)}
                      aria-label="ऊपर ले जाएँ"
                      className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveVideo(idx, 1)}
                      aria-label="नीचे ले जाएँ"
                      className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleVideoVisibility(v)}
                      aria-label="दिखाएँ या छुपाएँ"
                      className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      {v.is_visible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingVideoId(v.id);
                        setVidTitle(v.title);
                        setVidUrl(v.url);
                        setVidCategory(v.category);
                        setVidDate(v.video_date);
                      }}
                      aria-label="संपादित करें"
                      className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setConfirmState({
                          message: `क्या आप "${v.title}" वीडियो हटाना चाहते हैं?`,
                          onConfirm: async () => {
                            await fetch(`/api/admin/videos?id=${v.id}`, { method: 'DELETE' });
                            loadVideos();
                          },
                        })
                      }
                      aria-label="हटाएँ"
                      className="w-10 h-10 rounded-xl border border-red-200 text-red-600 flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB B: DONATIONS MANAGEMENT */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-amber-200">
                <div className="text-xs font-bold text-[#6B5E55]">कुल दान</div>
                <div className="text-xl font-black">₹{stats.totalAmount.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-amber-200">
                <div className="text-xs font-bold text-[#6B5E55]">इस महीने का दान</div>
                <div className="text-xl font-black text-emerald-700">₹{stats.monthAmount.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-amber-200">
                <div className="text-xs font-bold text-[#6B5E55]">कुल दाता</div>
                <div className="text-xl font-black">{stats.totalDonors}</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-amber-200">
                <div className="text-xs font-bold text-[#6B5E55]">औसत दान</div>
                <div className="text-xl font-black">₹{stats.avgAmount.toLocaleString('en-IN')}</div>
              </div>
            </div>

            {stats.topDonors.length > 0 && (
              <div className="bg-white p-4 rounded-2xl border border-amber-200">
                <div className="text-xs font-black uppercase text-[#6B5E55] mb-2">शीर्ष दाता</div>
                <div className="flex flex-wrap gap-2">
                  {stats.topDonors.map((td, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold">
                      {td.name}: ₹{td.total.toLocaleString('en-IN')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingDonation(null);
                    setShowManualForm((prev) => !prev);
                  }}
                  className="min-h-[44px] px-4 rounded-xl bg-kesariya-600 text-white font-bold text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>मैन्युअल UPI एंट्री जोड़ें</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="min-h-[44px] px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV डाउनलोड</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                <div className="sm:col-span-2 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="नाम या Transaction ID खोजें..."
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    className="w-full min-h-[44px] pl-9 pr-3 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="all">सभी सेवाएँ</option>
                  {DETAILED_SEVA_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.shortName}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="all">सभी स्थिति</option>
                  <option value="success">सफल (Success)</option>
                  <option value="pending">प्रतीक्षारत (Pending)</option>
                  <option value="failed">विफल (Failed)</option>
                </select>
                <div className="flex gap-1">
                  <input
                    type="date"
                    value={filterFrom}
                    onChange={(e) => setFilterFrom(e.target.value)}
                    aria-label="प्रारंभ तिथि"
                    className="w-1/2 min-h-[44px] px-2 rounded-xl border border-slate-300 text-xs"
                  />
                  <input
                    type="date"
                    value={filterTo}
                    onChange={(e) => setFilterTo(e.target.value)}
                    aria-label="अंतिम तिथि"
                    className="w-1/2 min-h-[44px] px-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Manual Entry / Edit Form */}
            {showManualForm && (
              <form
                onSubmit={handleSaveDonation}
                className="bg-white p-5 rounded-2xl border-2 border-kesariya-400 space-y-3"
              >
                <h3 className="font-black text-base">
                  {editingDonation ? 'दान प्रविष्टि संपादित करें' : 'नई मैन्युअल दान प्रविष्टि'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="दाता का नाम"
                    value={manualForm.donor_name}
                    onChange={(e) => setManualForm({ ...manualForm, donor_name: e.target.value })}
                    className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm"
                  />
                  <input
                    type="number"
                    required
                    placeholder="राशि (₹)"
                    value={manualForm.amount}
                    onChange={(e) => setManualForm({ ...manualForm, amount: e.target.value })}
                    className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm"
                  />
                  <select
                    value={manualForm.category_id}
                    onChange={(e) => setManualForm({ ...manualForm, category_id: e.target.value })}
                    className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {DETAILED_SEVA_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.shortName}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="पेमेंट माध्यम (UPI / GPay / Cash)"
                    value={manualForm.payment_method}
                    onChange={(e) => setManualForm({ ...manualForm, payment_method: e.target.value })}
                    className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="UTR / Transaction ID"
                    value={manualForm.transaction_ref}
                    onChange={(e) => setManualForm({ ...manualForm, transaction_ref: e.target.value })}
                    className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm"
                  />
                  <select
                    value={manualForm.status}
                    onChange={(e) => setManualForm({ ...manualForm, status: e.target.value })}
                    className="min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <input
                    type="text"
                    placeholder="नोट (वैकल्पिक)"
                    value={manualForm.admin_note}
                    onChange={(e) => setManualForm({ ...manualForm, admin_note: e.target.value })}
                    className="sm:col-span-2 min-h-[44px] px-3 rounded-xl border border-slate-300 text-sm"
                  />
                  <label className="flex items-center gap-2 text-sm font-bold">
                    <input
                      type="checkbox"
                      checked={manualForm.is_anonymous}
                      onChange={(e) => setManualForm({ ...manualForm, is_anonymous: e.target.checked })}
                    />
                    <span>Anonymous रखें</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 rounded-xl bg-kesariya-600 text-white font-bold text-sm cursor-pointer"
                  >
                    सहेजें
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowManualForm(false)}
                    className="min-h-[44px] px-4 rounded-xl border border-slate-300 text-sm font-bold cursor-pointer"
                  >
                    रद्द करें
                  </button>
                </div>
              </form>
            )}

            {/* Donations Table */}
            <div className="bg-white rounded-2xl border border-amber-200 overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-amber-50 border-b border-amber-200 text-xs font-black uppercase text-[#6B5E55]">
                    <th className="p-3">तिथि</th>
                    <th className="p-3">दाता</th>
                    <th className="p-3">राशि</th>
                    <th className="p-3">सेवा</th>
                    <th className="p-3">माध्यम / ID</th>
                    <th className="p-3">स्थिति</th>
                    <th className="p-3">नोट</th>
                    <th className="p-3 text-right">क्रिया</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-amber-50/40">
                      <td className="p-3 whitespace-nowrap text-xs">
                        {new Date(d.created_at).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 font-bold">
                        {d.donor_name}
                        {d.is_anonymous && (
                          <span className="ml-1 text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">Anon</span>
                        )}
                      </td>
                      <td className="p-3 font-black text-kesariya-700">
                        ₹{Number(d.amount).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">{d.category_name}</td>
                      <td className="p-3 text-xs">
                        <div>{d.payment_method}</div>
                        <div className="font-mono text-slate-500">{d.transaction_ref || '-'}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                            d.status === 'success' || d.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : d.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-slate-600">{d.admin_note || '-'}</td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingDonation(d);
                            setManualForm({
                              donor_name: d.donor_name,
                              donor_phone: d.donor_phone || '',
                              donor_email: d.donor_email || '',
                              category_id: d.category_id,
                              amount: String(d.amount),
                              payment_method: d.payment_method,
                              transaction_ref: d.transaction_ref || '',
                              status: d.status,
                              admin_note: d.admin_note || '',
                              is_anonymous: Boolean(d.is_anonymous),
                            });
                            setShowManualForm(true);
                          }}
                          className="p-1.5 text-slate-700 hover:text-kesariya-700 cursor-pointer"
                          aria-label="संपादित करें"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmState({
                              message: `क्या आप ${d.donor_name} (₹${d.amount}) की प्रविष्टि हटाना चाहते हैं?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/donations?id=${d.id}`, { method: 'DELETE' });
                                loadDonations();
                              },
                            })
                          }
                          className="p-1.5 text-red-600 hover:text-red-800 cursor-pointer"
                          aria-label="हटाएँ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {donations.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-sm text-[#6B5E55]">
                        कोई दान प्रविष्टि नहीं मिली।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB C: SITE CONTENT */}
        {activeTab === 'content' && (
          <form
            onSubmit={handleSaveContent}
            className="bg-white rounded-2xl border border-amber-200 p-5 sm:p-6 space-y-6 max-w-2xl"
          >
            <div className="space-y-3">
              <h2 className="text-lg font-black">प्रभाव आंकड़े (Impact Counters)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">लोगों को भोजन</label>
                  <input
                    type="number"
                    value={counters.mealsServed}
                    onChange={(e) => setCounters({ ...counters, mealsServed: Number(e.target.value) })}
                    className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">पशुओं का इलाज</label>
                  <input
                    type="number"
                    value={counters.animalsTreated}
                    onChange={(e) => setCounters({ ...counters, animalsTreated: Number(e.target.value) })}
                    className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">कुल दान (₹)</label>
                  <input
                    type="number"
                    value={counters.totalDonationsAmount}
                    onChange={(e) => setCounters({ ...counters, totalDonationsAmount: Number(e.target.value) })}
                    className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 text-base"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-amber-100">
              <h2 className="text-lg font-black">मासिक पारदर्शिता (आया / खर्च)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">माह का नाम</label>
                  <input
                    type="text"
                    value={transparency.monthLabel}
                    onChange={(e) => setTransparency({ ...transparency, monthLabel: e.target.value })}
                    className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">कुल आया (₹)</label>
                  <input
                    type="number"
                    value={transparency.incomeAmount}
                    onChange={(e) => setTransparency({ ...transparency, incomeAmount: Number(e.target.value) })}
                    className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">कुल खर्च (₹)</label>
                  <input
                    type="number"
                    value={transparency.expenseAmount}
                    onChange={(e) => setTransparency({ ...transparency, expenseAmount: Number(e.target.value) })}
                    className="w-full min-h-[44px] px-3 rounded-xl border border-slate-300 text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">खर्च का विवरण</label>
                <textarea
                  rows={2}
                  value={transparency.notes}
                  onChange={(e) => setTransparency({ ...transparency, notes: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-base"
                />
              </div>
            </div>

            {contentMsg && <p className="text-sm font-bold text-emerald-700">{contentMsg}</p>}

            <button
              type="submit"
              className="min-h-[48px] px-6 rounded-xl bg-kesariya-600 text-white font-black text-base cursor-pointer"
            >
              परिवर्तन सहेजें
            </button>
          </form>
        )}
      </main>

      {/* Confirm Delete Dialog */}
      {confirmState && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-xl">
            <p className="text-base font-bold text-[#3B1F0A]">{confirmState.message}</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmState(null)}
                className="min-h-[44px] px-4 rounded-xl border border-slate-300 text-sm font-bold cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                type="button"
                onClick={async () => {
                  await confirmState.onConfirm();
                  setConfirmState(null);
                }}
                className="min-h-[44px] px-4 rounded-xl bg-red-600 text-white text-sm font-bold cursor-pointer"
              >
                हाँ, हटाएँ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
