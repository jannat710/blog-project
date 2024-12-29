import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import handleCatchAsync from '../../utils/handleCatchAsync';

// Create a User
const createUser = handleCatchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

export const userController = {
  createUser,
};
