import { Router } from 'express';

import { getProductsBySubcategoryController } from '../controllers/products.controller.js';

const router = Router();

router.get('/:categoryId', getProductsBySubcategoryController);
export default router;
