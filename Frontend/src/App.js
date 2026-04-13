// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import LoginPage from './components/LoginPage';

import './App.css';

const App = () => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || '');
  const isAuthenticated = !!authToken;

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [authToken]);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken('');
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="app-container">
      <Router>
        <nav className="navbar">
          <h1 className="navbar-title">Money Laser</h1>
          <div className="navbar-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/" className="nav-button">Add Client</Link>
                <Link to="/users" className="nav-button">View Clients</Link>
                <button type="button" onClick={handleLogout} className="nav-button logout-button">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-button">Login</Link>
            )}
          </div>
        </nav>

        <main className="main-panel">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/" element={<PrivateRoute><UserForm /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
            <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
