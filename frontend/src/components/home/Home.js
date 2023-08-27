import React, { useState } from 'react';
import './Home.css';
import DetailStudentPopup from '../popup/detailStudentPopup/DetailStudentPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddStudentPopup from '../popup/addStudentPopup/AddStudentPopup';
import CourseMatching from '../courseMatching/CourseMatching';
import StudentsList from '../list/studentsList/StudentsList';
import MatchesList from '../list/matchesList/MatchesList';

export default function Home() {
    // State variables
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
    const [isMatchingPopupOpen, setIsMatchingPopupOpen] = useState(false);
    const [displayOption, setDisplayOption] = useState('students');
    const [matchedStudents] = useState([]);
    const [isAdmin] = useState(localStorage.getItem('isAdmin')); 

    // Event handlers
    const handleStudentClick = (student) => {
        setSelectedStudent(student);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
    };

    const handleUpdateStudent = (updatedStudent) => {
        window.location.reload();
        setSelectedStudent(null);
    };

    const handleDeleteStudent = (studentId) => {
        window.location.reload();
        setSelectedStudent(null);
    };

    const handleAddStudentClick = () => {
        setIsAddStudentOpen(true);
    };

    const handleAddStudentClose = () => {
        setIsAddStudentOpen(false);
    };

    const handleAddStudent = (newStudent) => {
        window.location.reload();
        setIsAddStudentOpen(false); 
    };

    const handleMatchStudentClick = () => {
        setIsMatchingPopupOpen(true);
    };

    const handleMatchStudentClose = () => {
        setIsMatchingPopupOpen(false);
    };

    const handleMatchStudent = () => {
        window.location.reload();
        setIsMatchingPopupOpen(false); 
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        window.location.reload();
    };

    return (
        <div className="container">
            {/* Options bar */}
            <div className="options-bar">
                <button className="button match-button" onClick={handleMatchStudentClick}>
                    Match Course
                </button>
                {(isAdmin === true || isAdmin === "true") && (
                    <button className="button add-button" onClick={handleAddStudentClick}>
                        <FontAwesomeIcon icon={faPlus} /> Add Student
                    </button>
                )}
                <select
                    className="display-option"
                    value={displayOption}
                    onChange={(e) => setDisplayOption(e.target.value)}
                >
                    <option value="students">Students List</option>
                    <option value="matches">Matched Students List</option>
                </select>
                <button className="button logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Main content */}
            <div className="content">
                {displayOption === 'students' && (
                    <StudentsList onStudentClick={handleStudentClick} />
                )}
                {displayOption === 'matches' && (
                    <MatchesList matches={matchedStudents} />
                )}
            </div>

            {/* Detail Student Popup */}
            {selectedStudent && (
                <DetailStudentPopup
                    student={selectedStudent}
                    isAdmin={isAdmin}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateStudent}
                    onDelete={handleDeleteStudent}
                />
            )}

            {/* Add Student Popup */}
            {isAddStudentOpen && (
                <AddStudentPopup onClose={handleAddStudentClose} onAddStudent={handleAddStudent} />
            )}

            {/* Course Matching Popup */}
            {isMatchingPopupOpen && (
                <CourseMatching
                    isAdmin={isAdmin}
                    onClose={handleMatchStudentClose}
                    onMatch={handleMatchStudent}
                />
            )}
        </div>
    );
}
