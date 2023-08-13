/* import { MongoClient, ServerApiVersion } from 'mongodb'; */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri: string = process.env.DB_URL!.replace(
  '<password>',
  process.env.DB_PASSWORD!
);

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(uri);
    console.log('DB de mongo Conectada: ' + connection.connection.host);
  } catch (error) {
    console.log('error', error);

    throw error;
  }
};
