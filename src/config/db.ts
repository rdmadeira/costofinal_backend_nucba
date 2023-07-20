import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri: string = process.env.DB_URL!.replace(
  '<password>',
  process.env.DB_PASSWORD!
);
console.log('uri', uri);

export const clientDB = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectToDB = async () => {
  const connection = await clientDB.connect();
  const collections = await connection.db('costofinal').listCollections();
  console.log(
    'Conectada a la base de datos de MongoDB',
    connection.db('costofinal'),
    collections
  );
};
