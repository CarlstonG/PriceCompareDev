import React, { useState } from 'react';
import DataGridComponent from './DataGridComponent'; // Import the DataGridComponent

const Dashboard = () => {
   const [showDataGrid, setShowDataGrid] = useState(false);

   // Function to handle showing the DataGridComponent and hiding the card
   const handleViewDataCompare = () => {
      setShowDataGrid(true);
   };

   // Function to handle going back to the card and hiding the grid
   const handleBack = () => {
      setShowDataGrid(false);
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
         {/* Conditionally render Card or DataGridComponent */}
         {!showDataGrid ? (
            <div className="card bg-white shadow-lg rounded-lg p-6 text-center w-full max-w-md">
               <h2 className="text-2xl font-bold mb-4">View Data Compare</h2>
               <p className="mb-4">Click to see data comparison in a grid.</p>
               <button
                  onClick={handleViewDataCompare}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300"
               >
                  Show Data Grid
               </button>
            </div>
         ) : (
            <div className="w-full">
               <div className="flex justify-between items-center mb-4">
                  <button
                     onClick={handleBack}
                     className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                     Back
                  </button>
                  <h2 className="text-xl font-bold">Data Comparison</h2>
               </div>
               {/* Show DataGridComponent */}
               <DataGridComponent />
            </div>
         )}
      </div>
   );
};

export default Dashboard;
