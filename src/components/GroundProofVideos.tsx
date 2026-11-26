'use client';

import React, { useState, useRef } from 'react';
import {
  Play,
  ExternalLink,
  Film,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { parseVideoUrl } from '@/lib/videoUtils';

interface GroundProofVideosProps {
  videos: VideoItem[];
}

export const GroundProofVideos: React.FC<GroundProofVideosProps> = ({ videos }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [failedEmbeds, setFailedEmbeds] = useState<Record<string, boolean>>({});
  const trackRef = useRef<HTMLDivElement | null>(null);
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  // If no videos in database, hide section completely
  if (!videos || videos.length === 0) {
    return null;
  }

  const platformBadge = (platform: string) => {
    if (platform === 'youtube') return 'YouTube';
    if (platform === 'instagram') return 'Instagram Reel';
    return 'Facebook';
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
    <section id="ground-proof" className="py-10 sm:py-14 px-4 bg-white border-y border-amber-200/70">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div className="text-center sm:text-left flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-2">
              <Film className="w-3.5 h-3.5 text-kesariya-700" />
              <span>हमारे ज़मीनी वीडियो</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
              सेवा का सीधा प्रमाण
            </h2>
            <p className="text-sm sm:text-base text-[#6B5E55] mt-1">
              स्लाइड करके अगली सेवा रील यहीं देखें
            </p>
          </div>

          {/* Slide Navigation Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleSlide('prev')}
              aria-label="पिछली रील"
              className="w-10 h-10 rounded-full border border-amber-300 bg-amber-50 hover:bg-kesariya-600 hover:text-white text-[#3B1F0A] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleSlide('next')}
              aria-label="अगली रील"
              className="w-10 h-10 rounded-full border border-amber-300 bg-amber-50 hover:bg-kesariya-600 hover:text-white text-[#3B1F0A] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Reels Track on Mobile / 3-4 Grid on Desktop */}
        <div
          ref={trackRef}
          className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible pb-3 snap-x snap-mandatory no-scrollbar"
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
              <div
                key={video.id}
                className="w-[78vw] max-w-[300px] lg:w-full lg:max-w-none shrink-0 snap-center bg-[#FFFDF9] rounded-3xl border border-amber-200 overflow-hidden shadow-sm flex flex-col"
              >
                {/* 9:16 Vertical Reel Frame */}
                <div className="relative aspect-[9/16] w-full bg-slate-950 overflow-hidden">
                  {isPlaying && parsed.valid && parsed.embedUrl && !hasFailed ? (
                    <>
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

                      {/* Mute / Unmute Floating Button for YouTube Reels */}
                      {video.platform === 'youtube' && (
                        <button
                          type="button"
                          onClick={() => toggleMute(video.id)}
                          aria-label={isMuted ? 'आवाज़ चालू करें' : 'म्यूट करें'}
                          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm border border-white/25 cursor-pointer"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </>
                  ) : hasFailed ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center text-white bg-gradient-to-b from-slate-800 to-slate-950">
                      <p className="text-sm font-bold mb-3">{video.title}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] px-4 rounded-xl bg-kesariya-600 text-white text-sm font-extrabold inline-flex items-center gap-1.5"
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
                      className="w-full h-full relative flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#3B1F0A] via-amber-900 to-kesariya-800 cursor-pointer group"
                    >
                      {ytThumb && (
                        <img
                          src={ytThumb}
                          alt={video.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20" />
                      <div className="relative z-10 w-14 h-14 rounded-full bg-white/95 text-kesariya-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-2.5">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                      <span className="relative z-10 px-3 py-1 rounded-full bg-black/55 text-xs font-bold">
                        {platformBadge(video.platform)} • यहीं चलाएँ
                      </span>
                    </button>
                  )}
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-kesariya-700 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-amber-100">
                        {video.category}
                      </span>
                      <span className="text-[#6B5E55]">{video.video_date}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-[#3B1F0A] leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                  </div>

                  {video.platform === 'instagram' && (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-kesariya-700 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Instagram पर देखें</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
