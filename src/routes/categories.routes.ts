import { Router } from 'express';

import {
  getCategoriesController,
  getSubcategoriesByCategoryIdController,
  getSubCategoriesByUrlController,
} from '../controllers/categories.controller.js';

const router = Router();

router.get('/', getCategoriesController);
router.get('/:categoryUrl', getSubCategoriesByUrlController);
router.get('/:categoryId', getSubcategoriesByCategoryIdController);

export default router;
