import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import multer from 'multer';
import { ZodError } from 'zod';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { env } from '../config/env.js';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(ApiError.notFound(`Tuyến đường ${req.method} ${req.originalUrl} không tồn tại trên hệ thống`));
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // If headers already sent, delegate to default Express handler
  if (res.headersSent) {
    return _next(err as Error);
  }

  // 1. ApiError instances (Application-controlled errors)
  if (err instanceof ApiError) {
    ApiResponse.error(res, err.message, err.statusCode, err.errors);
    return;
  }

  // 2. Zod Validation Errors
  if (err instanceof ZodError) {
    const errorDetails = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    ApiResponse.error(res, 'Dữ liệu đầu vào không hợp lệ', 400, errorDetails);
    return;
  }

  // 3. Multer Errors (Upload limits, wrong fields)
  if (err instanceof multer.MulterError) {
    let message = 'Lỗi trong quá trình tải tệp tin';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = `Dung lượng tệp vượt quá giới hạn tối đa (${env.MAX_FILE_SIZE_MB}MB)`;
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Trường tệp tin không đúng định dạng cho phép';
    }
    ApiResponse.error(res, message, 400);
    return;
  }

  // 4. Prisma ORM Errors (Never expose SQL queries or database structures)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target)
        ? (err.meta?.target as string[]).join(', ')
        : 'dữ liệu';
      ApiResponse.error(res, `Xung đột dữ liệu: ${target} đã tồn tại trong hệ thống`, 409);
      return;
    }
    if (err.code === 'P2025') {
      ApiResponse.error(res, 'Bản ghi yêu cầu không tồn tại hoặc đã bị xóa', 404);
      return;
    }
    ApiResponse.error(res, 'Thao tác cơ sở dữ liệu không thành công', 400);
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    ApiResponse.error(res, 'Dữ liệu cơ sở dữ liệu không hợp lệ', 400);
    return;
  }

  // 5. Unhandled / Internal Server Errors
  const errorObj = err instanceof Error ? err : new Error(String(err));

  // Log full error details for administrators/developers
  console.error(`[Unhandled Server Error] ${req.method} ${req.url}:`, {
    message: errorObj.message,
    stack: errorObj.stack,
  });

  const message =
    env.NODE_ENV === 'production'
      ? 'Đã có lỗi xảy ra từ máy chủ, vui lòng liên hệ ban quản trị'
      : errorObj.message;

  const errors = env.NODE_ENV === 'development' ? { stack: errorObj.stack } : undefined;

  ApiResponse.error(res, message, 500, errors);
};
