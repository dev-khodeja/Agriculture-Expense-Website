import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'লগইন ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1D9E75' }}></div>
          <span style={{ fontWeight: 600, color: '#0F6E56' }}>কৃষি স্মার্ট</span>
        </div>
        <h2>লগইন করুন</h2>
        <p className="subtitle">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ফোন নম্বর</label>
            <input
              type="tel" placeholder="০১XXXXXXXXX"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>পাসওয়ার্ড</label>
            <input
              type="password" placeholder="পাসওয়ার্ড দিন"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন →'}
          </button>
        </form>

        <div className="auth-link">
          অ্যাকাউন্ট নেই? <Link to="/register">নিবন্ধন করুন</Link>
        </div>
      </div>
    </div>
  );
}
