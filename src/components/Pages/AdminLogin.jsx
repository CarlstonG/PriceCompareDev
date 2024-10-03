import React from 'react'

const AdminLogin = ({handleLoginRedirect}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <h3 className="text-center font-bold p-3 text-lg mt-1">You are not Authorize! Please login...</h3>
    <h1 className="text-center font-bold p-3 text-lg mt-1">Admin Login</h1>
    
    <button
      onClick={handleLoginRedirect}
      className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-64 hover:bg-blue-700 transition-colors"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
        alt="Microsoft Logo"
        className="h-6 w-6 mr-2"
      />
      Sign in with Microsoft
    </button>
  </div>
  )
}

export default AdminLogin

