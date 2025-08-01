import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  playerId: String,
  usdAmount: Number,
  cryptoAmount: Number,
  currency: String,
  transactionType: { type: String, enum: ['bet', 'cashout'] },
  transactionHash: String,
  priceAtTime: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
