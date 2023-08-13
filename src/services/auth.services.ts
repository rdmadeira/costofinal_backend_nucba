import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../nodemailer/config.js';
import { sendMailLinkPasswordOptions } from '../nodemailer/utils.js';

import { users } from '../models/schema.js';

import { ServerError } from '../entities/errors/ServerError.js';
import { MongooseError } from 'mongoose';
import { BadRequestError } from '../entities/errors/BadRequestError.js';

const login = async (email: string, contrasena: string) => {
  try {
    const user = await users.findOne({ email: email });

    if (!user) {
      const notFoundUser = new BadRequestError('Email Not Found!', email);
      throw notFoundUser;
    }
    const matchPw = await bcrypt.compare(contrasena, user.contrasena);

    if (!matchPw) {
      const datosIncorrectos = new BadRequestError(
        'Datos Incorrectos!',
        'Password incorrecto!'
      );
      throw datosIncorrectos;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { ...user, token };
  } catch (error: MongooseError | Error | any | unknown) {
    if (error instanceof MongooseError) {
      const serviceError = new ServerError(`${error.name} - ${error.message}`);
      throw serviceError;
    } else if (error instanceof BadRequestError) {
      throw error;
    } else {
      const err = new ServerError(
        'Error in DB connection service in users.find'
      );

      throw err;
    }
  }
};

const signUp = async ({
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
}: {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  contrasena: string;
  numero: string;
  calle: string;
  localidad: string;
  CP: string;
  complemento: string;
}) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);

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

    const token = jwt.sign(
      { id: upsertUser.upsertedId },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return { upsertUser, token };
  } catch (error: MongooseError | Error | any | unknown) {
    if (error instanceof MongooseError) {
      const serviceError = new ServerError(`${error.name} - ${error.message}`);
      throw serviceError;
    } else if (error instanceof BadRequestError) {
      throw error;
    } else {
      const err = new ServerError(
        'Error in DB connection service in users.find'
      );
      throw err;
    }
  }
};

const updatePassword = async (email: string, password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await users.findOneAndUpdate(
      { email: email },
      { contrasena: hash },
      { new: true }
    );
    return user;
  } catch (error) {
    if (error instanceof MongooseError) {
      const serviceError = new ServerError(`${error.name} - ${error.message}`);
      throw serviceError;
    } else if (error instanceof BadRequestError) {
      throw error;
    } else {
      const err = new ServerError(
        'Error in DB connection service in users.find'
      );
      throw err;
    }
  }
};

const sendLinkToMail = async (email: string, next: NextFunction) => {
  try {
    const user = await users.findOne({ email: email });

    if (!user) {
      throw new BadRequestError('Usuario inexistente!', 'Email');
    }

    if (!user || !user.nombre) {
      return next(new BadRequestError(`email not Found`));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '60s',
    });

    const sendMailOptions = sendMailLinkPasswordOptions(
      email as string,
      user.nombre,
      token
    );

    transporter.sendMail(sendMailOptions, (err, info) => {
      if (err) {
        console.log('error', err);

        const nodeMailerError = new ServerError(err.message);
        return next(nodeMailerError);
      }

      console.log('info', info);
    });

    return { ...user, token };
  } catch (error: MongooseError | Error | any | unknown) {
    if (error instanceof MongooseError) {
      const serviceError = new ServerError(`${error.name} - ${error.message}`);
      throw serviceError;
    } else if (error instanceof BadRequestError) {
      throw error;
    } else {
      const err = new ServerError(
        'Error in DB connection service in users.find'
      );
      throw err;
    }
  }
};

export default { login, signUp, updatePassword, sendLinkToMail };
