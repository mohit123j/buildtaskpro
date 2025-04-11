import React, { useState, useEffect } from 'react';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' or 'register'

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return view === 'register'
      ? <Register onRegistered={() => setView('login')} />
      : <Login onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
  }

  return (
    <>
      <AppNavbar user={user} onLogout={handleLogout} />
      <Home user={user} />
    </>
  );
};

export default App;
