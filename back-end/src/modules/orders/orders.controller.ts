import { Request, Response, NextFunction } from 'express';
import { OrdersService } from './orders.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { OrderQueryInput } from './orders.validation.js';

export class OrdersController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const order = await OrdersService.createOrder(userId, req.body);
      return ApiResponse.created(res, order, 'Tạo đơn hàng thành công, vui lòng thanh toán');
    } catch (error) {
      next(error);
    }
  }

  static async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const query = req.query as unknown as OrderQueryInput;
      const result = await OrdersService.getUserOrders(userId, query);
      return ApiResponse.success(res, result, 'Lấy danh sách đơn hàng thành công');
    } catch (error) {
      next(error);
    }
  }

  static async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const userId = req.user!.id;
      const role = req.user!.role;
      const order = await OrdersService.getOrderById(id, userId, role);
      return ApiResponse.success(res, order, 'Lấy chi tiết đơn hàng thành công');
    } catch (error) {
      next(error);
    }
  }

  static async listAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as OrderQueryInput;
      const result = await OrdersService.listAllOrders(query);
      return ApiResponse.success(res, result, 'Lấy danh sách đơn hàng toàn hệ thống');
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const order = await OrdersService.updateOrderStatus(id, req.body);
      return ApiResponse.success(res, order, 'Cập nhật trạng thái đơn hàng thành công');
    } catch (error) {
      next(error);
    }
  }
}
