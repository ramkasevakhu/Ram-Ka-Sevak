import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { getServiceSupabase } from '@/lib/supabase';
import { parseVideoUrl } from '@/lib/videoUtils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceSupabase();
  if (!db) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data, error } = await db
    .from('videos')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('video_date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { videos: data || [] },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceSupabase();
  if (!db) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { title, url, category, video_date, is_visible } = body;

    if (!title?.trim() || !url?.trim()) {
      return NextResponse.json({ error: 'शीर्षक और वीडियो URL आवश्यक हैं।' }, { status: 400 });
    }

    const parsed = parseVideoUrl(url);
    if (!parsed.valid || !parsed.platform) {
      return NextResponse.json({ error: parsed.error || 'अमान्य वीडियो URL।' }, { status: 400 });
    }

    const { data: existingVideos } = await db
      .from('videos')
      .select('id, url, platform, sort_order');

    const incomingKey =
      parsed.videoId && parsed.platform
        ? `${parsed.platform}:${parsed.videoId}`
        : url.trim().toLowerCase();

    const duplicate = (existingVideos || []).find((v) => {
      const existingParsed = parseVideoUrl(v.url);
      const existingKey =
        existingParsed.valid && existingParsed.platform && existingParsed.videoId
          ? `${existingParsed.platform}:${existingParsed.videoId}`
          : (v.url || '').trim().toLowerCase();
      return existingKey === incomingKey;
    });

    if (duplicate) {
      return NextResponse.json(
        { error: 'यह वीडियो पहले से सूची में मौजूद है।' },
        { status: 409 }
      );
    }

    const minOrder =
      existingVideos && existingVideos.length > 0
        ? Math.min(...existingVideos.map((v) => Number(v.sort_order) || 0))
        : 1;
    const nextOrder = existingVideos && existingVideos.length > 0 ? minOrder - 1 : 1;

    const { data, error } = await db
      .from('videos')
      .insert([
        {
          title: title.trim(),
          url: url.trim(),
          platform: parsed.platform,
          category: category || 'अन्नदान',
          video_date: video_date || new Date().toISOString().slice(0, 10),
          is_visible: is_visible !== undefined ? Boolean(is_visible) : true,
          sort_order: nextOrder,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath('/');
    revalidatePath('/api/public/data');
    return NextResponse.json({ video: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error creating video' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceSupabase();
  if (!db) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { id, title, url, category, video_date, is_visible, sort_order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = String(title).trim();
    if (category !== undefined) updates.category = category;
    if (video_date !== undefined) updates.video_date = video_date;
    if (is_visible !== undefined) updates.is_visible = Boolean(is_visible);
    if (sort_order !== undefined) updates.sort_order = Number(sort_order);

    if (url !== undefined) {
      const parsed = parseVideoUrl(url);
      if (!parsed.valid || !parsed.platform) {
        return NextResponse.json({ error: parsed.error || 'अमान्य वीडियो URL।' }, { status: 400 });
      }
      updates.url = String(url).trim();
      updates.platform = parsed.platform;
    }

    const { data, error } = await db
      .from('videos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath('/');
    revalidatePath('/api/public/data');
    return NextResponse.json({ video: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error updating video' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceSupabase();
  if (!db) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
  }

  const { error } = await db.from('videos').delete().eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/');
  revalidatePath('/api/public/data');
  return NextResponse.json({ success: true });
}
