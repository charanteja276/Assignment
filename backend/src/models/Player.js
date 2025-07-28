import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String,
  wallet: {
    BTC: { type: Number, default: 1 }, // initial 1 BTC for demo
    ETH: { type: Number, default: 10 }
  }
});

export default mongoose.model('Player', playerSchema);
