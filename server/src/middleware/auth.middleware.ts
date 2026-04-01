import type { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../utils/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, bearerToken] = header.split(' ');
    const token = scheme === 'Bearer' && bearerToken ? bearerToken : undefined;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = verifyToken<{ sub: string; role: string }>(token);

    (req as any).user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid/expired token' });
  }
}

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any)?.user?.role;
    if (!role) return res.status(401).json({ message: 'Unauthorized' });
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    return next();
  };
}

