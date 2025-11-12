import React from 'react';
import api from '../services/api';
import { uploadToImgbb } from '../utils/imgbbUpload';
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const [form, setForm] = React.useState({
    title: '', author: '', genre: '', rating: 0, summary: ''
  });
  const [file, setFile] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (file) {
        imageUrl = await uploadToImgbb(file);
      }
      const payload = {
        ...form,
        coverImage: imageUrl,
        userEmail: user.email,
        userName: user.displayName || user.email
      };
      await api.post('/books', payload);
      toast.success('Book added successfully');
      navigate('/my-books');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add book');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="input input-bordered w-full" />
        <input required value={form.author} onChange={e=>setForm({...form,author:e.target.value})} placeholder="Author" className="input input-bordered w-full" />
        <input value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})} placeholder="Genre" className="input input-bordered w-full" />
        <input type="number" min="0" max="5" value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})} placeholder="Rating 0-5" className="input input-bordered w-full" />
        <textarea value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} placeholder="Summary" className="textarea textarea-bordered w-full" />
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <button className="btn btn-primary" type="submit">Add Book</button>
      </form>
    </div>
  );
}
