/**
 * Validate bet input
 * @param {number} usdAmount - Bet amount in USD
 * @param {string} currency - Currency (bitcoin or ethereum)
 * @returns {object} - { valid: boolean, message?: string }
 */
export const validateBetInput = (usdAmount, currency) => {
    if (!usdAmount || usdAmount <= 0) {
      return { valid: false, message: 'Invalid bet amount' };
    }
  
    const supportedCurrencies = ['bitcoin', 'ethereum'];
    if (!supportedCurrencies.includes(currency)) {
      return { valid: false, message: 'Unsupported currency' };
    }
  
    return { valid: true };
  };
  
  /**
   * Validate cashout request
   * @param {string} playerId - Player ID
   * @returns {object} - { valid: boolean, message?: string }
   */
  export const validateCashoutInput = (playerId) => {
    if (!playerId || typeof playerId !== 'string') {
      return { valid: false, message: 'Invalid player ID' };
    }
    return { valid: true };
  };
  