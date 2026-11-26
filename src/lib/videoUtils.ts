import { VideoPlatform } from './types';

export interface ParsedVideoInfo {
  valid: boolean;
  platform: VideoPlatform | null;
  embedUrl: string | null;
  videoId?: string;
  error?: string;
}

/**
 * Auto-detects video platform (YouTube, Instagram, Facebook) and extracts
 * safe embed URLs without redirecting users away from the site.
 */
export function parseVideoUrl(rawUrl: string): ParsedVideoInfo {
  const urlStr = (rawUrl || '').trim();
  if (!urlStr) {
    return { valid: false, platform: null, embedUrl: null, error: 'कृपया वीडियो का URL दर्ज करें।' };
  }

  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch {
    return { valid: false, platform: null, embedUrl: null, error: 'मान्य URL नहीं है (https:// से शुरू होना चाहिए)।' };
  }

  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');

  // 1. YouTube (watch, shorts, live, youtu.be, embed)
  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
    let videoId = '';
    if (host === 'youtu.be') {
      videoId = parsed.pathname.split('/').filter(Boolean)[0] || '';
    } else if (parsed.pathname.startsWith('/shorts/')) {
      videoId = parsed.pathname.split('/shorts/')[1]?.split('/')[0] || '';
    } else if (parsed.pathname.startsWith('/embed/')) {
      videoId = parsed.pathname.split('/embed/')[1]?.split('/')[0] || '';
    } else if (parsed.pathname.startsWith('/live/')) {
      videoId = parsed.pathname.split('/live/')[1]?.split('/')[0] || '';
    } else {
      videoId = parsed.searchParams.get('v') || '';
    }

    // Validate standard 11-char YouTube ID pattern
    if (!videoId || !/^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
      return { valid: false, platform: 'youtube', embedUrl: null, error: 'YouTube वीडियो ID नहीं मिली।' };
    }

    return {
      valid: true,
      platform: 'youtube',
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
    };
  }

  // 2. Instagram (Reel or Post)
  if (host === 'instagram.com') {
    const match = parsed.pathname.match(/^\/(reel|reels|p|tv)\/([a-zA-Z0-9_-]+)/);
    if (!match) {
      return { valid: false, platform: 'instagram', embedUrl: null, error: 'Instagram Reel या Post का सही लिंक डालें।' };
    }
    const type = match[1] === 'reels' ? 'reel' : match[1];
    const code = match[2];
    return {
      valid: true,
      platform: 'instagram',
      videoId: code,
      embedUrl: `https://www.instagram.com/${type}/${code}/embed/captioned/`,
    };
  }

  // 3. Facebook (watch, reel, video, share/v)
  if (host === 'facebook.com' || host === 'm.facebook.com' || host === 'fb.watch') {
    return {
      valid: true,
      platform: 'facebook',
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(urlStr)}&show_text=false&width=360`,
    };
  }

  return {
    valid: false,
    platform: null,
    embedUrl: null,
    error: 'केवल YouTube, Instagram या Facebook वीडियो URL समर्थित हैं।',
  };
}
