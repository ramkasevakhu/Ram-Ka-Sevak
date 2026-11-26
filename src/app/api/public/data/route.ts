import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import {
  DEFAULT_IMPACT_COUNTERS,
  DEFAULT_TRANSPARENCY,
  INITIAL_COMMUNITY_BLESSINGS,
} from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getServiceSupabase();

  if (!db) {
    return NextResponse.json({
      videos: [],
      impactCounters: DEFAULT_IMPACT_COUNTERS,
      transparency: DEFAULT_TRANSPARENCY,
      recentSupporters: INITIAL_COMMUNITY_BLESSINGS,
    });
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

    if (contentRes.data) {
      for (const row of contentRes.data) {
        if (row.key === 'impact_counters' && row.value) {
          impactCounters = { ...DEFAULT_IMPACT_COUNTERS, ...row.value };
        }
        if (row.key === 'transparency' && row.value) {
          transparency = { ...DEFAULT_TRANSPARENCY, ...row.value };
        }
      }
    }

    const recentSupporters =
      blessingsRes.data && blessingsRes.data.length > 0
        ? blessingsRes.data
        : INITIAL_COMMUNITY_BLESSINGS;

    return NextResponse.json({
      videos: videosRes.data || [],
      impactCounters,
      transparency,
      recentSupporters,
    });
  } catch (error) {
    console.error('Public data fetch error:', error);
    return NextResponse.json({
      videos: [],
      impactCounters: DEFAULT_IMPACT_COUNTERS,
      transparency: DEFAULT_TRANSPARENCY,
      recentSupporters: INITIAL_COMMUNITY_BLESSINGS,
    });
  }
}
