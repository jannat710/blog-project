import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  await result.populate('author');
  return result;
};

const updateBlog = async (id: string, updateData: Partial<IBlog>) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (blog.author.toString() !== updateData.author?.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  blog.title = updateData.title || blog.title;
  blog.content = updateData.content || blog.content;

  await blog.save();

  await blog.populate('author');

  return blog;
};

//Delete a blog
const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
};
