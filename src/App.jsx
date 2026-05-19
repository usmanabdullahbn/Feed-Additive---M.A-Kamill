import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsApp from './components/WhatsApp';
import Home from './pages/Home';
import Products from './pages/Products';
import { Blog, BlogPost } from './pages/Blog';
import Contact from './pages/Contact';
import './App.css';

function NotFound() {
  return (
    <div style={{ paddingTop:160, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--green-900)', marginBottom:12 }}>
        Page Not Found
      </h2>
      <a href="/" style={{ color:'var(--green-700)', fontWeight:600 }}>← Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="fa-app">
        <Navbar />
        <main><Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes></main>
        <Footer />
        <WhatsApp />
      </div>
    </BrowserRouter>
  );
}
