import React, { useState } from 'react';
import './Homepage.css';
import a1 from '../Assets/p1.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleBookNowClick = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">
         
          StratoServe Airlines
        </div>
        <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
          <nav>
            <ul>
              
              <li>
                <button onClick={handleLoginClick} className="nav-button">
                  <span className="nav-icon">👤</span>
                  Login
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Experience the Sky Like Never Before</h1>
          <p className="hero-subtitle">Book your flight with ease and embark on unforgettable journeys</p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={handleBookNowClick}>
             
              Book Now
            </button>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>


      {/* About Section */}
      <section className="about">
        <h2>We Are StratoServe Airways</h2>
        <div className="about-container">
          <div className="about-image">
            <img src={a1} alt="StratoServe Airways" />
          </div>
          <div className="about-text">
            <p>
              StratoServe Airways, one of the fastest-growing airlines in India, began flying in 2025 and currently serves over 10 destinations across the globe. In just three years, we've taken more than 50,000 passengers on unforgettable journeys.
            </p>
            <p>
              At StratoServe Airways, we believe in going the extra smile to ensure every flight is your best experience yet. Discover what you've been missing — with comfort, care, and world-class service in every seat.
            </p>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;