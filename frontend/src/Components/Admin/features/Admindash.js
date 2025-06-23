import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUserTie } from '@fortawesome/free-solid-svg-icons';
import '../styles/Admindashboard.css';

const Dashboard = () => {
  const [activeFlights, setActiveFlights] = useState(0);
  const [passengersToday, setPassengersToday] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/admin/dashboard-stats');
        const data = await res.json();
        setActiveFlights(data.activeFlights);
        setPassengersToday(data.passengersToday);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="content-section active" id="dashboard-section">
      <h1>Welcome to Airline Management System</h1>
      <div className="dashboard-cards">
        <div className="card">
          <FontAwesomeIcon icon={faPlane} />
          <h3>Active Flights</h3>
          <p>{activeFlights}</p>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faUserTie} />
          <h3>Passengers Travalleing</h3>
          <p>{passengersToday}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
