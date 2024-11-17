import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SSNavBar from './SSNavBar';

const SemSelect = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const navigate = useNavigate();

  const handleSelection = (event) => {
    const semester = event.target.value;
    setSelectedSemester(semester);
  };

  const handleViewPlan = () => {
    if (selectedSemester) {
      navigate('/plans'); 
    }
  };

  return (
    <div className="sem-select-page">
      <SSNavBar />
      <div className="sem-select-content">
        <h1>Select Semester</h1>
        <select value={selectedSemester} onChange={handleSelection}>
          <option value="" disabled>
            Select Semester
          </option>
          <option value="fall2025">Fall 2025</option>
          <option value="spring2025">Spring 2025</option>
          <option value="summer2025">Summer 2025</option>
        </select>
        <button onClick={handleViewPlan} disabled={!selectedSemester}>
          View Semester Plan
        </button>
      </div>
    </div>
  );
};

export default SemSelect;
