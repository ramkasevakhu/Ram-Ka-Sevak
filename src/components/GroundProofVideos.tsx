'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, Film } from 'lucide-react';
import { VideoItem } from '@/lib/types';
import { parseVideoUrl } from '@/lib/videoUtils';

interface GroundProofVideosProps {
  videos: VideoItem[];
}

export const GroundProofVideos: React.FC<GroundProofVideosProps> = ({ videos }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [failedEmbeds, setFailedEmbeds] = useState<Record<string, boolean>>({});

  // If no videos in database, hide section completely
  if (!videos || videos.length === 0) {
    return null;
  }

  const platformBadge = (platform: string) => {
    if (platform === 'youtube') return 'YouTube';
    if (platform === 'instagram') return 'Instagram Reel';
    return 'Facebook';
  };

  return (
    <section id="ground-proof" className="py-10 sm:py-14 px-4 bg-white border-y border-amber-200/70">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-2">
            <Film className="w-3.5 h-3.5 text-kesariya-700" />
            <span>हमारे ज़मीनी वीडियो</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3B1F0A]">
            सेवा का सीधा प्रमाण
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E55] mt-1">
            हर सहयोग का ज़मीनी वीडियो यहीं वेबसाइट पर देखें
          </p>
        </div>

        <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible pb-3 snap-x snap-mandatory no-scrollbar">
          {videos.map((video) => {
            const parsed = parseVideoUrl(video.url);
            const isPlaying = activeVideoId === video.id;
            const hasFailed = failedEmbeds[video.id];

            return (
              <div
                key={video.id}
                className="w-[82vw] max-w-[320px] lg:w-full lg:max-w-none shrink-0 snap-center bg-[#FFFDF9] rounded-2xl border border-amber-200 overflow-hidden shadow-xs flex flex-col"
              >
                <div className="relative aspect-[9/14] w-full bg-slate-900 overflow-hidden">
                  {isPlaying && parsed.valid && parsed.embedUrl && !hasFailed ? (
                    <iframe
                      src={
                        video.platform === 'youtube'
                          ? `${parsed.embedUrl}&autoplay=1`
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
                      <div className="w-14 h-14 rounded-full bg-white/95 text-kesariya-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-black/40 text-xs font-bold">
                        {platformBadge(video.platform)} • यहीं देखें
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
