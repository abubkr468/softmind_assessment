import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger';

import { authRoutes, cacheRoutes, taskRoutes, userRoutes } from './routes';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'server' });
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api', cacheRoutes);
  app.use('/api', authRoutes);
  app.use('/api', userRoutes);
  app.use('/api', taskRoutes);

  return app;
}

