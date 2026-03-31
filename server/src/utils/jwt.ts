import jwtLib from 'jsonwebtoken';

function getSecret() {
  return process.env.JWT_SECRET || 'dev_secret_change_me';
}

function getExpiresIn() {
  return process.env.JWT_EXPIRES_IN || '1d';
}

export function signToken(payload: object) {
  return (jwtLib as any).sign(payload, getSecret(), {
    expiresIn: getExpiresIn(),
  });
}

export function verifyToken<T = any>(token: string) {
  return (jwtLib as any).verify(token, getSecret()) as T;
}

