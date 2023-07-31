import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../entities/errors/BadRequestError.js';
import { ServerError } from '../entities/errors/ServerError.js';
import { users } from '../models/schema.js';

export const getUserByTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, complete } = req.query;
  console.log('token', token);

  if (!token) {
    return next(new BadRequestError('Token query is required'));
  }

  const decode: any = jwt.verify(token as string, process.env.JWT_SECRET!);

  try {
    const user = await users.findById(decode.id);

    if (!user) {
      return res.status(200).json({ data: null, message: 'No user Found!' });
    }

    console.log('user', user, complete);

    return res.status(200).json({
      data: complete
        ? user
        : { email: user.email, _id: user._id, token, nombre: user.nombre },
      message: 'Get user succesfully!',
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

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const user = await users
      .findById(userId)
      .select('nombre apellido direccion email telefono');

    console.log('user', user);
    if (!user) {
      return res.status(200).json({ data: null, message: 'No user Found!' });
    }

    return res
      .status(200)
      .json({ data: user, message: 'Get user succesfully!' });
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

export const updateUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const userDataToUpdate = req.body;

  try {
    const user = await users
      .findByIdAndUpdate(userId, { ...userDataToUpdate }, { new: true })
      .select(['email']);

    if (!user) {
      return res.status(200).json({ data: null, message: 'No user Found!' });
    }

    return res.status(200).json({
      data: { payload: { ...userDataToUpdate }, user: user },
      message: 'Update user data succesfully!',
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
