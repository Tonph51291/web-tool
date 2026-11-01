import { Request, Response, NextFunction } from 'express';
import { PaymentsService } from './payments.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';

export class PaymentsController {
  static getInstructions(_req: Request, res: Response, next: NextFunction) {
    try {
      const instructions = PaymentsService.getPaymentInstructions();
      return ApiResponse.success(res, instructions, 'Lấy thông tin tài khoản thanh toán thành công');
    } catch (error) {
      next(error);
    }
  }

  static async submitProof(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const userRole = req.user!.role;
      const fileBuffer = req.file?.buffer;

      const result = await PaymentsService.submitProof(
        userId,
        userRole,
        req.body,
        fileBuffer
      );

      return ApiResponse.created(
        res,
        result,
        'Tải ảnh bill thanh toán thành công, vui lòng chờ Admin đối soát'
      );
    } catch (error) {
      next(error);
    }
  }

  static async reviewProof(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await PaymentsService.reviewProof(id, req.body);
      return ApiResponse.success(res, result, 'Đối soát thanh toán hoàn tất');
    } catch (error) {
      next(error);
    }
  }

  static async viewProofImage(req: Request, res: Response, next: NextFunction) {
    try {
      const fileName = req.params.fileName as string;
      const safePath = await PaymentsService.getProofSafePath(fileName);

      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.setHeader('X-Content-Type-Options', 'nosniff');

      return res.sendFile(safePath);
    } catch (error) {
      next(error);
    }
  }
}
