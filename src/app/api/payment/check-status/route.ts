import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ZAP_KEY = process.env.ZAP_KEY || 'zapc267112a11cfc2c29fa5d3a52a636afc';

export async function POST(request: Request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID आवश्यक है' }, { status: 400 });
    }

    // Direct Server-to-Server Verification with ZapUPI (No fake submissions possible!)
    const zapRes = await fetch('https://pay.zapupi.com/api/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zap_key: ZAP_KEY,
        order_id,
      }),
    });

    const zapData = await zapRes.json();

    const isSuccess =
      zapData?.status?.toLowerCase() === 'success' ||
      zapData?.status?.toLowerCase() === 'completed';

    if (isSuccess) {
      const realUtr = zapData.utr || zapData.txn_id || order_id;

      // Update Database in Supabase to verified
      if (supabase) {
        await supabase
          .from('donations')
          .update({
            status: 'verified',
            transaction_ref: realUtr,
          })
          .eq('transaction_ref', order_id);
      }

      return NextResponse.json({
        verified: true,
        status: 'success',
        utr: realUtr,
        amount: zapData.amount || zapData.pay_amount,
      });
    }

    return NextResponse.json({
      verified: false,
      status: zapData?.status || 'pending',
    });
  } catch (error: any) {
    console.error('Check status error:', error);
    return NextResponse.json({ verified: false, error: error?.message }, { status: 500 });
  }
}
