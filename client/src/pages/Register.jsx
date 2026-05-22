import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '', password: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'নিবন্ধন ব্যর্থ হয়েছে');
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
        <h2>নিবন্ধন করুন</h2>
        <p className="subtitle">নতুন অ্যাকাউন্ট তৈরি করুন</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>পূর্ণ নাম</label>
            <input placeholder="আপনার নাম" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>ফোন নম্বর</label>
            <input type="tel" placeholder="০১XXXXXXXXX" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>ঠিকানা</label>
            <input placeholder="গ্রাম / উপজেলা / জেলা" value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label>পাসওয়ার্ড</label>
            <input type="password" placeholder="কমপক্ষে ৬ অক্ষর" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন →'}
          </button>
        </form>

        <div className="auth-link">
          আগেই আছেন? <Link to="/login">লগইন করুন</Link>
        </div>
      </div>
    </div>
  );
}
