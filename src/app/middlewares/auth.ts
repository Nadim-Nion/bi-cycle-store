import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import type { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Check whether the token is sent from the client
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Check whether the token is valid or not
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Check whether the user has the permission to access the resource
    const { email, role } = decoded;

    // check the user is exist or not
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Check the user is deleted or not
    const isUserDeleted = user?.isDeleted;

    if (isUserDeleted) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'User is deleted, please contact with admin',
      );
    }

    // Check the user is active or not
    const isUserActive = user?.isActive;

    if (!isUserActive) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'User is inactive, please contact with admin',
      );
    }

    /* // Check the user is blocked or not
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'User is blocked, please contact with admin',
      );
    } */

    // Check the password was changed after the JWT was issued
    /* if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    } */

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
