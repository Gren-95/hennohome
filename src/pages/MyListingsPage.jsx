import React from 'react';
import { Link } from 'react-router-dom';
import { useListings } from '../context/ListingContext';

const MyListingsPage = () => {
  const { getMyListings } = useListings();
  const myListings = getMyListings();
  
  const formatPrice = (listing) => {
    if (listing.listingType === 'rent') {
      return `€${listing.price}/month`;
    } else {
      return `€${listing.price.toLocaleString()}`;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Property Listings</h1>
          <Link
            to="/create-listing"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Add New Listing
          </Link>
        </div>
        
        {myListings.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">You don't have any listings yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first property listing to start selling or renting your property.
            </p>
            <Link
              to="/create-listing"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors inline-block"
            >
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map(listing => (
              <div key={listing.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={listing.images[0] || 'https://via.placeholder.com/800x600?text=No+Image'} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error';
                    }}
                  />
                  <div className="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 text-sm capitalize">
                    {listing.propertyType}
                  </div>
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm capitalize">
                    For {listing.listingType}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{listing.title}</h3>
                  <p className="text-gray-600 mb-2">{listing.address}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-blue-600 font-bold">{formatPrice(listing)}</p>
                    <p className="text-gray-500 text-sm">{listing.squareMeters} m²</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/listings/${listing.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      View Details
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
      </div>
    </div>
  );
};

export default MyListingsPage;
