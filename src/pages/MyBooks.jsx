import React from 'react';
import api from '../services/api';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast'; 
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { Tooltip } from 'react-tooltip'; 
import 'react-tooltip/dist/react-tooltip.css'; 

export default function MyBooks() {
  const [books, setBooks] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        fetchBooks(u.email);
      } else {
        setBooks([]);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const fetchBooks = (email) => {
    setLoading(true);
    api
      .get('/books')
      .then((res) => {
        const filtered = res.data.filter((b) => b.userEmail === email);
        setBooks(filtered);
      })
      .catch((err) => toast.error('Failed to fetch books '))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return;
    try {
      await api.delete(`/books/${id}`);
      toast.success(' Book deleted successfully');
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error(' Delete failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4">
      {/*  React Hot Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl mb-4 font-semibold text-center">My Books</h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-12 h-12 object-cover rounded"
                      data-tooltip-id={`cover-tip-${b._id}`}
                    />
                    <Tooltip
                      id={`cover-tip-${b._id}`}
                      place="top"
                      content={b.title}
                    />
                  </td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.genre}</td>
                  <td>{b.rating}</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-outline mr-2"
                      to={`/update-book/${b._id}`}
                      data-tooltip-id={`update-tip-${b._id}`}
                    >
                      Update
                    </Link>
                    <Tooltip
                      id={`update-tip-${b._id}`}
                      place="top"
                      content="Edit this book’s details"
                    />

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(b._id)}
                      data-tooltip-id={`delete-tip-${b._id}`}
                    >
                      Delete
                    </button>
                    <Tooltip
                      id={`delete-tip-${b._id}`}
                      place="top"
                      content="Permanently delete this book"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
