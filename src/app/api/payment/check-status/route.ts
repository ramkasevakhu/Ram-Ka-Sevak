import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const zapKey = process.env.ZAP_KEY;
    if (!zapKey) {
      return NextResponse.json({ verified: false, status: 'pending', mode: 'direct_upi' });
    }

    const zapRes = await fetch('https://pay.zapupi.com/api/order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zap_key: zapKey,
        order_id,
      }),
    });

    const zapData = await zapRes.json();
    const txnData = zapData?.data;
    const paymentStatus = (txnData?.status || '').toLowerCase();
    const utr = (txnData?.utr || '').trim();

    const isPaymentVerified =
      (paymentStatus === 'success' || paymentStatus === 'completed') && utr.length >= 6;

    if (isPaymentVerified) {
      const realUtr = utr || txnData.txn_id || order_id;
      const db = getServiceSupabase();
      if (db) {
        try {
          const { data: updated } = await db
            .from('donations')
            .update({ status: 'verified', transaction_ref: realUtr })
            .eq('transaction_ref', order_id)
            .select()
            .single();

          if (updated) {
            await db.from('community_blessings').insert([
              {
                donation_id: updated.id,
                donor_name: updated.is_anonymous ? 'गुप्त दानी' : updated.donor_name,
                category_name: updated.category_name,
                units_text: updated.unit_label || `₹${updated.amount} सेवा`,
                amount: updated.amount,
                message: updated.sankalp_message || null,
                is_verified: true,
              },
            ]);
          }
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

    return NextResponse.json({
      verified: false,
      status: paymentStatus || 'pending',
    });
  } catch (error: any) {
    console.error('Check status error:', error);
    return NextResponse.json({ verified: false, error: error?.message }, { status: 500 });
  }
}
