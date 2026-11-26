import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const db = getServiceSupabase();

    // Check existing record first (also supports idempotency)
    let existing: any = null;
    if (db) {
      const { data } = await db
        .from('donations')
        .select('*')
        .eq('transaction_ref', order_id)
        .maybeSingle();
      existing = data;

      if (existing && (existing.status === 'verified' || existing.status === 'success')) {
        return NextResponse.json({
          verified: true,
          status: 'success',
          utr: existing.transaction_ref,
          amount: existing.amount,
          donor_name: existing.donor_name,
          category_name: existing.category_name,
          unit_label: existing.unit_label,
          sankalp_message: existing.sankalp_message,
        });
      }
    }

    const zapKey = process.env.ZAP_KEY;
    if (!zapKey) {
      return NextResponse.json({ verified: false, status: 'pending', mode: 'direct_upi_fallback' });
    }

    // Official ZapUPI Order Status API: POST https://pay.zapupi.com/api/order-status
    const zapRes = await fetch('https://pay.zapupi.com/api/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zap_key: zapKey,
        order_id,
      }),
    });

    const zapData = await zapRes.json();
    const txnData = zapData?.data || zapData;
    const rawStatus = String(txnData?.status || '').toLowerCase();
    const utr = String(txnData?.utr || '').trim();
    const verifiedAmount = Number(txnData?.pay_amount || txnData?.amount || 0);

    const isSuccess = rawStatus === 'success' || rawStatus === 'completed';
    const isFailed = rawStatus === 'failed' || rawStatus === 'expired' || rawStatus === 'cancelled';

    if (isSuccess && utr.length >= 6) {
      // Amount match validation when DB record exists
      if (existing && verifiedAmount > 0 && Math.abs(verifiedAmount - Number(existing.amount)) > 1) {
        return NextResponse.json({
          verified: false,
          status: 'failed',
          error: 'भुगतान राशि में अंतर पाया गया।',
        });
      }

      const realUtr = utr || txnData?.txn_id || order_id;

      if (db && existing && existing.status !== 'verified' && existing.status !== 'success') {
        await db
          .from('donations')
          .update({
            status: 'verified',
            transaction_ref: realUtr,
            admin_note: `ZapUPI Order: ${order_id}`,
          })
          .eq('id', existing.id);

        await db.from('community_blessings').insert([
          {
            donation_id: existing.id,
            donor_name: existing.is_anonymous ? 'गुप्त दानी' : existing.donor_name,
            category_name: existing.category_name,
            units_text: existing.unit_label || `₹${existing.amount} सेवा`,
            amount: existing.amount,
            message: existing.sankalp_message || null,
            is_verified: true,
          },
        ]);
      }

      return NextResponse.json({
        verified: true,
        status: 'success',
        utr: realUtr,
        amount: existing?.amount || verifiedAmount,
        donor_name: existing?.donor_name || 'श्रद्धालु दाता',
        category_name: existing?.category_name || 'सेवा सहयोग',
        unit_label: existing?.unit_label || '',
        sankalp_message: existing?.sankalp_message || '',
      });
    }

    if (isFailed && db && existing && existing.status === 'pending') {
      await db.from('donations').update({ status: 'failed' }).eq('id', existing.id);
    }

    return NextResponse.json({
      verified: false,
      status: isFailed ? 'failed' : 'pending',
    });
  } catch (error: any) {
    console.error('Check status error:', error);
    return NextResponse.json({ verified: false, status: 'pending', error: error?.message }, { status: 500 });
  }
}
