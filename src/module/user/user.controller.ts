import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import handleCatchAsync from '../../utils/handleCatchAsync';
import { UserService } from './user.service';

// Get User
const getAllUser = handleCatchAsync(async (req, res) => {
  const result = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users getting successfully',
    data: result,
  });
});

export const userController = {
  getAllUser,
};
