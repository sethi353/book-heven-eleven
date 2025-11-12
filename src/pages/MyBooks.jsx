import React from 'react';
import api from '../services/api';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function MyBooks() {
  const [books, setBooks] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
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
    api.get('/books')
      .then(res => {
        const filtered = res.data.filter(b => b.userEmail === email);
        setBooks(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return;
    try {
      await api.delete(`/books/${id}`);
      toast.success('Deleted');
      setBooks(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl mb-4">My Books</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>...</thead>
          <tbody>
            {books.map(b => (
              <tr key={b._id}>
                <td><img src={b.coverImage} alt="" className="w-12 h-12 object-cover" /></td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre}</td>
                <td>{b.rating}</td>
                <td>
                  <Link className="btn btn-sm btn-outline mr-2" to={`/update-book/${b._id}`}>Update</Link>
                  <button className="btn btn-sm btn-error" onClick={()=>handleDelete(b._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
