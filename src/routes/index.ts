import { Router, Request, Response } from 'express';
import productsRouter from './products.routes.js';
import categoriesRouter from './categories.routes.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Especificá una entidad, formato de ruta /api/v1/<entidad>',
  });
});

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
export default router;
