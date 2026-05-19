import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Products.css';

const PRODUCTS = [
  { id:1, name:'ProGrow Max',          cat:'growth',   species:'Poultry & Livestock', form:'Powder', desc:'Advanced growth promoter combining amino acid complexes with anabolic co-factors for maximum weight gain efficiency.' },
  { id:2, name:'GrowPack Starter',     cat:'growth',   species:'Broiler Chicks',      form:'Powder', desc:'Starter-phase formulation combining amino acids, vitamins, and enzymes optimised for day-old to 14-day chicks.' },
  { id:3, name:'ImmunoShield Plus',    cat:'immunity', species:'Poultry',             form:'Powder', desc:'Beta-glucan and vitamin C fortified immunity booster for disease resistance during stress and post-vaccination.' },
  { id:4, name:'RespiGuard Powder',    cat:'immunity', species:'Poultry',             form:'Powder', desc:'Herbal extract and vitamin E blend to support respiratory mucosa integrity and immune function.' },
  { id:5, name:'DigestEnz Pro',        cat:'digestive',species:'Broiler & Layer',     form:'Powder', desc:'Multi-enzyme complex (protease, amylase, lipase, xylanase) for superior nutrient release and feed cost reduction.' },
  { id:6, name:'LactoPro Forte',       cat:'digestive',species:'Livestock',           form:'Powder', desc:'Probiotic blend with 5 Lactobacillus strains and prebiotic FOS for rumen health and milk yield support.' },
  { id:7, name:'OmniMin Premix',       cat:'mineral',  species:'All Species',         form:'Powder', desc:'Chelated mineral supplement supplying bioavailable zinc, copper, manganese, and selenium for optimal health.' },
  { id:8, name:'CalciBoost Plus',      cat:'mineral',  species:'Dairy Cattle',        form:'Powder', desc:'Highly bioavailable calcium and phosphorus supplement for shell quality and milk fever prevention.' },
  { id:9, name:'ZincCare Organic',     cat:'mineral',  species:'All Species',         form:'Powder', desc:'Organic zinc supplement for foot health, immune function, and reproductive performance in all livestock.' },
  { id:10, name:'EnerBoost Liquid',    cat:'energy',   species:'Poultry',             form:'Liquid', desc:'High-energy liquid supplement with glucose, electrolytes and B-vitamins for rapid recovery from heat stress.' },
  { id:11, name:'MycoGuard Ultra',     cat:'mycotoxin',species:'Poultry & Livestock', form:'Powder', desc:'High-capacity bentonite and yeast cell wall binder providing broad-spectrum mycotoxin protection.' },
  { id:12, name:'ToxiClear Premium',   cat:'mycotoxin',species:'All Species',         form:'Powder', desc:'Activated carbon and bentonite blend for emergency mycotoxin decontamination in severely affected flocks.' },
];

const CATS = [
  { key:'',         label:'All Products' },
  { key:'growth',   label:'Growth Promoters' },
  { key:'immunity', label:'Immunity Boosters' },
  { key:'digestive',label:'Digestive Aids' },
  { key:'mineral',  label:'Mineral Supplements' },
  { key:'energy',   label:'Energy Supplements' },
  { key:'mycotoxin',label:'Mycotoxin Binders' },
];

const CAT_COLORS = { growth:'#14532d', immunity:'#1e6b40', digestive:'#166534', mineral:'#14532d', energy:'#1e6b40', mycotoxin:'#166534' };

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const activeCat = searchParams.get('cat') || '';

  const filtered = PRODUCTS.filter(p => {
    const matchCat = !activeCat || p.cat === activeCat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fa-products-page">
      <div className="fa-products-hero">
        <div className="container">
          <span className="section-eyebrow">Our Range</span>
          <h1 className="section-title section-title--white">Feed Additive Products</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,.65)' }}>
            12 scientifically formulated products across 6 categories — all manufactured by M.A. Kamil Farma under GMP-compliant standards.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="fa-filter-bar">
        <div className="container fa-filter-bar__inner">
          <div className="fa-filter-cats">
            {CATS.map(c => (
              <button key={c.key} className={`pf-btn ${activeCat===c.key?'active':''}`}
                onClick={() => { setSearchParams(c.key?{cat:c.key}:{}); }}>
                {c.label}
              </button>
            ))}
          </div>
          <input className="fa-search" placeholder="Search products…" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </div>

      <div className="container fa-products-body">
        <p className="fa-products-count">{filtered.length} products</p>
        <div className="fa-products-grid">
          {filtered.map(p => {
            const color = CAT_COLORS[p.cat] || '#14532d';
            const catLabel = CATS.find(c=>c.key===p.cat)?.label || p.cat;
            return (
              <div key={p.id} className="fa-prod-card">
                <div className="fa-prod-card__img" style={{ background: color + '15' }}>
                  <div className="fa-prod-card__ph" style={{ color }}>
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
                    </svg>
                  </div>
                  <div className="fa-prod-card__badges">
                    <span className="tag">{p.form}</span>
                  </div>
                  <div className="fa-prod-card__cat-stripe" style={{ background:color }} />
                </div>
                <div className="fa-prod-card__body">
                  <div className="fa-prod-card__species">{p.species}</div>
                  <div className="fa-prod-card__cat-label" style={{ color }}>
                    {catLabel}
                  </div>
                  <h3 className="fa-prod-card__name">{p.name}</h3>
                  <p className="fa-prod-card__desc">{p.desc}</p>
                  <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="fa-prod-card__wa">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="fa-products-empty">No products match your search.</div>
        )}
      </div>
    </div>
  );
}
