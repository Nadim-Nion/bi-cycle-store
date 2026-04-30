import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

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

export const verifyToken = (token: string, secretKey: string) => {
  return jwt.verify(token, secretKey) as JwtPayload;
};
