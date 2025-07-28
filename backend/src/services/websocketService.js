import { Server } from 'socket.io';
import GameRound from '../models/GameRound.js';
import { generateCrashPoint } from './crashAlgorithm.js';

let io;
let currentMultiplier = 1;
let currentCrashPoint = 2;
let currentRound;

export const initWebSocket = (server) => {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  startNewRound();

  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('welcome', { message: 'Connected to Crypto Crash' });

    socket.on('cashout', ({ playerId }) => {
      io.emit('playerCashout', { playerId, multiplier: currentMultiplier });
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
  });
};

const startNewRound = async () => {
  const roundNumber = Date.now();
  const crashPoint = generateCrashPoint(roundNumber); // dynamic
  currentCrashPoint = crashPoint;
  currentMultiplier = 1;
  global.currentMultiplier = 1;

  // Create DB entry for this round
  currentRound = await GameRound.create({
    roundNumber,
    crashPoint,
    bets: [],
    startTime: new Date()
  });

  io.emit('roundStart', { roundNumber, crashPoint });

  const interval = setInterval(async () => {
    currentMultiplier += 0.01;
    global.currentMultiplier = currentMultiplier;

    if (currentMultiplier >= crashPoint) {
      clearInterval(interval);
      io.emit('crash', { crashPoint });
      await GameRound.findByIdAndUpdate(currentRound._id, { endTime: new Date() });
      setTimeout(startNewRound, 10000); // new round after 10 sec
    } else {
      io.emit('multiplierUpdate', { multiplier: currentMultiplier.toFixed(2) });
    }
  }, 100);
};
