import { Router } from 'express';
import { OrdersController } from './orders.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validateData } from '../../middlewares/validate.middleware.js';
import {
  createOrderSchema,
  updateOrderStatusSchema,
  orderQuerySchema,
} from './orders.validation.js';

const router = Router();

// Customer creates an order (strict price calculation inside service)
router.post(
  '/',
  authenticate,
  validateData(createOrderSchema),
  OrdersController.createOrder
);

// Customer lists their personal orders
router.get(
  '/my',
  authenticate,
  validateData({ query: orderQuerySchema }),
  OrdersController.getMyOrders
);

// Admin lists all orders across system
router.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  validateData({ query: orderQuerySchema }),
  OrdersController.listAllOrders
);

// Get single order detail (owner or admin)
router.get('/:id', authenticate, OrdersController.getOrder);

// Admin updates order status strictly
router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN'),
  validateData(updateOrderStatusSchema),
  OrdersController.updateOrderStatus
);

export const ordersRoutes = router;
