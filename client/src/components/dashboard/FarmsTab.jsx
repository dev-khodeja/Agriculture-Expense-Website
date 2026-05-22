import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FarmsTab() {
  const [farms, setFarms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', size: '', sizeUnit: 'বিঘা', soilType: 'দোআঁশ', notes: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchFarms(); }, []);

  const fetchFarms = async () => {
    const { data } = await axios.get('/api/farms');
    setFarms(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/farms', form);
      setShowModal(false);
      setForm({ name: '', location: '', size: '', sizeUnit: 'বিঘা', soilType: 'দোআঁশ', notes: '' });
      fetchFarms();
    } catch (err) {
      alert(err.response?.data?.message || 'ত্রুটি হয়েছে');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('এই জমি মুছে ফেলবেন?')) return;
    await axios.delete(`/api/farms/${id}`);
    fetchFarms();
  };

  return (
    <>
      <div className="page-header">
        <h2>আমার জমি</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ নতুন জমি</button>
      </div>

      {farms.length === 0
        ? <div className="empty-state"><div className="icon">🗺️</div><p>এখনো কোনো জমি যুক্ত করেননি</p></div>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {farms.map(f => (
              <div key={f._id} className="feat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{f.name}</div>
                    <div style={{ fontSize: 13, color: '#5a7a5a' }}>{f.location || 'অবস্থান উল্লেখ নেই'}</div>
                  </div>
                  <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => handleDelete(f._id)}>মুছুন</button>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {f.size && <span className="task-badge badge-green">{f.size} {f.sizeUnit}</span>}
                  <span className="task-badge badge-blue">{f.soilType} মাটি</span>
                </div>
                {f.notes && <p style={{ fontSize: 13, color: '#5a7a5a', marginTop: 8 }}>{f.notes}</p>}
              </div>
            ))}
          </div>
        )
      }

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>নতুন জমি যুক্ত করুন</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group"><label>জমির নাম</label>
                <input placeholder="যেমন: উত্তরের মাঠ" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label>অবস্থান</label>
                <input placeholder="গ্রাম / এলাকা" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="form-group"><label>আকার</label>
                  <input type="number" placeholder="০" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} /></div>
                <div className="form-group"><label>একক</label>
                  <select value={form.sizeUnit} onChange={e => setForm({ ...form, sizeUnit: e.target.value })}>
                    {['বিঘা', 'একর', 'শতক', 'হেক্টর'].map(u => <option key={u}>{u}</option>)}
                  </select></div>
              </div>
              <div className="form-group"><label>মাটির ধরন</label>
                <select value={form.soilType} onChange={e => setForm({ ...form, soilType: e.target.value })}>
                  {['এঁটেল', 'বেলে', 'দোআঁশ', 'পলি'].map(s => <option key={s}>{s}</option>)}
                </select></div>
              <div className="form-group"><label>নোট</label>
                <input placeholder="অতিরিক্ত তথ্য" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>বাতিল</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'সংরক্ষণ...' : 'সংরক্ষণ করুন'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
