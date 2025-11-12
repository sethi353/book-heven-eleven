import React from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
  const [form, setForm] = React.useState({
    title: '',
    author: '',
    genre: '',
    rating: 0,
    summary: '',
    coverImage: '' // 👈 for manual image URL
  });

  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
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
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl mb-4 font-semibold text-center">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="input input-bordered w-full"
        />
        <input
          required
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
          className="input input-bordered w-full"
        />
        <input
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          placeholder="Genre"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          min="0"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          placeholder="Rating 0–5"
          className="input input-bordered w-full"
        />
        <textarea
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          placeholder="Summary"
          className="textarea textarea-bordered w-full"
        />

        {/* 👇 New input field for Image URL */}
        <input
          type="text"
          value={form.coverImage}
          onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          placeholder="Image URL (paste link here)"
          className="input input-bordered w-full"
        />

        {/* 👇 Optional: live preview of entered URL */}
        {form.coverImage && (
          <img
            src={form.coverImage}
            alt="Preview"
            className="w-40 h-56 object-cover rounded border mx-auto"
          />
        )}

        <button className="btn btn-primary w-full" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
}
