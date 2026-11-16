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

    // 1. Call ZapUPI create-order API with switch=220 (routes specifically to ramkasevak webhook)
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

    const paymentUrl = zapData.payment_url;
    let upiPayload = '';
    let upiId = '';
    let txnId = zapData.txn_id || '';

    // 2. Extract real UPI payload so we can render QR & UPI buttons inside Ram Ka Sevak Saffron theme
    if (paymentUrl) {
      try {
        const htmlRes = await fetch(paymentUrl);
        const html = await htmlRes.text();
        const match = html.match(/const\s+serverData\s*=\s*(\{.+?\});/);
        if (match) {
          const serverData = JSON.parse(match[1]);
          const inp = serverData.data;
          if (inp && inp.upi_id) {
            upiId = inp.upi_id;
            txnId = inp.txnId || txnId;
            const autoKey = inp.autoCode || 'tr';
            const autoVal = inp.txnRef || '';
            const amountFormatted = parseFloat(inp.pay_amount || numericAmount).toFixed(2);

            upiPayload = `upi://pay?pa=${encodeURIComponent(inp.upi_id)}&pn=${encodeURIComponent('Ram Ka Sevak')}&cu=INR&am=${encodeURIComponent(amountFormatted)}&tn=${encodeURIComponent(txnId)}&${encodeURIComponent(autoKey)}=${encodeURIComponent(autoVal)}`;
          }
        }
      } catch (extractErr) {
        console.warn('Could not extract direct UPI payload, fallback to payment_url:', extractErr);
      }
    }

    // Dynamic QR image for desktop scanning in Ram theme
    const qrImageUrl = upiPayload
      ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(upiPayload)}`
      : null;

    // 3. Safely record in database (non-blocking)
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
      payment_url: paymentUrl,
      upi_payload: upiPayload,
      qr_image_url: qrImageUrl,
      upi_id: upiId,
      txn_id: txnId,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server connection error. Please try again.' },
      { status: 500 }
    );
  }
}
