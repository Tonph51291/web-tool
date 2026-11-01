export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: Record<string, string[]> | unknown;
}

