import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Player from './src/models/Player.js';
import connectDB from './src/config/db.js';

dotenv.config();
await connectDB();

const seedPlayers = async () => {
  await Player.deleteMany({});
  const players = await Player.insertMany([
    { name: 'Alice', wallet: { BTC: 0.05, ETH: 1 } },
    { name: 'Bob', wallet: { BTC: 0.1, ETH: 2 } },
    { name: 'Charlie', wallet: { BTC: 0.2, ETH: 5 } }
  ]);
  console.log('Players seeded:', players);
  process.exit();
};

seedPlayers();
