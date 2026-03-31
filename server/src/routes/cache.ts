import express from 'express';

import { getRedisClient } from '../redis/client';

const router = express.Router();


router.get('/cache/greet', async (req, res) => {
  const name = (req.query.name || 'world').toString();
  const cacheTtlSeconds = Number(
    (req.query.ttl as string | undefined) || process.env.CACHE_TTL_SECONDS || 60
  );
  const key = `greeting:${name}`;

  try {
    const redis = getRedisClient();
    const cached = await redis.get(key);

    if (cached) {
      return res.json({
        fromCache: true,
        name,
        message: cached,
      });
    }

    const message = `Hello, ${name}!`;
    await redis.set(key, message, { EX: cacheTtlSeconds });

    return res.json({
      fromCache: false,
      name,
      message,
    });
  } catch (err) {
    const message = `Hello, ${name}!`;
    return res.json({
      fromCache: false,
      name,
      message,
      cacheError: err instanceof Error ? err.message : String(err),
    });
  }
});

export default router;

