import React from 'react';
import Walletinfo from '../components/Walletinfo';

const Wallet = () => {
  const playerId = 'YOUR_PLAYER_ID';

  return (
    <div>
      <Walletinfo playerId={playerId} />
    </div>
  );
};

export default Wallet;
