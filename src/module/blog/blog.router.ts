import { Router } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../app/middlewares/auth';

const blogRouter = Router();

// Create Blog route
blogRouter.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.blogValidationSchema),
  BlogController.createBlog,
);

// Update Blog route
blogRouter.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidation.blogValidationSchema),
  BlogController.updateBlog,
);

// Delete a blog
blogRouter.delete('/:id', auth('user'), BlogController.deleteBlog);

//Get all blogs
blogRouter.get('/', BlogController.getAllBlogs);

export default blogRouter;
