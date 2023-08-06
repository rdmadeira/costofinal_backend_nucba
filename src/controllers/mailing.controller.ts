import { Request, Response, NextFunction } from 'express';
import { MailData } from '../models/dto/mailDataDto.js';
import transporter from '../nodemailer/config.js';

import { users } from '../models/schema.js';

import { sendMail } from '../nodemailer/utils.js';

import { ServerError } from '../entities/errors/ServerError.js';
import { BadRequestError } from '../entities/errors/BadRequestError.js';
import mongoose from 'mongoose';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

export const mailingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mailData: MailData = req.body;
  try {
    const user = await users.findById(mailData.user);

    if (!user) {
      return next(new BadRequestError('User Not Found'));
    }
    try {
      const sendMailOptions = sendMail({ ...mailData, email: user.email });

      transporter.sendMail(
        sendMailOptions,
        (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
          if (error) {
            console.log('error', error);
            return next(error);
          }
          if (info) {
            console.log('info', info);
            return res.status(200).json({ data: info });
          }
        }
      );
    } catch (error) {
      console.log('errorerror', error);
    }
  } catch (error: Error | any | unknown) {
    const findByIdError = new ServerError(
      (error.message as string) ||
        'Error al acceder al usuario en la base de datos'
    );

    return next(findByIdError);
  }
};
