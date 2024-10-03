import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p>Your modal content goes here.</p>
        <div className="mt-4">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
