import { Router } from 'express';

import {
  loginController,
  signupController,
  updatePasswordController,
  sendLinkToMailController,
} from '../controllers/auth.controller.js';
import { verifyAuthorization } from '../middlewares/authorization.js';

const router = Router();

router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/reset-password', verifyAuthorization, updatePasswordController);
router.get('/mailing', sendLinkToMailController);

export default router;
