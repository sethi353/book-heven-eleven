import React from 'react';
import api from '../services/api';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

export default function AllBooks() {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState('desc');

  const fetchBooks = (order = 'desc') => {
    setLoading(true);
    api.get(`/books?sortBy=rating&order=${order}`)
      .then(res => setBooks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    fetchBooks(sortOrder);
  }, [sortOrder]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">All Books</h2>
        <div>
          <label className="mr-2">Sort by rating:</label>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="select select-bordered">
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </div>

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
            {books.map(b => (
              <tr key={b._id}>
                <td><img src={b.coverImage} alt={b.title} className="w-16 h-16 object-cover" /></td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre}</td>
                <td>{b.rating}</td>
                <td>
                  <Link className="btn btn-sm btn-outline mr-2" to={`/book/${b._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
