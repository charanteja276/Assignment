import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const GameBoard = () => {
  const { multiplier, crashPoint } = useContext(GameContext);

  return (
    <div className="card text-center my-4 shadow-lg p-4">
      <h2 className={crashPoint ? 'text-danger' : 'text-success'}>
        {crashPoint ? `Crashed at ${crashPoint}x` : `${multiplier}x`}
      </h2>
    </div>
  );
};

export default GameBoard;
