import { Router } from 'express';

import { getProductsBySubcategoryIdController } from '../controllers/products.controller.js';

const router = Router();

router.get('/:subcategoryId', getProductsBySubcategoryIdController);
export default router;
