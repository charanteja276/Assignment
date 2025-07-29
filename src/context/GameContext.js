import React, { createContext, useState, useEffect } from 'react';
import { socket } from '../services/websocket';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [multiplier, setMultiplier] = useState(1);
  const [roundInfo, setRoundInfo] = useState({});
  const [crashPoint, setCrashPoint] = useState(null);

  useEffect(() => {
    socket.on('roundStart', (data) => {
      setMultiplier(1);
      setCrashPoint(null);
      setRoundInfo(data);
    });

    socket.on('multiplierUpdate', (data) => {
      setMultiplier(parseFloat(data.multiplier));
    });

    socket.on('crash', (data) => {
      setCrashPoint(data.crashPoint);
    });

    return () => {
      socket.off('roundStart');
      socket.off('multiplierUpdate');
      socket.off('crash');
    };
  }, []);

  return (
    <GameContext.Provider value={{ multiplier, crashPoint, roundInfo }}>
      {children}
    </GameContext.Provider>
  );
};
