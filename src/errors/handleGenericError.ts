/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleGenericError = (err: any, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    status: false,
    message: err.message,
    statusCode: StatusCodes.BAD_REQUEST,
    error: err,
    stack: err.stack || 'No stack trace available',
  });
};