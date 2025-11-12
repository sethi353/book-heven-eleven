import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { FaBook, FaBars, FaTimes } from "react-icons/fa";

function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);
  return user;
}

export default function Navbar() {
  const user = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-xl font-bold text-purple-800">
          <FaBook className="mr-2 text-purple-700" /> Book Haven
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium text-purple-800">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-books">All Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/my-books">My Books</Link></li>
        </ul>

        {/* Right side (Auth Buttons) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user.photoURL && (
                <img
                  title={user.displayName || user.email}
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full"
                  alt="avatar"
                />
              )}
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-purple-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-purple-50 border-t border-purple-200 py-3">
          <ul className="flex flex-col items-center gap-3 font-medium text-purple-800">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/all-books" onClick={() => setMenuOpen(false)}>All Books</Link></li>
            <li><Link to="/add-book" onClick={() => setMenuOpen(false)}>Add Book</Link></li>
            <li><Link to="/my-books" onClick={() => setMenuOpen(false)}>My Books</Link></li>
          </ul>

          <div className="flex flex-col items-center gap-2 mt-3">
            {user ? (
              <>
                {user.photoURL && (
                  <img
                    title={user.displayName || user.email}
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                )}
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-sm">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
