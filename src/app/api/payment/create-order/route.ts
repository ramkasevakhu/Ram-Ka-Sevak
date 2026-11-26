import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import QRCode from 'qrcode';

export const preferredRegion = 'bom1';

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

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 50) {
      return NextResponse.json(
        { error: 'न्यूनतम सहयोग राशि ₹50 आवश्यक है।' },
        { status: 400 }
      );
    }

    const cleanPhone = donorPhone ? String(donorPhone).replace(/\D/g, '').slice(0, 10) : '';
    const orderId = `RKS_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    const zapKey = process.env.ZAP_KEY;
    const webhookSecret = process.env.ZAP_WEBHOOK_SECRET;
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://ramkasevak.org').replace(/\/$/, '');
    const fallbackUpiId = process.env.NEXT_PUBLIC_UPI_ID || 'vipuone@upi';
    const fallbackUpiName = process.env.NEXT_PUBLIC_UPI_NAME || 'Ram Ka Sevak';

    let paymentUrl: string | null = null;
    let upiPayload = '';
    let upiId = fallbackUpiId;
    let txnId = orderId;
    let gatewayMode: 'zapupi' | 'direct_upi_fallback' = 'direct_upi_fallback';
    let fallbackReason = '';

    if (zapKey) {
      try {
        const webhookUrl = webhookSecret
          ? `${appUrl}/api/payment/webhook?token=${encodeURIComponent(webhookSecret)}`
          : `${appUrl}/api/payment/webhook`;

        // ZapUPI requires ASCII-only remark (Hindi Unicode or '|' causes "Invalid Remark")
        const safeRemark = `Ram Ka Sevak ${sevaId || 'Seva'}`
          .replace(/[^a-zA-Z0-9 ]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 40);

        const zapRes = await fetch('https://pay.zapupi.com/api/create-order?switch=220', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(5000),
          body: JSON.stringify({
            zap_key: zapKey,
            order_id: orderId,
            amount: String(Math.round(numericAmount)),
            customer_mobile: cleanPhone.length === 10 ? cleanPhone : '9999999999',
            remark: safeRemark || 'Ram Ka Sevak Seva',
            success_url: `${appUrl}/?payment_status=success&order_id=${orderId}`,
            failed_url: `${appUrl}/?payment_status=failed&order_id=${orderId}`,
            timeout_url: `${appUrl}/?payment_status=timeout&order_id=${orderId}`,
            webhook_url: webhookUrl,
          }),
        });

        const zapData = await zapRes.json();

        if (zapRes.ok && zapData.status === 'success' && zapData.payment_url) {
          gatewayMode = 'zapupi';
          paymentUrl = zapData.payment_url;
          txnId = zapData.txn_id || orderId;
        } else {
          fallbackReason = zapData.message || 'ZapUPI भुगतान गेटवे अभी उपलब्ध नहीं है।';
        }
      } catch (err: any) {
        fallbackReason = err?.message || 'ZapUPI से कनेक्ट करने में त्रुटि हुई।';
      }
    } else {
      fallbackReason = 'ZAP_KEY सर्वर पर कॉन्फ़िगर नहीं है।';
    }

    // Run Supabase DB insert (no cashier HTML scraping needed when redirecting directly to ZapUPI payment_url)
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
            payment_method: gatewayMode === 'zapupi' ? 'ZapUPI' : 'Direct UPI (Fallback)',
            transaction_ref: orderId,
            sankalp_message: message?.trim() || null,
            is_anonymous: Boolean(isAnonymous),
            status: 'pending',
          },
        ]);
      } catch (err) {
        console.warn('DB insert note:', err);
      }
    }

    if (!upiPayload) {
      upiPayload = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(fallbackUpiName)}&cu=INR&am=${encodeURIComponent(numericAmount.toFixed(2))}&tn=${encodeURIComponent(orderId)}`;
    }

    let qrImageUrl = '';
    try {
      qrImageUrl = await QRCode.toDataURL(upiPayload, {
        width: 240,
        margin: 1,
        color: { dark: '#3B1F0A', light: '#ffffff' },
      });
    } catch (qrErr) {
      console.warn('QR generation error:', qrErr);
    }

    return NextResponse.json({
      success: true,
      mode: gatewayMode,
      fallback: gatewayMode !== 'zapupi',
      fallback_reason: fallbackReason || undefined,
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
