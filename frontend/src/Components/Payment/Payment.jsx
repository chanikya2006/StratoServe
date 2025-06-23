import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function PaymentPage() {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generalInfo, setGeneralInfo] = useState({});
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const selectedFlight = JSON.parse(localStorage.getItem('selectedFlight')) || {};
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const generalInfoData = JSON.parse(localStorage.getItem('generalInfo')) || {};
    const passengerDetailsData = JSON.parse(localStorage.getItem('passengerDetails')) || [];

    setGeneralInfo(generalInfoData);
    setPassengerDetails(passengerDetailsData);

    const seatPriceMap = {
      platinum: selectedFlight.p_price || 10000,
      business: selectedFlight.b_price || 5000,
      economy: selectedFlight.e_price || 2000,
    };

    let price = 0;
    passengerDetailsData.forEach((passenger) => {
      const seatCategory = getSeatCategory(passenger.seatAllocation);
      if (seatCategory) {
        price += seatPriceMap[seatCategory];
      }
    });

    setTotalPrice(price);
  }, []); // ✅ No dependency on seatPrices

  const generateBookingID = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');
    const random = Math.floor(Math.random() * 1000);
    return `BOOK-${yyyy}${mm}${dd}-${hh}${min}-${sec}${ms}-${random}`;
  };

  const getSeatCategory = (seatAllocation) => {
    if (seatAllocation.startsWith('p-')) return 'platinum';
    if (seatAllocation.startsWith('b-')) return 'business';
    if (seatAllocation.startsWith('e-')) return 'economy';
    return null;
  };

  const updateBookedSeats = async () => {
    const flightId = selectedFlight._id;
    const bookedSeats = passengerDetails.map(p => p.seatAllocation);

    if (!flightId || bookedSeats.length === 0) {
      console.error('Missing flight ID or no booked seats');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/updateFlightSeats/${flightId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookedSeats }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Flight seats updated successfully!');
        await handleBooking();
        navigate('/dashboard');
      } else {
        setError('the selected seat is already booked');
      }
    } catch (err) {
      console.error('Error occurred during the update:', err);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    setError(null);
    const bookingId = generateBookingID();

    const bookingData = {
      bookingId,
      username: user.username,
      flightNumber: selectedFlight.flightno,
      date: selectedFlight.date,
      from: selectedFlight.source,
      to: selectedFlight.destination,
      departureTime: selectedFlight.end_time,
      arrivalTime: selectedFlight.start_time,
      generalinfo: generalInfo,
      passengers: passengerDetails,
      allocatedSeats: passengerDetails.map(p => p.seatAllocation),
      totalPrice,
    };

    try {
      const response = await fetch('http://localhost:5000/api/nowbookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Booking successful! Your ID: ${bookingId}`);
      } else {
        setError('Booking failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error occurred during booking.');
    }

    setLoading(false);
  };

  const handleBack = () => {
    navigate('/details');
  };

  return (
    <div className="payment-page">
      <header>
        <div className="header-container">
          <h1>Flight Booking Payment</h1>
          <button className="back-button" onClick={handleBack}>
            <span className="arrow-icon">&#8592;</span> Back
          </button>
        </div>
      </header>
      <div className="container">
        <div className="booking-details">
          <h3>Booking Summary</h3>
          <div className="general-info">
            <h4>General Information</h4>
            <div><strong>Full Name:</strong> {generalInfo.fullName}</div>
            <div><strong>Email:</strong> {generalInfo.email}</div>
            <div><strong>Phone:</strong> {generalInfo.phone}</div>
          </div>

          <div className="passenger-info">
            <h4>Passenger Details</h4>
            {passengerDetails.map((passenger, index) => (
              <div key={index}>
                <div><strong>Passenger {index + 1}</strong></div>
                <div><strong>Full Name:</strong> {passenger.fullName}</div>
                <div><strong>Passport Number:</strong> {passenger.passportNumber}</div>
                <div><strong>Date of Birth:</strong> {passenger.dob}</div>
                <div><strong>Seat Allocation:</strong> {passenger.seatAllocation}</div>
                <div><strong>Category:</strong> {getSeatCategory(passenger.seatAllocation)}</div>
              </div>
            ))}
          </div>

          <div className="total-price">
            <h4>Total Price: ₹{totalPrice}</h4>
          </div>

          {error && <div className="error">{error}</div>}

          <button onClick={updateBookedSeats}>
            {loading ? 'Processing...' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
