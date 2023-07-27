import { Router } from 'express';

import { getProductsBySubcategoryIdController } from '../controllers/products.controller.js';

const router = Router();

export default router;
router.get('/:subcategoryId', getProductsBySubcategoryIdController);
