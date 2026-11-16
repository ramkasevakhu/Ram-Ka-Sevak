import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ZAP_KEY = process.env.ZAP_KEY || 'zapc267112a11cfc2c29fa5d3a52a636afc';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amount,
      sevaId,
      sevaName,
      packageLabel,
      donorName,
      donorPhone,
      donorEmail,
      message,
      isAnonymous,
    } = body;

    const numericAmount = Math.max(10, Number(amount) || 50);
    const cleanPhone = donorPhone ? String(donorPhone).replace(/\D/g, '').slice(0, 10) : '9999999999';
    const orderId = `RKS_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ramkasevak.org';
    const webhookUrl = `${appUrl}/api/payment/webhook`;

    // Call ZapUPI create-order API with switch=220 (routes specifically to ramkasevak webhook)
    const zapPayload = {
      zap_key: ZAP_KEY,
      order_id: orderId,
      amount: String(numericAmount),
      customer_mobile: cleanPhone.length === 10 ? cleanPhone : '9999999999',
      remark: `Ram Ka Sevak | ${packageLabel || 'Seva'}`,
      webhook_url: webhookUrl,
    };

    const zapRes = await fetch('https://pay.zapupi.com/api/create-order?switch=220', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zapPayload),
    });

    const zapData = await zapRes.json();

    if (!zapRes.ok || zapData.status === 'failed' || zapData.status === 'error') {
      return NextResponse.json(
        { error: zapData.message || 'Error generating ZapUPI order' },
        { status: 500 }
      );
    }

    // Safely record in database (non-blocking)
    if (supabase) {
      try {
        await supabase.from('donations').insert([
          {
            donor_name: isAnonymous ? 'Anonymous' : donorName?.trim() || 'Devoted Donor',
            donor_email: donorEmail?.trim() || null,
            donor_phone: cleanPhone || null,
            category_id: sevaId || 'roadside-relief',
            category_name: sevaName || 'Seva',
            quantity: 1,
            unit_label: packageLabel || '1 Thali',
            amount: numericAmount,
            payment_method: 'ZapUPI (Paytm Merchant)',
            transaction_ref: orderId,
            sankalp_message: message?.trim() || null,
            is_anonymous: Boolean(isAnonymous),
            status: 'pending',
          },
        ]);
      } catch (dbErr) {
        console.warn('DB recording note:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      order_id: orderId,
      payment_url: zapData.payment_url,
      txn_id: zapData.txn_id,
      pay_id: zapData.pay_id || null,
      upi_button: zapData.upi_button || null,
      payment_image_url: zapData.payment_image_url || null,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server connection error. Please try again.' },
      { status: 500 }
    );
  }
}
