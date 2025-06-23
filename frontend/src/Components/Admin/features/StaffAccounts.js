import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPageStyles.css";

export default function AddStaff() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    joinDate: "",
    status: "active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const positions = ["Pilot", "Co-Pilot", "Ground Staff", "Technical", "Administration"];
  const departments = ["Flight Operations", "Technical", "Administration"];

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/staff");
      setStaff(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      joinDate: "",
      status: "active",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const { name, position, department, email, phone, joinDate, status } = form;

    if (!name || !position || !department || !email || !phone || !joinDate || !status) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/staff/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/staff", form);
      }
      fetchStaff();
      resetForm();
    } catch (err) {
      console.error("Error saving staff:", err);
      alert("Failed to save staff data.");
    }
  };

  const handleEdit = (staff) => {
    setForm(staff);
    setEditingId(staff._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/staff/${id}`);
      fetchStaff();
    } catch (err) {
      console.error("Error deleting staff:", err);
      alert("Failed to delete staff.");
    }
  };

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.position.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h2>{isEditing ? "Edit Staff Member" : "Add New Staff Member"}</h2>

      <div className="admin-form">
        <div className="admin-form-grid">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <select
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          >
            <option value="">Select Position</option>
            {positions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="date"
            placeholder="Join Date"
            value={form.joinDate}
            onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="admin-btn-group">
          <button onClick={handleSubmit} className="admin-btn admin-btn-primary">
            {isEditing ? "Update Staff" : "Add Staff"}
          </button>
          {isEditing && (
            <button onClick={resetForm} className="admin-btn admin-btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search staff by name, position, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search"
        />
      </div>

      <h3>Staff Members</h3>

      {filteredStaff.length === 0 ? (
        <div className="admin-empty-state">
          <p>No staff members found.</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.position}</td>
                  <td>{s.department}</td>
                  <td>
                    <div>{s.email}</div>
                    <div>{s.phone}</div>
                  </td>
                  <td>{s.joinDate}</td>
                  <td>
                    <span className={`status-tag status-${s.status.toLowerCase()}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="admin-table-actions">
                    <button
                      onClick={() => handleEdit(s)}
                      className="admin-btn admin-btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="admin-btn admin-btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
