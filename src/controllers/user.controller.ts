import { Request, Response, NextFunction } from 'express';

import { ServerError } from '../entities/errors/ServerError.js';
import { users } from '../models/schema.js';

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
    const user = await users.findByIdAndUpdate(userId, { ...userDataToUpdate });

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
