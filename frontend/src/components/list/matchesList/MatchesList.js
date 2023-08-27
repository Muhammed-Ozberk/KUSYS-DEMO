import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MatchesList.css'; // Import your stylesheet for this component
import config from '../../../config/config';

const MatchesList = () => {
    const [matches, setMatches] = useState([]); // State to store matched students
    const jwtToken = localStorage.getItem('authToken'); 
    const baseUrl = config.baseUrl; // Base URL for API requests

    useEffect(() => {
        if (jwtToken) {
            const headers = {
                Authorization: `Bearer ${jwtToken}` 
            };

            // Fetch matched student-course data from the API
            axios.get(`${baseUrl}/courses/match`, { headers })  
                .then(response => {
                    setMatches(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [jwtToken, baseUrl]);

    return (
        <div className="matches-list">
            <h2 className="matches-title">Matched Students List</h2>
            {/* Table to display matched student-course data */}
            <table className="matches-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Course ID</th>
                        <th>Course Name</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match) => (
                        <tr key={match.studentID}>
                            <td>{match.studentID}</td>
                            <td>{match.firstName}</td>
                            <td>{match.courseID}</td>
                            <td>{match.courseName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchesList;
