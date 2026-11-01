import { PaymentMethodType, PaymentStatusType } from "@/lib/constants";

export interface PaymentProof {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethodType;
  transactionRef?: string | null;
  proofImagePath: string;
  amountReported?: number | null;
  status: PaymentStatusType;
  adminNote?: string | null;
  verifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitPaymentProofDto {
  orderId: string;
  paymentMethod: PaymentMethodType;
  transactionRef?: string;
  proofImage?: File;
  amountReported?: number;
}

export interface ReviewPaymentDto {
  status: "VERIFIED" | "REJECTED";
  adminNote?: string;
}

