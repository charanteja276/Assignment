import Player from '../models/Player.js';
import { getCryptoPrice } from '../config/cryptoApi.js';

export const getWalletBalance = async (req, res) => {
  try {
    const { playerId } = req.params;
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    const btcPrice = await getCryptoPrice('bitcoin');
    const ethPrice = await getCryptoPrice('ethereum');

    res.json({
      wallet: player.wallet,
      usdEquivalent: {
        BTC: player.wallet.BTC * btcPrice,
        ETH: player.wallet.ETH * ethPrice
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};