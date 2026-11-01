import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiError } from '../utils/apiError.js';

interface RequestValidationSchema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

/**
 * Generic middleware to validate incoming request data using Zod.
 * Can receive either a single schema for req.body or a composite schema for { body, query, params }.
 */
export const validateData = (
  schema: AnyZodObject | RequestValidationSchema
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if ('body' in schema || 'query' in schema || 'params' in schema) {
        const composite = schema as RequestValidationSchema;
        if (composite.body) {
          req.body = await composite.body.parseAsync(req.body);
        }
        if (composite.query) {
          req.query = await composite.query.parseAsync(req.query);
        }
        if (composite.params) {
          req.params = await composite.params.parseAsync(req.params);
        }
      } else {
        req.body = await (schema as AnyZodObject).parseAsync(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return next(ApiError.badRequest('Dữ liệu yêu cầu không hợp lệ', errorMessages));
      }
      next(error);
    }
  };
};
