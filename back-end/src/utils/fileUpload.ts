import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { env } from '../config/env.js';
import { ApiError } from './apiError.js';

export interface ProcessedImageResult {
  fileName: string;
  filePath: string;
  size: number;
}

/**
 * Validates, re-encodes, and saves an image buffer to secure disk storage as WebP.
 * Using sharp prevents malware disguised as image files by stripping unknown metadata
 * and reconstructing pixels into a clean WebP stream.
 */
export const processAndSaveProofImage = async (
  buffer: Buffer
): Promise<ProcessedImageResult> => {
  if (!buffer || buffer.length === 0) {
    throw ApiError.badRequest('Tệp ảnh không hợp lệ hoặc rỗng');
  }

  const fileName = `${crypto.randomUUID()}.webp`;
  const uploadDirectory = path.resolve(process.cwd(), env.UPLOAD_DIR);

  // Ensure upload directory exists
  await fs.mkdir(uploadDirectory, { recursive: true });

  const destinationPath = path.join(uploadDirectory, fileName);

  try {
    // Sharp decode & encode to WebP with dimensions sanity-check
    const processedBuffer = await sharp(buffer)
      .resize({
        width: 1920,
        height: 1920,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toBuffer();

    await fs.writeFile(destinationPath, processedBuffer);

    return {
      fileName,
      filePath: path.join(env.UPLOAD_DIR, fileName).replace(/\\/g, '/'),
      size: processedBuffer.length,
    };
  } catch (error) {
    throw ApiError.badRequest(
      'Tệp tin tải lên không phải là ảnh hợp lệ hoặc định dạng bị lỗi'
    );
  }
};
