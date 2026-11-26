'use client';

import React, { useState, useRef } from 'react';
import {
  Play,
  ExternalLink,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { parseVideoUrl } from '@/lib/videoUtils';
import { SITE_CONFIG } from '@/lib/constants';

interface GroundProofVideosProps {
  videos: VideoItem[];
}

export const GroundProofVideos: React.FC<GroundProofVideosProps> = ({ videos }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [failedEmbeds, setFailedEmbeds] = useState<Record<string, boolean>>({});
  const trackRef = useRef<HTMLDivElement | null>(null);
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const RECENT_SEVA_REELS = [
    {
      title: 'ऋषिकेश में ज़रूरतमंदों को गरम भोजन वितरण',
      tag: 'अन्नदान रील्स',
      image: '/images/annadaan-seva.jpg',
      alt: 'ऋषिकेश में सड़क पर भोजन वितरण सेवा',
      href: SITE_CONFIG.socialLinks.instagram,
    },
    {
      title: 'गौ माता व बेज़ुबान पशुओं की देखभाल',
      tag: 'गौ व पशु सेवा',
      image: '/images/gau-pashu-seva.jpg',
      alt: 'गौ माता को हरा चारा व पशु सेवा',
      href: SITE_CONFIG.socialLinks.instagram,
    },
    {
      title: 'असहाय मरीज़ों के लिए दवा व इलाज सहायता',
      tag: 'चिकित्सा सेवा',
      image: '/images/medical-seva.jpg',
      alt: 'ज़रूरतमंद मरीज़ों को दवा सहायता',
      href: SITE_CONFIG.socialLinks.instagram,
    },
    {
      title: 'संकट प्रभावित परिवारों को राशन व राहत',
      tag: 'आपदा राहत',
      image: '/images/disaster-seva.jpg',
      alt: 'आपदा प्रभावित परिवारों को राहत सामग्री',
      href: SITE_CONFIG.socialLinks.instagram,
    },
  ];

  const platformBadge = (platform: string) => {
    if (platform === 'youtube') return 'YouTube Shorts';
    if (platform === 'instagram') return 'Instagram Reel';
    return 'Facebook Video';
  };

  const handleSlide = (dir: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const step = Math.min(340, trackRef.current.clientWidth * 0.85);
    trackRef.current.scrollBy({
      left: dir === 'next' ? step : -step,
      behavior: 'smooth',
    });
  };

  const toggleMute = (videoId: string) => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const iframe = iframeRefs.current[videoId];
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: nextMuted ? 'mute' : 'unMute',
          args: [],
        }),
        '*'
      );
    }
  };

  return (
    <section
      id="ground-proof"
      className="py-12 sm:py-16 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFF6E5] to-[#FFFDF9] border-y border-amber-200/80"
    >
      <div className="max-w-6xl mx-auto">
        {/* Premium Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-300 shadow-xs text-xs font-extrabold text-amber-900 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ज़मीनी सेवा का जीवंत प्रमाण</span>
              <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-kesariya-800">
                {videos.length} रील्स
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#3B1F0A] tracking-tight">
              सेवा का सीधा प्रमाण
            </h2>
            <p className="text-sm sm:text-base text-[#6B5E55] mt-1">
              @{SITE_CONFIG.creatorUsername} की ज़मीनी मदद के असली वीडियो और रील्स यहीं देखें
            </p>
          </div>

          {/* Desktop & Tablet Slide Controls */}
          {videos.length > 0 && (
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => handleSlide('prev')}
                aria-label="पिछली रील"
                className="w-11 h-11 rounded-full border-2 border-amber-300 bg-white hover:bg-kesariya-600 hover:text-white hover:border-kesariya-600 text-[#3B1F0A] flex items-center justify-center shadow-xs transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleSlide('next')}
                aria-label="अगली रील"
                className="w-11 h-11 rounded-full border-2 border-amber-300 bg-white hover:bg-kesariya-600 hover:text-white hover:border-kesariya-600 text-[#3B1F0A] flex items-center justify-center shadow-xs transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Recent Seva Row (Always visible, links to Instagram Reels) */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-base sm:text-lg font-black text-[#3B1F0A]">
              हाल की सेवा (Instagram Reels)
            </h3>
            <a
              href={SITE_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-extrabold text-kesariya-700 hover:text-kesariya-800 inline-flex items-center gap-1"
            >
              <span>सभी रील्स देखें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {RECENT_SEVA_REELS.map((reel) => (
              <a
                key={reel.tag}
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-amber-200 bg-amber-100 shadow-xs block"
              >
                <img
                  src={reel.image}
                  alt={reel.alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-bold">
                  {reel.tag}
                </span>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2 text-white">
                  <span className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-2">
                    {reel.title}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-kesariya-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Reels Carousel (Mobile) / Grid (Desktop) when DB videos exist */}
        {videos.length > 0 && (
        <>
        <div
          ref={trackRef}
          className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible pb-4 pt-1 snap-x snap-mandatory no-scrollbar"
        >
          {videos.map((video) => {
            const parsed = parseVideoUrl(video.url);
            const isPlaying = activeVideoId === video.id;
            const hasFailed = failedEmbeds[video.id];
            const ytThumb =
              video.platform === 'youtube' && parsed.videoId
                ? `https://i.ytimg.com/vi/${parsed.videoId}/hqdefault.jpg`
                : null;

            return (
              <article
                key={video.id}
                className={`w-[78vw] max-w-[300px] lg:w-full lg:max-w-none shrink-0 snap-center rounded-[28px] overflow-hidden transition-all duration-300 flex flex-col bg-slate-950 ${
                  isPlaying
                    ? 'ring-4 ring-kesariya-500 shadow-[0_22px_45px_-12px_rgba(234,88,12,0.4)] scale-[1.01]'
                    : 'ring-1 ring-amber-300/80 shadow-[0_16px_35px_-14px_rgba(124,45,18,0.22)] hover:-translate-y-1'
                }`}
              >
                {/* 9:16 Phone-Bezel Reel Viewport */}
                <div className="relative aspect-[9/16] w-full bg-slate-950 overflow-hidden">
                  {/* Top Glassmorphism Info Bar */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-extrabold text-amber-200 truncate">
                      {video.category}
                    </span>

                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      {isPlaying && video.platform === 'youtube' && (
                        <button
                          type="button"
                          onClick={() => toggleMute(video.id)}
                          aria-label={isMuted ? 'आवाज़ चालू करें' : 'म्यूट करें'}
                          className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 cursor-pointer"
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white/90">
                        {platformBadge(video.platform)}
                      </span>
                    </div>
                  </div>

                  {isPlaying && parsed.valid && parsed.embedUrl && !hasFailed ? (
                    <iframe
                      ref={(el) => {
                        iframeRefs.current[video.id] = el;
                      }}
                      src={
                        video.platform === 'youtube'
                          ? `${parsed.embedUrl}&autoplay=1&mute=${isMuted ? 1 : 0}&enablejsapi=1`
                          : parsed.embedUrl
                      }
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      onError={() =>
                        setFailedEmbeds((prev) => ({ ...prev, [video.id]: true }))
                      }
                    />
                  ) : hasFailed ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-b from-slate-800 to-slate-950">
                      <p className="text-sm font-bold mb-4 leading-snug">{video.title}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-5 rounded-2xl bg-gradient-to-r from-kesariya-600 to-amber-500 text-white text-sm font-extrabold inline-flex items-center gap-1.5 shadow-lg"
                      >
                        <span>{platformBadge(video.platform)} पर देखें</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(video.id)}
                      aria-label={`वीडियो चलाएँ: ${video.title}`}
                      className="w-full h-full relative flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#3B1F0A] via-amber-900 to-kesariya-800 cursor-pointer group text-left"
                    >
                      {ytThumb && (
                        <img
                          src={ytThumb}
                          alt={video.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}

                      {/* Rich Cinematic Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/45" />

                      {/* Glowing Saffron Center Play Button */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-kesariya-600 to-amber-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)] ring-4 ring-white/30 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 fill-white ml-0.5" />
                      </div>

                      {/* Bottom Reel Overlay Caption (Instagram/Shorts Style) */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>@{SITE_CONFIG.creatorUsername}</span>
                          <span className="text-white/60">• {video.video_date}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-2 drop-shadow-sm">
                          {video.title}
                        </h3>
                      </div>
                    </button>
                  )}
                </div>

                {/* Bottom Action Strip */}
                <div className="px-3.5 py-2.5 bg-[#FFFDF9] border-t border-amber-200/80 flex items-center justify-between gap-2 text-xs">
                  {isPlaying ? (
                    <span className="font-extrabold text-emerald-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>यहीं चल रहा है</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(video.id)}
                      className="font-extrabold text-kesariya-700 hover:text-kesariya-800 cursor-pointer flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>रील चलाएँ</span>
                    </button>
                  )}

                  {video.platform === 'instagram' ? (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#6B5E55] hover:text-kesariya-700 inline-flex items-center gap-1"
                    >
                      <span>Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="font-bold text-[#6B5E55]">{video.video_date}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Swipe Hint & Quick Arrows */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-2">
          <button
            type="button"
            onClick={() => handleSlide('prev')}
            aria-label="पिछली रील"
            className="w-10 h-10 rounded-full border border-amber-300 bg-white text-[#3B1F0A] flex items-center justify-center shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-extrabold text-[#6B5E55]">
            स्वाइप करके अगली रील देखें
          </span>
          <button
            type="button"
            onClick={() => handleSlide('next')}
            aria-label="अगली रील"
            className="w-10 h-10 rounded-full border border-amber-300 bg-white text-[#3B1F0A] flex items-center justify-center shadow-xs cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        </>
        )}
      </div>
    </section>
  );
};
