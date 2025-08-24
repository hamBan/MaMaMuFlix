import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [identifier, setIdentifier] = useState(''); // Can be username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // In a real app, you would send this data to your backend API
    // console.log('Login Data:', { identifier, password });
    // alert('Login attempted (check console)');
    try {
      const response = await axios.post('http://localhost:8080/api/checkUser', {
        username: identifier,
        password: password
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      
      if(response.status === 200)
      {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      }

      else {
      setError("Invalid username/email or password.");
    }

    // Reset form
    setIdentifier('');
    setPassword('');
    setError('');
    }

    catch (error){
      setError("Login failed. Please try again");
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
        <Link to='/register' className="butn">Register</Link>
      </form>
    </div>
  );
}

export default Login;