import { OrderStatusType } from "@/lib/constants";
import { Tool, ToolPackage } from "./tool.types";
import { User } from "./auth.types";
import { PaymentProof } from "./payment.types";

export interface Order {
  id: string;
  orderCode: string;
  userId: string;
  toolId: string;
  packageId: string;
  amount: number;
  currency: string;
  status: OrderStatusType;
  note?: string | null;
  keyDelivered?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  tool?: Tool;
  package?: ToolPackage;
  paymentProofs?: PaymentProof[];
}

export interface CreateOrderDto {
  packageId: string;
  note?: string;
}

export interface DeliverKeyDto {
  keyDelivered: string;
}

