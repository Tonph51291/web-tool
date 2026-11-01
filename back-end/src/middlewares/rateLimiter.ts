import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/apiError.js';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per 15 minutes
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (_req, _res, next) => {
    next(
      ApiError.tooManyRequests(
        'Bạn đã gửi quá nhiều yêu cầu đến hệ thống. Vui lòng thử lại sau 15 phút.'
      )
    );
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register attempts
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      ApiError.tooManyRequests(
        'Phát hiện quá nhiều lần thử đăng nhập/đăng ký. Vui lòng thử lại sau 15 phút.'
      )
    );
  },
});

export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Max 20 file uploads per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      ApiError.tooManyRequests(
        'Quá nhiều tệp tin được tải lên trong thời gian ngắn. Vui lòng thử lại sau.'
      )
    );
  },
});
