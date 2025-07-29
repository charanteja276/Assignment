import React, { useEffect, useState } from 'react';
import { getWalletBalance } from '../services/api';

const Walletinfo = ({ playerId }) => {
  const [wallet, setWallet] = useState({});
  const [usdEquivalent, setUsdEquivalent] = useState({});

  useEffect(() => {
    const fetchBalance = async () => {
      const { data } = await getWalletBalance(playerId);
      setWallet(data.wallet);
      setUsdEquivalent(data.usdEquivalent);
    };

    fetchBalance();
  }, [playerId]);

  return (
    <div className="card p-3 my-3 shadow-sm">
      <h4>Your Wallet</h4>
      <p><strong>BTC:</strong> {wallet.BTC} (${usdEquivalent.BTC})</p>
      <p><strong>ETH:</strong> {wallet.ETH} (${usdEquivalent.ETH})</p>
    </div>
  );
};

export default Walletinfo;
