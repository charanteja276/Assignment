import express from 'express';
import Player from '../models/Player.js';

const router = express.Router();

// Login player by name (must exist)
router.post('/login', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    const player = await Player.findOne({ name });
    if (!player) {
      return res.status(404).json({ message: 'Player not found. Contact admin.' });
    }

    return res.json({ playerId: player._id, name: player.name });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
