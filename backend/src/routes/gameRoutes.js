import express from 'express';
import { placeBet , cashOut } from '../controllers/gameController.js';

const router = express.Router();

router.post('/bet', placeBet);

router.post('/cashout', cashOut);

export default router;
