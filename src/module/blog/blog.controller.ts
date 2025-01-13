import { StatusCodes } from 'http-status-codes';
import handleCatchAsync from '../../utils/handleCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { BlogService } from './blog.service';

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

export const BlogController = {
  createBlog,
};
