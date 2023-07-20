/* import { MongoClient, ServerApiVersion } from 'mongodb'; */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const uri: string = process.env.DB_URL!.replace(
  '<password>',
  process.env.DB_PASSWORD!
);

export const connectToDB = async () => {
  const connection = await mongoose.connect(uri);
  console.log('DB de mongo Conectada: ' + connection.connection.host);
};

/* export const clientDB = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectToDB = async () => {
  const connection = await clientDB.connect();
  
  console.log('Conectada a la base de datos de MongoDB');
}; */
