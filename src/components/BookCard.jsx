import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="card shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
      <figure>
        <img
          src={book.coverImage}
          className="w-full h-48 object-cover"
          alt={book.title}
        />
      </figure>
      <div className="card-body text-black dark:text-white transition-colors duration-300">
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">By {book.author}</p>
        <div className="card-actions justify-end">
          <Link
            to={`/book/${book._id}`}
            className="btn btn-sm btn-outline border-gray-400 dark:border-gray-600 dark:text-gray-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
