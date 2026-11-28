import { getServiceSupabase } from './supabase';
import {
  DEFAULT_IMPACT_COUNTERS,
  DEFAULT_MAINTENANCE_MODE,
  DEFAULT_TRANSPARENCY,
  INITIAL_COMMUNITY_BLESSINGS,
} from './constants';
import {
  ImpactCounters,
  MaintenanceMode,
  PublicSupporter,
  TransparencyData,
  VideoItem,
} from './types';
import { parseVideoUrl } from './videoUtils';

export interface PublicSiteData {
  videos: VideoItem[];
  impactCounters: ImpactCounters;
  transparency: TransparencyData;
  recentSupporters: PublicSupporter[];
  maintenanceMode: MaintenanceMode;
}

/**
 * Deduplicates videos by ID and normalized platform/videoId (or URL)
 * so the same reel never renders multiple times on the home page.
 */
function deduplicateVideos(rows: VideoItem[]): VideoItem[] {
  const seenIds = new Set<string>();
  const seenSources = new Set<string>();
  const result: VideoItem[] = [];

  for (const row of rows) {
    if (!row || !row.id || seenIds.has(row.id)) continue;
    seenIds.add(row.id);

    const parsed = parseVideoUrl(row.url);
    const sourceKey =
      parsed.valid && parsed.platform && parsed.videoId
        ? `${parsed.platform}:${parsed.videoId}`
        : (row.url || '').trim().toLowerCase();

    if (sourceKey && seenSources.has(sourceKey)) continue;
    if (sourceKey) seenSources.add(sourceKey);

    result.push(row);
  }

  return result;
}

export async function getPublicSiteData(): Promise<PublicSiteData> {
  const db = getServiceSupabase();

  if (!db) {
    return {
      videos: [],
      impactCounters: DEFAULT_IMPACT_COUNTERS,
      transparency: DEFAULT_TRANSPARENCY,
      recentSupporters: INITIAL_COMMUNITY_BLESSINGS,
      maintenanceMode: DEFAULT_MAINTENANCE_MODE,
    };
  }

  try {
    const [videosRes, contentRes, blessingsRes] = await Promise.all([
      db
        .from('videos')
        .select('id, title, url, platform, category, video_date, is_visible, sort_order, created_at')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true })
        .order('video_date', { ascending: false }),
      db.from('site_content').select('key, value'),
      db
        .from('community_blessings')
        .select('id, donor_name, category_name, units_text, amount, message, created_at')
        .eq('is_verified', true)
        .order('created_at', { ascending: false })
        .limit(12),
    ]);

    let impactCounters = DEFAULT_IMPACT_COUNTERS;
    let transparency = DEFAULT_TRANSPARENCY;
    let maintenanceMode = DEFAULT_MAINTENANCE_MODE;

    if (contentRes.data) {
      for (const row of contentRes.data) {
        if (row.key === 'impact_counters' && row.value) {
          impactCounters = { ...DEFAULT_IMPACT_COUNTERS, ...row.value };
        }
        if (row.key === 'transparency' && row.value) {
          transparency = { ...DEFAULT_TRANSPARENCY, ...row.value };
        }
        if (row.key === 'maintenance_mode' && row.value) {
          maintenanceMode = {
            enabled: Boolean(row.value.enabled),
            message:
              typeof row.value.message === 'string' && row.value.message.trim()
                ? row.value.message.trim()
                : DEFAULT_MAINTENANCE_MODE.message,
          };
        }
      }
    }

    const recentSupporters =
      blessingsRes.data && blessingsRes.data.length > 0
        ? blessingsRes.data
        : INITIAL_COMMUNITY_BLESSINGS;

    const videos = deduplicateVideos((videosRes.data || []) as VideoItem[]);

    return {
      videos,
      impactCounters,
      transparency,
      recentSupporters,
      maintenanceMode,
    };
  } catch (error) {
    console.error('Public data fetch error:', error);
    return {
      videos: [],
      impactCounters: DEFAULT_IMPACT_COUNTERS,
      transparency: DEFAULT_TRANSPARENCY,
      recentSupporters: INITIAL_COMMUNITY_BLESSINGS,
      maintenanceMode: DEFAULT_MAINTENANCE_MODE,
    };
  }
}
