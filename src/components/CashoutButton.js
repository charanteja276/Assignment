import React from 'react';
import { cashOut } from '../services/api';

const CashoutButton = ({ playerId }) => {
  const handleCashout = async () => {
    try {
      const response = await cashOut({ playerId });
      alert(`Cashed out: ${response.data.payoutUsd} USD`);
    } catch (error) {
      alert(error.response?.data?.message || 'Error cashing out');
    }
  };

  return (
    <button className="btn btn-danger w-100 my-2" onClick={handleCashout}>
      Cash Out
    </button>
  );
};

export default CashoutButton;
