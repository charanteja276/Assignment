import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});


export const getWalletBalance = (playerId) => api.get(`/wallet/${playerId}`);


export const placeBet = (data) => api.post('/game/bet', data);

export const cashOut = (data) => api.post('/game/cashout', data);
