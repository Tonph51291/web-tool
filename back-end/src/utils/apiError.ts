export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errors?: unknown;

  constructor(statusCode: number, message: string, errors?: unknown, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message = 'Dữ liệu yêu cầu không hợp lệ', errors?: unknown): ApiError {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = 'Yêu cầu đăng nhập hoặc phiên làm việc đã hết hạn'): ApiError {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Bạn không có quyền thực hiện hành động này'): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message = 'Tài nguyên yêu cầu không tồn tại'): ApiError {
    return new ApiError(404, message);
  }

  static conflict(message = 'Dữ liệu đã tồn tại hoặc xảy ra xung đột'): ApiError {
    return new ApiError(409, message);
  }

  static unprocessableEntity(message = 'Dữ liệu không thể xử lý', errors?: unknown): ApiError {
    return new ApiError(422, message, errors);
  }

  static tooManyRequests(message = 'Quá nhiều yêu cầu, vui lòng thử lại sau'): ApiError {
    return new ApiError(429, message);
  }

  static internal(message = 'Lỗi máy chủ nội bộ'): ApiError {
    return new ApiError(500, message, undefined, false);
  }
}
