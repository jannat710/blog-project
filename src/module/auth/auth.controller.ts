import { Request, Response } from 'express';
import handleCatchAsync from '../../utils/handleCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

const register = handleCatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    status: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const AuthControllers = {
  register,
};