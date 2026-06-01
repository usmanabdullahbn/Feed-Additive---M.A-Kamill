import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import bgHeroVideo from '../assets/bg-hero.mp4';
import './Home.css';

function StatCounter({ end, suffix='' }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0; const step = end / 60;
        const id = setInterval(() => {
          v = Math.min(v + step, end);
          setVal(Math.floor(v));
          if (v >= end) clearInterval(id);
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const CATEGORIES = [
  { key:'growth',   icon:'🌱', title:'Growth Promoters',     color:'#14532d', desc:'Amino acid complexes and anabolic co-factors for maximum weight gain and superior feed conversion ratios.' },
  { key:'immunity', icon:'🛡️', title:'Immunity Boosters',    color:'#1e6b40', desc:'Beta-glucans, vitamins, and herbal extracts to strengthen natural disease resistance during stress periods.' },
  { key:'digestive',icon:'🔬', title:'Digestive Aids',       color:'#166534', desc:'Multi-enzyme complexes and probiotic blends for superior nutrient absorption and gut health.' },
  { key:'mineral',  icon:'💎', title:'Mineral Supplements',  color:'#14532d', desc:'Chelated minerals — zinc, copper, manganese, selenium — for optimal health and reproductive performance.' },
  { key:'energy',   icon:'⚡', title:'Energy Supplements',   color:'#1e6b40', desc:'Glucose, electrolytes, and B-vitamin complexes for rapid recovery from heat stress and disease challenges.' },
  { key:'mycotoxin',icon:'🧬', title:'Mycotoxin Binders',    color:'#166534', desc:'Bentonite and yeast cell wall binders for broad-spectrum mycotoxin protection in contaminated feed.' },
];

const RESULTS = [
  { metric:'30%', label:'FCR Improvement', sub:'Rotamin Binder Pro, 5,000 broilers, 42 days' },
  { metric:'25%', label:'Milk Yield Gain',  sub:'Rota Plus Dairy trial, 120 Holstein cows' },
  { metric:'40%', label:'Mortality Reduced',sub:'ImmunoBoost field study, 3 farms' },
  { metric:'100+', label:'Years Expertise', sub:'M.A. Kamil Farma since 1923' },
];

const STEPS = [
  { num:'01', title:'Identify the Challenge', desc:'Our nutritionists diagnose your specific performance gap — FCR, mortality, production yield, or feed safety.' },
  { num:'02', title:'Custom Recommendation', desc:'We tailor an additive protocol from our 12+ product range matched to your species, season, and targets.' },
  { num:'03', title:'Monitored Results', desc:'Track measurable improvements with before/after data. Our team supports you throughout the treatment cycle.' },
];

export default function Home() {
  const [activeResult, setActiveResult] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActiveResult(p => (p+1) % RESULTS.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fa-home">

      {/* ── Hero ── */}
      <section className="fa-hero">
        <div className="fa-hero__bg">
          <video
            className="fa-hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          >
            <source
              src={bgHeroVideo}
              type="video/mp4"
            />
          </video>
          <div className="fa-hero__mesh" />
          <div className="fa-hero__overlay" />
        </div>
        <div className="container fa-hero__content">
          <div className="fa-hero__badge animate-fade-up">
            <span className="fa-hero__pulse" />
            Feed Additives Division — M.A. Kamil Farma · Est. 1923
          </div>
          <h1 className="fa-hero__title animate-fade-up-d1">
            Science-Backed
            <br /><em>Feed Additives</em>
            <br />for Peak Performance
          </h1>
          <p className="fa-hero__sub animate-fade-up-d2">
            Precision-formulated growth promoters, immunity boosters, digestive enzymes, and mycotoxin binders — manufactured by Pakistan's most trusted veterinary pharmaceutical group.
          </p>
          <div className="fa-hero__actions animate-fade-up-d3">
            <Link to="/products" className="btn btn--green">Browse All Products</Link>
            <Link to="/contact" className="btn btn--outline-white">Talk to an Expert</Link>
          </div>
          <div className="fa-hero__trust animate-fade-up-d3">
            {['GMP Certified','DRAP Approved','Halal','ISO 9001'].map(c => (
              <div key={c} className="fa-hero__trust-badge"><span>✓</span> {c}</div>
            ))}
          </div>
        </div>
        {/* Rotating stats */}
        <div className="fa-hero__stats">
          {RESULTS.map((r,i) => (
            <div key={i} className={`fa-hero__stat ${i===activeResult?'active':''}`}>
              <span className="fa-hero__stat-metric">{r.metric}</span>
              <span className="fa-hero__stat-label">{r.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="fa-stats-bar">
        <div className="container fa-stats-bar__grid">
          {[
            { num:15000, suffix:'+', label:'Farms Served' },
            { num:12, suffix:'', label:'Product Range' },
            { num:100, suffix:'+', label:'Years Expertise' },
            { num:4, suffix:'', label:'Countries Exported' },
          ].map(s => (
            <div key={s.label} className="fa-stat-item">
              <span className="fa-stat-num"><StatCounter end={s.num} suffix={s.suffix} /></span>
              <span className="fa-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product categories ── */}
      <section className="section fa-cats-section">
        <div className="container">
          <div className="fa-section-head">
            <span className="section-eyebrow">Product Range</span>
            <h2 className="section-title">Complete Feed Additive Solutions</h2>
            <p className="section-lead">All products manufactured by M.A. Kamil Farma under GMP-compliant standards. Formulated for measurable farm results.</p>
          </div>
          <div className="fa-cats-grid">
            {CATEGORIES.map(c => (
              <Link key={c.key} to={`/products?cat=${c.key}`} className="fa-cat-card" style={{ '--cc':c.color }}>
                <div className="fa-cat-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="fa-cat-card__cta">Browse Products →</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:44 }}>
            <Link to="/products" className="btn btn--outline">View All 12+ Products</Link>
          </div>
        </div>
      </section>

      {/* ── Why Kamil Farma ── */}
      <section className="fa-why-section">
        <div className="container fa-why-grid">
          <div className="fa-why-content">
            <span className="section-eyebrow" style={{ color:'var(--gold)' }}>Why M.A. Kamil Farma</span>
            <h2 className="section-title section-title--white">A Century of Trust Behind Every Gram</h2>
            <div className="divider" />
            <p style={{ color:'rgba(255,255,255,.68)', fontSize:'15.5px', lineHeight:1.8, marginBottom:20 }}>
              Since 1923, M.A. Kamil Farma has been Pakistan's most trusted name in veterinary pharmaceuticals. Our feed additives division combines a century of expertise with modern nutritional science to deliver products that make a measurable difference on your farm.
            </p>
            <p style={{ color:'rgba(255,255,255,.68)', fontSize:'15.5px', lineHeight:1.8, marginBottom:32 }}>
              Every product in our range is developed by veterinary scientists, tested in controlled field trials, and manufactured in GMP-compliant facilities — giving you the confidence of pharmaceutical-grade quality in every batch.
            </p>
            <div className="fa-why-points">
              {[
                'GMP-compliant manufacturing at Karachi facility',
                'Veterinary-approved and DRAP-registered formulations',
                'Field-tested by 15,000+ farms across Pakistan',
                'Dedicated technical support team',
                'ISO 9001 quality management system',
                'Halal-certified product range',
              ].map(pt => (
                <div key={pt} className="fa-why-point">
                  <span className="fa-why-check">✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <a href="https://makamilfarma.com/about" target="_blank" rel="noopener noreferrer" className="btn btn--gold">
              About M.A. Kamil Farma ↗
            </a>
          </div>
          <div className="fa-why-visual">
            <div className="fa-why-year">
              <span className="fa-why-year-num">1923</span>
              <span className="fa-why-year-line" />
              <span className="fa-why-year-label">Year Established</span>
            </div>
            <div className="fa-why-cert-strip">
              {['ISO','GMP','DRAP','Halal'].map(c => (
                <div key={c} className="fa-why-cert">{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section fa-how-section">
        <div className="container">
          <div className="fa-section-head">
            <span className="section-eyebrow">Our Process</span>
            <h2 className="section-title">How We Help Your Farm</h2>
          </div>
          <div className="fa-how-grid">
            {STEPS.map((s,i) => (
              <div key={i} className="fa-how-step">
                <div className="fa-how-step__num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="fa-results-section">
        <div className="container fa-results-grid">
          <div className="fa-results-text">
            <span className="section-eyebrow" style={{ color:'var(--gold)' }}>Proven Results</span>
            <h2 className="section-title section-title--white">Numbers That Speak for Themselves</h2>
            <div className="divider" />
            <div className="fa-results-list">
              {RESULTS.map((r,i) => (
                <div key={i} className="fa-result-row">
                  <span className="fa-result-metric">{r.metric}</span>
                  <div>
                    <div className="fa-result-label">{r.label}</div>
                    <div className="fa-result-sub">{r.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/blog" className="btn btn--gold" style={{ marginTop:8 }}>Read Case Studies</Link>
          </div>
          <div className="fa-results-visual">
            <div className="fa-results-card">
              <div className="fa-results-card__label">Species Coverage</div>
              <div className="fa-results-species">
                {[['🐔','Broiler'],['🥚','Layer'],['🐄','Dairy'],['🐖','Swine'],['🐟','Aqua']].map(([i,l]) => (
                  <div key={l} className="fa-results-species-item">
                    <span>{i}</span><span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section fa-cta-section">
        <div className="container">
          <div className="fa-cta-box">
            <div className="fa-cta-box__left">
              <h2 className="section-title">Ready to Improve Your Farm's Performance?</h2>
              <p className="section-lead">
                Get a customised feed additive recommendation from our veterinary nutrition team — free of charge.
              </p>
            </div>
            <div className="fa-cta-box__actions">
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="btn btn--green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <Link to="/contact" className="btn btn--outline">Contact Form</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
