import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import your stylesheet for this component
import config from '../../config/config';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = config.baseUrl; // Base URL for API requests

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email: email, // User's email input
        password: password // User's password input
      });

      // Extract and decode the payload from the JWT token
      const token = response.data.data.token;
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));

      // Store user-related data in local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userID', payload.id);
      localStorage.setItem('isAdmin', payload.isAdmin);

      // Inform the parent component about successful login
      props.isLogin(true);

    } catch (error) {
      // Display error message if login fails
      alert(error.response.data.error);
      console.error('Giriş yapılamadı', error.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Giriş Yap</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Giriş Yap</button>
      </div>
    </div>
  );
}

export default Login;
