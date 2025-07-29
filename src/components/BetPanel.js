import React, { useState } from 'react';
import { placeBet } from '../services/api';

const BetPanel = ({ playerId }) => {
  const [usdAmount, setUsdAmount] = useState('');
  const [currency, setCurrency] = useState('bitcoin');

  const handleBet = async () => {
    try {
      const response = await placeBet({ playerId, usdAmount: parseFloat(usdAmount), currency });
      alert(`Bet placed: ${response.data.cryptoAmount} ${currency}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing bet');
    }
  };

  return (
    <div className="card p-3 my-3 shadow-sm">
      <h4>Place Your Bet</h4>
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="USD Amount"
          value={usdAmount}
          onChange={(e) => setUsdAmount(e.target.value)}
        />
        <select
          className="form-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="bitcoin">BTC</option>
          <option value="ethereum">ETH</option>
        </select>
      </div>
      <button className="btn btn-primary w-100" onClick={handleBet}>
        Place Bet
      </button>
    </div>
  );
};

export default BetPanel;
