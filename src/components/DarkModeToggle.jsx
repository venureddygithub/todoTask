/* eslint-disable react/prop-types */
// import React from 'react';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="btn btn-secondary mb-4"
    >
      Toggle {darkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default DarkModeToggle;
