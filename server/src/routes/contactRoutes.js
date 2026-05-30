import { Router } from 'express';

import {
  createContactMessage,
  getTemporaryMessages,
} from '../controllers/contactController.js';
import { validateContactRequest } from '../middleware/validateContactRequest.js';

const router = Router();

router.post('/', validateContactRequest, createContactMessage);
router.get('/temporary-messages', getTemporaryMessages);

export default router;
