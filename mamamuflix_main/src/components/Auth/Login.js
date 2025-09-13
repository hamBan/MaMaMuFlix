import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/checkUser', {
        username: identifier,
        password: password
      });

      console.log('Response:', response.data);

      if (response.status === 200 && response.data.accessToken && response.data.refreshToken) {
        // ✅ Save tokens in cookies
        Cookies.set("accessToken", response.data.accessToken, { secure: true, sameSite: "Strict" });
        Cookies.set("refreshToken", response.data.refreshToken, { secure: true, sameSite: "Strict" });

        // ✅ Save login status
        localStorage.setItem("isLoggedIn", "true");

        // ✅ Navigate to home page
        navigate("/");
      } else {
        setError("Invalid username/email or password.");
      }

      setIdentifier('');
      setPassword('');
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Username/Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
        <Link to="/register" className="butn">Register</Link>
      </form>
    </div>
  );
}

export default Login;