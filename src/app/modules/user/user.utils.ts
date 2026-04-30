import jwt, { SignOptions } from 'jsonwebtoken';

type TJwtPayload = {
  email: string;
  role: string;
};

export const createToken = (
  jwtPayload: TJwtPayload,
  secretKey: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn,
  } as SignOptions);
};
