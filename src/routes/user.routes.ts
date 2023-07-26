import { Router } from 'express';

import {
  getUserByIdController,
  updateUserByIdController,
} from '../controllers/user.controller.js';
import { verifyAuthorization } from '../middlewares/authorization.js';

const router = Router();

router
  .get('/:userId', verifyAuthorization, getUserByIdController)
  .put('/:userId', verifyAuthorization, updateUserByIdController);

export default router;
