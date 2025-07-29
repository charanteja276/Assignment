import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        { name }
      );
      localStorage.setItem('playerId', data.playerId);
      localStorage.setItem('playerName', data.name);
      onLogin(data.playerId);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-3">Login</h3>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Start Playing
        </button>
      </div>
    </div>
  );
};

export default Login;
