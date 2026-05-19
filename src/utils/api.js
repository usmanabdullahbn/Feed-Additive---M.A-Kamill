const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const api = {
  blogs: {
    list: (p={}) => fetch(`${BASE}/blogs?${new URLSearchParams(p)}`).then(r=>r.json()),
    get:  (slug) => fetch(`${BASE}/blogs/${slug}`).then(r=>r.json()),
  }
};
