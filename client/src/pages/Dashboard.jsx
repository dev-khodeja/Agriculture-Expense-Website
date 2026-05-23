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

// ─── Internal Styles ───────────────────────────────────────────────────────────
const injectStyles = () => {
  const id = 'krishi-dashboard-styles';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .kd-root {
      display: flex;
      min-height: 100vh;
      background: #f0f5f0;
      font-family: 'Noto Sans Bengali', 'SolaimanLipi', sans-serif;
      color: #1a2e1a;
    }

    /* ── Overlay ── */
    .kd-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 90;
    }
    .kd-overlay.show { display: block; }

    /* ── Sidebar ── */
    .kd-sidebar {
      width: 220px;
      background: #1a5c2e;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0; left: 0;
      height: 100vh;
      z-index: 100;
      transition: transform 0.28s ease;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .kd-sidebar-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 24px 20px;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .kd-sidebar-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #4ade80;
      flex-shrink: 0;
    }
    .kd-sidebar-nav {
      flex: 1;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .kd-sidebar-nav button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 11px 14px;
      border: none;
      background: transparent;
      color: rgba(255,255,255,0.75);
      font-size: 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      text-align: left;
      font-family: inherit;
    }
    .kd-sidebar-nav button:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .kd-sidebar-nav button.active { background: rgba(255,255,255,0.18); color: #fff; font-weight: 600; }
    .kd-sidebar-bottom {
      padding: 16px 12px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .kd-sidebar-bottom button {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 11px 14px;
      border: none;
      background: rgba(163,45,45,0.15);
      color: #f87171;
      font-size: 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.2s;
      font-family: inherit;
    }
    .kd-sidebar-bottom button:hover { background: rgba(163,45,45,0.28); }

    /* ── Mobile menu btn ── */
    .kd-menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 22px;
      cursor: pointer;
      padding: 4px 8px;
      color: #1a5c2e;
      line-height: 1;
      flex-shrink: 0;
    }

    /* ── Main ── */
    .kd-main {
      margin-left: 220px;
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    /* ── Topbar ── */
    .kd-topbar {
      height: 64px;
      background: #fff;
      border-bottom: 1px solid #d4e4d4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      position: sticky;
      top: 0;
      z-index: 50;
      gap: 12px;
    }
    .kd-topbar h1 {
      font-size: 20px;
      font-weight: 700;
      color: #1a5c2e;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .kd-topbar-user {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .kd-topbar-name {
      font-size: 14px;
      color: #5a7a5a;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .kd-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: #2e7d4f;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* ── Content ── */
    .kd-content {
      padding: 24px;
      flex: 1;
      overflow-y: auto;
    }

    /* ── Dash Cards ── */
    .kd-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    .kd-card {
      background: #fff;
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 2px 12px rgba(30,80,40,0.08);
      border: 1px solid #d4e4d4;
    }
    .kd-card-label { font-size: 13px; color: #5a7a5a; margin-bottom: 8px; }
    .kd-card-val { font-size: 28px; font-weight: 800; }
    .kd-card-val.green { color: #1a5c2e; }
    .kd-card-val.amber { color: #BA7517; }
    .kd-card-val.blue  { color: #185FA5; }

    /* ── Dash Grid ── */
    .kd-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .kd-box {
      background: #fff;
      border-radius: 14px;
      padding: 20px;
      box-shadow: 0 2px 12px rgba(30,80,40,0.08);
      border: 1px solid #d4e4d4;
    }
    .kd-box h3 {
      font-size: 15px;
      font-weight: 700;
      color: #1a5c2e;
      margin-bottom: 14px;
    }

    /* ── Task items ── */
    .kd-task {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid #d4e4d4;
    }
    .kd-task:last-child { border-bottom: none; }
    .kd-task-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .kd-task-info { flex: 1; min-width: 0; }
    .kd-task-title { font-size: 14px; font-weight: 600; color: #1a2e1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .kd-task-meta  { font-size: 12px; color: #5a7a5a; margin-top: 2px; }

    /* ══════════════ RESPONSIVE ══════════════ */

    @media (max-width: 1024px) {
      .kd-cards { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .kd-sidebar { transform: translateX(-100%); }
      .kd-sidebar.open {
        transform: translateX(0);
        box-shadow: 4px 0 24px rgba(0,0,0,0.22);
      }
      .kd-menu-btn { display: block; }
      .kd-main { margin-left: 0; }
      .kd-topbar { padding: 0 16px; }
      .kd-topbar h1 { font-size: 17px; }
      .kd-topbar-name { display: none; }
      .kd-content { padding: 16px; }
      .kd-cards { grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
      .kd-grid  { grid-template-columns: 1fr; gap: 12px; }
    }

    @media (max-width: 480px) {
      .kd-cards { gap: 10px; }
      .kd-card  { padding: 14px; }
      .kd-card-val { font-size: 22px; }
      .kd-content { padding: 12px; }
      .kd-box   { padding: 14px; }
    }

    @media (max-width: 360px) {
      .kd-topbar h1 { font-size: 15px; }
      .kd-card-val  { font-size: 19px; }
    }
  `;
  document.head.appendChild(style);
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // inject styles once
  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    if (activeTab === 'home') fetchSummary();
  }, [activeTab]);

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const { data } = await axios.get('/api/dashboard/summary');
      if (data && typeof data === 'object') {
        setSummary(data);
      } else {
        setSummary({});
      }
    } catch (err) {
      console.error('Summary fetch error:', err);
      setSummary({});
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="kd-root">
      {/* Mobile overlay */}
      <div
        className={`kd-overlay${sidebarOpen ? ' show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`kd-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="kd-sidebar-logo">
          <div className="kd-sidebar-dot"></div>
          কৃষি স্মার্ট
        </div>
        <div className="kd-sidebar-nav">
          {tabs.map(t => (
            <button
              key={t.id}
              className={activeTab === t.id ? 'active' : ''}
              onClick={() => handleTabChange(t.id)}
            >
              <span>{t.icon}</span> {t.label.split(' ')[1]}
            </button>
          ))}
        </div>
        <div className="kd-sidebar-bottom">
          <button onClick={handleLogout}>
            🚪 লগআউট
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="kd-main">
        <div className="kd-topbar">
          <button
            className="kd-menu-btn"
            onClick={() => setSidebarOpen(prev => !prev)}
            aria-label="মেনু"
          >☰</button>
          <h1>{tabs.find(t => t.id === activeTab)?.label || 'ড্যাশবোর্ড'}</h1>
          <div className="kd-topbar-user">
            <span className="kd-topbar-name">{user?.name || ''}</span>
            <div className="kd-avatar">{initials}</div>
          </div>
        </div>

        <div className="kd-content">
          {activeTab === 'home' && (
            <HomeTab summary={summary} loading={loadingSummary} />
          )}
          {activeTab === 'farms'    && <FarmsTab />}
          {activeTab === 'crops'    && <CropsTab />}
          {activeTab === 'tasks'    && <TasksTab />}
          {activeTab === 'expenses' && <ExpensesTab />}
        </div>
      </div>
    </div>
  );
}

// ===================== HomeTab Component with full error handling =====================
function HomeTab({ summary, loading }) {
  if (loading) {
    return <div style={{ color: '#5a7a5a', padding: '2rem' }}>লোড হচ্ছে...</div>;
  }
  if (!summary || typeof summary !== 'object') {
    return <div style={{ color: '#5a7a5a', padding: '2rem' }}>কোনো ডাটা নেই</div>;
  }

  const totalFarms    = typeof summary.totalFarms    === 'number' ? summary.totalFarms    : 0;
  const activeCrops   = typeof summary.activeCrops   === 'number' ? summary.activeCrops   : 0;
  const todayTaskCount= typeof summary.todayTaskCount=== 'number' ? summary.todayTaskCount: 0;
  const totalExpense  = typeof summary.totalExpense  === 'number' ? summary.totalExpense  : 0;

  let todayTasks = [];
  if (Array.isArray(summary.todayTasks)) {
    todayTasks = summary.todayTasks;
  } else if (summary.todayTasks && typeof summary.todayTasks === 'object') {
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
      <div className="kd-cards">
        <div className="kd-card">
          <div className="kd-card-label">মোট জমি</div>
          <div className="kd-card-val green">{totalFarms}</div>
        </div>
        <div className="kd-card">
          <div className="kd-card-label">সক্রিয় ফসল</div>
          <div className="kd-card-val green">{activeCrops}</div>
        </div>
        <div className="kd-card">
          <div className="kd-card-label">আজকের কাজ</div>
          <div className="kd-card-val amber">{todayTaskCount}</div>
        </div>
        <div className="kd-card">
          <div className="kd-card-label">মোট খরচ</div>
          <div className="kd-card-val blue" style={{ fontSize: 20 }}>৳ {totalExpense.toLocaleString('bn-BD')}</div>
        </div>
      </div>

      <div className="kd-grid">
        <div className="kd-box">
          <h3>আজকের কাজ</h3>
          {todayTasks.length === 0 ? (
            <p style={{ color: '#5a7a5a', fontSize: 14 }}>আজ কোনো কাজ নেই 🎉</p>
          ) : (
            todayTasks.map(t => (
              <div key={t?._id || Math.random()} className="kd-task">
                <div className="kd-task-dot" style={{ background: typeColor[t?.type] || '#888' }}></div>
                <div className="kd-task-info">
                  <div className="kd-task-title">{t?.title || 'কাজ'}</div>
                  <div className="kd-task-meta">{t?.farm?.name || ''} • {t?.type || ''}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="kd-box">
          <h3>দ্রুত নির্দেশিকা</h3>
          {guideItems.map(g => (
            <div key={g.text} className="kd-task">
              <span style={{ fontSize: 18 }}>{g.icon}</span>
              <span style={{ fontSize: 14 }}>{g.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}