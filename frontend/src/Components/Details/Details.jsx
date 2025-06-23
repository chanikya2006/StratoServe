import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'; // <-- import validator
import './Details.css';

const DetailsPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [generalInfo, setGeneralInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const navigate = useNavigate();

  // Fetch selected seats from localStorage
  useEffect(() => {
    const seats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    setSelectedSeats(seats);

    // Initialize passenger details with empty fields for each seat
    const initialPassengerDetails = seats.map((seat) => ({
      fullName: '',
      passportNumber: '',
      dob: '',
      seatAllocation: seat
    }));
    setPassengerDetails(initialPassengerDetails);
  }, []);

  // Handle general info input change
  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo({ ...generalInfo, [name]: value });
  };

  // Handle input change for each passenger
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengerDetails = [...passengerDetails];
    updatedPassengerDetails[index][name] = value;
    setPassengerDetails(updatedPassengerDetails);
  };

  // Handle form submission with validation
  const handleSubmit = () => {
    // Check general info fields
    if (
      !generalInfo.fullName.trim() ||
      !generalInfo.email.trim() ||
      !generalInfo.phone.trim()
    ) {
      alert('Need to fill all fields');
      return;
    }

    // Email format validation using validator
    if (!validator.isEmail(generalInfo.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check all passenger details
    for (let i = 0; i < passengerDetails.length; i++) {
      const passenger = passengerDetails[i];
      if (
        !passenger.fullName.trim() ||
        !passenger.passportNumber.trim() ||
        !passenger.dob.trim()
      ) {
        alert('Need to fill all fields');
        return;
      }
    }

    // Store the general info and passenger details in localStorage
    localStorage.setItem('generalInfo', JSON.stringify(generalInfo));
    localStorage.setItem('passengerDetails', JSON.stringify(passengerDetails));

    // Redirect to payment page
    navigate('/payment');
  };

  // Navigate back to booking page
  const handleBack = () => {
    navigate('/bookingpage');
  };

  // Calculate total number of passengers
  const totalPassengers = selectedSeats.length;

  return (
    <div className="details-page">
      <header>
        <div className="header-container">
          <h1>Passenger Details</h1>
          <button className="back-button" onClick={handleBack}>
            <span className="arrow-icon">&#8592;</span> Back
          </button>
        </div>
      </header>

      <main>
        <div className="container">
          {/* General Information Section */}
          <section className="general-info">
            <h2>Contact Information</h2>
            
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="fullName" className="required">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter full name"
                  name="fullName"
                  value={generalInfo.fullName}
                  onChange={handleGeneralInfoChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="email" className="required">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="yourname@example.com"
                  name="email"
                  value={generalInfo.email}
                  onChange={handleGeneralInfoChange}
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="phone" className="required">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter phone number"
                name="phone"
                value={generalInfo.phone}
                onChange={handleGeneralInfoChange}
                required
              />
            </div>
          </section>

          {/* Selected Seats and Passenger Information Section */}
          <section className="passenger-info">
            <h2>Passenger Details ({totalPassengers})</h2>
            
            <ul>
              {selectedSeats.map((seat, index) => (
                <li key={index} className="passenger-box">
                  <h3>Passenger {index + 1} - Seat {seat}</h3>
                  
                  <div className="input-group">
                    <label htmlFor={`fullName-${index}`} className="required">Full Name</label>
                    <input
                      type="text"
                      id={`fullName-${index}`}
                      placeholder="Enter passenger's full name"
                      name="fullName"
                      value={passengerDetails[index]?.fullName}
                      onChange={(e) => handleInputChange(index, e)}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor={`passportNumber-${index}`} className="required">Passport/ID Number</label>
                      <input
                        type="text"
                        id={`passportNumber-${index}`}
                        placeholder="Enter passport/ID number"
                        name="passportNumber"
                        value={passengerDetails[index]?.passportNumber}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                      />
                    </div>
                    
                    <div className="input-group">
                      <label htmlFor={`dob-${index}`} className="required">Date of Birth</label>
                      <input
                        type="date"
                        id={`dob-${index}`}
                        placeholder="Date of Birth"
                        name="dob"
                        value={passengerDetails[index]?.dob}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="input-group">
                    <label htmlFor={`seatAllocation-${index}`}>Seat Number</label>
                    <input
                      type="text"
                      id={`seatAllocation-${index}`}
                      placeholder="Seat Allocation"
                      name="seatAllocation"
                      value={passengerDetails[index]?.seatAllocation}
                      disabled
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <button
            className="submit-button"
            onClick={handleSubmit}
          >
            Continue to Payment
          </button>
        </div>
      </main>
    </div>
  );
};

export default DetailsPage;
