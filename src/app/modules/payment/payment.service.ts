import config from '../../config';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';

const store_id = config.ssl_commerz_store_id!;
const store_passwd = config.ssl_commerz_store_password!;
const is_live = false; //true for live, false for sandbox

const createPayment = async (payload: TPayment) => {
  return await Payment.create(payload);
};

const initiatePayment = async () => {};

export const PaymentServices = {
  createPayment,
  initiatePayment,
};
