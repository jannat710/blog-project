import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import handleCatchAsync from '../../utils/handleCatchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return handleCatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    },
  );
};

export default validateRequest;
