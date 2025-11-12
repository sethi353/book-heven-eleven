import React from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';

export default function Home() {
  const [latest, setLatest] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.get('/books?limit=6')
      .then(res => setLatest(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero bg-base-200 rounded-lg p-6 mb-8">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-4xl font-bold">Welcome to Book Haven</h1>
            <p className="py-3">Explore, add, and manage books — built with React, Node, MongoDB & Firebase.</p>
            <div className="flex gap-2">
              <Link to="/all-books" className="btn btn-primary">All Books</Link>
              <Link to="/add-book" className="btn btn-outline">Create Book</Link>
            </div>
          </div>
          <div className="text-center lg:text-left">
            {/* animated banner image placeholder */}
            <div className="w-56 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-md animate-pulse"></div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest books</h2>
        {loading ? <Loading /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latest.map(b => <BookCard key={b._id} book={b} />)}
          </div>
        )}
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="card p-4 shadow">
          <h3 className="text-xl font-semibold mb-2">Top Genres</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-base-100">Fantasy</div>
            <div className="p-2 rounded bg-base-100">Mystery</div>
            <div className="p-2 rounded bg-base-100">Non-Fiction</div>
            <div className="p-2 rounded bg-base-100">Romance</div>
          </div>
        </div>
        <div className="card p-4 shadow">
          <h3 className="text-xl font-semibold mb-2">About The Book Haven</h3>
          <p>We provide an easy place to catalog favorite books, manage your own collection, and discuss with other readers.</p>
        </div>
      </section>
    </div>
  );
}
