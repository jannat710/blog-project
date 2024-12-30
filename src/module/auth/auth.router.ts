import { Router } from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { UserValidation } from '../user/userValidation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.register,
);

export default authRouter;
