import React from 'react';
import { Link } from 'react-router-dom';
import ListingSection from '../components/ListingSection';
import { curatedListings, recentListings, recommendedListings } from '../data/mockListings';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HennoHome Real Estate</h1>
        <p className="text-gray-600">Find your dream property in Estonia</p>

        {!currentUser && (
          <div className="mt-6 bg-blue-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Create an Account</h2>
            <p className="text-blue-700 mb-4">
              Sign up to save your favorite listings, receive personalized recommendations, and more!
            </p>
            <div className="flex space-x-4">
              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        )}

        {currentUser && (
          <div className="mt-6 bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Welcome back, {currentUser.name}!</h2>
            <p className="text-green-700">
              We've updated our listings with new properties that match your preferences.
            </p>
          </div>
        )}
      </header>

      <main>
        <ListingSection title="Curated Listings" listings={curatedListings} />
        <ListingSection title="Recent Listings" listings={recentListings} />
        <ListingSection title="Recommended For You" listings={recommendedListings} />
      </main>
    </div>
  );
};

export default LandingPage;
