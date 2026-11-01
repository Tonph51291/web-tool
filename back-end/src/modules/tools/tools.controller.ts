import { Request, Response, NextFunction } from 'express';
import { ToolsService } from './tools.service.js';
import { ApiResponse } from '../../utils/apiResponse.js';

export class ToolsController {
  static async listTools(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdmin = req.user?.role === 'ADMIN';
      const onlyActive = !isAdmin || req.query.all !== 'true';
      const tools = await ToolsService.listTools(onlyActive);
      return ApiResponse.success(res, tools, 'Lấy danh sách tool thành công');
    } catch (error) {
      next(error);
    }
  }

  static async getTool(req: Request, res: Response, next: NextFunction) {
    try {
      const idOrSlug = req.params.idOrSlug as string;
      const isAdmin = req.user?.role === 'ADMIN';
      const tool = await ToolsService.getToolByIdOrSlug(idOrSlug, !isAdmin);
      return ApiResponse.success(res, tool, 'Lấy thông tin tool thành công');
    } catch (error) {
      next(error);
    }
  }

  static async createTool(req: Request, res: Response, next: NextFunction) {
    try {
      const tool = await ToolsService.createTool(req.body);
      return ApiResponse.created(res, tool, 'Tạo tool mới thành công');
    } catch (error) {
      next(error);
    }
  }

  static async updateTool(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const tool = await ToolsService.updateTool(id, req.body);
      return ApiResponse.success(res, tool, 'Cập nhật tool thành công');
    } catch (error) {
      next(error);
    }
  }

  static async deleteTool(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await ToolsService.deleteTool(id);
      return ApiResponse.success(res, null, 'Xóa tool thành công');
    } catch (error) {
      next(error);
    }
  }

  static async createPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const pkg = await ToolsService.createPackage(req.body);
      return ApiResponse.created(res, pkg, 'Thêm gói bản quyền thành công');
    } catch (error) {
      next(error);
    }
  }

  static async updatePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const pkg = await ToolsService.updatePackage(id, req.body);
      return ApiResponse.success(res, pkg, 'Cập nhật gói bản quyền thành công');
    } catch (error) {
      next(error);
    }
  }

  static async deletePackage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await ToolsService.deletePackage(id);
      return ApiResponse.success(res, null, 'Xóa gói bản quyền thành công');
    } catch (error) {
      next(error);
    }
  }
}
