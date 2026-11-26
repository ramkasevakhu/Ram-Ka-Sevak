import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import QRCode from 'qrcode';

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
    const cleanPhone = donorPhone ? String(donorPhone).replace(/\D/g, '').slice(0, 10) : '';
    const orderId = `RKS_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    const zapKey = process.env.ZAP_KEY;
    const fallbackUpiId = process.env.NEXT_PUBLIC_UPI_ID || 'vipuone@upi';
    const fallbackUpiName = process.env.NEXT_PUBLIC_UPI_NAME || 'Ram Ka Sevak';

    let paymentUrl: string | null = null;
    let upiPayload = '';
    let upiId = fallbackUpiId;
    let txnId = orderId;
    let gatewayMode: 'zapupi' | 'direct_upi' = 'direct_upi';

    if (zapKey) {
      try {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ramkasevak.org';
        const zapRes = await fetch('https://pay.zapupi.com/api/create-order?switch=220', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            zap_key: zapKey,
            order_id: orderId,
            amount: String(numericAmount),
            customer_mobile: cleanPhone.length === 10 ? cleanPhone : '9999999999',
            remark: `Ram Ka Sevak | ${packageLabel || 'Seva'}`,
            webhook_url: `${appUrl}/api/payment/webhook`,
          }),
        });

        const zapData = await zapRes.json();
        if (zapRes.ok && zapData.status !== 'failed' && zapData.status !== 'error') {
          gatewayMode = 'zapupi';
          paymentUrl = zapData.payment_url || null;
          txnId = zapData.txn_id || orderId;

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
                  upiPayload = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(fallbackUpiName)}&cu=INR&am=${encodeURIComponent(amountFormatted)}&tn=${encodeURIComponent(txnId)}&${encodeURIComponent(autoKey)}=${encodeURIComponent(autoVal)}`;
                }
              }
            } catch {
              // Fallback below
            }
          }
        }
      } catch (err) {
        console.warn('ZapUPI unavailable, using direct UPI intent:', err);
      }
    }

    if (!upiPayload) {
      const amountFormatted = numericAmount.toFixed(2);
      upiPayload = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(fallbackUpiName)}&cu=INR&am=${encodeURIComponent(amountFormatted)}&tn=${encodeURIComponent(orderId)}`;
    }

    let qrImageUrl = '';
    try {
      qrImageUrl = await QRCode.toDataURL(upiPayload, {
        width: 260,
        margin: 1,
        color: { dark: '#3B1F0A', light: '#ffffff' },
      });
    } catch (qrErr) {
      console.warn('QR code generation error:', qrErr);
    }

    const db = getServiceSupabase();
    if (db) {
      try {
        await db.from('donations').insert([
          {
            donor_name: isAnonymous ? 'गुप्त दानी' : donorName?.trim() || 'श्रद्धालु दाता',
            donor_email: donorEmail?.trim() || null,
            donor_phone: cleanPhone || null,
            category_id: sevaId || 'roadside-relief',
            category_name: sevaName || 'अन्नदान',
            quantity: 1,
            unit_label: packageLabel || '',
            amount: numericAmount,
            payment_method: gatewayMode === 'zapupi' ? 'UPI Gateway' : 'Direct UPI',
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
      mode: gatewayMode,
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
      { error: error?.message || 'भुगतान प्रारंभ करने में त्रुटि हुई। कृपया पुनः प्रयास करें।' },
      { status: 500 }
    );
  }
}
