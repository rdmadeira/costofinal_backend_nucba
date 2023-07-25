import { Router } from 'express';
import { verifyAuthorization } from '../middlewares/authorization.js';
import {
  getOrdersByUserIdController,
  postOrderController,
  getOrderByIdController,
} from '../controllers/orders.controller.js';

const router = Router();

router
  .post('/', verifyAuthorization, postOrderController)
  .get('/user/:userId', getOrdersByUserIdController)
  .get('/order/:orderId', getOrderByIdController);

export default router;
