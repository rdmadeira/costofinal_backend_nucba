import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

import { ServerError } from '../entities/errors/ServerError.js';
import { NotAuthorizedError } from '../entities/errors/NotAuthorizedError.js';

import { OrdersType, orders, products } from '../models/schema.js';

export const postOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderData = req.body;
  console.log('orderData', orderData);

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
    console.log('postOrderResponse', postOrderResponse);

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

export const getOrdersByTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization }: any = req.headers;

  const token =
    authorization &&
    authorization.startsWith('Bearer') &&
    authorization.split(' ')[1];

  if (!token) {
    return next(new NotAuthorizedError());
  }

  try {
    const decode: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userOrders = await orders
      .find({ user: decode.id })
      .populate('status')
      .populate({ path: 'items', populate: { path: 'product' } });

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
