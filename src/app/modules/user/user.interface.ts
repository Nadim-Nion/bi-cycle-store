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

export interface UserModelType extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
