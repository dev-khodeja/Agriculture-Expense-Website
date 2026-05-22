import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  const styles = {
    navbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: '64px',
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '1.2rem',
      fontWeight: 600,
      color: '#111111',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      height: '64px',
    },
    dot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: '#16a34a',
      flexShrink: 0,
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '5px',
      width: '36px',
      height: '36px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      flexShrink: 0,
    },
    span1: (open) => ({
      display: 'block',
      width: '22px',
      height: '2px',
      background: '#111111',
      borderRadius: '2px',
      transition: 'all 0.25s ease',
      transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
    }),
    span2: (open) => ({
      display: 'block',
      width: '22px',
      height: '2px',
      background: '#111111',
      borderRadius: '2px',
      transition: 'all 0.25s ease',
      opacity: open ? 0 : 1,
    }),
    span3: (open) => ({
      display: 'block',
      width: '22px',
      height: '2px',
      background: '#111111',
      borderRadius: '2px',
      transition: 'all 0.25s ease',
      transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
    }),
    links: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
    },
    link: {
      color: '#111111',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: 500,
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    btnOutline: {
      padding: '0.4rem 1rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      background: 'transparent',
      border: '1px solid #111111',
      color: '#111111',
    },
    btnPrimary: {
      padding: '0.4rem 1rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      background: '#16a34a',
      border: '1px solid #16a34a',
      color: '#ffffff',
    },
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <>
      <style>{`
        .navbar-link:hover { color: #16a34a !important; }
        .btn-outline:hover { background: #f3f4f6 !important; }
        .btn-primary:hover { background: #15803d !important; border-color: #15803d !important; }

        @media (max-width: 768px) {
          .navbar { height: auto !important; padding: 0 1rem !important; }
          .navbar-logo { height: 60px !important; }
          .hamburger-btn { display: flex !important; }
          .navbar-links {
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100% !important;
            padding: 0.5rem 0 1rem !important;
            gap: 0 !important;
            border-top: 1px solid #e5e7eb !important;
          }
          .navbar-links > a {
            width: 100% !important;
            padding: 0.65rem 0 !important;
            border-bottom: 1px solid #f3f4f6 !important;
            font-size: 1rem !important;
          }
          .navbar-actions {
            width: 100% !important;
            padding-top: 0.75rem !important;
          }
          .navbar-actions a { flex: 1 !important; border-bottom: none !important; padding: 0 !important; }
          .navbar-actions .btn-outline,
          .navbar-actions .btn-primary {
            width: 100% !important;
            padding: 0.6rem 1rem !important;
            text-align: center !important;
          }
        }

        @media (max-width: 480px) {
          .navbar { padding: 0 0.75rem !important; }
          .navbar-logo { font-size: 1.05rem !important; }
        }
      `}</style>

      <nav className="navbar" style={styles.navbar}>
        <Link to="/" className="navbar-logo" style={styles.logo} onClick={close}>
          <div style={styles.dot} />
          কৃষি স্মার্ট
        </Link>

        <button
          className="hamburger-btn"
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="মেনু খুলুন"
        >
          <span style={styles.span1(menuOpen)} />
          <span style={styles.span2(menuOpen)} />
          <span style={styles.span3(menuOpen)} />
        </button>

        {(menuOpen || !isMobile) && (
          <div
            className="navbar-links"
            style={menuOpen || !isMobile ? styles.links : { display: 'none' }}
          >
            <Link to="/" className="navbar-link" style={styles.link} onClick={close}>হোম</Link>
            <Link to="/about" className="navbar-link" style={styles.link} onClick={close}>আমাদের সম্পর্কে</Link>
            <Link to="/soil" className="navbar-link" style={styles.link} onClick={close}>মাটি</Link>
            <Link to="/disease" className="navbar-link" style={styles.link} onClick={close}>রোগ</Link>
            <Link to="/contact" className="navbar-link" style={styles.link} onClick={close}>যোগাযোগ</Link>
            <div className="navbar-actions" style={styles.actions}>
              <Link to="/login" onClick={close}>
                <button className="btn-outline" style={styles.btnOutline}>লগইন</button>
              </Link>
              <Link to="/register" onClick={close}>
                <button className="btn-primary" style={styles.btnPrimary}>নিবন্ধন</button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}