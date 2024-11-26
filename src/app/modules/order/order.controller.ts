import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body.order;

    const result = await OrderServices.createOrderIntoDB({
      email,
      product,
      quantity,
      totalPrice,
    });

    // send the response to the client
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
};
