import { getRedisClient } from '../redis';

const TASKS_CACHE_KEY_PREFIX = 'tasks:list:';

// Cache lifetime for task list responses.
export function getTasksCacheTtlSeconds() {
  const parsed = Number(process.env.TASKS_CACHE_TTL_SECONDS || 30);
  if (Number.isNaN(parsed) || parsed <= 0) return 30;
  return parsed;
}

// Build a stable, user-scoped key so each filter combination has its own cache entry.
export function buildTaskListCacheKey(
  filters: { status?: string; priority?: string; assignedTo?: string },
  requester: { userId?: string; role?: string }
) {
  return `${TASKS_CACHE_KEY_PREFIX}${JSON.stringify({
    role: requester.role || '',
    userId: requester.userId || '',
    status: filters.status || '',
    priority: filters.priority || '',
    assignedTo: filters.assignedTo || '',
  })}`;
}

// Fast-path: return cached task list instead of hitting MongoDB.
export async function readTaskListCache(key: string) {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(key);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

// Save query result for short-term reuse.
export async function writeTaskListCache(key: string, data: unknown) {
  try {
    const redis = getRedisClient();
    await redis.set(key, JSON.stringify(data), { EX: getTasksCacheTtlSeconds() });
  } catch {
    // Ignore Redis issues; DB remains source of truth.
  }
}

// Clear all task list cache entries after mutations (create/assign/status/attachment).
export async function invalidateTaskListCache() {
  try {
    const redis = getRedisClient();
    for await (const scanned of redis.scanIterator({
      MATCH: `${TASKS_CACHE_KEY_PREFIX}*`,
      COUNT: 100,
    })) {
      if (Array.isArray(scanned)) {
        for (const key of scanned) {
          await redis.del(key);
        }
      } else {
        await redis.del(scanned as string);
      }
    }
  } catch {
    // Ignore Redis issues; cache self-heals by TTL.
  }
}