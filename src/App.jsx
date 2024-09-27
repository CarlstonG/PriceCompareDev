import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { MdWbSunny, MdNightsStay } from 'react-icons/md'; 
import 'devextreme/dist/css/dx.light.css';
import DataTable from './components/Ptable/DataTable'
import { signin } from './constants/signin';
import TableData from './components/TableData';

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
        const [theme, setTheme] = useState('light');
        const [isAuth, setIsAuth] = useState(false);
        const navigate = useNavigate(); // Use this to programmatically navigate

        // Use the signIn method from the constants file
        // Simulated sign-in function
        const handleSignIn = () => setIsAuth(true); 
        const handleLogout = () => {
          setIsAuth(false);
  };
  useEffect(() => {
    // Apply the theme on mount
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  // UseEffect to manage navigation based on authentication status
  useEffect(() => {
        if (isAuth) {
          // If the user is authenticated, they should not return to the sign-in page
          navigate('/tabledata', { replace: true });
        }
  }, [isAuth, navigate]);

  return (
      <>
      <header>
          <button onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <MdNightsStay /> : <MdWbSunny />}
        </button>
      </header>
          <Routes>
            <Route path="/" element={<Navigate to="/tabledata" />} />
            <Route path="/signin" element={!isAuth ? <SignIn handleSignIn={handleSignIn} /> : <Navigate to="/tabledata" />} />
            <Route
              path="/tabledata"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <div>
                    {/* <TableData /> */}
                    <DataTable/>
                    <br />
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
      </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
