import { Types } from 'mongoose';

export type TOrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';

export type TOrder = {
  user: Types.ObjectId;
  // email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
   status: TOrderStatus;
};
