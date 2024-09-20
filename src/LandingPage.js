import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Assuming styles are here

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <h1 className="landing-title">Welcome to the Student Advice Platform</h1>
        <p className="landing-subtitle">Join our community to share and receive advice on relocating for your studies.</p>
        <div className="landing-buttons">
          <Link to="/login">
            <button className="cta-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="cta-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
