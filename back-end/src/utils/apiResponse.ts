import { Response } from 'express';

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data?: T,
    message = 'Thành công',
    statusCode = 200
  ): Response {
    const payload: ApiResponsePayload<T> = {
      success: true,
      statusCode,
      message,
      data,
    };
    return res.status(statusCode).json(payload);
  }

  static created<T>(
    res: Response,
    data?: T,
    message = 'Tạo mới thành công'
  ): Response {
    return this.success(res, data, message, 201);
  }

  static error(
    res: Response,
    message = 'Đã có lỗi xảy ra',
    statusCode = 500,
    errors?: unknown
  ): Response {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      ...(errors ? { errors } : {}),
    });
  }
}
