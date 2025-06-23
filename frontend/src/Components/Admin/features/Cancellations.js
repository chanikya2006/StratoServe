import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cancellations = () => {
  const [cancellations, setCancellations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cancellation requests on component mount
  useEffect(() => {
    const fetchCancellations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-cancellations');
        if (response.data.success) {
          setCancellations(response.data.cancellations);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cancellations:", err);
        setError('Failed to load cancellation requests');
        setLoading(false);
      }
    };

    fetchCancellations();
  }, []);

  // Approve cancellation
  const handleApproveCancellation = async (bookingId) => {
    try {
      const response = await axios.post('http://localhost:5000/approve-cancellation', { bookingId });
      if (response.data.success) {
        alert(response.data.message);
        // Remove the approved cancellation request from state
        setCancellations(cancellations.filter(cancel => cancel.bookingId !== bookingId));
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error('Error approving cancellation:', err);
      alert('Failed to approve cancellation');
    }
  };

  if (loading) {
    return <div>Loading cancellations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cancellations">
      <h2>Cancellation Requests</h2>
      {cancellations.length > 0 ? (
        cancellations.map((cancel, index) => (
          <div key={index} className="cancellation-request">
            <h3>Booking ID: {cancel.bookingId}</h3>
            <p><strong>Status:</strong> {cancel.status}</p>
            <p><strong>Requested At:</strong> {new Date(cancel.requestedAt).toLocaleString()}</p>
            <p><strong>Remarks:</strong> {cancel.remarks}</p>
            
            {/* Booking Details */}
            <div className="booking-details">
              <h4>Flight Details</h4>
              <p><strong>Flight Number:</strong> {cancel.booking.flightNumber}</p>
              <p><strong>From:</strong> {cancel.booking.from}</p>
              <p><strong>To:</strong> {cancel.booking.to}</p>
              <p><strong>Departure Time:</strong> {cancel.booking.arrivalTime}</p>
              <p><strong>Arrival Time:</strong> {cancel.booking.departureTime}</p>

              {/* Passengers */}
              <h5>Passengers:</h5>
              {cancel.booking.passengers && cancel.booking.passengers.length > 0 ? (
                cancel.booking.passengers.map((passenger, idx) => (
                  <div key={idx}>
                    <p><strong>{passenger.fullName}</strong></p>
                    <p>Passport Number: {passenger.passportNumber}</p>
                  </div>
                ))
              ) : (
                <p>No passengers found</p>
              )}

              {/* Allocated Seats */}
              <p><strong>Seats Allocated:</strong> {cancel.booking.allocatedSeats.join(', ')}</p>
              <p><strong>Total Price:</strong> ₹{cancel.booking.totalPrice}</p>
            </div>

            {/* Approve Cancellation Button */}
            {cancel.status === 'requested' && (
              <button onClick={() => handleApproveCancellation(cancel.bookingId)}>
                Approve Cancellation
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No cancellation requests found.</p>
      )}
    </div>
  );
};

export default Cancellations;
