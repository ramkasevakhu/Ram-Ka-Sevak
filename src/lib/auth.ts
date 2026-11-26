import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'rks_admin_session';

interface JwtPayload {
  sub: string;
  role: 'admin';
  iat: number;
  exp: number;
}

// In-memory rate limit store for login attempts (per IP)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfterSec: 0 };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
    loginAttempts.set(ip, entry);
  }
}

export function resetLoginRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

function getJwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('ADMIN_JWT_SECRET is not configured (minimum 16 characters required).');
  }
  return secret;
}

/**
 * Verifies password against ADMIN_PASSWORD_HASH stored in .env
 * Format supported: "scrypt$<saltHex>$<derivedHex>"
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!password || !storedHash) return false;

  const parts = storedHash.split('$');
  if (parts.length === 3 && parts[0] === 'scrypt') {
    const salt = parts[1];
    const expectedHex = parts[2];
    const derived = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(expectedHex, 'hex');
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  }

  return false;
}

/**
 * Helper to create a scrypt password hash: "scrypt$<saltHex>$<derivedHex>"
 */
export function hashPasswordScrypt(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

function base64UrlEncode(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(input: string): string {
  const pad = 4 - (input.length % 4);
  const padded = input + (pad < 4 ? '='.repeat(pad) : '');
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
}

export function createSessionToken(username: string, ttlSeconds = 60 * 60 * 12): string {
  const secret = getJwtSecret();
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: username,
      role: 'admin',
      iat: now,
      exp: now + ttlSeconds,
    } satisfies JwtPayload)
  );
  const signature = base64UrlEncode(
    crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest()
  );
  return `${header}.${payload}.${signature}`;
}

export function verifySessionToken(token: string): JwtPayload | null {
  try {
    const secret = getJwtSecret();
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, sig] = parts;
    const expectedSig = base64UrlEncode(
      crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest()
    );

    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const decoded = JSON.parse(base64UrlDecode(payload)) as JwtPayload;
    const now = Math.floor(Date.now() / 1000);
    if (!decoded.exp || decoded.exp < now || decoded.role !== 'admin') {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<JwtPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
