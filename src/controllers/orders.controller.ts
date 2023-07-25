import { populate } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import { ServerError } from '../entities/errors/ServerError.js';
import { OrdersType, orders, products } from '../models/schema.js';

export const postOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderData: OrdersType = req.body;

  try {
    const postOrderResponse = await (
      await orders.create(orderData)
    ).populate({
      path: 'items',
      populate: {
        path: 'product',
      },
    });

    if (!postOrderResponse._id) {
      return next(new Error('Failed to create order'));
    }

    return res
      .status(200)
      .json({ data: postOrderResponse, message: ' Succesfully created Order' });
  } catch (error) {
    console.log('error', error);
    let serviceError;
    if (error instanceof Error) {
      serviceError = new ServerError(error.message);
    } else {
      serviceError = new ServerError('Error in service CRUD operations');
    }

    return next(serviceError);
  }
};

export const getOrdersByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const userOrders = await orders.find({ user: userId });

    res.json({
      data: userOrders,
      message:
        userOrders.length < 1
          ? 'No orders found by this user'
          : 'Orders Found Correctly',
    });
  } catch (error) {
    console.log('error', error);
    let serviceError;
    if (error instanceof Error) {
      serviceError = new ServerError(error.message);
    } else {
      serviceError = new ServerError('Error in service CRUD operations');
    }

    return next(serviceError);
  }
};

export const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orderId } = req.params;

  try {
    const order = await orders.find({ _id: orderId });

    res.json({
      data: order,
      message: order.length < 1 ? 'No order found' : 'Order Found Correctly',
    });
  } catch (error) {
    console.log('error', error);

    let serviceError;

    if (error instanceof Error) {
      serviceError = new ServerError(error.message);
    } else {
      serviceError = new ServerError('Error in service CRUD operations');
    }

    return next(serviceError);
  }
};
