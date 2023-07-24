import { Router } from 'express';
import { verifyAuthorization } from '../middlewares/authorization.js';
import { postOrderController } from '../controllers/orders.controller.js';

const router = Router();

router.post('/', verifyAuthorization, postOrderController);
export default router;
