import { Schema, model } from 'mongoose';
import { USER_ROLES_ARR, USER_ROLES_OBJ } from './user.constant';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // hide password by default
    },
    role: {
      type: String,
      enum: USER_ROLES_ARR,
      default: USER_ROLES_OBJ.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model('User', userSchema);