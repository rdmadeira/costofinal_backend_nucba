import { Router } from 'express';

import {
  getUserByIdController,
  updateUserByIdController,
  getUserByTokenController,
  postUserByTokenController,
} from '../controllers/user.controller.js';
import { verifyAuthorization } from '../middlewares/authorization.js';

const router = Router();

router
  .get('/', getUserByTokenController)
  .post('/', verifyAuthorization, postUserByTokenController)
  .get('/:userId', verifyAuthorization, getUserByIdController)
  .put('/:userId', verifyAuthorization, updateUserByIdController);

export default router;
