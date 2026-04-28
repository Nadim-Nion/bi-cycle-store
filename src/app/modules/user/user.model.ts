import { Schema, model } from 'mongoose';
import { USER_ROLES_ARR, USER_ROLES_OBJ } from './user.constant';
import { TUser, UserModelType } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModelType>(
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
  },
);

// Pre save middleware/hook: will work on create() or save()
userSchema.pre('save', async function () { //next
  // const user = this;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
//   next();
});

// Post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Check the user is existed or not
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

// Check the password is matched or not
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Check the password was changed after the JWT was issued (token should be invalidated)
userSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModelType>('User', userSchema);
