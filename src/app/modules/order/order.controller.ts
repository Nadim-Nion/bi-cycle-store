import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body.order;

    const zodParsedData = orderValidationSchema.parse({
      email,
      product,
      quantity,
      totalPrice,
    });

    const result = await OrderServices.createOrderIntoDB(zodParsedData);

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
      stack: error.stack || 'No stack trace available',
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateTotalRevenue();

    // send the response to the client
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
      stack: error.stack || 'No stack trace available',
    });
  }
};

export const OrderControllers = {
  createOrder,
  calculateRevenue,
};
