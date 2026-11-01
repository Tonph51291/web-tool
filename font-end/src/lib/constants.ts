export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ORDER_STATUS = {
  PENDING_PAYMENT: "PENDING_PAYMENT",
  PAID: "PAID",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LABELS: Record<OrderStatusType, { label: string; color: string }> = {
  PENDING_PAYMENT: { label: "Chờ thanh toán", color: "warning" },
  PAID: { label: "Đã thanh toán (Chờ giao key)", color: "info" },
  COMPLETED: { label: "Hoàn tất (Đã giao key)", color: "success" },
  CANCELLED: { label: "Đã hủy", color: "danger" },
};

export const PAYMENT_METHODS = {
  BANK_TRANSFER: "BANK_TRANSFER",
  USDT: "USDT",
} as const;

export type PaymentMethodType = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export const PAYMENT_STATUS = {
  SUBMITTED: "SUBMITTED",
  VERIFIED: "VERIFIED",
  REJECTED: "REJECTED",
} as const;

export type PaymentStatusType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_LABELS: Record<PaymentStatusType, { label: string; color: string }> = {
  SUBMITTED: { label: "Chờ xác thực", color: "warning" },
  VERIFIED: { label: "Đã xác thực", color: "success" },
  REJECTED: { label: "Từ chối", color: "danger" },
};

