import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [fullname, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/api/addUser', {
        username: username,
        fullname: fullname,
        emailid: email,
        passkeys: password
      });

      alert(response.data);
      setError('');

      // Optionally redirect to login page after success
      navigate('/login');
      // // Reset form
      // setUsername('');
      // setEmail('');
      // setPassword('');
      // setConfirmPassword('');
    }

    catch(error) {
      if(error.response && error.response.data) {
        setError(error.response.data);
      }

      else{
        setError("Something went wrong. Please try again later");
      }
    }

    // // In a real app, you would send this data to your backend API
    // console.log('Registration Data:', { username, email, password });
    // alert('Registration attempted (check console)');

    // // Reset form
    // setUsername('');
    // setEmail('');
    // setPassword('');
    // setConfirmPassword('');
    // setError('');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </div>
        <div className="button-container">
          <button type="submit">Register</button>
        </div>
        <Link to='/login' className="butn">Login</Link>
      </form>
    </div>
  );
}

export default Register;