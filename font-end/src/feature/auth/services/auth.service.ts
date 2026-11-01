import apiClient from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { AuthResponseData, LoginDto, RegisterDto, User } from "@/types/auth.types";

export const authService = {
  login: async (data: LoginDto): Promise<AuthResponseData> => {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>("/auth/login", data);
    if (!res.data.data) {
      throw new Error(res.data.message || "Đăng nhập thất bại");
    }
    return res.data.data;
  },

  register: async (data: RegisterDto): Promise<AuthResponseData> => {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>("/auth/register", data);
    if (!res.data.data) {
      throw new Error(res.data.message || "Đăng ký thất bại");
    }
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get<ApiResponse<User>>("/auth/me");
    if (!res.data.data) {
      throw new Error("Không thể lấy thông tin tài khoản");
    }
    return res.data.data;
  },
};

