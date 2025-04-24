import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { getMyListings } = useListings();

  const myListings = getMyListings();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>

          <div className="mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl font-bold mb-4 mx-auto">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold text-center">{currentUser.name}</h2>
            <p className="text-gray-600 text-center">{currentUser.email}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{currentUser.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="font-medium">Today</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-gray-700">
                  Receive email notifications about new listings
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketUpdates"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="marketUpdates" className="ml-2 block text-gray-700">
                  Receive market updates and newsletters
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Property Listings</h2>
            <Link
              to="/create-listing"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Add New Listing
            </Link>
          </div>

          {myListings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't created any property listings yet.</p>
              <Link
                to="/create-listing"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors inline-block"
              >
                Create Your First Listing
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myListings.map(listing => (
                <div key={listing.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-40 md:h-auto">
                    <img
                      src={listing.images[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                      }}
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{listing.title}</h3>
                    <p className="text-gray-600 mb-2">{listing.address}</p>
                    <p className="text-blue-600 font-bold mb-4">
                      {listing.listingType === 'rent'
                        ? `€${listing.price}/month`
                        : `€${listing.price.toLocaleString()}`}
                    </p>
                    <div className="flex space-x-2">
                      <Link
                        to={`/listings/${listing.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-listing/${listing.id}`}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {myListings.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                to="/my-listings"
                className="text-blue-500 hover:text-blue-700"
              >
                View All My Listings
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
