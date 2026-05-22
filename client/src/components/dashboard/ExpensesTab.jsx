import { useState, useEffect } from 'react';
import axios from 'axios';

const catColor = { 'বীজ': 'badge-green', 'সার': 'badge-blue', 'শ্রমিক': 'badge-amber', 'সেচ': 'badge-red', 'কীটনাশক': 'badge-red', 'অন্যান্য': '' };

export default function ExpensesTab() {
  const [expenses, setExpenses] = useState([]);
  const [farms, setFarms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: 'বীজ', amount: '', farm: '', note: '', date: new Date().toISOString().split('T')[0] });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const [e, f] = await Promise.all([axios.get('/api/expenses'), axios.get('/api/farms')]);
    setExpenses(e.data); setFarms(f.data);
  };

  const handleAdd = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post('/api/expenses', form);
      setShowModal(false);
      setForm({ category: 'বীজ', amount: '', farm: '', note: '', date: new Date().toISOString().split('T')[0] });
      fetchAll();
    } catch (err) { alert(err.response?.data?.message || 'ত্রুটি'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('এই খরচ মুছবেন?')) return;
    await axios.delete(`/api/expenses/${id}`);
    fetchAll();
  };

  const total = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  // Summary by category
  const summary = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + (Number(e.amount) || 0);
    return acc;
  }, {});

  return (
    <>
      <div className="page-header">
        <h2>খরচ ব্যবস্থাপনা</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ নতুন খরচ</button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        <div className="dash-card">
          <div className="dash-card-label">মোট খরচ</div>
          <div className="dash-card-val blue" style={{ fontSize: 22 }}>৳ {(Number(total) || 0).toLocaleString('bn-BD')}</div>
        </div>
        {Object.entries(summary).map(([cat, amt]) => (
          <div key={cat} className="dash-card">
            <div className="dash-card-label">{cat}</div>
            <div className="dash-card-val" style={{ fontSize: 18 }}>৳ {(Number(amt) || 0).toLocaleString('bn-BD')}</div>
          </div>
        ))}
      </div>

      {expenses.length === 0
        ? <div className="empty-state"><div className="icon">💰</div><p>কোনো খরচ নেই</p></div>
        : (
          <div className="dash-box">
            <div className="table-wrap">
              <table>
                <thead><tr><th>তারিখ</th><th>ধরন</th><th>পরিমাণ</th><th>জমি</th><th>নোট</th><th></th></tr></thead>
                <tbody>
                  {expenses.map(e => (
                    <tr key={e._id}>
                      <td>{new Date(e.date).toLocaleDateString('bn-BD')}</td>
                      <td><span className={`task-badge ${catColor[e.category]}`}>{e.category}</span></td>
                      <td><strong>৳ {(Number(e.amount) || 0).toLocaleString('bn-BD')}</strong></td>
                      <td>{e.farm?.name || '—'}</td>
                      <td style={{ color: '#5a7a5a', fontSize: 13 }}>{e.note || '—'}</td>
                      <td><button className="btn btn-danger" style={{ padding: '3px 8px', fontSize: 12 }} onClick={() => handleDelete(e._id)}>মুছুন</button></td>
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
            <h3>নতুন খরচ যুক্ত করুন</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group"><label>খরচের ধরন</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {['বীজ', 'সার', 'শ্রমিক', 'সেচ', 'কীটনাশক', 'অন্যান্য'].map(c => <option key={c}>{c}</option>)}
                </select></div>
              <div className="form-group"><label>পরিমাণ (টাকা)</label>
                <input type="number" placeholder="০" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required /></div>
              <div className="form-group"><label>জমি (ঐচ্ছিক)</label>
                <select value={form.farm} onChange={e => setForm({ ...form, farm: e.target.value })}>
                  <option value="">— জমি বেছে নিন —</option>
                  {farms.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
                </select></div>
              <div className="form-group"><label>তারিখ</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></div>
              <div className="form-group"><label>নোট</label>
                <input placeholder="অতিরিক্ত তথ্য" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} /></div>
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
