import express from 'express';
import { getWalletBalance } from '../controllers/walletController.js';

const router = express.Router();

router.get('/:playerId', getWalletBalance);

export default router;
