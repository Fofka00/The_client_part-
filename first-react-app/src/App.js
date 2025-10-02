import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expire = localStorage.getItem('expire');
    if (token && expire && new Date(expire) > new Date()) {
      setUser({ name: 'Алексей А.', currentTariff: 'beginner', avatar: '/avatar.jpg' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expire');
    setUser(null);
  };
  <Route
    path="/search"
    element={
      <ProtectedRoute user={user}>
        <SearchPage user={user} handleLogout={handleLogout} />
      </ProtectedRoute>
    }
  />

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/search" element={<SearchPage user={user} handleLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
  
}

export default App;