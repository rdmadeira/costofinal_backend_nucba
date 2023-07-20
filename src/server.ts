import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB, clientDB } from './config/db.js';

dotenv.config();
connectToDB().catch((error) => console.log('error', error));

const server: Express = express();
const PORT = process.env.PORT || 8000;

// Middlewares:
server.use(express.json());
server.use(cors());

// Routes:
server.get('/', async (req, res) => {
  console.log(
    'client',
    await clientDB.db('costofinal').collection('categories').findOne()
  );
  res.json({
    data: 'ok',
  });
});
// Final Not Found Error Handle:

server.listen(PORT, async () =>
  console.log('Server initializated on port ' + PORT)
);
