import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import baseURL from '../utils/baseURL';
import { toast } from 'react-toastify';

const LoginRegister = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username };

    try {
      axios.post(`${baseURL}/user/login`, user);
      toast.success('Logged in successfully');
    }
    catch (error) {
      console.log(error);
      toast.error('Failed to log in');
    }

    // console.log('Username submitted:', username);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login / Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
