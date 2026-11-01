import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { globalLimiter } from './middlewares/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { toolsRoutes } from './modules/tools/tools.routes.js';
import { ordersRoutes } from './modules/orders/orders.routes.js';
import { paymentsRoutes } from './modules/payments/payments.routes.js';

export const createApp = (): Express => {
  const app = express();

  // 1. Security HTTP Headers with Helmet
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // 2. CORS configuration strictly allowing Frontend Next.js origin
  app.use(
    cors({
      origin: [env.FRONTEND_URL, 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // 3. Global Rate Limiter against fuzzing, bots & scanning tools
  app.use(globalLimiter);

  // 4. Request Parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  // 5. System Health Check
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'web-ban-tool-backend',
    });
  });

  // 6. Application Routes v1
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/tools', toolsRoutes);
  app.use('/api/v1/orders', ordersRoutes);
  app.use('/api/v1/payments', paymentsRoutes);

  // 7. Fallback 404 Handler
  app.use(notFoundHandler);

  // 8. Centralized Global Error Handler
  app.use(errorHandler);

  return app;
};
