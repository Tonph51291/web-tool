import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from './apiError.js';

export const signToken = (payload: object, options?: SignOptions): string => {
  const signOpts: SignOptions = {
    expiresIn: (options?.expiresIn ?? env.JWT_EXPIRES_IN) as any,
    ...options,
  };
  return jwt.sign(payload, env.JWT_SECRET, signOpts);
};

export const verifyToken = <T extends object>(token: string): T => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as T;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw ApiError.unauthorized('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw ApiError.unauthorized('Token không hợp lệ hoặc đã bị thay đổi');
    }
    throw ApiError.unauthorized('Không thể xác thực quyền truy cập');
  }
};
