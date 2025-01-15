import { NextFunction, Request, Response } from 'express';
import handleCatchAsync from '../../utils/handleCatchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../../module/user/user.model';

const auth = (...requiredRoles: string[]) => {
  return handleCatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: 'You are not authorized!' });
      }
      const decoded = jwt.verify(token, 'secret') as JwtPayload;
      const { role, email } = decoded;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'This user is not found!' });
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        return res
          .status(403)
          .json({ success: false, message: 'You are not authorized' });
      }
      req.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
      next();
    },
  );
};

export default auth;
