import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import { GameProvider } from './context/GameContext';

const App = () => {
  const [playerId, setPlayerId] = useState(localStorage.getItem('playerId'));

  useEffect(() => {
    const storedId = localStorage.getItem('playerId');
    if (storedId) {
      setPlayerId(storedId);
    }
  }, []);

  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={setPlayerId} />} />
          <Route path="/" element={playerId ? <Home /> : <Navigate to="/login" />} />
          <Route path="/wallet" element={playerId ? <Wallet /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
