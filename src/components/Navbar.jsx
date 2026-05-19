import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const LINKS = [
  { label:'Home', to:'/' },
  { label:'Products', to:'/products' },
  { label:'Blog', to:'/blog' },
  { label:'Contact', to:'/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    setOpen(false);
    setScrolled(false);
  }, [location]);

  return (
    <header className={`fan ${scrolled || !isHome ? 'fan--scrolled' : ''}`}>
      <div className="container fan__inner">
        {/* Logo */}
        <Link to="/" className="fan__logo">
          <div className="fan__logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M8 12h8M12 8v8"/>
            </svg>
          </div>
          <div className="fan__logo-text">
            <span className="fan__logo-name">Feed Additives</span>
            <span className="fan__logo-sub">M.A. Kamil Farma · Est. 1923</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="fan__links">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to==='/'} className={({isActive}) => `fan__link${isActive?' fan__link--active':''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="fan__actions">
          <a href="https://makamilfarma.com" target="_blank" rel="noopener noreferrer" className="fan__main-link">
            ← Main Site
          </a>
        </div>

        <button className={`fan__burger ${open?'open':''}`} onClick={() => setOpen(!open)}>
          <span/><span/><span/>
        </button>
      </div>

      {open && (
        <div className="fan__mobile">
          {LINKS.map(l => <NavLink key={l.to} to={l.to} end={l.to==='/'} className="fan__mobile-link">{l.label}</NavLink>)}
          <a href="https://makamilfarma.com" target="_blank" rel="noopener noreferrer" className="fan__mobile-link fan__mobile-main">
            ← Visit Main Site
          </a>
        </div>
      )}
    </header>
  );
}
