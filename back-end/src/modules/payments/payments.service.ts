import path from 'node:path';
import fs from 'node:fs/promises';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/apiError.js';
import { processAndSaveProofImage } from '../../utils/fileUpload.js';
import { SubmitProofInput, ReviewProofInput } from './payments.validation.js';

export class PaymentsService {
  /**
   * Returns banking and USDT payment instructions for clients
   */
  static getPaymentInstructions() {
    return {
      bankTransfer: {
        bankName: 'MB BANK (Ngân hàng Quân Đội)',
        accountNumber: '999988886666',
        accountName: 'NGUYEN VAN ADMIN',
        qrTemplateUrl: 'https://img.vietqr.io/image/MB-999988886666-compact2.png',
        memoFormat: 'ORD-[MA_DON_HANG]',
      },
      usdt: {
        network: 'USDT (TRC20)',
        walletAddress: 'TCZ5k48P29xWqN8bkmE23g6xLdY7Pqabcd',
        note: 'Vui lòng điền đúng mã TxID (Transaction Hash) sau khi hoàn tất giao dịch',
      },
    };
  }

  /**
   * Submits payment proof with re-encoded WebP bill image
   */
  static async submitProof(
    userId: string,
    userRole: string,
    input: SubmitProofInput,
    imageBuffer?: Buffer
  ) {
    if (!imageBuffer) {
      throw ApiError.badRequest('Vui lòng tải lên ảnh chụp bill chuyển khoản/giao dịch');
    }

    // 1. Verify Order existence and ownership
    const order = await prisma.order.findUnique({
      where: { id: input.orderId },
    });

    if (!order) {
      throw ApiError.notFound('Đơn hàng không tồn tại');
    }

    if (userRole !== 'ADMIN' && order.userId !== userId) {
      throw ApiError.forbidden('Bạn không sở hữu đơn hàng này');
    }

    if (order.status === OrderStatus.COMPLETED) {
      throw ApiError.badRequest('Đơn hàng này đã hoàn thành, không thể tải thêm bill thanh toán');
    }

    // 2. Process image via Sharp (resize, strip metadata, convert to WebP)
    const { filePath } = await processAndSaveProofImage(imageBuffer);

    // 3. Save proof to database
    const paymentProof = await prisma.paymentProof.create({
      data: {
        orderId: order.id,
        paymentMethod: input.paymentMethod,
        transactionRef: input.transactionRef || null,
        proofImagePath: filePath,
        amountReported: input.amountReported ?? order.amount,
        status: PaymentStatus.SUBMITTED,
      },
      include: {
        order: {
          select: {
            id: true,
            orderCode: true,
            amount: true,
            currency: true,
            status: true,
          },
        },
      },
    });

    return paymentProof;
  }

  /**
   * Resolves safe physical path of proof image for admin preview, strictly preventing path traversal
   */
  static async getProofSafePath(rawFileName: string): Promise<string> {
    const safeFileName = path.basename(rawFileName);
    const resolvedPath = path.resolve(process.cwd(), env.UPLOAD_DIR, safeFileName);
    const uploadRoot = path.resolve(process.cwd(), env.UPLOAD_DIR);

    if (!resolvedPath.startsWith(uploadRoot)) {
      throw ApiError.forbidden('Yêu cầu truy cập tệp tin không hợp lệ');
    }

    try {
      await fs.access(resolvedPath);
      return resolvedPath;
    } catch {
      throw ApiError.notFound('Không tìm thấy tệp ảnh đối soát bill');
    }
  }

  /**
   * Admin reviews payment proof and atomically updates order status
   */
  static async reviewProof(proofId: string, input: ReviewProofInput) {
    const proof = await prisma.paymentProof.findUnique({
      where: { id: proofId },
      include: { order: true },
    });

    if (!proof) {
      throw ApiError.notFound('Không tìm thấy thông tin đối soát thanh toán');
    }

    // Atomic transaction: Update proof and Order status
    const result = await prisma.$transaction(async (tx) => {
      const updatedProof = await tx.paymentProof.update({
        where: { id: proofId },
        data: {
          status: input.status,
          adminNote: input.adminNote,
          verifiedAt: new Date(),
        },
      });

      let updatedOrder = proof.order;
      if (input.status === PaymentStatus.VERIFIED) {
        updatedOrder = await tx.order.update({
          where: { id: proof.orderId },
          data: { status: OrderStatus.PAID },
        });
      }

      return { proof: updatedProof, order: updatedOrder };
    });

    return result;
  }
}
