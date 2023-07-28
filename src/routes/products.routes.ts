import { Router } from 'express';

import { getProductsByQuerycategoryIdController } from '../controllers/products.controller.js';

const router = Router();

export default router;
router.get('/', getProductsByQuerycategoryIdController);
