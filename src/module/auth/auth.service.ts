import { StatusCodes } from 'http-status-codes';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register
const register = async (payload: IUser) => {
  if (payload.role === 'admin') {
    const isAdminExists = await User.findOne({ role: 'admin' });
    if (isAdminExists) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Admin already exists');
    }
  }

  const result = await User.create(payload);
  return result;
};
const login = async (payload: IUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password does not matched');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '30d' });
  return { token, user };
};

export const AuthService = {
  register,
  login,
};
