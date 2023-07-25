import { Router } from 'express';

import { getUserByIdController } from '../controllers/user.controller.js';
import { verifyAuthorization } from '../middlewares/authorization.js';

const router = Router();

router.get('/:userId', verifyAuthorization, getUserByIdController);

export default router;
