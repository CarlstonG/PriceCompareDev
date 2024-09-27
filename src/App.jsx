import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import 'devextreme/dist/css/dx.light.css';
import TableData from './components/TableData';
import { signin } from './constants/signin';

// SignIn component
const SignIn = ({ handleSignIn }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const onSignIn = () => {
    handleSignIn();
    navigate('/tabledata', { replace: true }); // Navigate and replace history
  };

  return (
    <div>
      <h2>Please Sign In</h2>
      <button onClick={onSignIn}>Sign In</button>
    </div>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ children, isAuth }) => {
  return isAuth ? children : <Navigate to="/signin" />;
};

const App = () => {
        const [isAuth, setIsAuth] = useState(false);
        const navigate = useNavigate(); // Use this to programmatically navigate

        // Use the signIn method from the constants file
        // Simulated sign-in function
        const handleSignIn = () => setIsAuth(true); 
        const handleLogout = () => {
          setIsAuth(false);
  };

  // UseEffect to manage navigation based on authentication status
  useEffect(() => {
        if (isAuth) {
          // If the user is authenticated, they should not return to the sign-in page
          navigate('/tabledata', { replace: true });
        }
  }, [isAuth, navigate]);

  return (
          <Routes>
            <Route path="/" element={<Navigate to="/tabledata" />} />
            <Route path="/signin" element={!isAuth ? <SignIn handleSignIn={handleSignIn} /> : <Navigate to="/tabledata" />} />
            <Route
              path="/tabledata"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <div>
                    <TableData />
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
