import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [user, setUser] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try{
        const decoded = jwtDecode(storedToken);
        const now = Date.now() / 1000; // in seconds

        if (decoded.exp < now) {
          // 🔴 Token expired — force logout
          handleLogout();
        } else {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Invalid token:', err);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setRedirectToLogin(true);
  };

  // 🔍 Custom wrapper to get route info inside Router
  const Main = () => {
    const location = useLocation();
    const showNavbar = user && !['/login', '/register'].includes(location.pathname);

    return (
      <>
        {showNavbar && <AppNavbar user={user} onLogout={handleLogout} />}

        <Routes>
          <Route path="/" element={
            user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } />
          <Route path="/login" element={
            user ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/home" replace /> : <Register onRegistered={() => window.location.href = '/login'} />
          } />
          <Route path="/home" element={
            user ? <Home user={user} /> : <Navigate to="/login" replace />
          } />
        </Routes>

        {redirectToLogin && <Navigate to="/login" replace />}
      </>
    );
  };

  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
