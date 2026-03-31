const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'access_token';

function getCookieMaxAgeMs() {
  const raw = process.env.AUTH_COOKIE_MAX_AGE_MS;
  const parsed = Number(raw);
  if (!raw || Number.isNaN(parsed) || parsed <= 0) {
    return 24 * 60 * 60 * 1000;
  }
  return parsed;
}

export function buildAuthCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: getCookieMaxAgeMs(),
    path: '/',
  } as const;
}

export { AUTH_COOKIE_NAME };

