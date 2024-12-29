/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handlerZodError } from '../../errors/handlerZodError';
import { handleCastError } from '../../errors/handleCastError';
import { handleValidationError } from '../../errors/handleValidationError';
import { handlerDuplicateError } from '../../errors/handlerDuplicateError';
import { handleGenericError } from '../../errors/handleGenericError';
type TErrorResponse = {
  success: boolean;
  message: string;
  error: any;
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handlerZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handlerDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};
