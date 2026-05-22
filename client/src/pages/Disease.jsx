import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const diseases = [
  {
    id: 1,
    name: 'ব্লাস্ট রোগ',
    crop: 'ধান',
    type: 'ছত্রাক',
    severity: 'বেশি',
    symptoms: ['পাতায় ধূসর-বাদামি দাগ', 'দাগের চারপাশ হলুদ', 'ছড়া পচে যায়', 'গাছ দুর্বল হয়ে পড়ে'],
    cause: 'Magnaporthe oryzae ছত্রাকের আক্রমণে হয়। আর্দ্র আবহাওয়া ও ঘন চাষে বেশি দেখা যায়।',
    treatment: ['ট্রাইসাইক্লাজল ০.১% স্প্রে করুন', 'আক্রান্ত গাছ তুলে পুড়িয়ে ফেলুন', 'সুষম সার ব্যবহার করুন'],
    prevention: 'রোগমুক্ত বীজ ব্যবহার করুন। বীজ বপনের আগে ২.৫ গ্রাম/কেজি কার্বেন্ডাজিম দিয়ে বীজ শোধন করুন।',
    season: 'বর্ষা মৌসুম',
    spread: 'বায়ু ও বৃষ্টির পানি',
  },
  {
    id: 2,
    name: 'টুংরো ভাইরাস',
    crop: 'ধান',
    type: 'ভাইরাস',
    severity: 'বেশি',
    symptoms: ['পাতা হলুদ-কমলা হয়', 'গাছ বামন আকার ধারণ করে', 'ছড়া সম্পূর্ণ হয় না', 'পাতা মোচড় খায়'],
    cause: 'Rice Tungro Bacilliform Virus (RTBV) সবুজ পাতাফড়িং দ্বারা ছড়ায়।',
    treatment: ['আক্রান্ত গাছ তুলে মাটিতে পুঁতুন', 'কার্বোফুরান দানাদার সার দিন', 'পাতাফড়িং দমন করুন'],
    prevention: 'সবুজ পাতাফড়িং নিয়ন্ত্রণই মূল প্রতিরোধ। রোগ-প্রতিরোধী জাত ব্যবহার করুন।',
    season: 'সারা বছর',
    spread: 'পোকামাকড় (পাতাফড়িং)',
  },
  {
    id: 3,
    name: 'পাতা ঝলসা রোগ',
    crop: 'ধান',
    type: 'ব্যাকটেরিয়া',
    severity: 'মাঝারি',
    symptoms: ['পাতার কিনারা জলে ভেজার মতো', 'পরে হলুদ-বাদামি হয়', 'পাতা শুকিয়ে মারা যায়'],
    cause: 'Xanthomonas oryzae ব্যাকটেরিয়া। বন্যার পানি ও বৃষ্টিতে দ্রুত ছড়ায়।',
    treatment: ['কপার অক্সিক্লোরাইড ৪ গ্রাম/লিটার পানিতে স্প্রে করুন', 'নাইট্রোজেন সার কমান', 'জমির পানি বের করে দিন'],
    prevention: 'সুষম সার ব্যবহার করুন। জমিতে পানি জমতে দেবেন না।',
    season: 'বর্ষা ও বন্যার পর',
    spread: 'পানি ও বৃষ্টির ছিটা',
  },
  {
    id: 4,
    name: 'মরিচা রোগ',
    crop: 'গম',
    type: 'ছত্রাক',
    severity: 'বেশি',
    symptoms: ['পাতায় মরিচা রঙের গুঁড়া', 'কাণ্ডেও দাগ পড়ে', 'গাছ দুর্বল হয়', 'ফলন কমে যায়'],
    cause: 'Puccinia tritici ছত্রাক। ঠান্ডা ও আর্দ্র আবহাওয়ায় দ্রুত ছড়ায়।',
    treatment: ['প্রোপিকোনাজোল ১ মি.লি./লিটার স্প্রে করুন', 'আক্রান্ত অংশ কেটে ফেলুন'],
    prevention: 'রোগ-প্রতিরোধী জাত বুনুন। বীজ শোধন করুন।',
    season: 'শীতকাল',
    spread: 'বায়ু',
  },
  {
    id: 5,
    name: 'ঢলে পড়া রোগ',
    crop: 'টমেটো',
    type: 'ছত্রাক',
    severity: 'বেশি',
    symptoms: ['গাছ হঠাৎ ঢলে পড়ে', 'মূল পচে যায়', 'পাতা হলুদ হয়', 'কাণ্ড কালো হয়'],
    cause: 'Fusarium oxysporum মাটিবাহিত ছত্রাক। অতিরিক্ত সেচ ও দুর্বল নিষ্কাশনে বাড়ে।',
    treatment: ['কার্বেন্ডাজিম ২ গ্রাম/লিটার মাটিতে ঢালুন', 'আক্রান্ত গাছ তুলে পুড়িয়ে ফেলুন'],
    prevention: 'বীজতলায় ট্রাইকোডার্মা ব্যবহার করুন। সঠিক পানি নিষ্কাশন নিশ্চিত করুন।',
    season: 'গরম ও আর্দ্র মৌসুম',
    spread: 'মাটি ও পানি',
  },
  {
    id: 6,
    name: 'সবুজ মাছি পোকা',
    crop: 'সবজি',
    type: 'পোকা',
    severity: 'মাঝারি',
    symptoms: ['পাতায় সাদা দাগ', 'পাতা কুঁচকে যায়', 'গাছ দুর্বল হয়', 'রস শুষে নেয়'],
    cause: 'Bemisia tabaci সাদা মাছি। শুষ্ক গরম আবহাওয়ায় দ্রুত বংশবৃদ্ধি করে।',
    treatment: ['ইমিডাক্লোপ্রিড ০.৫ মি.লি./লিটার স্প্রে করুন', 'হলুদ আঠালো ফাঁদ ব্যবহার করুন'],
    prevention: 'নিয়মিত পরিদর্শন করুন। আক্রান্ত পাতা কেটে ফেলুন।',
    season: 'গরম মৌসুম',
    spread: 'উড়ে উড়ে',
  },
];

const typeColor = {
  'ছত্রাক': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'ভাইরাস': { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff' },
  'ব্যাকটেরিয়া': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'পোকা': { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
};

const severityColor = {
  'বেশি': { bg: '#fff1f2', text: '#be123c', border: '#fda4af' },
  'মাঝারি': { bg: '#fffbeb', text: '#b45309', border: '#fcd34d' },
  'কম': { bg: '#f0fdf4', text: '#15803d', border: '#86efac' },
};

const crops = ['সব', ...new Set(diseases.map(d => d.crop))];
const types = ['সব', ...new Set(diseases.map(d => d.type))];

export default function DiseasePage() {
  const [selectedCrop, setSelectedCrop] = useState('সব');
  const [selectedType, setSelectedType] = useState('সব');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = diseases.filter(d => {
    const matchCrop = selectedCrop === 'সব' || d.crop === selectedCrop;
    const matchType = selectedType === 'সব' || d.type === selectedType;
    const matchSearch = d.name.includes(search) || d.crop.includes(search);
    return matchCrop && matchType && matchSearch;
  });

  const s = {
    page: { minHeight: '100vh', background: '#f9fafb', fontFamily: "'Hind Siliguri', sans-serif", color: '#111' },
    header: { background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 2rem' },
    h1: { fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700, margin: 0 },
    sub: { fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' },
    filters: { background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' },
    input: { padding: '7px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', minWidth: '180px', fontFamily: 'inherit' },
    filterBtn: (active) => ({
      padding: '5px 14px', border: `1px solid ${active ? '#16a34a' : '#e5e7eb'}`,
      borderRadius: '99px', fontSize: '0.85rem', cursor: 'pointer',
      background: active ? '#f0fdf4' : '#fff', color: active ? '#15803d' : '#374151',
      fontFamily: 'inherit', fontWeight: active ? 600 : 400,
    }),
    body: { maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem', display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1.25rem', alignItems: 'start' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' },
    card: (active) => ({
      background: '#fff', borderRadius: '10px', border: `1px solid ${active ? '#16a34a' : '#e5e7eb'}`,
      padding: '1.1rem', cursor: 'pointer', transition: 'border-color 0.15s',
    }),
    cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
    cardName: { fontSize: '1rem', fontWeight: 700, color: '#111' },
    badge: (style) => ({
      padding: '2px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
      background: style.bg, color: style.text, border: `1px solid ${style.border}`,
    }),
    cardCrop: { fontSize: '0.83rem', color: '#6b7280', marginBottom: '10px' },
    cardFooter: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
    detail: { background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '1.5rem', position: 'sticky', top: '80px' },
    detailClose: { float: 'right', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#9ca3af' },
    detailName: { fontSize: '1.2rem', fontWeight: 700, margin: '0 0 4px' },
    detailCrop: { fontSize: '0.88rem', color: '#6b7280', marginBottom: '12px' },
    divider: { border: 'none', borderTop: '1px solid #f0f0f0', margin: '14px 0' },
    label: { fontSize: '0.78rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '6px' },
    ul: { paddingLeft: '16px', margin: 0 },
    li: { fontSize: '0.9rem', color: '#374151', marginBottom: '4px', lineHeight: 1.6 },
    infoRow: { display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' },
    infoBox: { flex: 1, minWidth: '100px', background: '#f9fafb', borderRadius: '8px', padding: '10px 12px', border: '1px solid #f0f0f0' },
    infoLabel: { fontSize: '0.75rem', color: '#9ca3af', marginBottom: '3px' },
    infoVal: { fontSize: '0.88rem', fontWeight: 600, color: '#111' },
    preventBox: { background: '#f0fdf4', borderRadius: '8px', padding: '12px 14px', borderLeft: '3px solid #16a34a', fontSize: '0.88rem', color: '#374151', lineHeight: 1.7 },
    empty: { textAlign: 'center', padding: '3rem', color: '#9ca3af', fontSize: '0.95rem' },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media(max-width: 768px) {
          .disease-body { grid-template-columns: 1fr !important; }
          .disease-detail { position: static !important; }
          .disease-filters { padding: 0.75rem 1rem !important; }
          .disease-header { padding: 1rem !important; }
        }
      `}</style>

        <Navbar/>
      <div style={s.page}>
        {/* Header */}
        <div style={s.header} className="disease-header">
          <h1 style={s.h1}>🌿 ফসলের রোগবালাই</h1>
          <p style={s.sub}>রোগ চিহ্নিত করুন, কারণ জানুন, প্রতিকার নিন</p>
        </div>

        {/* Filters */}
        <div style={s.filters} className="disease-filters">
          
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {crops.map(c => (
              <button key={c} style={s.filterBtn(selectedCrop === c)} onClick={() => setSelectedCrop(c)}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {types.map(t => (
              <button key={t} style={s.filterBtn(selectedType === t)} onClick={() => setSelectedType(t)}>{t}</button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={s.body} className="disease-body">

          {/* Cards */}
          <div>
            {filtered.length === 0 ? (
              <div style={s.empty}>কোনো রোগ পাওয়া যায়নি।</div>
            ) : (
              <div style={s.grid}>
                {filtered.map(d => (
                  <div key={d.id} style={s.card(selected?.id === d.id)} onClick={() => setSelected(selected?.id === d.id ? null : d)}>
                    <div style={s.cardTop}>
                      <div style={s.cardName}>{d.name}</div>
                      <span style={s.badge(severityColor[d.severity])}>{d.severity}</span>
                    </div>
                    <div style={s.cardCrop}>🌾 {d.crop}</div>
                    <div style={s.cardFooter}>
                      <span style={s.badge(typeColor[d.type])}>{d.type}</span>
                      <span style={{ fontSize: '0.8rem', color: '#9ca3af', alignSelf: 'center' }}>{d.season}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={s.detail} className="disease-detail">
              <button style={s.detailClose} onClick={() => setSelected(null)}>✕</button>
              <h2 style={s.detailName}>{selected.name}</h2>
              <p style={s.detailCrop}>🌾 {selected.crop}</p>

              <div style={s.infoRow}>
                <div style={s.infoBox}>
                  <div style={s.infoLabel}>ধরন</div>
                  <div style={s.infoVal}>{selected.type}</div>
                </div>
                <div style={s.infoBox}>
                  <div style={s.infoLabel}>তীব্রতা</div>
                  <div style={s.infoVal}>{selected.severity}</div>
                </div>
                <div style={s.infoBox}>
                  <div style={s.infoLabel}>ছড়ায়</div>
                  <div style={s.infoVal}>{selected.spread}</div>
                </div>
              </div>

              <hr style={s.divider} />

              <div style={s.label}>কারণ</div>
              <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.7, marginBottom: '14px' }}>{selected.cause}</p>

              <div style={s.label}>লক্ষণসমূহ</div>
              <ul style={{ ...s.ul, marginBottom: '14px' }}>
                {selected.symptoms.map((sym, i) => <li key={i} style={s.li}>{sym}</li>)}
              </ul>

              <div style={s.label}>প্রতিকার</div>
              <ul style={{ ...s.ul, marginBottom: '14px' }}>
                {selected.treatment.map((t, i) => <li key={i} style={s.li}>{t}</li>)}
              </ul>

              <div style={s.label}>প্রতিরোধ</div>
              <div style={s.preventBox}>{selected.prevention}</div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}