import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getServiceSupabase } from '@/lib/supabase';
import { DEFAULT_IMPACT_COUNTERS, DEFAULT_TRANSPARENCY } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceSupabase();
  if (!db) {
    return NextResponse.json({
      impactCounters: DEFAULT_IMPACT_COUNTERS,
      transparency: DEFAULT_TRANSPARENCY,
    });
  }

  const { data } = await db.from('site_content').select('key, value');
  let impactCounters = DEFAULT_IMPACT_COUNTERS;
  let transparency = DEFAULT_TRANSPARENCY;

  if (data) {
    for (const row of data) {
      if (row.key === 'impact_counters' && row.value) {
        impactCounters = { ...DEFAULT_IMPACT_COUNTERS, ...row.value };
      }
      if (row.key === 'transparency' && row.value) {
        transparency = { ...DEFAULT_TRANSPARENCY, ...row.value };
      }
    }
  }

  return NextResponse.json({ impactCounters, transparency });
}

export async function PUT(request: Request) {
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
    const { impactCounters, transparency } = body;

    const upserts = [];
    if (impactCounters) {
      upserts.push({
        key: 'impact_counters',
        value: {
          mealsServed: Number(impactCounters.mealsServed) || 0,
          animalsTreated: Number(impactCounters.animalsTreated) || 0,
          totalDonationsAmount: Number(impactCounters.totalDonationsAmount) || 0,
        },
        updated_at: new Date().toISOString(),
      });
    }

    if (transparency) {
      upserts.push({
        key: 'transparency',
        value: {
          monthLabel: String(transparency.monthLabel || '').trim(),
          incomeAmount: Number(transparency.incomeAmount) || 0,
          expenseAmount: Number(transparency.expenseAmount) || 0,
          notes: String(transparency.notes || '').trim(),
        },
        updated_at: new Date().toISOString(),
      });
    }

    if (upserts.length > 0) {
      const { error } = await db.from('site_content').upsert(upserts, { onConflict: 'key' });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error saving content' }, { status: 500 });
  }
}
