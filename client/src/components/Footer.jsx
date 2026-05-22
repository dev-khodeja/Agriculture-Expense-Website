import React from 'react'

export default function Footer() {
  return (
    
    <>
    <style>{`
        

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
          .
          .footer-grid { grid-template-columns: 1fr 1fr; }
          
        }
        @media (max-width: 600px) {
          
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    {/* Footer */}
      <footer id="contact">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">🌿 কৃষি স্মার্ট</div>
            <p className="footer-desc">বাংলাদেশের কৃষকদের জন্য তৈরি স্মার্ট কৃষি ব্যবস্থাপনা সিস্টেম। আমরা বিশ্বাস করি প্রযুক্তি কৃষকের জীবন পরিবর্তন করতে পারে।</p>
          </div>
          <div className="footer-col">
            <h4>পরিষেবা</h4>
            <ul>
              {["জমি ব্যবস্থাপনা", "ফসল ট্র্যাকিং", "আয়-ব্যয় হিসাব", "মাটি বিশ্লেষণ"].map((t) => (
                <li key={t}><a href="#">{t}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>তথ্য</h4>
            <ul>
              {["রোগ তথ্যভাণ্ডার", "ফসল গাইড", "সার পরামর্শ", "ব্লগ"].map((t) => (
                <li key={t}><a href="#">{t}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>যোগাযোগ</h4>
            <ul>
              {["📞 ০১৮০০-০০০০০০", "✉ info@krishismart.com", "📍 ঢাকা, বাংলাদেশ", "সোম-শুক্র: সকাল ৯–রাত ৮"].map((t) => (
                <li key={t}><a href="#">{t}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© ২০২৬ কৃষি স্মার্ট — বাংলাদেশের কৃষকদের জন্য</span>
          <div className="footer-social">
            {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
              <div key={i} className="social-btn">{icon}</div>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
