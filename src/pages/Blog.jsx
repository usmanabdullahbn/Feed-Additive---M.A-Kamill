import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../utils/api';
import './Blog.css';

const MOCK = [
  { _id:'1', slug:'mycotoxin-management-feed', category:'Feed Safety', title:'Mycotoxin Management in Animal Feed: A Complete Guide', excerpt:'Contaminated feed is one of the most underestimated threats to farm productivity. Here is how to detect, prevent and manage mycotoxin risk effectively.', publishedAt:'2026-04-20', readTime:8 },
  { _id:'2', slug:'probiotics-livestock-gut', category:'Gut Health', title:'The Science Behind Probiotic Supplementation in Livestock', excerpt:'Emerging research confirms that multi-strain probiotic supplementation delivers measurable improvements in feed conversion, immunity and mortality rates across species.', publishedAt:'2026-04-05', readTime:6 },
  { _id:'3', slug:'chelated-minerals-bioavailability', category:'Nutrition', title:'Why Chelated Minerals Outperform Inorganic Sources', excerpt:'Organic mineral chelates deliver 2–3x higher bioavailability compared to sulphate forms. We break down the science and what it means for your feed programme.', publishedAt:'2026-03-22', readTime:5 },
  { _id:'4', slug:'heat-stress-poultry', category:'Poultry Health', title:'Managing Heat Stress in Broilers: A Nutritional Approach', excerpt:'Heat stress is one of the most costly seasonal challenges in poultry production. Targeted nutritional interventions can significantly reduce its economic impact.', publishedAt:'2026-03-08', readTime:7 },
];

const MOCK_POST = {
  title: 'Mycotoxin Management in Animal Feed: A Complete Guide',
  content: `
    <p>Mycotoxins — toxic secondary metabolites produced by moulds — represent one of the most significant but underappreciated threats to farm productivity in Pakistan. Studies suggest that up to 25% of global crop production is contaminated with mycotoxins at any given time.</p>
    <h2>Common Mycotoxins in Pakistan</h2>
    <p>Aflatoxins (from <em>Aspergillus</em> species) are the most prevalent in our climate, particularly in maize, groundnuts and cottonseed meal. Ochratoxin A and trichothecenes are also increasingly detected in commercial feed samples submitted for analysis.</p>
    <h2>Economic Impact on Farms</h2>
    <p>Sub-clinical mycotoxin exposure — which is far more common than acute toxicity — reduces feed intake, depresses immune function, and lowers production efficiency. A 10% reduction in daily feed intake across a 50,000-bird flock for just two weeks represents a significant loss in growth potential and revenue.</p>
    <blockquote>Even sub-clinical mycotoxin levels, often invisible to the naked eye, can cost a farm 8–15% of its productivity. Prevention is always cheaper than treatment.</blockquote>
    <h2>Prevention Strategies</h2>
    <p>The three most cost-effective interventions available to Pakistani farms are:</p>
    <ul>
      <li>Proper grain storage with controlled humidity below 13% moisture content</li>
      <li>Regular silo and feed mill cleaning and fumigation</li>
      <li>Consistent use of a high-quality, broad-spectrum mycotoxin binder in feed</li>
    </ul>
    <h2>Choosing the Right Binder</h2>
    <p>Not all binders are equal. M.A. Kamil Farma's <strong>MycoGuard Ultra</strong> combines high-adsorption bentonite clay with yeast cell wall fractions (mannan oligosaccharides) to provide effective binding across aflatoxins, fumonisins, ochratoxin, zearalenone, and trichothecenes — the five most economically important mycotoxin groups.</p>
    <p>When selecting a mycotoxin binder, look for independent efficacy data, a verified inclusion rate, and evidence of field performance in your region's specific commodity mix.</p>
  `,
  category:'Feed Safety', author:'M.A. Kamil Farma Technical Team', publishedAt:'2026-04-20', readTime:8,
  tags:['Mycotoxins','Feed Safety','Poultry','Livestock','Aflatoxin'],
};

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
}

export function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.blogs.list({ page, limit:9, category:'Feed Additives', search })
      .then(r => { setBlogs(r.data); setPagination(r.pagination); })
      .catch(() => setBlogs(MOCK))
      .finally(() => setLoading(false));
  }, [page]);

  function doSearch(e) { e.preventDefault(); setPage(1); }

  const [featured, ...rest] = blogs;

  return (
    <div className="fab-page">
      <div className="fab-hero">
        <div className="container fab-hero__inner">
          <span className="section-eyebrow">Knowledge Hub</span>
          <h1 className="section-title section-title--white">Feed Additive Insights</h1>
          <p className="section-lead" style={{ color:'rgba(255,255,255,.65)' }}>
            Expert articles on nutrition science, feed management, and farm performance — published bi-weekly.
          </p>
          <form className="fab-search-form" onSubmit={doSearch}>
            <input className="fab-search-input" placeholder="Search articles…" value={search} onChange={e=>setSearch(e.target.value)} />
            <button type="submit" className="btn btn--green">Search</button>
          </form>
        </div>
      </div>

      <div className="container fab-body">
        {loading ? (
          <div className="fab-skeletons">{[1,2,3].map(i=><div key={i} className="fab-skeleton"/>)}</div>
        ) : (
          <>
            {featured && (
              <Link to={`/blog/${featured.slug}`} className="fab-featured">
                <div className="fab-featured__img"><div className="fab-featured__ph"/></div>
                <div className="fab-featured__body">
                  <span className="tag tag--green">{featured.category}</span>
                  <h2 className="fab-featured__title">{featured.title}</h2>
                  <p className="fab-featured__excerpt">{featured.excerpt}</p>
                  <div className="fab-meta">{formatDate(featured.publishedAt)} · {featured.readTime} min read</div>
                </div>
              </Link>
            )}
            <div className="fab-grid">
              {rest.map(b => (
                <Link key={b._id} to={`/blog/${b.slug}`} className="fab-card">
                  <div className="fab-card__img"><div className="fab-card__ph"/><span className="tag tag--green fab-cat">{b.category}</span></div>
                  <div className="fab-card__body">
                    <h3>{b.title}</h3>
                    <p>{b.excerpt}</p>
                    <div className="fab-meta">{formatDate(b.publishedAt)} · {b.readTime} min read</div>
                  </div>
                </Link>
              ))}
            </div>
            {pagination?.pages > 1 && (
              <div className="fab-pagination">
                {Array.from({length:pagination.pages},(_,i)=>i+1).map(p=>(
                  <button key={p} className={`pf-btn ${page===p?'active':''}`} onClick={()=>setPage(p)}>{p}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0,0);
    api.blogs.get(slug).then(r=>setPost(r.data)).catch(()=>setPost(MOCK_POST)).finally(()=>setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{paddingTop:120}}>
      <div className="container" style={{maxWidth:760}}>
        {[80,20,20,20,20].map((h,i)=><div key={i} className="fab-skeleton" style={{height:h,marginTop:14,borderRadius:6}}/>)}
      </div>
    </div>
  );

  return (
    <div className="fab-post">
      <div className="fab-post__hero">
        <div className="container fab-post__hero-inner">
          <Link to="/blog" className="fab-post__back">← Back to Blog</Link>
          <span className="tag tag--green" style={{marginTop:18,display:'inline-block'}}>{post.category}</span>
          <h1 className="fab-post__title">{post.title}</h1>
          <div className="fab-post__meta">{post.author} · {formatDate(post.publishedAt)} · {post.readTime} min read</div>
        </div>
      </div>
      <div className="container fab-post__body">
        <article className="fab-post__content" dangerouslySetInnerHTML={{__html:post.content}} />
        {post.tags?.length>0 && (
          <div className="fab-post__tags">
            <span>Topics:</span>
            {post.tags.map(t=><span key={t} className="fab-post__tag">{t}</span>)}
          </div>
        )}
        <div className="fab-post__cta">
          <h3>Want Expert Advice for Your Farm?</h3>
          <p>Our nutritionists can recommend the right additive combination for your specific challenges.</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:20}}>
            <Link to="/contact" className="btn btn--green">Contact Us</Link>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="btn btn--outline">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
