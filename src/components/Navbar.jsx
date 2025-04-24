import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">HennoHome</Link>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="hidden md:inline">Welcome, {currentUser.name}</span>
              <Link
                to="/profile"
                className="hover:text-blue-200 transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
