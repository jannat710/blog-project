import { Response } from 'express';

type TSuccessResponse<T> = {
  success?: boolean;
  statusCode: number;
  message: string;
  data: T | T[] | null;
  token?: string;
};

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
    token: data.token,
  });
};

export default sendResponse;
