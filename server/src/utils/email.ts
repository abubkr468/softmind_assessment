export function normalizeEmail(email: unknown) {
  return (email || '').toString().trim().toLowerCase();
}

