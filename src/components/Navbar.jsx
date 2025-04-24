import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">HennoHome</Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/create-listing"
                  className="hover:text-blue-200 transition-colors"
                >
                  List Property
                </Link>
                <Link
                  to="/my-listings"
                  className="hover:text-blue-200 transition-colors"
                >
                  My Listings
                </Link>
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            {currentUser ? (
              <div className="flex flex-col space-y-3">
                <div className="py-2 border-b border-blue-500">
                  <span>Welcome, {currentUser.name}</span>
                </div>
                <Link
                  to="/create-listing"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  List Property
                </Link>
                <Link
                  to="/my-listings"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors inline-block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
