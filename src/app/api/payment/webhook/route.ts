import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const orderId = payload.order_id || payload.orderId;
    const utr = payload.utr || payload.txid || payload.txn_id;

    if (!orderId) {
      return NextResponse.json({ status: 'error', message: 'Missing order_id' }, { status: 400 });
    }

    const zapKey = process.env.ZAP_KEY;
    if (!zapKey) {
      return NextResponse.json({ status: 'ignored', message: 'Gateway not configured' }, { status: 200 });
    }

    const verifyRes = await fetch('https://pay.zapupi.com/api/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zap_key: zapKey,
        order_id: orderId,
      }),
    });

    const verifyData = await verifyRes.json();
    const paymentStatus = (verifyData?.data?.status || verifyData?.status || '').toLowerCase();
    const isReallySuccess = paymentStatus === 'success' || paymentStatus === 'completed';

    const db = getServiceSupabase();
    if (isReallySuccess && db) {
      const realUtr = verifyData?.data?.utr || utr || orderId;
      await db
        .from('donations')
        .update({
          status: 'verified',
          transaction_ref: realUtr,
        })
        .eq('transaction_ref', orderId);
    }

    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 200 });
  }
}
