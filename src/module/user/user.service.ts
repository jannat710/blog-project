import User from './user.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

export const UserService = {
  getAllUser,
};
