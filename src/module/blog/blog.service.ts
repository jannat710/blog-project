import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  await result.populate('author');
  return result;
};

export const BlogService = {
  createBlog,
};
