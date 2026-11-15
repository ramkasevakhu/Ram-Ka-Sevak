import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      donorName,
      donorPhone,
      categoryId,
      categoryName,
      quantity,
      unitLabel,
      amount,
      paymentMethod,
      transactionRef,
      sankalpMessage,
      isAnonymous,
      status,
    } = body;

    if (!donorName || !amount || !categoryName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // If Supabase is configured, save in database
    if (supabase) {
      const { data: donationData, error: donationError } = await supabase
        .from('donations')
        .insert([
          {
            donor_name: isAnonymous ? 'गुप्त दानी' : donorName,
            donor_phone: donorPhone || null,
            category_id: categoryId,
            category_name: categoryName,
            quantity: quantity || 1,
            unit_label: unitLabel || '',
            amount: Number(amount),
            payment_method: paymentMethod || 'UPI',
            transaction_ref: transactionRef || null,
            sankalp_message: sankalpMessage || null,
            is_anonymous: Boolean(isAnonymous),
            status: status || 'verified',
          },
        ])
        .select()
        .single();

      if (donationError) {
        console.error('Supabase donation error:', donationError);
      }

      // Also add to community blessings feed
      const unitsText = `${quantity || 1} ${unitLabel || ''}`;
      await supabase.from('community_blessings').insert([
        {
          donation_id: donationData?.id || null,
          donor_name: isAnonymous ? 'गुप्त दानी' : donorName,
          category_name: categoryName,
          units_text: unitsText,
          amount: Number(amount),
          message: sankalpMessage || null,
          is_verified: true,
        },
      ]);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Donation recorded successfully',
      ref: transactionRef || 'DIRECT-UPI' 
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: true, message: 'Processed' });
  }
}
