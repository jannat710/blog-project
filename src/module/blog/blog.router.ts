import { Router } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../app/middlewares/auth';

const blogRouter = Router();
blogRouter.post(
  '/blogs',
  auth('user'),
  validateRequest(BlogValidation.blogValidationSchema),
  BlogController.createBlog,
);

export default blogRouter;
