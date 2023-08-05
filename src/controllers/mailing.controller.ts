import { Request, Response, NextFunction } from 'express';
import transporter from '../nodemailer/config.js';

import { ServerError } from '../entities/errors/ServerError.js';

export const mailingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mailData = req.body;
  console.log('mailData', mailData);
};
