import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

// Create a User

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const result = await userService.createUser(payload);

    res.status(200).json({
      message: 'User created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
};
