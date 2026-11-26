import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const webhookSecret = process.env.ZAP_WEBHOOK_SECRET;

    // Optional webhook token/secret check
    // TODO: ZapUPI docs do not specify a built-in HMAC signature header;
    // therefore we verify optional ?token= / x-zapupi-secret AND always double-confirm via /api/order-status.
    if (webhookSecret) {
      const tokenParam = url.searchParams.get('token') || request.headers.get('x-zapupi-secret');
      if (tokenParam !== webhookSecret) {
        return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
      }
    }

    const payload = await request.json();
    const orderId = payload.order_id || payload.orderId;
    const webhookStatus = String(payload.status || '').toLowerCase();

    if (!orderId) {
      return NextResponse.json({ status: 'error', message: 'Missing order_id' }, { status: 400 });
    }

    const zapKey = process.env.ZAP_KEY;
    if (!zapKey) {
      return NextResponse.json({ status: 'ignored', message: 'ZAP_KEY not configured' }, { status: 200 });
    }

    // Server-to-server double confirmation with ZapUPI /api/order-status
    const verifyRes = await fetch('https://pay.zapupi.com/api/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zap_key: zapKey,
        order_id: orderId,
      }),
    });

    const verifyData = await verifyRes.json();
    const txnData = verifyData?.data || verifyData;
    const verifiedStatus = String(txnData?.status || '').toLowerCase();
    const isSuccess = verifiedStatus === 'success' || verifiedStatus === 'completed';
    const isFailed = verifiedStatus === 'failed' || webhookStatus === 'failed';
    const verifiedAmount = Number(txnData?.pay_amount || txnData?.amount || 0);
    const realUtr = String(txnData?.utr || payload.utr || txnData?.txn_id || orderId).trim();

    const db = getServiceSupabase();
    if (db) {
      const { data: existing } = await db
        .from('donations')
        .select('*')
        .eq('transaction_ref', orderId)
        .maybeSingle();

      // Idempotency: ignore if already marked verified/success
      if (!existing || existing.status === 'verified' || existing.status === 'success') {
        return NextResponse.json({ status: 'ok', idempotent: true }, { status: 200 });
      }

      if (isSuccess) {
        // Amount match check
        if (verifiedAmount > 0 && Math.abs(verifiedAmount - Number(existing.amount)) > 1) {
          await db
            .from('donations')
            .update({
              status: 'failed',
              admin_note: `Amount mismatch: expected ${existing.amount}, got ${verifiedAmount}`,
            })
            .eq('id', existing.id);
          return NextResponse.json({ status: 'amount_mismatch' }, { status: 200 });
        }

        await db
          .from('donations')
          .update({
            status: 'verified',
            transaction_ref: realUtr,
            admin_note: `ZapUPI Order: ${orderId}`,
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
      } else if (isFailed) {
        await db.from('donations').update({ status: 'failed' }).eq('id', existing.id);
      }
    }

    // Always return HTTP 200 OK to ZapUPI
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 200 });
  }
}
