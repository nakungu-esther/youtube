import React, { useState } from 'react';
import './Login.css'; // Optional: custom styling for the login page

const Login = ({ onLoginSuccess }) => {
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (age < 10) {
      onLoginSuccess();
    } else {
      setError('Sorry, this platform is only for kids under 10 years old.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Enter Your Age:
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Log In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
