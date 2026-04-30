import status from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser, TUserLogin } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  const { _id, name, email, role } = result;

  return {
    _id,
    name,
    email,
    role,
  };
};

const loginUserFromDB = async (payload: TUserLogin) => {
  const { email, password } = payload;

  // Find the user by email
  const exitingUser = await User.isUserExistsByEmail(email);

  if (!exitingUser) {
    throw new AppError(status.NOT_FOUND, 'User does not exist');
  }

  // Check the user is active or not
  if (exitingUser && !exitingUser.isActive) {
    throw new AppError(
      status.FORBIDDEN,
      'Your account is not active. Please contact support.',
    );
  }

  // Check the user is deleted or not
  if (exitingUser && exitingUser.isDeleted) {
    throw new AppError(
      status.FORBIDDEN,
      'Your account is deleted. Please contact support.',
    );
  }

  // Check the password is matched or not
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    exitingUser.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    email: exitingUser?.email,
    role: exitingUser?.role ?? 'user',
  };

  // Generate the access token
  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.access_expires_in!);

  // Generate the refresh token
   const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.refresh_expires_in!);

  return {
    accessToken,
    refreshToken
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
};
