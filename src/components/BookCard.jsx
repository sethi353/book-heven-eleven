import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="card shadow-lg">
      <figure><img src={book.coverImage} className="w-full h-48 object-cover" alt={book.title} /></figure>
      <div className="card-body">
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm">By {book.author}</p>
        <div className="card-actions justify-end">
          <Link to={`/book/${book._id}`} className="btn btn-sm btn-outline">View Details</Link>
        </div>
      </div>
    </div>
  );
}
