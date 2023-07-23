import { Router } from 'express';

import {
  getCategoriesController,
  getSubcategoriesByCategoryIdController,
} from '../controllers/categories.controller.js';

const router = Router();

router.get('/', getCategoriesController);
router.get('/:categoryId', getSubcategoriesByCategoryIdController);

export default router;
