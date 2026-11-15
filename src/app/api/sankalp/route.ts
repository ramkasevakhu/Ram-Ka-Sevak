import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { INITIAL_COMMUNITY_BLESSINGS } from '@/lib/constants';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('community_blessings')
        .select('*')
        .eq('is_verified', true)
        .order('created_at', { ascending: false })
        .limit(12);

      if (!error && data && data.length > 0) {
        const formatted = data.map((item) => ({
          id: item.id,
          donorName: item.donor_name,
          categoryName: item.category_name,
          unitsText: item.units_text,
          amount: Number(item.amount),
          message: item.message,
          timeAgo: 'हाल ही में',
          isVerified: item.is_verified,
        }));
        return NextResponse.json(formatted);
      }
    }

    // Default fallback to initial genuine blessings
    return NextResponse.json(INITIAL_COMMUNITY_BLESSINGS);
  } catch (err) {
    return NextResponse.json(INITIAL_COMMUNITY_BLESSINGS);
  }
}
