import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | undefined;
let redisConnected = false;
let didLogRedisError = false;

export async function connectRedis(redisUrl?: string) {
  const url = redisUrl || process.env.REDIS_URL || 'redis://127.0.0.1:6379';

  if (redisClient && redisConnected) return redisClient;

  redisClient = createClient({ url });
  redisClient.on('error', (err) => {
    if (!didLogRedisError) {
      console.error('Redis error:', err);
      didLogRedisError = true;
    }
  });

  try {
    await redisClient.connect();
    redisConnected = true;
    console.log('Redis connected');
    return redisClient;
  } catch (err) {
    redisConnected = false;
    try {
      await redisClient.quit();
    } catch {
    }
    redisClient = undefined;
    throw err;
  }
}

export function getRedisClient() {
  if (!redisClient || !redisConnected) {
    throw new Error('Redis not connected');
  }
  return redisClient;
}

