import React, { useState } from 'react';
import './LandingPage.css'; // Import the CSS file

const LandingPage = ({ onStart }) => {
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (age < 10) {
      onStart(); // Start the app if the age is under 10
    } else {
      setError('Sorry, this platform is only for kids under 10 years old.');
    }
  };

  return (
    <div className="landing-page">
  {/* Background video */}
  <video autoPlay loop muted className="background-video">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

      {/* Content overlay */}
      <div className="content">
        <h1>Welcome to KidsTube!</h1>
        <p>Safe, fun, and educational videos for kids.</p>
        <form onSubmit={handleLogin}>
          <label>
            Enter your kid's Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
            />
          </label>
          <button type="submit">Log In</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
