import { config as dotenvConfig } from 'dotenv';

import { createApp } from './app';
import { connectMongo } from './db';
import { connectRedis } from './redis';

dotenvConfig();

async function start() {
  try {
    await connectMongo();
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }

  try {
    await connectRedis();
  } catch (err) {
    console.error('Redis connection failed:', err);
  }

  const port = Number(process.env.PORT || 5001);
  const app = createApp();

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

