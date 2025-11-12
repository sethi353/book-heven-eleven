import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default axios.create({
  baseURL: `${BASE}/api`,
  headers: { 'Content-Type': 'application/json' }
});
