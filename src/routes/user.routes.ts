import { Router } from 'express';

import {
  getUserByIdController,
  updateUserByIdController,
  getUserByTokenController,
} from '../controllers/user.controller.js';
import { verifyAuthorization } from '../middlewares/authorization.js';

const router = Router();

router
  .get('/', verifyAuthorization, getUserByTokenController)
  .get('/:userId', verifyAuthorization, getUserByIdController)
  .put('/:userId', verifyAuthorization, updateUserByIdController);

export default router;
