import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ZAP_KEY = process.env.ZAP_KEY || 'zapc267112a11cfc2c29fa5d3a52a636afc';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const orderId = payload.order_id || payload.orderId;
    const status = payload.status?.toLowerCase();
    const utr = payload.utr || payload.txid || payload.txn_id;

    if (!orderId) {
      return NextResponse.json({ status: 'error', message: 'Missing order_id' }, { status: 400 });
    }

    // Verify order status directly from ZapUPI API to prevent spoofing
    const verifyRes = await fetch('https://pay.zapupi.com/api/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zap_key: ZAP_KEY,
        order_id: orderId,
      }),
    });

    const verifyData = await verifyRes.json();
    const isReallySuccess =
      verifyData?.status?.toLowerCase() === 'success' ||
      verifyData?.status?.toLowerCase() === 'completed';

    if (isReallySuccess && supabase) {
      const realUtr = verifyData.utr || utr || orderId;
      await supabase
        .from('donations')
        .update({
          status: 'verified',
          transaction_ref: realUtr,
        })
        .eq('transaction_ref', orderId);
    }

    // Respond HTTP 200 within 10 seconds as required by ZapUPI
    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 200 });
  }
}
