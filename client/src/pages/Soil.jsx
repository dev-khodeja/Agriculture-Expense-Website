import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const soilData = [
  {
    id: 1,
    name: 'দোআঁশ মাটি',
    nameEn: 'Loam Soil',
    color: '#8B6914',
    ph: '6.0 – 7.0',
    phValue: 6.5,
    texture: 'মসৃণ ও দানাদার',
    moisture: 'মাঝারি',
    fertility: 'উচ্চ',
    description: 'দোআঁশ মাটি বালি, পলি ও কাদার সমন্বয়ে গঠিত। এটি কৃষির জন্য সবচেয়ে উপযুক্ত মাটি।',
    crops: ['ধান', 'গম', 'ভুট্টা', 'সবজি', 'ফল'],
    problems: [
      { name: 'জলাবদ্ধতা', severity: 'কম', solution: 'নালা খনন করে পানি নিষ্কাশন করুন' },
      { name: 'পুষ্টি ঘাটতি', severity: 'মাঝারি', solution: 'জৈব সার ও NPK ব্যবহার করুন' },
    ],
    diseases: [
      { name: 'ব্লাস্ট রোগ', cause: 'ছত্রাক', treatment: 'ট্রাইসাইক্লাজল স্প্রে করুন' },
      { name: 'শিকড় পচা', cause: 'অতিরিক্ত পানি', treatment: 'সেচ নিয়ন্ত্রণ করুন' },
    ],
    nutrients: { N: 75, P: 60, K: 70, Ca: 80, Mg: 65 },
  },
  {
    id: 2,
    name: 'এঁটেল মাটি',
    nameEn: 'Clay Soil',
    color: '#6B4226',
    ph: '5.5 – 6.5',
    phValue: 6.0,
    texture: 'ভারী ও আঠালো',
    moisture: 'উচ্চ',
    fertility: 'মাঝারি',
    description: 'এঁটেল মাটিতে কাদার পরিমাণ বেশি। পানি ধারণ ক্ষমতা বেশি কিন্তু বায়ু চলাচল কম।',
    crops: ['ধান', 'পাট', 'আখ', 'মরিচ'],
    problems: [
      { name: 'বায়ু চলাচল কম', severity: 'বেশি', solution: 'জৈব পদার্থ মিশিয়ে মাটি ঝরঝরে করুন' },
      { name: 'চাষ কঠিন', severity: 'বেশি', solution: 'ভেজা অবস্থায় চাষ এড়িয়ে চলুন' },
      { name: 'অম্লতা বৃদ্ধি', severity: 'মাঝারি', solution: 'চুন প্রয়োগ করুন' },
    ],
    diseases: [
      { name: 'মূল পচা রোগ', cause: 'ফাইটোফথোরা ছত্রাক', treatment: 'মেটালেক্সিল ব্যবহার করুন' },
      { name: 'বাদামি দাগ রোগ', cause: 'হেলমিন্থোস্পোরিয়াম', treatment: 'ম্যানকোজেব স্প্রে করুন' },
    ],
    nutrients: { N: 55, P: 45, K: 60, Ca: 50, Mg: 40 },
  },
  {
    id: 3,
    name: 'বেলে মাটি',
    nameEn: 'Sandy Soil',
    color: '#C9A84C',
    ph: '5.5 – 7.5',
    phValue: 6.8,
    texture: 'মোটা ও ঝরঝরে',
    moisture: 'কম',
    fertility: 'কম',
    description: 'বেলে মাটিতে বালির পরিমাণ বেশি। পানি ও পুষ্টি ধরে রাখার ক্ষমতা কম।',
    crops: ['তরমুজ', 'আলু', 'চীনাবাদাম', 'গাজর', 'মুলা'],
    problems: [
      { name: 'পুষ্টি ধুয়ে যাওয়া', severity: 'বেশি', solution: 'বারবার অল্প সার দিন' },
      { name: 'খরা সমস্যা', severity: 'বেশি', solution: 'ড্রিপ সেচ ব্যবহার করুন' },
      { name: 'জৈব পদার্থ কম', severity: 'বেশি', solution: 'কম্পোস্ট ও সবুজ সার মেশান' },
    ],
    diseases: [
      { name: 'নেমাটোড আক্রমণ', cause: 'কৃমি', treatment: 'কার্বোফুরান ব্যবহার করুন' },
      { name: 'শুকনো পচা', cause: 'ফুসারিয়াম ছত্রাক', treatment: 'বীজ শোধন করুন' },
    ],
    nutrients: { N: 30, P: 35, K: 40, Ca: 45, Mg: 30 },
  },
  {
    id: 4,
    name: 'পলি মাটি',
    nameEn: 'Silt Soil',
    color: '#A0845C',
    ph: '6.0 – 7.5',
    phValue: 6.8,
    texture: 'মসৃণ ও নরম',
    moisture: 'মাঝারি-উচ্চ',
    fertility: 'উচ্চ',
    description: 'নদীর পলি দিয়ে তৈরি এই মাটি অত্যন্ত উর্বর। বাংলাদেশের নদী অববাহিকায় প্রচুর পাওয়া যায়।',
    crops: ['ধান', 'পাট', 'গম', 'সরিষা', 'শাকসবজি'],
    problems: [
      { name: 'ক্ষয়প্রবণতা', severity: 'বেশি', solution: 'গাছপালা লাগিয়ে মাটি ধরে রাখুন' },
      { name: 'সংকুচিত হওয়া', severity: 'মাঝারি', solution: 'জৈব পদার্থ যোগ করুন' },
    ],
    diseases: [
      { name: 'পাতা ঝলসা রোগ', cause: 'ব্যাকটেরিয়া', treatment: 'কপার অক্সিক্লোরাইড স্প্রে করুন' },
      { name: 'টুংরো ভাইরাস', cause: 'ভাইরাস', treatment: 'রোগমুক্ত বীজ ব্যবহার করুন' },
    ],
    nutrients: { N: 80, P: 70, K: 75, Ca: 85, Mg: 70 },
  },
];

const severityColor = {
  'কম': { bg: '#f0fdf4', text: '#15803d', border: '#86efac' },
  'মাঝারি': { bg: '#fffbeb', text: '#b45309', border: '#fcd34d' },
  'বেশি': { bg: '#fff1f2', text: '#be123c', border: '#fda4af' },
};

const NutrientBar = ({ label, value }) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '13px', color: '#555', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '13px', color: '#111', fontWeight: 600 }}>{value}%</span>
    </div>
    <div style={{ height: '7px', background: '#f0f0f0', borderRadius: '99px', overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${value}%`,
        background: value >= 70 ? '#16a34a' : value >= 45 ? '#ca8a04' : '#dc2626',
        borderRadius: '99px',
        transition: 'width 0.6s ease',
      }} />
    </div>
  </div>
);

const PhMeter = ({ value }) => {
  const pos = ((value - 0) / 14) * 100;
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ position: 'relative', height: '18px', borderRadius: '99px', overflow: 'hidden',
        background: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)' }}>
        <div style={{
          position: 'absolute', top: '50%', left: `${pos}%`,
          transform: 'translate(-50%, -50%)',
          width: '18px', height: '18px', borderRadius: '50%',
          background: '#fff', border: '2px solid #111',
          boxShadow: '0 0 0 2px rgba(0,0,0,0.15)',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '11px', color: '#888' }}>অম্ল (0)</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#111' }}>pH {value}</span>
        <span style={{ fontSize: '11px', color: '#888' }}>ক্ষার (14)</span>
      </div>
    </div>
  );
};

export default function SoilPage() {
  const [selected, setSelected] = useState(soilData[0]);
  const [activeTab, setActive] = useState('details');

  const s = {
    page: { minHeight: '100vh', background: '#f9fafb', fontFamily: "'Hind Siliguri', sans-serif", color: '#111' },
    header: { background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '2rem', textAlign: 'center' },
    h1: { fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#111', margin: 0 },
    sub: { fontSize: '0.95rem', color: '#6b7280', marginTop: '6px' },
    body: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', alignItems: 'start' },
    sidebar: { background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' },
    sideTitle: { padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.85rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' },
    soilBtn: (active, color) => ({
      display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
      padding: '0.9rem 1.25rem', border: 'none', borderBottom: '1px solid #f3f4f6',
      background: active ? '#f0fdf4' : '#fff', cursor: 'pointer', textAlign: 'left',
      borderLeft: active ? `4px solid ${color}` : '4px solid transparent',
      transition: 'all 0.15s',
    }),
    dot: (color) => ({ width: '14px', height: '14px', borderRadius: '50%', background: color, flexShrink: 0 }),
    btnText: { fontSize: '0.95rem', fontWeight: 500, color: '#111' },
    btnSub: { fontSize: '0.78rem', color: '#9ca3af', marginTop: '1px' },
    main: { background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' },
    mainHeader: (color) => ({ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', background: '#fff' }),
    colorDot: (color) => ({ width: '44px', height: '44px', borderRadius: '50%', background: color, flexShrink: 0 }),
    soilName: { fontSize: '1.4rem', fontWeight: 700, color: '#111', margin: 0 },
    soilNameEn: { fontSize: '0.9rem', color: '#9ca3af', margin: '2px 0 0' },
    tabs: { display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '0 1.5rem', gap: 0 },
    tab: (active) => ({
      padding: '0.9rem 1.2rem', border: 'none', background: 'none', cursor: 'pointer',
      fontSize: '0.9rem', fontWeight: active ? 600 : 400,
      color: active ? '#16a34a' : '#6b7280',
      borderBottom: active ? '2px solid #16a34a' : '2px solid transparent',
      transition: 'all 0.15s',
    }),
    content: { padding: '1.75rem 2rem' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
    card: { background: '#f9fafb', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #f0f0f0' },
    cardLabel: { fontSize: '0.78rem', color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' },
    cardValue: { fontSize: '1.05rem', fontWeight: 600, color: '#111' },
    desc: { fontSize: '0.95rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.5rem', padding: '1rem 1.25rem', background: '#f0fdf4', borderRadius: '10px', borderLeft: '4px solid #16a34a' },
    sectionTitle: { fontSize: '1rem', fontWeight: 700, color: '#111', marginBottom: '0.75rem', marginTop: '1.5rem' },
    cropTags: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
    cropTag: { padding: '4px 12px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '99px', fontSize: '0.85rem', color: '#15803d', fontWeight: 500 },
    problemRow: (sev) => ({
      display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px',
      background: severityColor[sev].bg, borderRadius: '10px', border: `1px solid ${severityColor[sev].border}`, marginBottom: '10px',
    }),
    sevBadge: (sev) => ({
      padding: '2px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
      background: severityColor[sev].bg, color: severityColor[sev].text, border: `1px solid ${severityColor[sev].border}`,
      whiteSpace: 'nowrap', flexShrink: 0,
    }),
    diseaseCard: { border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px 16px', marginBottom: '10px' },
    diseaseTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
    diseaseName: { fontWeight: 600, fontSize: '0.95rem', color: '#111' },
    causeBadge: { fontSize: '0.75rem', padding: '2px 10px', background: '#fef9c3', color: '#854d0e', borderRadius: '99px', border: '1px solid #fde047' },
    treatLabel: { fontSize: '0.78rem', color: '#9ca3af', marginBottom: '3px' },
    treatText: { fontSize: '0.88rem', color: '#374151' },
  };

  const tabs = [
    { id: 'details', label: 'বিস্তারিত' },
    { id: 'nutrients', label: 'পুষ্টিমান' },
    { id: 'problems', label: 'সমস্যা' },
    { id: 'diseases', label: 'রোগবালাই' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media(max-width: 768px) {
          .soil-body { grid-template-columns: 1fr !important; }
          .soil-grid2 { grid-template-columns: 1fr 1fr !important; }
          .soil-content { padding: 1.25rem !important; }
          .soil-tabs { overflow-x: auto; white-space: nowrap; }
        }
        @media(max-width: 480px) {
          .soil-grid2 { grid-template-columns: 1fr !important; }
          .soil-header { padding: 1.25rem !important; }
          .soil-main-header { padding: 1rem 1.25rem !important; }
        }
      `}</style>

        <Navbar/>
      <div style={s.page}>
        <div style={s.header} className="soil-header">
          <h1 style={s.h1}>🌱 মাটির বিস্তারিত তথ্য</h1>
          <p style={s.sub}>মাটির ধরন, পুষ্টিমান, সমস্যা ও রোগবালাই সম্পর্কে জানুন</p>
        </div>

        <div style={s.body} className="soil-body">

          {/* Sidebar */}
          <aside style={s.sidebar}>
            <div style={s.sideTitle}>মাটির ধরন</div>
            {soilData.map(soil => (
              <button key={soil.id} style={s.soilBtn(selected.id === soil.id, soil.color)} onClick={() => { setSelected(soil); setActive('details'); }}>
                <div style={s.dot(soil.color)} />
                <div>
                  <div style={s.btnText}>{soil.name}</div>
                  <div style={s.btnSub}>{soil.nameEn}</div>
                </div>
              </button>
            ))}
          </aside>

          {/* Main Panel */}
          <main style={s.main}>
            <div style={s.mainHeader(selected.color)} className="soil-main-header">
              <div style={s.colorDot(selected.color)} />
              <div>
                <p style={s.soilName}>{selected.name}</p>
                <p style={s.soilNameEn}>{selected.nameEn}</p>
              </div>
            </div>

            <div style={s.tabs} className="soil-tabs">
              {tabs.map(t => (
                <button key={t.id} style={s.tab(activeTab === t.id)} onClick={() => setActive(t.id)}>{t.label}</button>
              ))}
            </div>

            <div style={s.content} className="soil-content">

              {/* Details Tab */}
              {activeTab === 'details' && (
                <>
                  <p style={s.desc}>{selected.description}</p>
                  <div style={s.grid2} className="soil-grid2">
                    <div style={s.card}>
                      <div style={s.cardLabel}>pH মান</div>
                      <div style={s.cardValue}>{selected.ph}</div>
                      <PhMeter value={selected.phValue} />
                    </div>
                    <div style={s.card}>
                      <div style={s.cardLabel}>গঠন</div>
                      <div style={s.cardValue}>{selected.texture}</div>
                    </div>
                    <div style={s.card}>
                      <div style={s.cardLabel}>আর্দ্রতা ধারণ</div>
                      <div style={s.cardValue}>{selected.moisture}</div>
                    </div>
                    <div style={s.card}>
                      <div style={s.cardLabel}>উর্বরতা</div>
                      <div style={s.cardValue}>{selected.fertility}</div>
                    </div>
                  </div>
                  <div style={s.sectionTitle}>উপযুক্ত ফসল</div>
                  <div style={s.cropTags}>
                    {selected.crops.map(c => <span key={c} style={s.cropTag}>{c}</span>)}
                  </div>
                </>
              )}

              {/* Nutrients Tab */}
              {activeTab === 'nutrients' && (
                <>
                  <p style={{ ...s.desc, marginBottom: '1.5rem' }}>মাটির পুষ্টি উপাদানের পরিমাণ নিচে দেখানো হয়েছে। সবুজ = পর্যাপ্ত, হলুদ = মাঝারি, লাল = ঘাটতি।</p>
                  <NutrientBar label="নাইট্রোজেন (N)" value={selected.nutrients.N} />
                  <NutrientBar label="ফসফরাস (P)" value={selected.nutrients.P} />
                  <NutrientBar label="পটাশিয়াম (K)" value={selected.nutrients.K} />
                  <NutrientBar label="ক্যালসিয়াম (Ca)" value={selected.nutrients.Ca} />
                  <NutrientBar label="ম্যাগনেসিয়াম (Mg)" value={selected.nutrients.Mg} />
                </>
              )}

              {/* Problems Tab */}
              {activeTab === 'problems' && (
                <>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.25rem' }}>এই মাটিতে সাধারণত যেসব সমস্যা দেখা যায় এবং তার সমাধান:</p>
                  {selected.problems.map((p, i) => (
                    <div key={i} style={s.problemRow(p.severity)}>
                      <span style={s.sevBadge(p.severity)}>{p.severity}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111', marginBottom: '4px' }}>{p.name}</div>
                        <div style={{ fontSize: '0.87rem', color: '#374151' }}>✅ {p.solution}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Diseases Tab */}
              {activeTab === 'diseases' && (
                <>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.25rem' }}>এই মাটিতে চাষকৃত ফসলে যেসব রোগ হতে পারে:</p>
                  {selected.diseases.map((d, i) => (
                    <div key={i} style={s.diseaseCard}>
                      <div style={s.diseaseTop}>
                        <span style={s.diseaseName}>{d.name}</span>
                        <span style={s.causeBadge}>{d.cause}</span>
                      </div>
                      <div style={s.treatLabel}>প্রতিকার</div>
                      <div style={s.treatText}>💊 {d.treatment}</div>
                    </div>
                  ))}
                </>
              )}

            </div>
          </main>

        
        </div>
      </div>
        <Footer/>
    </>
  );
}