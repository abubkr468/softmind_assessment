import { signToken } from '../utils/jwt';
import { hashPassword, verifyPassword } from '../utils/password';
import { normalizeEmail } from '../utils/email';
import { validateRole } from '../utils/role';

import { User } from '../models';

export async function signup({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const normalizedEmail = normalizeEmail(email);
  if (!name || !normalizedEmail || !password) {
    const err: any = new Error('name, email, and password are required');
    err.statusCode = 400;
    throw err;
  }

  const validRole = validateRole(role);

  const existing = await User.findOne({ email: normalizedEmail }).lean();
  if (existing) {
    const err: any = new Error('Email already in use');
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name: name.toString().trim(),
    email: normalizedEmail,
    role: validRole,
    password: hashedPassword,
  });

  const token = signToken({
    sub: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    const err: any = new Error('email and password are required');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    const err: any = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    const err: any = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({
    sub: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

