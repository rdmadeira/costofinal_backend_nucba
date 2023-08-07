import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db/config.js';
import indexRouter from './routes/index.js';

import { errorHandle } from './middlewares/errorHandler.js';
import { NotFoundError } from './entities/errors/NotFoundError.js';

dotenv.config();
connectToDB().catch((error) => console.log('error', error));

const server: Express = express();
const PORT = process.env.PORT || 8000;

// Middlewares:
server.use(express.json());
server.use(cors());
server.use(express.static('public'));

// Routes:
server.get('/', async (req, res) => {
  res.json({
    message: 'Para entrar en la api, usar el endpoint api/v1/<entidad>',
  });
});
server.use('/api/v1/', indexRouter);

server.use((req: Request, res: Response, next: NextFunction) => {
  const path = req.url;
  const notFoundError = new NotFoundError('url: ' + path);

  return next(notFoundError);
});

// Final Not Found Error Handle:
server.use(errorHandle);

server.listen(PORT, async () =>
  console.log('Server initializated on port ' + PORT)
);
