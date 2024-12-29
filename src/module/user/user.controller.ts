import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';

// Create a User

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const result = await userService.createUser(payload);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
