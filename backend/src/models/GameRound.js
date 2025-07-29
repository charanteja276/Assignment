import mongoose from 'mongoose';

const betSchema = new mongoose.Schema({
  playerId: String,
  usdAmount: Number,
  cryptoAmount: Number,
  currency: String,
  cashedOut: { type: Boolean, default: false },
  cashoutMultiplier: Number
});

const gameRoundSchema = new mongoose.Schema({
  roundNumber: Number,
  crashPoint: Number,
  bets: [betSchema],
  startTime: Date,
  endTime: Date
});

export default mongoose.model('GameRound', gameRoundSchema);
