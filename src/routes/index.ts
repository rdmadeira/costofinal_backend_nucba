import { Router, Request, Response } from 'express';

import productsRouter from './products.routes.js';
import categoriesRouter from './categories.routes.js';
import authRouter from './auth.routes.js';
import ordersRouter from './orders.routes.js';
import userRouter from './user.routes.js';
import mailingController from '../controllers/mailing.controller.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Especificá una entidad, formato de ruta /api/v1/<entidad>',
  });
});

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);
router.use('/orders', ordersRouter);
router.use('/users', userRouter);
router.use('/mailing', mailingController);
export default router;
