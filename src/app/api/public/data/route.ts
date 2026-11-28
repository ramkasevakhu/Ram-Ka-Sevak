import { NextResponse } from 'next/server';
import { getPublicSiteData } from '@/lib/siteData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const data = await getPublicSiteData();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
