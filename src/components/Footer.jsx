import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">Book Haven</h1>
          <p className="text-gray-400 text-sm">Explore your favorite books online</p>
        </div>

        {/* Center Section */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/all-books" className="hover:text-gray-300">All Books</a>
          <a href="/add-book" className="hover:text-gray-300">Add Book</a>
          <a href="/my-books" className="hover:text-gray-300">My Books</a>
        </div>

        {/* Right Section */}
        <div className="text-gray-400 text-sm">
          &copy; {currentYear} Book Haven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
