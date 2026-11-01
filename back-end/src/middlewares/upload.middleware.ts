import multer from 'multer';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

const storage = multer.memoryStorage();

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

export const uploadPaymentProofMiddleware = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        ApiError.badRequest(
          `Định dạng tệp không được hỗ trợ (${file.mimetype}). Chỉ chấp nhận JPEG, PNG hoặc WEBP`
        )
      );
    }
    cb(null, true);
  },
});
