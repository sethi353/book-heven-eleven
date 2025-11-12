import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast, { Toaster } from 'react-hot-toast'; // ✅ replaced react-toastify
import { Tooltip } from 'react-tooltip'; // ✅ added tooltips
import 'react-tooltip/dist/react-tooltip.css';

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = React.useState(null);

  // ✅ Fetch existing book data
  React.useEffect(() => {
    api
      .get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error(err);
        toast.error('⚠️ Failed to load book data');
      });
  }, [id]);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, book);
      toast.success('✅ Book updated successfully');
      navigate('/my-books');
    } catch (err) {
      toast.error('❌ Update failed');
      console.error(err);
    }
  };

  if (!book) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-base-200 rounded-lg shadow-lg">
      {/* ✅ React Hot Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-semibold mb-4 text-center">Update Book</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input input-bordered w-full"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          placeholder="Title"
          data-tooltip-id="title-tip"
        />
        <Tooltip id="title-tip" place="right" content="Enter the book title" />

        <input
          className="input input-bordered w-full"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          placeholder="Author"
          data-tooltip-id="author-tip"
        />
        <Tooltip id="author-tip" place="right" content="Enter author's full name" />

        <input
          className="input input-bordered w-full"
          value={book.genre}
          onChange={(e) => setBook({ ...book, genre: e.target.value })}
          placeholder="Genre"
          data-tooltip-id="genre-tip"
        />
        <Tooltip id="genre-tip" place="right" content="Example: Drama, Romance, Sci-Fi" />

        <input
          type="number"
          className="input input-bordered w-full"
          value={book.rating}
          onChange={(e) => setBook({ ...book, rating: e.target.value })}
          placeholder="Rating (0–5)"
          min="0"
          max="5"
          data-tooltip-id="rating-tip"
        />
        <Tooltip id="rating-tip" place="right" content="Give a rating between 0 and 5" />

        <textarea
          className="textarea textarea-bordered w-full"
          value={book.summary}
          onChange={(e) => setBook({ ...book, summary: e.target.value })}
          placeholder="Summary"
          data-tooltip-id="summary-tip"
        />
        <Tooltip id="summary-tip" place="right" content="Briefly describe the story" />

        {/* 👇 Manual image URL input */}
        <input
          type="text"
          className="input input-bordered w-full"
          value={book.coverImage || ''}
          onChange={(e) => setBook({ ...book, coverImage: e.target.value })}
          placeholder="Image URL (paste link here)"
          data-tooltip-id="image-tip"
        />
        <Tooltip id="image-tip" place="right" content="Paste an online image URL" />

        {/* 👇 Optional image preview */}
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt="Preview"
            className="w-40 h-56 object-cover rounded border mx-auto mt-2"
          />
        )}

        <button
          className="btn btn-primary w-full mt-3"
          type="submit"
          data-tooltip-id="update-btn-tip"
        >
          Update
        </button>
        <Tooltip id="update-btn-tip" place="top" content="Save your updated book details" />
      </form>
    </div>
  );
}
