import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const modules = [
  { title: 'কৃষক ব্যবস্থাপনা', icon: '👤', points: ['নিজস্ব অ্যাকাউন্ট তৈরি', 'প্রোফাইল ম্যানেজমেন্ট', 'নিরাপদ লগইন (JWT)'] },
  { title: 'জমি ব্যবস্থাপনা', icon: '🗺️', points: ['একাধিক জমি যুক্ত করুন', 'জমির আকার ও অবস্থান', 'মাটির ধরন রেকর্ড', 'ফসলের ইতিহাস'] },
  { title: 'ফসল পরিচালনা', icon: '🌾', points: ['ফসল নির্বাচন', 'রোপণ ও কাটার তারিখ', 'ফসলের বর্তমান অবস্থা', 'মৌসুমী ফসলের পরামর্শ'] },
  { title: 'স্মার্ট ক্যালেন্ডার', icon: '📅', points: ['রোপণের সময়সূচি', 'সারের সময়সূচি', 'সেচের রিমাইন্ডার', 'ফসল কাটার রিমাইন্ডার'] },
  { title: 'আবহাওয়া সিস্টেম', icon: '🌦️', points: ['তাপমাত্রা পর্যবেক্ষণ', 'বৃষ্টির পূর্বাভাস', 'আর্দ্রতার তথ্য', '৩-৭ দিনের ফোরকাস্ট'] },
  { title: 'রোগ তথ্যভাণ্ডার', icon: '🦠', points: ['সাধারণ রোগের তালিকা', 'লক্ষণ ও কারণ', 'প্রতিরোধের উপায়', 'প্রাথমিক সমাধান'] },
  { title: 'খরচ ব্যবস্থাপনা', icon: '💰', points: ['বীজ খরচ ট্র্যাকিং', 'সার খরচ ট্র্যাকিং', 'শ্রমিক খরচ', 'লাভ-ক্ষতির হিসাব'] },
  { title: 'ড্যাশবোর্ড', icon: '📊', points: ['মোট জমির সংখ্যা', 'সক্রিয় ফসল', 'আজকের কাজ', 'খরচের সারসংক্ষেপ'] },
];

export default function Features() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#f0faf4', borderBottom: '1px solid #e0e8e0' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '0.75rem' }}>সকল ফিচার</h1>
        <p style={{ color: '#5a7a5a', fontSize: '16px', maxWidth: 500, margin: '0 auto' }}>
          কৃষি স্মার্ট-এ যা যা পাচ্ছেন তার সম্পূর্ণ তালিকা
        </p>
      </div>

      <div className="section">
        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {modules.map(m => (
            <div key={m.title} className="feat-card">
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{m.icon}</div>
              <h3 style={{ marginBottom: '12px' }}>{m.title}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {m.points.map(p => (
                  <li key={p} style={{ fontSize: '13px', color: '#5a7a5a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#1D9E75' }}>✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/register"><button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>এখনই শুরু করুন →</button></Link>
        </div>
      </div>

      <footer>
        <p>© ২০২৬ কৃষি স্মার্ট — বাংলাদেশের কৃষকদের জন্য</p>
      </footer>
    </>
  );
}
