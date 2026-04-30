import status from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser, TUserLogin } from './user.interface';
import { User } from './user.model';
import { createToken, verifyToken } from './user.utils';

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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.access_expires_in!,
  );

  // Generate the refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.refresh_expires_in!,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenFromDB = async (token: string) => {
  if (!token) {
    throw new AppError(
      status.UNAUTHORIZED,
      'You are not authorized to access this resource',
    );
  }

  // Check the token is valid or not
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  // Check the user is exists ot not
  const { email } = decoded;
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid Credentials');
  }

  // Check the user is blocked or not
  if (user && user.isDeleted) {
    throw new AppError(
      status.FORBIDDEN,
      'User is deleted. Please contact support.',
    );
  }

  // Check the user is active or not
  if (user && !user.isActive) {
    throw new AppError(
      status.FORBIDDEN,
      'User is not active. Please contact support.',
    );
  }

  // Generates Access Token after hitting /refresh-token endpoint
  const jwtPayload = {
    email: user?.email,
    role: user?.role ?? 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.access_expires_in as string,
  );

  return { accessToken };
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
  refreshTokenFromDB,
};
