import { USER_ROLES } from '../models';

export function validateRole(role?: string) {
  if (!role) return 'User';
  if (!USER_ROLES.includes(role as any)) {
    const err: any = new Error(`Invalid role. Allowed: ${USER_ROLES.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }
  return role;
}

