import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import SummaryPage from './pages/SummaryPage';

function App() {
  const [limits, setLimits] = useState(null);
  const [loadingLimits, setLoadingLimits] = useState(true);
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
  useEffect(() => {
    if (!user) {
      setLimits(null);
      setLoadingLimits(false);
      return;
    }
    setLoadingLimits(true);
    fetch('http://localhost:3001/account/limits')
      .then(res => res.json())
      .then(data => setLimits(data))
      .catch(() => setLimits(null))
      .finally(() => setLoadingLimits(false));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expire');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} limits={limits} loadingLimits={loadingLimits} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/search" element={<SearchPage user={user} loading={loading} onLogout={handleLogout} limits={limits} loadingLimits={loadingLimits} />} />
        <Route path="/summary" element={<SummaryPage user={user} loading={loading} onLogout={handleLogout} limits={limits} loadingLimits={loadingLimits} />} />
      </Routes>
    </Router>
  );
}

export default App;