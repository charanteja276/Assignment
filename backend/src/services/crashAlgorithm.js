import crypto from 'crypto';

export const generateCrashPoint = (roundNumber, seed = 'server-secret') => {
  const hash = crypto.createHmac('sha256', seed).update(roundNumber.toString()).digest('hex');
  const num = parseInt(hash.substring(0, 8), 16);
  const maxCrash = 120; // 120x
  return (num % (maxCrash * 100)) / 100 + 1; // e.g., between 1.00 and 120.00
};
