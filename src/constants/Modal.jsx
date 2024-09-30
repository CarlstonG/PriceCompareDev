// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null; // Do not render the modal if it is not open

  return (
    <div style={{
      position: 'fixed', // Fixes the modal to the viewport
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000, // Ensures the modal appears above other content
    }}>
      <div style={{
        backgroundColor: 'white', // Modal background color
        padding: '20px',
        borderRadius: '5px',
        width: '80%', // Responsive width
        maxWidth: '600px', // Maximum width to prevent it from getting too large
      }}>
        <h2>Details</h2>
        {/* Render the details fetched for the modal here */}
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre> // Display data as JSON for now
        ) : (
          <p>No data available.</p>
        )}
        <button onClick={onClose}>Close</button> {/* Button to close the modal */}
      </div>
    </div>
  );
};

export default Modal;
