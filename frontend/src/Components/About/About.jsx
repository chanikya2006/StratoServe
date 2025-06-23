import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="about-page">
      <header className="about-header">
        <div className="logo">
          <span className="logo-icon">✈️</span>
          SkyLine Airlines
        </div>
        <nav className="about-nav">
          <button onClick={handleHomeClick} className="back-button">
            <span className="back-icon">🏠</span>
            Back to Home
          </button>
        </nav>
      </header>

      <div className="about-content">
        <h1>About Skyline Airways</h1>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Skyline Airways, founded in 2025, has quickly established itself as one of India's fastest-growing airlines. 
            With a commitment to excellence, we serve over 10 destinations globally and have carried more than 50,000 
            passengers on memorable journeys in just three years.
          </p>
          <p>
            Our mission is to provide safe, comfortable, and affordable air travel while maintaining the highest 
            standards of service excellence. We believe in going the extra mile to ensure passenger satisfaction 
            and creating a positive flying experience for everyone.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Fleet</h2>
          <p>
            We operate a modern, fuel-efficient fleet consisting of the latest aircraft models. Our planes are 
            maintained to the highest safety standards and regularly updated with the newest technology to ensure 
            a comfortable and eco-friendly journey.
          </p>
          <p>
            Our fleet includes:
          </p>
          <ul>
            <li>Boeing 737 MAX – Perfect for short to medium-haul routes</li>
            <li>Airbus A320neo – Optimal for domestic and regional flights</li>
            <li>Boeing 787 Dreamliner – For long-haul international services</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Destinations</h2>
          <p>
            Skyline Airways connects major cities across India and select international destinations. Whether you're 
            traveling for business or leisure, we offer convenient schedules and competitive fares to popular 
            destinations.
          </p>
          <p>
            Some of our key destinations include:
          </p>
          <ul>
            <li>Delhi, Mumbai, Bangalore, Hyderabad, Chennai (Domestic)</li>
            <li>Dubai, Singapore, Bangkok, London (International)</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Services</h2>
          <p>
            At Skyline Airways, we prioritize passenger comfort and convenience. Our services include:
          </p>
          <ul>
            <li>Web and mobile check-in options</li>
            <li>In-flight entertainment systems</li>
            <li>Complimentary meals on long-haul flights</li>
            <li>Special assistance for passengers with disabilities</li>
            <li>Premium economy and business class options</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Commitment</h2>
          <p>
            We are committed to:
          </p>
          <ul>
            <li><strong>Safety:</strong> Adhering to the highest safety standards in every aspect of our operations</li>
            <li><strong>Sustainability:</strong> Implementing eco-friendly practices to reduce our carbon footprint</li>
            <li><strong>Customer Satisfaction:</strong> Continuously improving our services based on passenger feedback</li>
            <li><strong>Punctuality:</strong> Striving for on-time performance across our network</li>
          </ul>
        </section>
      </div>

      <footer className="about-footer">
        <p>&copy; 2024 SkyLine Airlines. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About; 