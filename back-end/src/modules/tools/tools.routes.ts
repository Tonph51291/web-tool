import { Router } from 'express';
import { ToolsController } from './tools.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validateData } from '../../middlewares/validate.middleware.js';
import {
  createToolSchema,
  updateToolSchema,
  createPackageSchema,
  updatePackageSchema,
} from './tools.validation.js';

const router = Router();

// Public routes (anyone can browse tools)
router.get('/', ToolsController.listTools);
router.get('/:idOrSlug', ToolsController.getTool);

// Admin-only management routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validateData(createToolSchema),
  ToolsController.createTool
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validateData(updateToolSchema),
  ToolsController.updateTool
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  ToolsController.deleteTool
);

// Tool package management routes
router.post(
  '/packages',
  authenticate,
  authorize('ADMIN'),
  validateData(createPackageSchema),
  ToolsController.createPackage
);

router.put(
  '/packages/:id',
  authenticate,
  authorize('ADMIN'),
  validateData(updatePackageSchema),
  ToolsController.updatePackage
);

router.delete(
  '/packages/:id',
  authenticate,
  authorize('ADMIN'),
  ToolsController.deletePackage
);

export const toolsRoutes = router;
