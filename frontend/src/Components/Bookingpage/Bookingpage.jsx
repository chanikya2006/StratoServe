import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookingpage.css';

const BookingPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [flight, setFlight] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem("selectedFlight"));
    if (selected) {
      setFlight(selected);
      setBookedSeats(selected.bookedseats || []);
    }
  }, []);

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to continue');
      return;
    }
    
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    alert(`You selected: ${selectedSeats.join(', ')}`);
    
    // Navigate to /payment page
    navigate('/details');
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleSeatClick = (seat) => {
    // If the seat is already booked, don't allow selection
    if (bookedSeats.includes(seat)) return;

    // If the seat is already selected, remove it
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      // If less than 5 seats are selected, add the seat
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        // Show an alert if user tries to select more than 5 seats
        alert('You can only select up to 5 seats!');
      }
    }
  };

  const renderSeats = (rows, cols, className) => {
    const prefix = className[0].toLowerCase(); // p, b, e
    const seats = [];
    
    for (let i = 0; i < rows; i++) {
      const rowLetter = String.fromCharCode(65 + i); // A, B, C, etc.
      const rowSeats = [];
      
      for (let j = 0; j < cols; j++) {
        // Add an aisle after the 3rd seat in business and economy
        if ((className === 'Business' || className === 'Economy') && j === 3) {
          rowSeats.push(<div key={`aisle-${rowLetter}`} className="aisle"></div>);
        }
        
        const seatNumber = `${rowLetter}${j + 1}`;
        const seatId = `${prefix}-${seatNumber}`; // e.g., p-A1
        const isBooked = bookedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatId)}
          >
            {seatNumber}
          </div>
        );
      }
      
      seats.push(
        <div key={`row-${rowLetter}`} className="seat-row">
          {rowSeats}
        </div>
      );
    }
    
    return (
      <div className={`seats ${className}`}>
        <h3>{className} Class</h3>
        <div className="seats-container">
          {seats}
        </div>
      </div>
    );
  };

  return (
    <div className="booking-page">
      <header>
        <div className="header-bottom">
          <h1>Booking Flight</h1>
          <button className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left"></i> <span>Back</span>
          </button>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="flight-details">
            <h2>Flight Details</h2>
            <p><strong>Flight No:</strong> {flight?.flightno}</p>
            <p><strong>Date:</strong> {flight?.date}</p>
            <p><strong>Start Time:</strong> {flight?.start_time}</p>
            <p><strong>End Time:</strong> {flight?.end_time}</p>
            <p><strong>Platinum Class Price:</strong> ₹{flight?.p_price}</p>
            <p><strong>Business Class Price:</strong> ₹{flight?.b_price}</p>
            <p><strong>Economy Class Price:</strong> ₹{flight?.e_price}</p>
          </section>

          <section className="seats-section">
            <h2>Select Your Seats</h2>
            {renderSeats(2, 4, 'Platinum')}
            {renderSeats(3, 6, 'Business')}
            {renderSeats(26, 6, 'Economy')}
          </section>

          <button
            className="book-button"
            onClick={handleBooking}
          >
            Create Booking
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
