import GameRound from '../models/GameRound.js';
import Transaction from '../models/Transaction.js';
import Player from '../models/Player.js';
import { getCryptoPrice ,convertCryptoToUsd } from '../config/cryptoApi.js';
import crypto from 'crypto';
import { validateBetInput,validateCashoutInput } from '../utils/validator.js';
import { logInfo, logError } from '../utils/logger.js';



export const placeBet = async (req, res) => {
  try {
    const { playerId, usdAmount, currency } = req.body;
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    const price = await getCryptoPrice(currency);
    const cryptoAmount = usdAmount / price;

    if (player.wallet[currency.toUpperCase()] < cryptoAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct balance
    player.wallet[currency.toUpperCase()] -= cryptoAmount;
    await player.save();

    // Add bet to current round
    const currentRound = await GameRound.findOne().sort({ startTime: -1 });
    currentRound.bets.push({ playerId, usdAmount, cryptoAmount, currency });
    await currentRound.save();

    // Log transaction
    await Transaction.create({
      playerId,
      usdAmount,
      cryptoAmount,
      currency,
      transactionType: 'bet',
      transactionHash: crypto.randomBytes(16).toString('hex'),
      priceAtTime: price
    });

    res.json({ message: 'Bet placed', cryptoAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cashOut = async (req, res) => {
  try {
    const { playerId } = req.body;

    // Validate input
    const { valid, message } = validateCashoutInput(playerId);
    if (!valid) return res.status(400).json({ message });

    // Get the current round
    const currentRound = await GameRound.findOne().sort({ startTime: -1 });
    if (!currentRound) return res.status(400).json({ message: 'No active game round' });

    // Find player's active bet
    const bet = currentRound.bets.find(b => b.playerId === playerId && !b.cashedOut);
    if (!bet) return res.status(400).json({ message: 'No active bet found or already cashed out' });

    // Check global multiplier (must be tracked in WebSocket service)
    if (!global.currentMultiplier) return res.status(500).json({ message: 'Game state error' });

    const price = await getCryptoPrice(bet.currency);
    const payoutCrypto = bet.cryptoAmount * global.currentMultiplier;
    const payoutUsd = await convertCryptoToUsd(payoutCrypto, bet.currency);

    // Mark as cashed out
    bet.cashedOut = true;
    bet.cashoutMultiplier = global.currentMultiplier;
    await currentRound.save();

    // Update player's wallet
    const player = await Player.findById(playerId);
    player.wallet[bet.currency.toUpperCase()] += payoutCrypto;
    await player.save();

    // Log transaction
    await Transaction.create({
      playerId,
      usdAmount: payoutUsd,
      cryptoAmount: payoutCrypto,
      currency: bet.currency,
      transactionType: 'cashout',
      transactionHash: crypto.randomBytes(16).toString('hex'),
      priceAtTime: price
    });

    logInfo('Cashout successful', { playerId, payoutCrypto, multiplier: global.currentMultiplier });

    return res.json({
      message: 'Cashout successful',
      payoutCrypto,
      payoutUsd,
      multiplier: global.currentMultiplier
    });

  } catch (error) {
    logError('Error in cashOut', error.message);
    return res.status(500).json({ error: error.message });
  }
};
