import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { UserValidation } from './userValidation';

const userRouter = Router();
userRouter.post(
  '/auth/register',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

export default userRouter;
