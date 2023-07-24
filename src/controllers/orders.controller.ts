import { Request, Response, NextFunction } from 'express';
import { OrdersType, orders } from '../models/schema.js';

export const postOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderData: OrdersType = req.body;

  const postOrderResponse = await orders.create(orderData);

  console.log('postOrderResponse', postOrderResponse);
};
