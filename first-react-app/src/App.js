import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expire = localStorage.getItem('expire');
    if (token && expire && new Date(expire) > new Date()) {
      setUser({ name: 'Алексей А.', currentTariff: '...', avatar: '...' });
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expire');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/search" element={<SearchPage user={user} loading={loading} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;