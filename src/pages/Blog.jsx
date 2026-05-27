import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../utils/api';
import './Blog.css';

// Mock data for fallback
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

// CRUD Modal Component
function BlogModal({ blog, onSave, onClose }) {
  const [form, setForm] = useState(blog || {
    title: '', excerpt: '', content: '', category: 'Feed Additives', tags: '', author: 'M.A. Kamil Farma', published: false, readTime: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t),
      readTime: parseInt(form.readTime) || 0,
      published: form.published === true || form.published === 'true',
    };
    await onSave(data);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fab-modal" onClick={onClose}>
      <div className="fab-modal__content" onClick={e => e.stopPropagation()}>
        <button className="fab-modal__close" onClick={onClose}>✕</button>
        <h2>{blog ? 'Edit Blog' : 'Create Blog'}</h2>
        <form onSubmit={handleSubmit} className="fab-form">
          <input type="text" placeholder="Title" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <textarea placeholder="Excerpt" required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows="2"></textarea>
          <textarea placeholder="Content (HTML allowed)" required value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows="8"></textarea>
          
          <div className="fab-form__row">
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option>Feed Additives</option>
              <option>Poultry</option>
              <option>Livestock</option>
              <option>Compounding Pharmacy</option>
              <option>Industry News</option>
              <option>Science</option>
              <option>Research</option>
              <option>Innovation</option>
              <option>Sustainability</option>
              <option>General</option>
            </select>
            <input type="text" placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
          </div>

          <div className="fab-form__row">
            <input type="text" placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
            <input type="number" placeholder="Read time (min)" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} />
          </div>

          <label className="fab-checkbox">
            <input type="checkbox" checked={form.published === true || form.published === 'true'} onChange={e => setForm({...form, published: e.target.checked})} />
            Published
          </label>

          <div className="fab-form__actions">
            <button type="submit" disabled={loading} className="btn btn--green">{loading ? 'Saving...' : 'Save Blog'}</button>
            <button type="button" onClick={onClose} className="btn btn--outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
}

export function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  
  // Admin CRUD states
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]); // For admin - show all blogs

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  useEffect(() => {
    const handleAdminModalRequest = () => {
      if (localStorage.getItem('showAdminModal') === 'true') {
        setShowTokenForm(true);
        localStorage.removeItem('showAdminModal');
      }
    };
    window.addEventListener('adminModalRequested', handleAdminModalRequest);
    return () => window.removeEventListener('adminModalRequested', handleAdminModalRequest);
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    api.blogs.list({ page, limit: 9, category: 'Feed Additives', search })
      .then(r => { setBlogs(r.data); setPagination(r.pagination); })
      .catch(() => setBlogs(MOCK))
      .finally(() => setLoading(false));
  };

  const fetchAllBlogs = () => {
    setAdminLoading(true);
    api.blogs.list({ page: 1, limit: 1000 })
      .then(r => setAllBlogs(r.data))
      .catch(() => setAllBlogs([]))
      .finally(() => setAdminLoading(false));
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('adminToken', adminToken);
    setIsAdmin(true);
    setShowTokenForm(false);
    fetchAllBlogs();
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    setAdminToken('');
    setAllBlogs([]);
  };

  const handleSaveBlog = async (data) => {
    try {
      if (editingBlog) {
        await api.blogs.update(editingBlog._id, data);
      } else {
        await api.blogs.create(data);
      }
      fetchBlogs();
      fetchAllBlogs();
      setEditingBlog(null);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await api.blogs.delete(id);
      fetchBlogs();
      fetchAllBlogs();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  function doSearch(e) { e.preventDefault(); setPage(1); }

  const [featured, ...rest] = blogs;

  return (
    <div className="fab-page">
      {/* Admin Token Form */}
      {showTokenForm && (
        <div className="fab-modal" onClick={() => setShowTokenForm(false)}>
          <div className="fab-modal__content" onClick={e => e.stopPropagation()}>
            <h2>Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="fab-form">
              <input 
                type="password" 
                placeholder="Enter admin token" 
                value={adminToken} 
                onChange={e => setAdminToken(e.target.value)}
                required
              />
              <div className="fab-form__actions">
                <button type="submit" className="btn btn--green">Login</button>
                <button type="button" onClick={() => setShowTokenForm(false)} className="btn btn--outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog CRUD Modal */}
      {showModal && (
        <BlogModal 
          blog={editingBlog} 
          onSave={handleSaveBlog} 
          onClose={() => { setShowModal(false); setEditingBlog(null); }}
        />
      )}

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
        {/* Admin Control Bar */}
        {isAdmin && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
            <button className="btn btn--green" onClick={() => { setEditingBlog(null); setShowModal(true); }}>+ Create Blog</button>
          </div>
        )}

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
                  {isAdmin && (
                    <div className="fab-actions">
                      <button className="btn btn--sm" onClick={() => { setEditingBlog(featured); setShowModal(true); }}>Edit</button>
                      <button className="btn btn--sm btn--outline" onClick={() => handleDeleteBlog(featured._id)}>Delete</button>
                    </div>
                  )}
                </div>
              </Link>
            )}
            <div className="fab-grid">
              {rest.map(b => (
                <div key={b._id} className="fab-card">
                  <Link to={`/blog/${b.slug}`} className="fab-card-link">
                    <div className="fab-card__img"><div className="fab-card__ph"/><span className="tag tag--green fab-cat">{b.category}</span></div>
                    <div className="fab-card__body">
                      <h3>{b.title}</h3>
                      <p>{b.excerpt}</p>
                      <div className="fab-meta">{formatDate(b.publishedAt)} · {b.readTime} min read</div>
                    </div>
                  </Link>
                  {isAdmin && (
                    <div className="fab-card-actions">
                      <button className="btn btn--sm" onClick={() => { setEditingBlog(b); setShowModal(true); }}>Edit</button>
                      <button className="btn btn--sm btn--outline" onClick={() => handleDeleteBlog(b._id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Admin Dashboard */}
        {isAdmin && (
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
            <h2>All Blogs (Admin)</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Title</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Category</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Published</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allBlogs.map(b => (
                  <tr key={b._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}><strong>{b.title}</strong></td>
                    <td style={{ padding: '0.5rem' }}>{b.category}</td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>{b.published ? '✓' : '○'}</td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                      <button className="btn btn--sm" onClick={() => { setEditingBlog(b); setShowModal(true); }}>Edit</button>
                      <button className="btn btn--sm btn--outline" onClick={() => handleDeleteBlog(b._id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && !isAdmin && (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            {Array.from({ length: pagination.pages }, (_, i) => (
              <button
                key={i + 1}
                className={`btn ${page === i + 1 ? 'btn--green' : 'btn--outline'}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
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
