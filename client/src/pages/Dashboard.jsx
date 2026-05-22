import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FarmsTab from '../components/dashboard/FarmsTab';
import CropsTab from '../components/dashboard/CropsTab';
import TasksTab from '../components/dashboard/TasksTab';
import ExpensesTab from '../components/dashboard/ExpensesTab';

const tabs = [
  { id: 'home', label: '🏠 হোম', icon: '🏠' },
  { id: 'farms', label: '🗺️ জমি', icon: '🗺️' },
  { id: 'crops', label: '🌾 ফসল', icon: '🌾' },
  { id: 'tasks', label: '📅 কাজ', icon: '📅' },
  { id: 'expenses', label: '💰 খরচ', icon: '💰' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (activeTab === 'home') fetchSummary();
  }, [activeTab]);

  const fetchSummary = async () => {
    try {
      const { data } = await axios.get('/api/dashboard/summary');
      setSummary(data);
    } catch { }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'ক';

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-dot"></div>
          কৃষি স্মার্ট
        </div>
        <div className="sidebar-nav">
          {tabs.map(t => (
            <button key={t.id} className={activeTab === t.id ? 'active' : ''}
              onClick={() => setActiveTab(t.id)}>
              <span>{t.icon}</span> {t.label.split(' ')[1]}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <button onClick={handleLogout} style={{ color: '#A32D2D' }}>
            🚪 লগআউট
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="main-content">
        <div className="topbar">
          <h1>{tabs.find(t => t.id === activeTab)?.label || 'ড্যাশবোর্ড'}</h1>
          <div className="topbar-user">
            <span style={{ fontSize: 14, color: '#5a7a5a' }}>{user?.name}</span>
            <div className="avatar">{initials}</div>
          </div>
        </div>

        <div className="content-area">
          {activeTab === 'home' && <HomeTab summary={summary} />}
          {activeTab === 'farms' && <FarmsTab />}
          {activeTab === 'crops' && <CropsTab />}
          {activeTab === 'tasks' && <TasksTab />}
          {activeTab === 'expenses' && <ExpensesTab />}
        </div>
      </div>
    </div>
  );
}

function HomeTab({ summary }) {
  if (!summary) return <div style={{ color: '#5a7a5a', padding: '2rem' }}>লোড হচ্ছে...</div>;

  const typeColor = { 'সার': '#1D9E75', 'সেচ': '#185FA5', 'ফসল কাটা': '#BA7517', 'পরিদর্শন': '#534AB7', 'অন্যান্য': '#888' };

  return (
    <>
      <div className="dash-cards">
        <div className="dash-card">
          <div className="dash-card-label">মোট জমি</div>
          <div className="dash-card-val green">{summary.totalFarms}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">সক্রিয় ফসল</div>
          <div className="dash-card-val green">{summary.activeCrops}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">আজকের কাজ</div>
          <div className="dash-card-val amber">{summary.todayTaskCount}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">মোট খরচ</div>
          <div className="dash-card-val blue" style={{ fontSize: 20 }}>৳ {summary.totalExpense.toLocaleString('bn-BD')}</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-box">
          <h3>আজকের কাজ</h3>
          {summary.todayTasks.length === 0
            ? <p style={{ color: '#5a7a5a', fontSize: 14 }}>আজ কোনো কাজ নেই 🎉</p>
            : summary.todayTasks.map(t => (
              <div key={t._id} className="task-item">
                <div className="task-dot" style={{ background: typeColor[t.type] || '#888' }}></div>
                <div className="task-info">
                  <div className="task-title">{t.title}</div>
                  <div className="task-meta">{t.farm?.name} • {t.type}</div>
                </div>
              </div>
            ))
          }
        </div>

        <div className="dash-box">
          <h3>দ্রুত নির্দেশিকা</h3>
          {[
            { icon: '🌱', text: 'জমি যুক্ত করে শুরু করুন' },
            { icon: '🌾', text: 'ফসল ট্যাবে ফসল যোগ করুন' },
            { icon: '📅', text: 'কাজের রিমাইন্ডার সেট করুন' },
            { icon: '💰', text: 'প্রতিদিনের খরচ লিখুন' },
          ].map(g => (
            <div key={g.text} className="task-item">
              <span style={{ fontSize: 18 }}>{g.icon}</span>
              <span style={{ fontSize: 14 }}>{g.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
