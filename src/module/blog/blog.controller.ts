import { StatusCodes } from 'http-status-codes';
import handleCatchAsync from '../../utils/handleCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { BlogService } from './blog.service';
import AppError from '../../errors/AppError';

//Create Blog
const createBlog = handleCatchAsync(async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  const result = await BlogService.createBlog({
    title,
    content,
    author,
    isPublished: true,
  });

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// Update Blog
const updateBlog = handleCatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  if (!author) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to update this blog',
    );
  }

  const result = await BlogService.updateBlog(id, { title, content, author });

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Delete Blog
const deleteBlog = handleCatchAsync(async (req: Request, res: Response) => {
  const blogId = req.params.id;
  const author = req.user?._id;

  if (!author) {
    return res.status(400).json({
      success: false,
      message: 'User not authenticated or invalid user',
    });
  }

  await BlogService.deleteBlog(blogId, author);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    data: {},
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
};
