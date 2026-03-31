import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger';

import { authRoutes, cacheRoutes, taskRoutes, userRoutes } from './routes';

export function createApp() {
  const app = express();
  const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
      },
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

