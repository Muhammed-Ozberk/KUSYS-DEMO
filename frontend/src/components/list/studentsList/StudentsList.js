import React, { useState, useEffect } from 'react';
import './StudentsList.css'; // Import your stylesheet for this component
import axios from 'axios';
import config from '../../../config/config';

const StudentsList = ({ onStudentClick }) => {
    const [students, setStudents] = useState([]); // State to store student data
    const jwtToken = localStorage.getItem('authToken'); 
    const baseUrl = config.baseUrl; // Base URL for API requests

    useEffect(() => {
        if (jwtToken) {
            // Fetch student data from the API
            axios.get(`${baseUrl}/users`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                setStudents(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
        }
    }, [jwtToken, baseUrl]);

    return (
        <div className="students-list">
            <h2 className="students-title">Students List</h2>
            {/* Table to display student data */}
            <table className="students-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        // Clickable row to handle student selection
                        <tr key={student.studentID} onClick={() => onStudentClick(student)}>
                            <td>{student.studentID}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.birthDay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsList;
