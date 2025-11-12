import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { FaBook } from 'react-icons/fa';

function useAuth() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);
  return user;
}

export default function Navbar() {
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="navbar bg-base-100 shadow-md">
      {/* Logo Section */}
      <div className="flex-1 px-4">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <FaBook className="mr-2" /> Book Haven
        </Link>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-books">All Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/my-books">My Books</Link></li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-none px-4">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-books">All Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/my-books">My Books</Link></li>
        </ul>
      </div>

      {/* User Section */}
      <div className="px-4">
        {user ? (
          <div className="flex items-center gap-3">
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
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
