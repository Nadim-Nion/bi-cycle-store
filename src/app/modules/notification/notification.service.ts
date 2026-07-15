import { socketManager } from '../../../socket/socketManager';

const notifyPaymentSuccess = (userId: string, transactionId: string) => {
  socketManager.send(userId, {
    type: 'PAYMENT_SUCCESS',
    transactionId,
    message: 'Payment successful',
    timestamp: new Date().toISOString(),
  });
};

export const NotificationServices = {
  notifyPaymentSuccess,
};
