import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="fa-footer">
      <div className="container fa-footer__grid">
        <div className="fa-footer__brand">
          <div className="fa-footer__logo">
            <div className="fa-footer__logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M8 12h8M12 8v8"/></svg>
            </div>
            <div>
              <div className="fa-footer__logo-name">Feed Additives</div>
              <div className="fa-footer__logo-sub">M.A. Kamil Farma · Est. 1923</div>
            </div>
          </div>
          <p>Scientifically formulated feed additives for peak livestock and poultry performance — backed by 100 years of pharmaceutical expertise.</p>
          <p className="fa-footer__addr">H-17 SITE Phase 2, Karachi, Pakistan</p>
        </div>
        <div className="fa-footer__col">
          <h4>Products</h4>
          <Link to="/products?cat=growth">Growth Promoters</Link>
          <Link to="/products?cat=immunity">Immunity Boosters</Link>
          <Link to="/products?cat=digestive">Digestive Aids</Link>
          <Link to="/products?cat=mineral">Mineral Supplements</Link>
          <Link to="/products?cat=mycotoxin">Mycotoxin Binders</Link>
        </div>
        <div className="fa-footer__col">
          <h4>Company</h4>
          <Link to="/blog">Blog & Insights</Link>
          <Link to="/contact">Contact Us</Link>
          <a href="https://makamilfarma.com" target="_blank" rel="noopener noreferrer">Main Website ↗</a>
          <a href="https://makamilfarma.com/about" target="_blank" rel="noopener noreferrer">About M.A. Kamil Farma ↗</a>
        </div>
        <div className="fa-footer__col">
          <h4>Contact</h4>
          <a href="tel:+921234567890">+92 123 456 7890</a>
          <a href="mailto:feedadditives@makamilfarma.com">feedadditives@makamilfarma.com</a>
          <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="fa-footer__wa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
      <div className="fa-footer__bottom">
        <div className="container fa-footer__bottom-inner">
          <p>© {new Date().getFullYear()} M.A. Kamil Farma Pvt. Ltd. — Feed Additives Division. All rights reserved.</p>
          <p>For professional use only.</p>
        </div>
      </div>
    </footer>
  );
}
