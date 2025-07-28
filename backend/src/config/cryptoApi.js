import axios from 'axios';

const API_BASE = 'https://api.coingecko.com/api/v3/simple/price';
let cachedPrices = {};
let lastFetchTime = 0;

export const getCryptoPrice = async (currency) => {
  const now = Date.now();
  if (now - lastFetchTime < 10000 && cachedPrices[currency]) {
    return cachedPrices[currency];
  }

  try {
    const { data } = await axios.get(API_BASE, {
      params: {
        ids: currency,
        vs_currencies: 'usd'
      }
    });
    cachedPrices[currency] = data[currency].usd;
    lastFetchTime = now;
    return cachedPrices[currency];
  } catch (error) {
    console.error('Error fetching crypto price:', error.message);
    if (cachedPrices[currency]) return cachedPrices[currency];
    throw new Error('Failed to fetch price and no cache available');
  }
};

export const convertUsdToCrypto = async (usdAmount, currency = 'bitcoin') => {
  const price = await getCryptoPrice(currency);
  return parseFloat((usdAmount / price).toFixed(8));
};

/**
 * Convert Crypto to USD using live price from API
 */
export const convertCryptoToUsd = async (cryptoAmount, currency = 'bitcoin') => {
  const price = await getCryptoPrice(currency);
  return parseFloat((cryptoAmount * price).toFixed(2));
};
