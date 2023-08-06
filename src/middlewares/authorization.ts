import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import pkg from 'jsonwebtoken/index.js';
const { JsonWebTokenError } = pkg;

import { BadRequestError } from '../entities/errors/BadRequestError.js';

import { NotAuthorizedError } from '../entities/errors/NotAuthorizedError.js';
import { ServerError } from '../entities/errors/ServerError.js';
import { users } from '../models/schema.js';

export const verifyAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    const notAuthorized = new NotAuthorizedError();
    return next(notAuthorized);
  }

  const token =
    authorization &&
    authorization.startsWith('Bearer') &&
    authorization.split(' ')[1];

  if (!token) {
    const notAuthorized = new NotAuthorizedError();
    return next(notAuthorized);
  }

  try {
    const decode: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await users.findById(decode.id, {
      _id: 1,
      nombre: 1,
      apellido: 1,
      email: 1,
    });

    if (!user) {
      const notAuthorized = new NotAuthorizedError();
      return next(notAuthorized);
    }

    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      const invalidSignature = new BadRequestError('Invalid Token Signature');
      return next(invalidSignature);
    }

    const serverError = new ServerError('DB Server Error');
    return next(serverError);
  }
};
