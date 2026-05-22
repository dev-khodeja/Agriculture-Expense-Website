import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const FEATURES = [
  {
    icon: "🗺️",
    color: "#1a5c3a",
    bg: "#e6f4ec",
    title: "জমি ব্যবস্থাপনা",
    desc: "একাধিক জমির তথ্য, মাটির ধরন ও ফসলের ইতিহাস সংরক্ষণ করুন",
  },
  {
    icon: "🌾",
    color: "#2d6a4f",
    bg: "#d8f3dc",
    title: "ফসল পরিচালনা",
    desc: "রোপণ থেকে ফসল কাটা পর্যন্ত সম্পূর্ণ ট্র্যাকিং ও স্ট্যাটাস",
  },
  {
    icon: "📅",
    color: "#1b4332",
    bg: "#b7e4c7",
    title: "স্মার্ট ক্যালেন্ডার",
    desc: "সার, সেচ ও ফসল কাটার স্বয়ংক্রিয় রিমাইন্ডার পান",
  },
  {
    icon: "🦠",
    color: "#774936",
    bg: "#fde8e4",
    title: "রোগ তথ্যভাণ্ডার",
    desc: "ফসলের সাধারণ রোগ, লক্ষণ ও প্রতিকারের তথ্য পান",
  },
  {
    icon: "💰",
    color: "#344e41",
    bg: "#dad7cd",
    title: "আয়-ব্যয় হিসাব",
    desc: "বীজ, সার, শ্রমিক খরচ ও সম্ভাব্য লাভের হিসাব রাখুন",
  },
  {
    icon: "📊",
    color: "#3a5a40",
    bg: "#a3b18a",
    title: "ফলন বিশ্লেষণ",
    desc: "মৌসুমভিত্তিক ফলন তুলনা ও উন্নতির পরামর্শ পান",
  },
];

const SOIL_TYPES = [
  {
    name: "এঁটেল মাটি",
    color: "#8B4513",
    bg: "#f5e6d3",
    ph: "৬.০–৭.৫",
    crops: "ধান, পাট, আখ",
    desc: "পানি ধারণ ক্ষমতা বেশি, ভারী এবং চটচটে। বর্ষায় উপযুক্ত ফসলের জন্য আদর্শ।",
    img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
  },
  {
    name: "বেলে মাটি",
    color: "#C2956C",
    bg: "#fdf3e7",
    ph: "৫.৫–৭.০",
    crops: "বাদাম, তরমুজ, আলু",
    desc: "পানি দ্রুত নিষ্কাশিত হয়, হালকা ও ঝরঝরে। মূলজাতীয় সবজির জন্য উপযুক্ত।",
    img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80",
  },
  {
    name: "দোআঁশ মাটি",
    color: "#5C7A29",
    bg: "#eef4e3",
    ph: "৬.০–৭.০",
    crops: "গম, সরিষা, শাকসবজি",
    desc: "সর্বোত্তম মাটির ধরন — পানি ধারণ ও নিষ্কাশন উভয়ই সুষম। সব ফসলের জন্য উপযুক্ত।",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  },
];

const DISEASES = [
  {
    name: "ধানের বাদামি দাগ",
    crop: "ধান",
    severity: "মাঝারি",
    severityColor: "#e07a00",
    sevBg: "#fff3e0",
    symptoms: "পাতায় বাদামি ডিম্বাকৃতি দাগ, কেন্দ্র ধূসর রঙের",
    treatment: "ম্যানকোজেব বা ট্রাইসাইক্লাজোল ছত্রাকনাশক স্প্রে করুন",
    prevention: "সুষম সার ব্যবহার ও বীজ শোধন করুন",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80",
  },
  {
    name: "টমেটোর মড়ক রোগ",
    crop: "টমেটো",
    severity: "মারাত্মক",
    severityColor: "#c0392b",
    sevBg: "#fdedec",
    symptoms: "পাতায় কালো দাগ, ফল পচন, গাছ দ্রুত মরে যায়",
    treatment: "কপার অক্সিক্লোরাইড বা বোর্দো মিশ্রণ প্রয়োগ করুন",
    prevention: "রোগমুক্ত বীজ ব্যবহার ও ফসল পর্যায়ক্রমে চাষ করুন",
    img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=80",
  },
  {
    name: "গমের মরিচা রোগ",
    crop: "গম",
    severity: "মাঝারি",
    severityColor: "#e07a00",
    sevBg: "#fff3e0",
    symptoms: "পাতায় মরিচা রঙের গুড়ো দাগ, ডালপালা দুর্বল হয়",
    treatment: "প্রোপিকোনাজল ছত্রাকনাশক প্রয়োগ করুন",
    prevention: "রোগ-প্রতিরোধী জাত বাছাই করুন",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80",
  },
];

const STATS = [
  { num: "৫০০+", label: "সক্রিয় কৃষক" },
  { num: "১২০০+", label: "নিবন্ধিত জমি" },
  { num: "৯৮%", label: "সন্তুষ্টি হার" },
  { num: "২৪/৭", label: "সাপোর্ট" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSoil, setActiveSoil] = useState(0);
  const [activeDisease, setActiveDisease] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif", color: "#1a2e1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #f9fbf7; }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.3s; padding: 18px 5%; display: flex; align-items: center; justify-content: space-between; }
        .nav.scrolled { background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); box-shadow: 0 2px 20px rgba(0,0,0,0.08); padding: 12px 5%; }
        .nav-logo { font-size: 22px; font-weight: 700; color: #1a5c3a; display: flex; align-items: center; gap: 8px; }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a { text-decoration: none; color: #2d4a2d; font-size: 15px; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: #1a5c3a; }
        .nav-cta { background: #1a5c3a; color: white !important; padding: 9px 22px; border-radius: 50px; font-weight: 600 !important; }
        .nav-cta:hover { background: #2d6a4f; color: white !important; }

        .hero { min-height: 100vh; background: linear-gradient(135deg, #0a2e1a 0%, #1a5c3a 50%, #2d8c5c 100%); display: flex; align-items: center; padding: 100px 5% 60px; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=60') center/cover; opacity: 0.15; }
        .hero-content { position: relative; z-index: 1; max-width: 600px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); color: #a8e6c3; padding: 8px 18px; border-radius: 50px; font-size: 13px; font-weight: 500; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2); }
        .hero h1 { font-size: clamp(36px, 5vw, 58px); font-weight: 700; color: white; line-height: 1.2; margin-bottom: 20px; }
        .hero h1 span { color: #4ade80; }
        .hero p { font-size: 18px; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 36px; max-width: 500px; }
        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary { background: #4ade80; color: #0a2e1a; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; }
        .btn-primary:hover { background: #22c55e; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(74,222,128,0.4); }
        .btn-outline { background: transparent; color: white; padding: 14px 32px; border-radius: 50px; font-size: 16px; font-weight: 600; border: 2px solid rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; }

        .hero-image { position: absolute; right: 5%; top: 50%; transform: translateY(-50%); width: 45%; max-width: 560px; border-radius: 24px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.4); }
        .hero-image img { width: 100%; height: 420px; object-fit: cover; display: block; }

        .stats { background: white; padding: 40px 5%; display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid #e8f0e8; }
        .stat { text-align: center; padding: 20px; border-right: 1px solid #e8f0e8; }
        .stat:last-child { border-right: none; }
        .stat-num { font-size: 36px; font-weight: 700; color: #1a5c3a; }
        .stat-label { font-size: 14px; color: #5a7a5a; margin-top: 4px; }

        section { padding: 80px 5%; }

        .section-tag { display: inline-block; background: #e6f4ec; color: #1a5c3a; padding: 6px 16px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
        .section-title { font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: #0a2e1a; margin-bottom: 12px; }
        .section-sub { font-size: 17px; color: #5a7a5a; max-width: 560px; line-height: 1.7; }

        .features-section { background: #f9fbf7; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
        .feat-card { background: white; border-radius: 20px; padding: 32px 28px; border: 1px solid #e4ede4; transition: all 0.3s; cursor: default; }
        .feat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.1); border-color: #a8d5b8; }
        .feat-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 20px; }
        .feat-card h3 { font-size: 18px; font-weight: 700; color: #0a2e1a; margin-bottom: 10px; }
        .feat-card p { font-size: 14px; color: #5a7a5a; line-height: 1.7; }

        .showcase-section { background: white; }
        .showcase-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-top: 48px; }
        .showcase-img { border-radius: 24px; overflow: hidden; }
        .showcase-img img { width: 100%; height: 380px; object-fit: cover; display: block; }
        .showcase-list { list-style: none; display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
        .showcase-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: #2d4a2d; line-height: 1.6; }
        .check { width: 24px; height: 24px; background: #e6f4ec; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; margin-top: 2px; }

        .soil-section { background: #f0f7f0; }
        .soil-tabs { display: flex; gap: 12px; margin: 32px 0 24px; flex-wrap: wrap; }
        .soil-tab { padding: 10px 24px; border-radius: 50px; border: 2px solid #c8ddc8; background: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; color: #2d4a2d; }
        .soil-tab.active { background: #1a5c3a; color: white; border-color: #1a5c3a; }
        .soil-card { background: white; border-radius: 24px; overflow: hidden; border: 1px solid #d4e8d4; display: grid; grid-template-columns: 1fr 1fr; }
        .soil-img { height: 360px; object-fit: cover; width: 100%; display: block; }
        .soil-info { padding: 40px; }
        .soil-info h3 { font-size: 26px; font-weight: 700; color: #0a2e1a; margin-bottom: 16px; }
        .soil-info p { color: #4a6a4a; line-height: 1.7; font-size: 15px; margin-bottom: 24px; }
        .soil-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .meta-item { background: #f0f7f0; border-radius: 12px; padding: 16px; }
        .meta-label { font-size: 12px; color: #5a7a5a; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
        .meta-val { font-size: 16px; font-weight: 700; color: #1a5c3a; }

        .disease-section { background: white; }
        .disease-tabs { display: flex; gap: 12px; margin: 32px 0 24px; }
        .disease-tab { padding: 10px 24px; border-radius: 50px; border: 2px solid #e4e4e4; background: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; color: #5a5a5a; }
        .disease-tab.active { background: #c0392b; color: white; border-color: #c0392b; }
        .disease-card { border-radius: 24px; overflow: hidden; border: 1px solid #e4e4e4; display: grid; grid-template-columns: 1fr 1fr; }
        .disease-img { height: 380px; object-fit: cover; width: 100%; display: block; }
        .disease-info { padding: 40px; }
        .disease-info h3 { font-size: 24px; font-weight: 700; color: #0a2e1a; margin-bottom: 10px; }
        .severity-badge { display: inline-block; padding: 5px 14px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
        .disease-row { margin-bottom: 18px; }
        .disease-row h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 6px; }
        .disease-row p { font-size: 15px; color: #2d4a2d; line-height: 1.6; }

        .cta-section { background: linear-gradient(135deg, #0a2e1a 0%, #1a5c3a 100%); padding: 80px 5%; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: '🌿'; position: absolute; font-size: 200px; opacity: 0.05; top: -40px; right: -40px; }
        .cta-section h2 { font-size: 42px; font-weight: 700; color: white; margin-bottom: 16px; }
        .cta-section p { font-size: 18px; color: rgba(255,255,255,0.75); margin-bottom: 36px; }

        footer { background: #0a1f0a; color: rgba(255,255,255,0.65); padding: 60px 5% 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
        .footer-brand { font-size: 22px; font-weight: 700; color: #4ade80; margin-bottom: 16px; }
        .footer-desc { font-size: 14px; line-height: 1.8; }
        .footer-col h4 { color: white; font-size: 15px; font-weight: 600; margin-bottom: 16px; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer-col ul li a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .footer-col ul li a:hover { color: #4ade80; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
        .footer-social { display: flex; gap: 12px; }
        .social-btn { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; transition: background 0.2s; }
        .social-btn:hover { background: rgba(74,222,128,0.2); }

        @media (max-width: 900px) {
          .hero-image { display: none; }
          .features-grid { grid-template-columns: 1fr 1fr; }
          .showcase-grid, .soil-card, .disease-card { grid-template-columns: 1fr; }
          .soil-img, .disease-img { height: 240px; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .nav-links { display: none; }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .soil-meta { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>

 <Navbar/>

      {/* Hero */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">🌿 স্মার্ট কৃষি ব্যবস্থাপনা সিস্টেম</div>
          <h1>আপনার <span>কৃষি জমি</span> পরিচালনা করুন স্মার্টভাবে</h1>
          <p>ফসল পরিকল্পনা, খরচের হিসাব, মাটি বিশ্লেষণ এবং কৃষি নির্দেশনা — সব এক জায়গায়।</p>
          <div className="hero-btns">
            <Link to="/register"><button className="btn btn-primary">বিনামূল্যে শুরু করুন →</button></Link>
                    <Link to="/features"><button className="btn btn-outline">ফিচার দেখুন</button></Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80" alt="কৃষিকাজ" />
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-tag">✦ সব সুবিধা</div>
        <div className="section-title">সব ফিচার এক জায়গায়</div>
        <div className="section-sub">কৃষি পরিচালনার জন্য যা দরকার সব আছে — সহজ ও বাংলায়।</div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feat-card">
              <div className="feat-icon" style={{ background: f.bg }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section className="showcase-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div className="section-tag">✦ কেন আমরা</div>
            <div className="section-title">কৃষকদের জীবন সহজ করতে আমরা প্রতিশ্রুতিবদ্ধ</div>
            <ul className="showcase-list">
              {["সম্পূর্ণ বাংলায় ইন্টারফেস — সহজে ব্যবহারযোগ্য", "ইন্টারনেট ছাড়াও কাজ করে — অফলাইন মোড", "বিনামূল্যে শুরু, কোনো ক্রেডিট কার্ড নেই", "২৪/৭ বাংলা ভাষায় সাপোর্ট"].map((t) => (
                <li key={t}><div className="check">✓</div>{t}</li>
              ))}
            </ul>
            <button className="btn-primary" style={{ marginTop: 32 }}>আজই নিবন্ধন করুন →</button>
          </div>
          <div className="showcase-img">
            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" alt="কৃষক" />
          </div>
        </div>
      </section>

      {/* Soil Section */}
      <section className="soil-section" id="soil">
        <div className="section-tag">✦ মাটি বিশ্লেষণ</div>
        <div className="section-title">আপনার জমির মাটি বুঝুন</div>
        <div className="section-sub">সঠিক মাটির ধরন চিহ্নিত করে উপযুক্ত ফসল নির্বাচন করুন।</div>
        <div className="soil-tabs">
          {SOIL_TYPES.map((s, i) => (
            <button key={s.name} className={`soil-tab${activeSoil === i ? " active" : ""}`} onClick={() => setActiveSoil(i)}>{s.name}</button>
          ))}
        </div>
        <div className="soil-card">
          <img src={SOIL_TYPES[activeSoil].img} alt={SOIL_TYPES[activeSoil].name} className="soil-img" />
          <div className="soil-info">
            <h3>{SOIL_TYPES[activeSoil].name}</h3>
            <p>{SOIL_TYPES[activeSoil].desc}</p>
            <div className="soil-meta">
              <div className="meta-item">
                <div className="meta-label">pH মাত্রা</div>
                <div className="meta-val">{SOIL_TYPES[activeSoil].ph}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">উপযুক্ত ফসল</div>
                <div className="meta-val" style={{ fontSize: 14 }}>{SOIL_TYPES[activeSoil].crops}</div>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: 28, fontSize: 14, padding: "12px 24px" }}>এই মাটিতে ফসল পরিকল্পনা করুন →</button>
          </div>
        </div>
      </section>

      {/* Disease Section */}
      <section className="disease-section" id="disease">
        <div className="section-tag">✦ রোগ তথ্যভাণ্ডার</div>
        <div className="section-title">ফসলের রোগ চিনুন, সমাধান পান</div>
        <div className="section-sub">সাধারণ রোগের লক্ষণ ও প্রতিকার জানুন — দ্রুত ব্যবস্থা নিন।</div>
        <div className="disease-tabs">
          {DISEASES.map((d, i) => (
            <button key={d.name} className={`disease-tab${activeDisease === i ? " active" : ""}`} onClick={() => setActiveDisease(i)}>{d.crop}</button>
          ))}
        </div>
        <div className="disease-card">
          <img src={DISEASES[activeDisease].img} alt={DISEASES[activeDisease].name} className="disease-img" />
          <div className="disease-info">
            <h3>{DISEASES[activeDisease].name}</h3>
            <span className="severity-badge" style={{ background: DISEASES[activeDisease].sevBg, color: DISEASES[activeDisease].severityColor }}>
              ⚠ {DISEASES[activeDisease].severity}
            </span>
            <div className="disease-row">
              <h4>লক্ষণ</h4>
              <p>{DISEASES[activeDisease].symptoms}</p>
            </div>
            <div className="disease-row">
              <h4>প্রতিকার</h4>
              <p>{DISEASES[activeDisease].treatment}</p>
            </div>
            <div className="disease-row">
              <h4>প্রতিরোধ</h4>
              <p>{DISEASES[activeDisease].prevention}</p>
            </div>
            <button className="btn-primary" style={{ fontSize: 14, padding: "11px 22px", background: "#c0392b" }}>আরও রোগ দেখুন →</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <h2>আজই শুরু করুন</h2>
        <p>বিনামূল্যে অ্যাকাউন্ট খুলুন এবং স্মার্ট কৃষি শুরু করুন</p>
        <button className="btn-primary" style={{ fontSize: 18, padding: "16px 40px" }}>এখনই নিবন্ধন করুন →</button>
      </div>

     <Footer/>
    </div>
  );
}
