import { Router } from 'express';
import { verifyAuthorization } from '../middlewares/authorization.js';
import {
  getOrdersByTokenController,
  postOrderController,
  getOrderByIdController,
} from '../controllers/orders.controller.js';

const router = Router();

router
  .post('/', verifyAuthorization, postOrderController)
  .get('/', getOrdersByTokenController)
  .get('/order/:orderId', getOrderByIdController);

export default router;
