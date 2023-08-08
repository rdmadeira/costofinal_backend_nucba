import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { users } from '../models/schema.js';
import { sendMailLinkPasswordOptions } from '../nodemailer/utils.js';
import transporter from '../nodemailer/config.js';
import { ServerError } from '../entities/errors/ServerError.js';
import { MongooseError } from 'mongoose';
import { BadRequestError } from '../entities/errors/BadRequestError.js';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, contrasena }: { email: string; contrasena: string } = req.body;

  const user = await users.findOne({ email: email });

  if (!user) {
    const notFoundUser = new BadRequestError('Email Not Found!', email);
    return next(notFoundUser);
  }
  const matchPw = await bcrypt.compare(contrasena, user.contrasena);

  if (!matchPw) {
    const datosIncorrectos = new BadRequestError('Datos Incorrectos!');
    return next(datosIncorrectos);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(200).json({
    data: { _id: user._id, token },
    message: 'Logged In!',
  });
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

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contrasena, salt);
  /* const hash = bcrypt.genSalt(10, async (err, salt) => {
    if (err) {
      return next(err);
    }
    return bcrypt.hash(contrasena, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      console.log('hash', hash);
      return hash;
    });
  }); */

  try {
    const upsertUser = await users.updateOne(
      { email: email },
      {
        $setOnInsert: {
          nombre,
          apellido,
          telefono,
          email,
          contrasena: hash,
          direccion: {
            calle,
            numero,
            localidad,
            CP,
            complemento,
          },
        },
      },
      { upsert: true, new: true, returnDocument: 'after' }
    );

    if (upsertUser.matchedCount > 0) {
      const userExists = new BadRequestError('Email already exists!', email);
      return next(userExists);
    }

    const token = jwt.sign(
      { id: upsertUser.upsertedId },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({
      data: {
        _id: upsertUser.upsertedId,
        token,
      },
      message: 'Succesfully Created Account!',
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

export const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await users.findOneAndUpdate(
      { email: email },
      { contrasena: hash },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: 'No user found!' });
    }

    return res.status(200).json({ message: 'Succesfully set new password' });
  } catch (error: MongooseError | any | unknown) {
    const updatedPwError = new ServerError(error.message);

    return next(updatedPwError);
  }
};

export const sendLinkToMailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.query;

  if (!email) return next(new BadRequestError(`email required`));

  const user = await users.findOne({ email: email });
  if (!user) return next(new BadRequestError(`email required`));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '60s',
  });

  if (!user || !user.nombre) {
    return next(new BadRequestError(`email not Found`));
  }
  console.log('user.nombre', user);

  const sendMailOptions = sendMailLinkPasswordOptions(
    email as string,
    user.nombre as string,
    token
  );

  transporter.sendMail(sendMailOptions, (err, info) => {
    if (err) {
      console.log('error', err);

      const nodeMailerError = new ServerError(err.message);
      return next(nodeMailerError);
    }

    console.log('info', info);

    return res.status(200).json({ message: 'Successfully mail sent' });
  });
};
