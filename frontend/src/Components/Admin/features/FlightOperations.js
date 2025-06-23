import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPageStyles.css";

export default function AddFlight() {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    flightId: "",
    from: "",
    to: "",
    startTime: "",
    endTime: "",
    platinumCost: "",
    businessCost: "",
    economyCost: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState({
    date: "",
    status: "",
    flightId: "",
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/flights");
      const sorted = res.data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      setFlights(sorted);
    } catch (err) {
      console.error("Error fetching flights:", err);
    }
  };

  const resetForm = () => {
    setForm({
      flightId: "",
      from: "",
      to: "",
      startTime: "",
      endTime: "",
      platinumCost: "",
      businessCost: "",
      economyCost: "",
      status: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    const {
      flightId, from, to, startTime, endTime,
      platinumCost, businessCost, economyCost, status
    } = form;

    if (!flightId || !from || !to || !startTime || !endTime || !platinumCost || !businessCost || !economyCost || !status) {
      alert("Please fill all fields");
      return;
    }

    if ([platinumCost, businessCost, economyCost].some(c => Number(c) <= 0)) {
      alert("All class costs must be positive numbers");
      return;
    }

    const payload = {
      flightId, from, to, startTime, endTime, status,
      p_price: Number(platinumCost),
      b_price: Number(businessCost),
      e_price: Number(economyCost)
    };

    if (isEditing) {
      try {
        await axios.put(`http://localhost:5000/api/flights/${flightId}`, payload);
        fetchFlights();
        resetForm();
      } catch (err) {
        console.error("Error updating flight:", err);
        alert("Error updating flight");
      }
    } else {
      const existing = flights.find(f => f.flightId === flightId);
      if (existing) {
        alert("Flight with same ID already exists");
        return;
      }

      try {
        await axios.post("http://localhost:5000/api/flights", payload);
        fetchFlights();
        resetForm();
      } catch (err) {
        console.error("Error adding flight:", err);
        alert("Error adding flight");
      }
    }
  };

  const handleEditFlight = (flight) => {
    setForm({
      flightId: flight.flightId,
      from: flight.from,
      to: flight.to,
      startTime: flight.startTime,
      endTime: flight.endTime,
      platinumCost: flight.p_price,
      businessCost: flight.b_price,
      economyCost: flight.e_price,
      status: flight.status,
    });
    setIsEditing(true);
  };

  const handleDeleteFlight = async (flightId) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/flights/${flightId}`);
      fetchFlights();
    } catch (err) {
      console.error("Error deleting flight:", err);
      alert("Failed to delete flight");
    }
  };

  const minDateTime = new Date().toISOString().slice(0, 16);

  const filteredFlights = flights.filter(f => {
    const flightDate = new Date(f.startTime).toISOString().split('T')[0]; 
    const matchesDate = filter.date ? flightDate === filter.date : true;
    const matchesStatus = filter.status ? f.status === filter.status : true;
    const matchesFlightId = filter.flightId 
      ? String(f.flightId).toLowerCase().includes(filter.flightId.toLowerCase()) 
      : true;
    return matchesDate && matchesStatus && matchesFlightId;
  });

  return (
    <div className="admin-page">
      <h2>{isEditing ? "Edit Flight" : "Add New Flight"}</h2>

      <div className="admin-form">
        <div className="admin-form-grid">
          <input
            type="text"
            placeholder="Flight ID"
            value={form.flightId}
            onChange={e => setForm({ ...form, flightId: e.target.value })}
            disabled={isEditing}
          />
          <input
            type="text"
            placeholder="From"
            value={form.from}
            onChange={e => setForm({ ...form, from: e.target.value })}
          />
          <input
            type="text"
            placeholder="To"
            value={form.to}
            onChange={e => setForm({ ...form, to: e.target.value })}
          />
          <input
            type="datetime-local"
            value={form.startTime?.slice(0, 16)}
            onChange={e => setForm({ ...form, startTime: e.target.value })}
            min={minDateTime}
          />
          <input
            type="datetime-local"
            value={form.endTime?.slice(0, 16)}
            onChange={e => setForm({ ...form, endTime: e.target.value })}
            min={form.startTime || minDateTime}
          />
          <input
            type="number"
            placeholder="Platinum Cost"
            value={form.platinumCost}
            onChange={e => setForm({ ...form, platinumCost: e.target.value })}
          />
          <input
            type="number"
            placeholder="Business Cost"
            value={form.businessCost}
            onChange={e => setForm({ ...form, businessCost: e.target.value })}
          />
          <input
            type="number"
            placeholder="Economy Cost"
            value={form.economyCost}
            onChange={e => setForm({ ...form, economyCost: e.target.value })}
          />
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delayed">Delayed</option>
            <option value="Arrived">Arrived</option>
            <option value="Departed">Departed</option>
          </select>
        </div>

        <div className="admin-btn-group">
          <button onClick={handleSubmit} className="admin-btn admin-btn-primary">
            {isEditing ? "Update Flight" : "Add Flight"}
          </button>
          {isEditing && (
            <button onClick={resetForm} className="admin-btn admin-btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3>Upcoming Flights</h3>

      {/* Filter Controls */}
      <div className="admin-filter-group">
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delayed">Delayed</option>
          <option value="Arrived">Arrived</option>
          <option value="Departed">Departed</option>
        </select>
        <input
          type="text"
          placeholder="Flight ID"
          value={filter.flightId}
          onChange={(e) => setFilter({ ...filter, flightId: e.target.value })}
        />
      </div>

      {filteredFlights.length === 0 ? (
        <div className="admin-empty-state">
          <p>No flights match your criteria.</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Status</th>
                <th>Prices (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.slice(0, 20).map((flight) => {
                const departDate = new Date(flight.startTime).toLocaleDateString();
                const departTime = new Date(flight.startTime).toLocaleTimeString();
                const arrivalDate = new Date(flight.endTime).toLocaleDateString();
                const arrivalTime = new Date(flight.endTime).toLocaleTimeString();
                
                return (
                  <tr key={flight.flightId}>
                    <td>{flight.flightId}</td>
                    <td>{flight.from} → {flight.to}</td>
                    <td>
                      <div>{departDate}</div>
                      <div>{departTime}</div>
                    </td>
                    <td>
                      <div>{arrivalDate}</div>
                      <div>{arrivalTime}</div>
                    </td>
                    <td>
                      <span className={`status-tag status-${flight.status.toLowerCase()}`}>
                        {flight.status}
                      </span>
                    </td>
                    <td>
                      <div>P: {flight.p_price}</div>
                      <div>B: {flight.b_price}</div>
                      <div>E: {flight.e_price}</div>
                    </td>
                    <td className="admin-table-actions">
                      <button
                        onClick={() => handleEditFlight(flight)}
                        className="admin-btn admin-btn-warning"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFlight(flight.flightId)}
                        className="admin-btn admin-btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
