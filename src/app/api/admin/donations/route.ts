import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getServiceSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getServiceSupabase();
  if (!db) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || '';
  const category = searchParams.get('category') || '';
  const q = (searchParams.get('q') || '').trim().toLowerCase();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  let query = db.from('donations').select('*').order('created_at', { ascending: false });

  if (status && status !== 'all') {
    if (status === 'success') {
      query = query.in('status', ['success', 'verified']);
    } else {
      query = query.eq('status', status);
    }
  }
  if (category && category !== 'all') {
    query = query.eq('category_id', category);
  }
  if (from) {
    query = query.gte('created_at', `${from}T00:00:00.000Z`);
  }
  if (to) {
    query = query.lte('created_at', `${to}T23:59:59.999Z`);
  }

  const { data, error } = await query.limit(500);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let rows = data || [];
  if (q) {
    rows = rows.filter(
      (r) =>
        (r.donor_name || '').toLowerCase().includes(q) ||
        (r.transaction_ref || '').toLowerCase().includes(q) ||
        (r.donor_phone || '').toLowerCase().includes(q)
    );
  }

  // Compute stats across successful/verified donations in full dataset
  const { data: allSuccess } = await db
    .from('donations')
    .select('donor_name, amount, created_at, is_anonymous')
    .in('status', ['success', 'verified']);

  const successList = allSuccess || [];
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  let totalAmount = 0;
  let monthAmount = 0;
  const donorTotals = new Map<string, number>();

  for (const item of successList) {
    const amt = Number(item.amount) || 0;
    totalAmount += amt;
    if (item.created_at >= monthStart) {
      monthAmount += amt;
    }
    const name = item.is_anonymous ? 'गुप्त दानी' : item.donor_name || 'अज्ञात';
    donorTotals.set(name, (donorTotals.get(name) || 0) + amt);
  }

  const totalDonors = successList.length;
  const avgAmount = totalDonors > 0 ? Math.round(totalAmount / totalDonors) : 0;
  const topDonors = Array.from(donorTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, total]) => ({ name, total }));

  return NextResponse.json({
    donations: rows,
    stats: {
      totalAmount,
      monthAmount,
      totalDonors,
      avgAmount,
      topDonors,
    },
  });
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
    const {
      donor_name,
      donor_phone,
      donor_email,
      category_id,
      category_name,
      unit_label,
      amount,
      payment_method,
      transaction_ref,
      admin_note,
      is_anonymous,
      status,
    } = body;

    if (!donor_name?.trim() || !amount || Number(amount) <= 0) {
      return NextResponse.json({ error: 'दाता का नाम और वैध राशि आवश्यक हैं।' }, { status: 400 });
    }

    const finalStatus = status || 'success';
    const { data, error } = await db
      .from('donations')
      .insert([
        {
          donor_name: donor_name.trim(),
          donor_phone: donor_phone?.trim() || null,
          donor_email: donor_email?.trim() || null,
          category_id: category_id || 'roadside-relief',
          category_name: category_name || 'अन्नदान',
          quantity: 1,
          unit_label: unit_label || '',
          amount: Number(amount),
          payment_method: payment_method || 'UPI (Manual)',
          transaction_ref: transaction_ref?.trim() || null,
          admin_note: admin_note?.trim() || null,
          is_anonymous: Boolean(is_anonymous),
          status: finalStatus,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (finalStatus === 'success' || finalStatus === 'verified') {
      await db.from('community_blessings').insert([
        {
          donation_id: data.id,
          donor_name: is_anonymous ? 'गुप्त दानी' : donor_name.trim(),
          category_name: category_name || 'अन्नदान',
          units_text: unit_label || `₹${amount} सेवा सहयोग`,
          amount: Number(amount),
          message: null,
          is_verified: true,
        },
      ]);
    }

    return NextResponse.json({ donation: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error creating donation' }, { status: 500 });
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
    const { id, ...fields } = body;
    if (!id) {
      return NextResponse.json({ error: 'Donation ID required' }, { status: 400 });
    }

    const allowed = [
      'donor_name',
      'donor_phone',
      'donor_email',
      'category_id',
      'category_name',
      'unit_label',
      'amount',
      'payment_method',
      'transaction_ref',
      'admin_note',
      'is_anonymous',
      'status',
    ];
    const updates: Record<string, any> = {};
    for (const k of allowed) {
      if (fields[k] !== undefined) {
        updates[k] = k === 'amount' ? Number(fields[k]) : fields[k];
      }
    }

    const { data, error } = await db
      .from('donations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ donation: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error updating donation' }, { status: 500 });
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
    return NextResponse.json({ error: 'Donation ID required' }, { status: 400 });
  }

  const { error } = await db.from('donations').delete().eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
