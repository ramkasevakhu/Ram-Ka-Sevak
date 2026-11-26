import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  checkLoginRateLimit,
  createSessionToken,
  recordFailedLogin,
  resetLoginRateLimit,
  verifyPassword,
} from '@/lib/auth';

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0]?.trim() || 'unknown';

  const rateCheck = checkLoginRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: `बहुत अधिक गलत प्रयास। कृपया ${Math.ceil(rateCheck.retryAfterSec / 60)} मिनट बाद पुनः प्रयास करें।`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rateCheck.retryAfterSec) },
      }
    );
  }

  try {
    const { username, password } = await request.json();
    const expectedUsername = process.env.ADMIN_USERNAME?.trim();
    const expectedHash = process.env.ADMIN_PASSWORD_HASH?.trim();

    if (!expectedUsername || !expectedHash) {
      return NextResponse.json(
        { error: 'सर्वर पर एडमिन क्रेडेंशियल कॉन्फ़िगर नहीं हैं (.env जांचें)।' },
        { status: 500 }
      );
    }

    const isUserValid =
      typeof username === 'string' &&
      username.trim().toLowerCase() === expectedUsername.toLowerCase();
    const isPassValid = typeof password === 'string' && verifyPassword(password, expectedHash);

    if (!isUserValid || !isPassValid) {
      recordFailedLogin(ip);
      return NextResponse.json(
        { error: 'गलत यूज़रनेम या पासवर्ड।' },
        { status: 401 }
      );
    }

    resetLoginRateLimit(ip);
    const token = createSessionToken(expectedUsername);

    const response = NextResponse.json({ success: true, username: expectedUsername });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'लॉगिन प्रक्रिया में त्रुटि।' }, { status: 500 });
  }
}
