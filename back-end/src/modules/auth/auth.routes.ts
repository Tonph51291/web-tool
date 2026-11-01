import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateData } from '../../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from './auth.validation.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post(
  '/register',
  authLimiter,
  validateData(registerSchema),
  AuthController.register
);

router.post(
  '/login',
  authLimiter,
  validateData(loginSchema),
  AuthController.login
);

router.post('/logout', AuthController.logout);

router.get('/me', authenticate, AuthController.me);

export const authRoutes = router;
