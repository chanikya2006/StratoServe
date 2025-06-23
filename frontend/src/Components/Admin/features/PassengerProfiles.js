import React, { useEffect, useState } from 'react';
import "../styles/AdminPageStyles.css";

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await fetch('http://localhost:5000/passengers');
        const data = await response.json();
        setPassengers(data);
      } catch (error) {
        console.error('Error fetching passengers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, []);

  const filteredPassengers = passengers.filter(p =>
    p.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-page">
      <h2>Passenger Profiles</h2>
      
      <input
        type="text"
        placeholder="Search by username or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="admin-search"
      />

      {loading ? (
        <div className="admin-empty-state">
          <p>Loading passenger data...</p>
        </div>
      ) : (
        <>
          <h3>Registered Passengers ({filteredPassengers.length})</h3>
          
          {filteredPassengers.length === 0 ? (
            <div className="admin-empty-state">
              <p>No passengers found matching your search.</p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPassengers.map((passenger, index) => (
                    <tr key={index}>
                      <td>{passenger.username}</td>
                      <td>{passenger.email}</td>
                      <td>{passenger.bookings ? passenger.bookings : 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Passengers;
