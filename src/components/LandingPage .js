// components/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age <= 10) {
      navigate('/video-gallery'); // Redirect to video gallery if age is 10 or less
    } else {
      alert('Only children aged 10 or younger can proceed.');
    }
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the Kids Video Gallery</h1>
      <p>Please enter the child’s age to continue:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LandingPage;
