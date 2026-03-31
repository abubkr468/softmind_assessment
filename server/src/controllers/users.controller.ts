import { User } from '../models';

export async function listUsersHandler(req: any, res: any) {
  try {
    const users = await User.find().select('name email role').sort({ name: 1 }).lean();
    return res.json({
      users: users.map((u) => ({
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role,
      })),
    });
  } catch {
    return res.status(500).json({ message: 'Failed to list users' });
  }
}
