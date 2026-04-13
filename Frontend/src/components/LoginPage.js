import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const success = await onLogin(username.trim(), password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="card login-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Secure Access</h2>
          <p className="card-subtitle">Enter your credentials to continue with Money Laser.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="field-label">Username</label>
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="field-label">Password</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="page-note" style={{ color: '#e29585' }}>{error}</div>}

        <button type="submit" className="button full-width" style={{ marginTop: '20px' }}>
          Login
        </button>
      </form>
      <p className="page-note">Use your backend credentials to authenticate.</p>
    </div>
  );
};

export default LoginPage;
