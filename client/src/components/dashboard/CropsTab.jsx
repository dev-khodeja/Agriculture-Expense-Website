import { useState, useEffect } from 'react';
import axios from 'axios';

const statusColor = { 'পরিকল্পিত': 'badge-blue', 'চলমান': 'badge-green', 'কাটা হয়েছে': 'badge-amber' };

export default function CropsTab() {
  const [crops, setCrops] = useState([]);
  const [farms, setFarms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', farm: '', plantingDate: '', expectedHarvestDate: '', status: 'পরিকল্পিত', notes: '' });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const [c, f] = await Promise.all([axios.get('/api/crops'), axios.get('/api/farms')]);
    setCrops(c.data); setFarms(f.data);
    if (f.data.length > 0) setForm(prev => ({ ...prev, farm: f.data[0]._id }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/crops', form);
      setShowModal(false);
      fetchAll();
    } catch (err) { alert(err.response?.data?.message || 'ত্রুটি'); }
  };

  const handleStatusChange = async (id, status) => {
    await axios.put(`/api/crops/${id}`, { status });
    fetchAll();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('এই ফসল মুছবেন?')) return;
    await axios.delete(`/api/crops/${id}`);
    fetchAll();
  };

  return (
    <>
      <div className="page-header">
        <h2>ফসল ব্যবস্থাপনা</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ নতুন ফসল</button>
      </div>

      {crops.length === 0
        ? <div className="empty-state"><div className="icon">🌾</div><p>এখনো কোনো ফসল যুক্ত করেননি</p></div>
        : (
          <div className="dash-box">
            <div className="table-wrap">
              <table>
                <thead><tr><th>ফসল</th><th>জমি</th><th>রোপণ</th><th>ফসল কাটা</th><th>স্ট্যাটাস</th><th>কাজ</th></tr></thead>
                <tbody>
                  {crops.map(c => (
                    <tr key={c._id}>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.farm?.name || '—'}</td>
                      <td>{c.plantingDate ? new Date(c.plantingDate).toLocaleDateString('bn-BD') : '—'}</td>
                      <td>{c.expectedHarvestDate ? new Date(c.expectedHarvestDate).toLocaleDateString('bn-BD') : '—'}</td>
                      <td>
                        <select value={c.status} onChange={e => handleStatusChange(c._id, e.target.value)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13 }}>
                          {['পরিকল্পিত', 'চলমান', 'কাটা হয়েছে'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td><button className="btn btn-danger" style={{ padding: '3px 8px', fontSize: 12 }} onClick={() => handleDelete(c._id)}>মুছুন</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>নতুন ফসল যুক্ত করুন</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group"><label>ফসলের নাম</label>
                <input placeholder="যেমন: আমন ধান, গম, সরিষা" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="form-group"><label>জমি বেছে নিন</label>
                <select value={form.farm} onChange={e => setForm({ ...form, farm: e.target.value })} required>
                  {farms.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
                </select></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="form-group"><label>রোপণের তারিখ</label>
                  <input type="date" value={form.plantingDate} onChange={e => setForm({ ...form, plantingDate: e.target.value })} /></div>
                <div className="form-group"><label>ফসল কাটার তারিখ</label>
                  <input type="date" value={form.expectedHarvestDate} onChange={e => setForm({ ...form, expectedHarvestDate: e.target.value })} /></div>
              </div>
              <div className="form-group"><label>নোট</label>
                <input placeholder="অতিরিক্ত তথ্য" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>বাতিল</button>
                <button type="submit" className="btn btn-primary">সংরক্ষণ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
