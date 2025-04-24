import React from 'react';
import { Link } from 'react-router-dom';
import ListingSection from '../components/ListingSection';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingContext';

const LandingPage = () => {
  const { currentUser } = useAuth();
  const { getAllListings } = useListings();

  const allListings = getAllListings();

  // Format listings for display
  const formattedListings = allListings.map(listing => ({
    id: listing.id,
    title: listing.title,
    image: listing.images[0] || 'https://via.placeholder.com/800x600?text=No+Image',
    price: listing.listingType === 'rent' ? `€${listing.price}/month` : `€${listing.price.toLocaleString()}`,
    location: listing.address
  }));

  // Get the most recent listings
  const recentListings = [...formattedListings]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  // For demo purposes, we'll just use the same listings for different sections
  // In a real app, you would have more sophisticated filtering
  const forSaleListings = formattedListings
    .filter(listing => !listing.price.includes('/month'))
    .slice(0, 3);

  const forRentListings = formattedListings
    .filter(listing => listing.price.includes('/month'))
    .slice(0, 3);

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
            <p className="text-green-700 mb-4">
              Ready to list your property? Create a new listing today!
            </p>
            <Link
              to="/create-listing"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors inline-block"
            >
              List Your Property
            </Link>
          </div>
        )}
      </header>

      <main>
        {allListings.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">No listings available yet</h2>
            <p className="text-gray-600 mb-6">
              Be the first to list your property on HennoHome!
            </p>
            {currentUser ? (
              <Link
                to="/create-listing"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors inline-block"
              >
                Create Your First Listing
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors inline-block"
              >
                Sign Up to List Properties
              </Link>
            )}
          </div>
        ) : (
          <>
            <ListingSection title="Recent Listings" listings={recentListings} />
            {forSaleListings.length > 0 && (
              <ListingSection title="Properties For Sale" listings={forSaleListings} />
            )}
            {forRentListings.length > 0 && (
              <ListingSection title="Properties For Rent" listings={forRentListings} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
