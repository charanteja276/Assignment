import React from 'react';
import GameBoard from '../components/GameBoard';
import BetPanel from '../components/BetPanel';
import CashoutButton from '../components/CashoutButton';
import Wallet from './Wallet';

const Home = () => {
  const playerId = localStorage.getItem('playerId');

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Crypto Crash Game</h1>
      <GameBoard />
      <BetPanel playerId={playerId} />
      <CashoutButton playerId={playerId} />
      <Wallet />
      <button
      className="btn btn-secondary my-2"
      onClick={() => {
        localStorage.removeItem('playerId');
        window.location.href = '/login';
      }}
    >
      Logout
    </button>

    </div>
  );
};

export default Home;
