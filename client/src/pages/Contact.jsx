import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (!form.name || !form.email || !form.message) return alert('নাম, ইমেইল ও বার্তা দেওয়া আবশ্যক।');
    setSubmitted(true);
  };

  const s = {
    page: { minHeight: '100vh', background: '#f9fafb', fontFamily: "'Hind Siliguri', sans-serif", color: '#111' },
    header: { background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 2rem' },
    h1: { fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 700, margin: 0 },
    sub: { fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' },
    body: { maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', alignItems: 'start' },
    infoBox: { background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '1.5rem' },
    formBox: { background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '1.5rem' },
    sectionTitle: { fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#111' },
    infoItem: { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '1.1rem' },
    icon: { width: '36px', height: '36px', borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 },
    infoLabel: { fontSize: '0.78rem', color: '#9ca3af', marginBottom: '2px' },
    infoVal: { fontSize: '0.92rem', fontWeight: 500, color: '#111' },
    divider: { border: 'none', borderTop: '1px solid #f0f0f0', margin: '1.25rem 0' },
    fieldGroup: { marginBottom: '1rem' },
    label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' },
    input: { width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', color: '#111', background: '#fff' },
    textarea: { width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', color: '#111', resize: 'vertical', minHeight: '110px', background: '#fff' },
    row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
    btn: { width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: '4px' },
    success: { textAlign: 'center', padding: '2.5rem 1rem' },
    successIcon: { fontSize: '2.5rem', marginBottom: '12px' },
    successTitle: { fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' },
    successSub: { fontSize: '0.9rem', color: '#6b7280' },
    resetBtn: { marginTop: '1rem', padding: '8px 20px', background: 'none', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit', color: '#374151' },
    mapBox: { marginTop: '1.25rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', height: '160px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '0.85rem' },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, textarea:focus { border-color: #16a34a !important; }
        .contact-btn:hover { background: #15803d !important; }
        @media(max-width: 680px) {
          .contact-body { grid-template-columns: 1fr !important; }
          .contact-row2 { grid-template-columns: 1fr !important; }
          .contact-header { padding: 1rem !important; }
        }
      `}</style>


        <Navbar/>
      <div style={s.page}>
        <div style={s.header} className="contact-header">
          <h1 style={s.h1}>📞 যোগাযোগ করুন</h1>
          <p style={s.sub}>যেকোনো সমস্যা বা প্রশ্নের জন্য আমরা সবসময় আছি</p>
        </div>

        <div style={s.body} className="contact-body">

          {/* Left: Info */}
          <div style={s.infoBox}>
            <div style={s.sectionTitle}>যোগাযোগের তথ্য</div>

            {[
              { icon: '📍', label: 'ঠিকানা', val: 'কৃষি ভবন, ফার্মগেট, ঢাকা-১২১৫' },
              { icon: '📞', label: 'ফোন', val: '০১৭০০-০০০০০০' },
              { icon: '✉️', label: 'ইমেইল', val: 'info@krishismart.com.bd' },
              { icon: '🕐', label: 'সময়সূচি', val: 'শনি–বৃহস্পতি: সকাল ৯টা – বিকাল ৫টা' },
            ].map((item, i) => (
              <div key={i} style={s.infoItem}>
                <div style={s.icon}>{item.icon}</div>
                <div>
                  <div style={s.infoLabel}>{item.label}</div>
                  <div style={s.infoVal}>{item.val}</div>
                </div>
              </div>
            ))}

            <hr style={s.divider} />

           

            
          </div>

          {/* Right: Form */}
          <div style={s.formBox}>
            {submitted ? (
              <div style={s.success}>
                <div style={s.successIcon}>✅</div>
                <div style={s.successTitle}>বার্তা পাঠানো হয়েছে!</div>
                <div style={s.successSub}>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</div>
                <button style={s.resetBtn} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>আবার পাঠান</button>
              </div>
            ) : (
              <>
                <div style={s.sectionTitle}>বার্তা পাঠান</div>

                <div style={{ ...s.row2 }} className="contact-row2">
                  <div style={s.fieldGroup}>
                    <label style={s.label}>নাম *</label>
                    <input style={s.input} name="name" value={form.name} onChange={handle} placeholder="আপনার নাম" />
                  </div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>ফোন</label>
                    <input style={s.input} name="phone" value={form.phone} onChange={handle} placeholder="০১৭XXXXXXXX" />
                  </div>
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.label}>ইমেইল *</label>
                  <input style={s.input} name="email" value={form.email} onChange={handle} placeholder="example@email.com" />
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.label}>বিষয়</label>
                  <input style={s.input} name="subject" value={form.subject} onChange={handle} placeholder="কী বিষয়ে যোগাযোগ করছেন?" />
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.label}>বার্তা *</label>
                  <textarea style={s.textarea} name="message" value={form.message} onChange={handle} placeholder="আপনার বার্তা লিখুন..." />
                </div>

                <button style={s.btn} className="contact-btn" onClick={submit}>বার্তা পাঠান →</button>
              </>
            )}
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
}