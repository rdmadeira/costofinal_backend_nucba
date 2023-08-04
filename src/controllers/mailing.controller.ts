import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../entities/errors/ServerError.js';

const mailingRouter = (req: Request, res: Response, next: NextFunction) => {
  const mailData = req.body;
};

export default mailingRouter;
