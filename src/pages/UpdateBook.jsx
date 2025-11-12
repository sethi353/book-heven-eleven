import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = React.useState(null);

  // ✅ Fetch existing book data
  React.useEffect(() => {
    api
      .get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(console.error);
  }, [id]);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, book);
      toast.success('Book updated successfully');
      navigate('/my-books');
    } catch (err) {
      toast.error('Update failed');
      console.error(err);
    }
  };

  if (!book) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl mb-4 font-semibold text-center">Update Book</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input input-bordered w-full"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          placeholder="Title"
        />

        <input
          className="input input-bordered w-full"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          placeholder="Author"
        />

        <input
          className="input input-bordered w-full"
          value={book.genre}
          onChange={(e) => setBook({ ...book, genre: e.target.value })}
          placeholder="Genre"
        />

        <input
          type="number"
          className="input input-bordered w-full"
          value={book.rating}
          onChange={(e) => setBook({ ...book, rating: e.target.value })}
          placeholder="Rating (0–5)"
          min="0"
          max="5"
        />

        <textarea
          className="textarea textarea-bordered w-full"
          value={book.summary}
          onChange={(e) => setBook({ ...book, summary: e.target.value })}
          placeholder="Summary"
        />

        {/* 👇 Manual image URL input (instead of file upload) */}
        <input
          type="text"
          className="input input-bordered w-full"
          value={book.coverImage || ''}
          onChange={(e) => setBook({ ...book, coverImage: e.target.value })}
          placeholder="Image URL (paste link here)"
        />

        {/* 👇 Optional image preview */}
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt="Preview"
            className="w-40 h-56 object-cover rounded border mx-auto"
          />
        )}

        <button className="btn btn-primary w-full" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
