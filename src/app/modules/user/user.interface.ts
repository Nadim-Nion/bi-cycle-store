/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUserRole = 'user' | 'admin';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
  isActive?: boolean;
  isDeleted?: boolean;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export interface UserModelType extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
