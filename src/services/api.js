import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || 'https://book-heven-server.vercel.app';

export default axios.create({
  baseURL: `${BASE}/api`,
  headers: { 'Content-Type': 'application/json' }
});
