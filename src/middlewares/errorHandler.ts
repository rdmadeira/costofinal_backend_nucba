import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../entities/errors/CustomError.js';

export const errorHandle = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction // Error handle tiene que tener los 4 parametros de funcion
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  return res.status(500).json({ message: 'Algo salió mal' });
};
