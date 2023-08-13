import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { users } from '../models/schema.js';
import { sendMailLinkPasswordOptions } from '../nodemailer/utils.js';
import transporter from '../nodemailer/config.js';
import { ServerError } from '../entities/errors/ServerError.js';
import { MongooseError } from 'mongoose';
import { BadRequestError } from '../entities/errors/BadRequestError.js';

import authServices from '../services/auth.services.js';
import { CustomError } from '../entities/errors/CustomError.js';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, contrasena }: { email: string; contrasena: string } = req.body;

  try {
    const user = await authServices.login(email, contrasena);

    return res.status(200).json({
      data: { _id: user._id, token: user.token },
      message: 'Logged In!',
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    nombre,
    apellido,
    telefono,
    email,
    contrasena,
    numero,
    calle,
    localidad,
    CP,
    complemento,
  } = req.body;
  try {
    const user = await authServices.signUp({
      nombre,
      apellido,
      telefono,
      email,
      contrasena,
      numero,
      calle,
      localidad,
      CP,
      complemento,
    });

    if (user.upsertUser.matchedCount > 0) {
      const userExists = new BadRequestError('Email already exists!', email);
      return next(userExists);
    }

    return res.status(200).json({
      data: {
        _id: user.upsertUser.upsertedId,
        token: user.token,
      },
      message: 'Succesfully Created Account!',
    });
  } catch (error) {
    console.log('error', error);

    return next(error);
  }
};

export const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await authServices.updatePassword(email, password);

    if (!user) {
      return res.status(400).json({ message: 'No user found!' });
    }

    return res.status(200).json({ message: 'Succesfully set new password' });
  } catch (error: CustomError | Error | any | unknown) {
    return next(error);
  }
};

export const sendLinkToMailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.query;

  if (!email) return next(new BadRequestError(`email required`));

  try {
    const user = await authServices.sendLinkToMail(email as string, next);

    console.log('user', user);
    return res.status(200).json({ message: 'Successfully mail sent' });
  } catch (error) {
    console.log('error', error);

    next(error);
  }
};
