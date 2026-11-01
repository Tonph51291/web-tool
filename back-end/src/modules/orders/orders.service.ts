import crypto from 'node:crypto';
import { OrderStatus } from '@prisma/client';
import { prisma } from '../../config/database.js';
import { ApiError } from '../../utils/apiError.js';
import {
  CreateOrderInput,
  UpdateOrderStatusInput,
  OrderQueryInput,
} from './orders.validation.js';

export class OrdersService {
  /**
   * Generates a readable unique Order Code like ORD-20261021-9F3A
   */
  private static generateOrderCode(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    return `ORD-${dateStr}-${randomHex}`;
  }

  /**
   * Creates an order strictly verifying price and active status from the database.
   * Client NEVER supplies or dictates the price.
   */
  static async createOrder(userId: string, input: CreateOrderInput) {
    // 1. Verify Tool exists and is active
    const tool = await prisma.tool.findUnique({
      where: { id: input.toolId },
    });

    if (!tool || !tool.isActive) {
      throw ApiError.badRequest('Tool phần mềm không tồn tại hoặc đã tạm dừng cung cấp');
    }

    // 2. Verify Package exists, belongs to the tool, and is active
    const pkg = await prisma.toolPackage.findUnique({
      where: { id: input.packageId },
    });

    if (!pkg || pkg.toolId !== tool.id || !pkg.isActive) {
      throw ApiError.badRequest('Gói bản quyền không hợp lệ hoặc không thuộc về tool này');
    }

    // 3. Absolute price enforcement: Fetch strictly from DB
    const authoritativePrice = pkg.price;
    const currency = pkg.currency;

    const orderCode = this.generateOrderCode();

    const order = await prisma.order.create({
      data: {
        orderCode,
        userId,
        toolId: tool.id,
        packageId: pkg.id,
        amount: authoritativePrice,
        currency,
        status: OrderStatus.PENDING_PAYMENT,
        note: input.note,
      },
      include: {
        tool: {
          select: {
            id: true,
            name: true,
            slug: true,
            iconUrl: true,
          },
        },
        package: {
          select: {
            id: true,
            name: true,
            durationDays: true,
            price: true,
            currency: true,
          },
        },
      },
    });

    return order;
  }

  static async getUserOrders(userId: string, query: OrderQueryInput) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(query.status ? { status: query.status } : {}),
    };

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          tool: {
            select: { id: true, name: true, slug: true, iconUrl: true },
          },
          package: {
            select: { id: true, name: true, durationDays: true, price: true, currency: true },
          },
          paymentProofs: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      }),
    ]);

    return {
      items: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getOrderById(orderId: string, currentUserId: string, currentUserRole: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        tool: true,
        package: true,
        paymentProofs: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!order) {
      throw ApiError.notFound('Không tìm thấy đơn hàng yêu cầu');
    }

    if (currentUserRole !== 'ADMIN' && order.userId !== currentUserId) {
      throw ApiError.forbidden('Bạn không có quyền xem thông tin đơn hàng này');
    }

    return order;
  }

  static async listAllOrders(query: OrderQueryInput) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.status ? { status: query.status } : {}),
    };

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          tool: {
            select: { id: true, name: true, slug: true },
          },
          package: {
            select: { id: true, name: true, durationDays: true, price: true, currency: true },
          },
          paymentProofs: {
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
    ]);

    return {
      items: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async updateOrderStatus(orderId: string, input: UpdateOrderStatusInput) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw ApiError.notFound('Đơn hàng không tồn tại');
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: input.status,
        keyDelivered: input.keyDelivered !== undefined ? input.keyDelivered : undefined,
        note: input.note !== undefined ? input.note : undefined,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        tool: { select: { id: true, name: true } },
        package: { select: { id: true, name: true } },
      },
    });

    return updated;
  }
}
