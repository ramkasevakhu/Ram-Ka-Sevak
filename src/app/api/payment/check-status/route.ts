import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ZAP_KEY = process.env.ZAP_KEY || 'zapc267112a11cfc2c29fa5d3a52a636afc';

export async function POST(request: Request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Direct Server-to-Server Verification with ZapUPI
    const zapRes = await fetch('https://pay.zapupi.com/api/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zap_key: ZAP_KEY,
        order_id,
      }),
    });

    const zapData = await zapRes.json();

    // In ZapUPI:
    // zapData.status === 'success' means the API request itself succeeded.
    // The REAL payment status is inside zapData.data.status ('Success', 'Pending', 'Failed')
    // and zapData.data.utr contains the bank reference number.
    const txnData = zapData?.data;
    const paymentStatus = (txnData?.status || '').toLowerCase();
    const utr = (txnData?.utr || '').trim();

    // MUST be strictly Success/Completed AND have a valid bank UTR
    const isPaymentVerified = (paymentStatus === 'success' || paymentStatus === 'completed') && utr.length >= 6;

    if (isPaymentVerified) {
      const realUtr = utr || txnData.txn_id || order_id;

      // Update Database in Supabase to verified
      if (supabase) {
        try {
          await supabase
            .from('donations')
            .update({
              status: 'verified',
              transaction_ref: realUtr,
            })
            .eq('transaction_ref', order_id);
        } catch (dbErr) {
          console.warn('DB update note:', dbErr);
        }
      }

      return NextResponse.json({
        verified: true,
        status: 'success',
        utr: realUtr,
        amount: txnData.amount || txnData.pay_amount,
      });
    }

    // Still pending, failed or no bank UTR yet
    return NextResponse.json({
      verified: false,
      status: paymentStatus || 'pending',
    });
  } catch (error: any) {
    console.error('Check status error:', error);
    return NextResponse.json({ verified: false, error: error?.message }, { status: 500 });
  }
}
