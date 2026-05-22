import { useState, useEffect } from 'react';
import axios from 'axios';

const typeColor = { 'সার': 'badge-green', 'সেচ': 'badge-blue', 'ফসল কাটা': 'badge-amber', 'পরিদর্শন': 'badge-red', 'অন্যান্য': '' };

export default function TasksTab() {
  const [tasks, setTasks] = useState([]);
  const [farms, setFarms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'অন্যান্য', farm: '', dueDate: '' });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const [t, f] = await Promise.all([axios.get('/api/tasks'), axios.get('/api/farms')]);
    setTasks(t.data); setFarms(f.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', form);
      setShowModal(false);
      setForm({ title: '', type: 'অন্যান্য', farm: '', dueDate: '' });
      fetchAll();
    } catch (err) { alert(err.response?.data?.message || 'ত্রুটি'); }
  };

  const toggleTask = async (id) => {
    await axios.patch(`/api/tasks/${id}/toggle`);
    fetchAll();
  };

  const deleteTask = async (id) => {
    if (!window.confirm('এই কাজ মুছবেন?')) return;
    await axios.delete(`/api/tasks/${id}`);
    fetchAll();
  };

  const pending = tasks.filter(t => !t.completed);
  const done = tasks.filter(t => t.completed);

  return (
    <>
      <div className="page-header">
        <h2>কাজের তালিকা</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ নতুন কাজ</button>
      </div>

      {tasks.length === 0
        ? <div className="empty-state"><div className="icon">📅</div><p>কোনো কাজ নেই</p></div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pending.length > 0 && (
              <div className="dash-box">
                <h3>বাকি কাজ ({pending.length})</h3>
                {pending.map(t => (
                  <div key={t._id} className="task-item">
                    <input type="checkbox" checked={false} onChange={() => toggleTask(t._id)} style={{ cursor: 'pointer' }} />
                    <div className="task-info">
                      <div className="task-title">{t.title}</div>
                      <div className="task-meta">{t.farm?.name} • {new Date(t.dueDate).toLocaleDateString('bn-BD')}</div>
                    </div>
                    <span className={`task-badge ${typeColor[t.type]}`}>{t.type}</span>
                    <button className="btn btn-danger" style={{ padding: '3px 8px', fontSize: 12 }} onClick={() => deleteTask(t._id)}>মুছুন</button>
                  </div>
                ))}
              </div>
            )}
            {done.length > 0 && (
              <div className="dash-box">
                <h3>সম্পন্ন কাজ ({done.length})</h3>
                {done.map(t => (
                  <div key={t._id} className="task-item" style={{ opacity: 0.6 }}>
                    <input type="checkbox" checked={true} onChange={() => toggleTask(t._id)} style={{ cursor: 'pointer' }} />
                    <div className="task-info">
                      <div className="task-title" style={{ textDecoration: 'line-through' }}>{t.title}</div>
                      <div className="task-meta">{t.farm?.name}</div>
                    </div>
                    <button className="btn btn-danger" style={{ padding: '3px 8px', fontSize: 12 }} onClick={() => deleteTask(t._id)}>মুছুন</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>নতুন কাজ যুক্ত করুন</h3>
            <form onSubmit={handleAdd}>
              <div className="form-group"><label>কাজের বিবরণ</label>
                <input placeholder="কী করতে হবে?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div className="form-group"><label>ধরন</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  {['সার', 'সেচ', 'ফসল কাটা', 'পরিদর্শন', 'অন্যান্য'].map(t => <option key={t}>{t}</option>)}
                </select></div>
              <div className="form-group"><label>জমি (ঐচ্ছিক)</label>
                <select value={form.farm} onChange={e => setForm({ ...form, farm: e.target.value })}>
                  <option value="">— জমি বেছে নিন —</option>
                  {farms.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
                </select></div>
              <div className="form-group"><label>তারিখ</label>
                <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required /></div>
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
