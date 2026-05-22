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
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    if (activeTab === 'home') fetchSummary();
  }, [activeTab]);

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const { data } = await axios.get('/api/dashboard/summary');
      // নিরাপদে সেট করা – যদি data null বা অবজেক্ট না হয়, তাহলে fallback
      if (data && typeof data === 'object') {
        setSummary(data);
      } else {
        setSummary({});
      }
    } catch (err) {
      console.error('Summary fetch error:', err);
      setSummary({}); // fallback empty object
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // ব্যবহারকারীর নাম থেকে initials বের করা – নিরাপদ
  const getUserInitials = () => {
    if (!user?.name) return 'ক';
    const nameParts = user.name.split(' ');
    if (Array.isArray(nameParts)) {
      const initials = nameParts.map(w => w[0]).join('').slice(0, 2).toUpperCase();
      return initials || 'ক';
    }
    return 'ক';
  };
  const initials = getUserInitials();

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
            <span style={{ fontSize: 14, color: '#5a7a5a' }}>{user?.name || ''}</span>
            <div className="avatar">{initials}</div>
          </div>
        </div>

        <div className="content-area">
          {activeTab === 'home' && (
            <HomeTab 
              summary={summary} 
              loading={loadingSummary} 
            />
          )}
          {activeTab === 'farms' && <FarmsTab />}
          {activeTab === 'crops' && <CropsTab />}
          {activeTab === 'tasks' && <TasksTab />}
          {activeTab === 'expenses' && <ExpensesTab />}
        </div>
      </div>
    </div>
  );
}

// ===================== HomeTab Component with full error handling =====================
function HomeTab({ summary, loading }) {
  // loading state
  if (loading) {
    return <div style={{ color: '#5a7a5a', padding: '2rem' }}>লোড হচ্ছে...</div>;
  }
  if (!summary || typeof summary !== 'object') {
    return <div style={{ color: '#5a7a5a', padding: '2rem' }}>কোনো ডাটা নেই</div>;
  }

  // সুরক্ষিতভাবে সব ভ্যালু বের করা – নিশ্চিত করা যে এরা অ্যারে বা সংখ্যা
  const totalFarms = typeof summary.totalFarms === 'number' ? summary.totalFarms : 0;
  const activeCrops = typeof summary.activeCrops === 'number' ? summary.activeCrops : 0;
  const todayTaskCount = typeof summary.todayTaskCount === 'number' ? summary.todayTaskCount : 0;
  const totalExpense = typeof summary.totalExpense === 'number' ? summary.totalExpense : 0;

  // সবচেয়ে গুরুত্বপূর্ণ: todayTasks কে অ্যারেতে রূপান্তর
  let todayTasks = [];
  if (Array.isArray(summary.todayTasks)) {
    todayTasks = summary.todayTasks;
  } else if (summary.todayTasks && typeof summary.todayTasks === 'object') {
    // যদি অবজেক্ট হয় (যেমন {0: {...}}) তাহলে Object.values দিয়ে অ্যারে বানাবো
    todayTasks = Object.values(summary.todayTasks);
  } else {
    todayTasks = [];
  }

  const typeColor = {
    'সার': '#1D9E75',
    'সেচ': '#185FA5',
    'ফসল কাটা': '#BA7517',
    'পরিদর্শন': '#534AB7',
    'অন্যান্য': '#888'
  };

  const guideItems = [
    { icon: '🌱', text: 'জমি যুক্ত করে শুরু করুন' },
    { icon: '🌾', text: 'ফসল ট্যাবে ফসল যোগ করুন' },
    { icon: '📅', text: 'কাজের রিমাইন্ডার সেট করুন' },
    { icon: '💰', text: 'প্রতিদিনের খরচ লিখুন' },
  ];

  return (
    <>
      <div className="dash-cards">
        <div className="dash-card">
          <div className="dash-card-label">মোট জমি</div>
          <div className="dash-card-val green">{totalFarms}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">সক্রিয় ফসল</div>
          <div className="dash-card-val green">{activeCrops}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">আজকের কাজ</div>
          <div className="dash-card-val amber">{todayTaskCount}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">মোট খরচ</div>
          <div className="dash-card-val blue" style={{ fontSize: 20 }}>৳ {totalExpense.toLocaleString('bn-BD')}</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-box">
          <h3>আজকের কাজ</h3>
          {todayTasks.length === 0 ? (
            <p style={{ color: '#5a7a5a', fontSize: 14 }}>আজ কোনো কাজ নেই 🎉</p>
          ) : (
            todayTasks.map(t => (
              <div key={t?._id || Math.random()} className="task-item">
                <div className="task-dot" style={{ background: typeColor[t?.type] || '#888' }}></div>
                <div className="task-info">
                  <div className="task-title">{t?.title || 'কাজ'}</div>
                  <div className="task-meta">{t?.farm?.name || ''} • {t?.type || ''}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="dash-box">
          <h3>দ্রুত নির্দেশিকা</h3>
          {guideItems.map(g => (
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