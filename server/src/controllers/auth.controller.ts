import { login as loginService, signup as signupService } from '../services/auth.service';
import { User } from '../models';

export async function signup(req: any, res: any) {
  try {
    const { name, email, password, role } = req.body || {};
    const result = await signupService({ name, email, password, role });
    return res.status(201).json({ user: result.user, token: result.token });
  } catch (err) {
    const status = (err as any)?.statusCode || 400;
    return res.status(status).json({ message: (err as any)?.message || 'Signup failed' });
  }
}

export async function login(req: any, res: any) {
  try {
    const { email, password } = req.body || {};
    const result = await loginService({ email, password });
    return res.json({ user: result.user, token: result.token });
  } catch (err) {
    const status = (err as any)?.statusCode || 401;
    return res.status(status).json({ message: (err as any)?.message || 'Login failed' });
  }
}

export async function logout(req: any, res: any) {
  return res.json({ message: 'Logged out' });
}

export async function me(req: any, res: any) {
  try {
    const id = req.user?.id;
    if (!id) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(id).select('name email role').lean();
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    return res.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return res.status(500).json({ message: 'Failed to load user' });
  }
}

