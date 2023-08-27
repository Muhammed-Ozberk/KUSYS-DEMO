import React, { useState } from 'react';
import axios from 'axios';
import './AddStudentPopup.css'; // Import your stylesheet for this component
import config from '../../../config/config';

export default function AddStudentPopup({ onClose, onAddStudent }) {
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    birthDay: '',
    email: '',
    password: '',
  });
  const baseUrl = config.baseUrl; // Base URL for API requests

  // Handles changes in input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Handles the "Add" button click
  const handleAddClick = () => {
    const token = localStorage.getItem('authToken'); // Retrieve the authentication token

    axios.post(`${baseUrl}/users/create`, newStudent, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // Handle success
      onAddStudent(newStudent); // Inform the parent component about the added student
      setNewStudent({
        firstName: '',
        lastName: '',
        birthDay: '',
        email: '',
        password: '',
      });
    })
    .catch((error) => {
      // Handle error
      console.error('Error adding student:', error);
    });
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Add Student</h2>
        <label>First Name:</label>
        <input type="text" name="firstName" value={newStudent.firstName} onChange={handleInputChange} />
        <label>Last Name:</label>
        <input type="text" name="lastName" value={newStudent.lastName} onChange={handleInputChange} />
        <label>Email :</label>
        <input type="email" name="email" value={newStudent.email} onChange={handleInputChange} />
        <label>Password :</label>
        <input type="text" name="password" value={newStudent.password} onChange={handleInputChange} />
        <label>Birth Date:</label>
        <input type="date" name="birthDay" value={newStudent.birthDay} onChange={handleInputChange} />
        <div className="button-container">
          <button onClick={handleAddClick}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
