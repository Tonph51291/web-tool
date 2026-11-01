import { Router } from 'express';
import { PaymentsController } from './payments.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { uploadPaymentProofMiddleware } from '../../middlewares/upload.middleware.js';
import { validateData } from '../../middlewares/validate.middleware.js';
import { uploadLimiter } from '../../middlewares/rateLimiter.js';
import { submitProofSchema, reviewProofSchema } from './payments.validation.js';

const router = Router();

// Public: Get bank & USDT account instructions
router.get('/info', PaymentsController.getInstructions);

// Customer: Upload bill proof for manual admin review
router.post(
  '/proof',
  authenticate,
  uploadLimiter,
  uploadPaymentProofMiddleware.single('proofImage'),
  validateData(submitProofSchema),
  PaymentsController.submitProof
);

// Admin-only: Stream private payment proof image safely
router.get(
  '/proofs/view/:fileName',
  authenticate,
  authorize('ADMIN'),
  PaymentsController.viewProofImage
);

// Admin-only: Review & verify payment proof
router.patch(
  '/proofs/:id/review',
  authenticate,
  authorize('ADMIN'),
  validateData(reviewProofSchema),
  PaymentsController.reviewProof
);

export const paymentsRoutes = router;
