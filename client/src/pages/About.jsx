import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const features = [
  'সম্পূর্ণ বাংলা ভাষায়',
  'ব্যবহার করা সহজ',
  'বিনামূল্যে শুরু করা যায়',
  'মোবাইল ফ্রেন্ডলি',
  'ডেটা সুরক্ষিত থাকে',
  '২৪/৭ সাপোর্ট',
];

const steps = [
  { n: '১', title: 'অ্যাকাউন্ট তৈরি করুন', desc: 'বিনামূল্যে নিবন্ধন করুন, মাত্র ২ মিনিট সময় লাগবে।' },
  { n: '২', title: 'জমি ও ফসলের তথ্য দিন', desc: 'আপনার জমির আয়তন, ফসলের ধরন ও মৌসুম যোগ করুন।' },
  { n: '৩', title: 'স্মার্টভাবে পরিচালনা করুন', desc: 'খরচ ট্র্যাক করুন, রিপোর্ট দেখুন ও আরও বেশি লাভ করুন।' },
];

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#e1f5ee,#f0faf4 60%,#eaf3de)', borderBottom: '0.5px solid #9FE1CB', padding: '3.5rem 2rem 3rem', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', background: '#9FE1CB', color: '#085041', fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 99, marginBottom: '1.25rem' }}>
          🌿 বাংলাদেশের কৃষকদের পাশে
        </span>
        <h1 style={{ fontSize: 34, fontWeight: 600, color: '#04342C', marginBottom: '0.75rem' }}>আমাদের সম্পর্কে</h1>
        <p style={{ fontSize: 15, color: '#0F6E56', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.8 }}>
          প্রযুক্তির শক্তিকে কাজে লাগিয়ে বাংলাদেশের কৃষিকে আরও স্মার্ট, সহজ ও লাভজনক করে তোলা আমাদের স্বপ্ন।
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          {[['৫০,০০০+', 'সক্রিয় কৃষক'], ['৬৪টি', 'জেলায় সেবা'], ['৩ বছর', 'অভিজ্ঞতা']].map(([num, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: '#0F6E56' }}>{num}</span>
              <span style={{ fontSize: 12, color: '#085041' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Mission */}
        <div className="feat-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎯</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>আমাদের লক্ষ্য</div>
              <div style={{ fontSize: 13, color: '#5a7a5a' }}>কৃষিকে ডিজিটাল করে তোলা</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#5a7a5a', lineHeight: 1.85 }}>
            বাংলাদেশের প্রতিটি কৃষক যেন স্মার্টফোনের মাধ্যমে তার জমি, ফসল এবং খরচ সহজে পরিচালনা করতে পারেন — এটাই আমাদের মূল লক্ষ্য।
          </p>
        </div>

        {/* Features */}
        <div className="feat-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✨</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>কেন কৃষি স্মার্ট?</div>
              <div style={{ fontSize: 13, color: '#5a7a5a' }}>আমাদের বিশেষত্ব</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#5a7a5a', padding: '10px 12px', background: '#f0faf4', borderRadius: 8 }}>
                <span style={{ color: '#1D9E75', fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="feat-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📋</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>কিভাবে শুরু করবেন</div>
              <div style={{ fontSize: 13, color: '#5a7a5a' }}>মাত্র ৩টি ধাপ</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ display: 'flex', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E1F5EE', border: '2px solid #5DCAA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#0F6E56', flexShrink: 0 }}>{s.n}</div>
                  {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: '#9FE1CB', minHeight: 20, margin: '4px 0' }} />}
                </div>
                <div style={{ paddingBottom: i < steps.length - 1 ? '1.25rem' : 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: '#5a7a5a', lineHeight: 1.7 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="feat-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📞</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600 }}>যোগাযোগ করুন</div>
              <div style={{ fontSize: 13, color: '#5a7a5a' }}>আমরা সাহায্য করতে প্রস্তুত</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['📧', 'ইমেইল', 'support@krishismart.com.bd'], ['📱', 'ফোন', '০১৮০০-০০০০০০'], ['📍', 'ঠিকানা', 'ঢাকা, বাংলাদেশ']].map(([icon, label, val]) => (
              <div key={label} style={{ padding: 14, borderRadius: 8, background: '#f0faf4', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div style={{ fontSize: 11, color: '#5a7a5a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                <div style={{ fontSize: 13 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#04342C', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#E1F5EE', marginBottom: '0.5rem' }}>আজই শুরু করুন</h3>
          <p style={{ fontSize: 14, color: '#5DCAA5', marginBottom: '1.5rem' }}>হাজার হাজার কৃষক ইতিমধ্যে কৃষি স্মার্ট ব্যবহার করছেন</p>
          <Link to="/register">
            <button style={{ background: '#1D9E75', color: '#E1F5EE', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              👤 বিনামূল্যে যোগ দিন →
            </button>
          </Link>
        </div>

      </div>

  <Footer/>
    </>
  );
}