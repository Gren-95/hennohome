import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useListings } from '../context/ListingContext';
import { useAuth } from '../context/AuthContext';
import ImageModal from '../components/ImageModal';

const ListingDetailPage = () => {
  const { id } = useParams();
  const { getListingById, deleteListing } = useListings();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchListing = () => {
      try {
        const foundListing = getListingById(id);

        if (!foundListing) {
          setError('Listing not found');
          return;
        }

        setListing(foundListing);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, getListingById]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDelete = async () => {
    try {
      await deleteListing(id);
      navigate('/my-listings');
    } catch (err) {
      setError(err.message);
    }
  };

  const isOwner = currentUser && listing && currentUser.id === listing.ownerId;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = () => {
    if (listing.listingType === 'rent') {
      return `€${listing.price}/month`;
    } else {
      return `€${listing.price.toLocaleString()}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/" className="hover:text-blue-500">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{listing.title}</span>
          </nav>
        </div>

        {/* Listing Title and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
            <p className="text-gray-600 mt-1">{listing.address}</p>
          </div>

          {isOwner && (
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Link
                to={`/edit-listing/${listing.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Edit Listing
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
            {listing.images.length > 0 ? (
              <>
                <img
                  src={listing.images[currentImageIndex]}
                  alt={`Property image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(listing.images[currentImageIndex])}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                  }}
                />

                {/* View full size button */}
                <button
                  onClick={() => setSelectedImage(listing.images[currentImageIndex])}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded flex items-center hover:bg-opacity-70 transition-opacity"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                  Zoom
                </button>

                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No images available
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {listing.images.length > 1 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded overflow-hidden ${
                    index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=Error';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <ImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </div>

        {/* Listing Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Main Details */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Property Type</p>
                  <p className="font-medium capitalize">{listing.propertyType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-medium text-blue-600">{formatPrice()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Area</p>
                  <p className="font-medium">{listing.squareMeters} m²</p>
                </div>

                {listing.propertyType !== 'land' && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Rooms</p>
                      <p className="font-medium">{listing.rooms}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                      <p className="font-medium">{listing.bedrooms}</p>
                    </div>
                  </>
                )}

                {listing.propertyType === 'apartment' && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Floor</p>
                      <p className="font-medium">{listing.floor}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Total Floors</p>
                      <p className="font-medium">{listing.totalFloors}</p>
                    </div>
                  </>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line mb-6">{listing.description}</p>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-700">{listing.address}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Listed by</p>
                <p className="font-medium">{listing.ownerName}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{listing.ownerEmail}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{listing.contactPhone}</p>
              </div>

              <a
                href={`tel:${listing.contactPhone}`}
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded transition-colors"
              >
                Call Now
              </a>

              <a
                href={`mailto:${listing.ownerEmail}?subject=Inquiry about: ${listing.title}`}
                className="block w-full mt-3 border border-blue-500 text-blue-500 hover:bg-blue-50 text-center py-3 rounded transition-colors"
              >
                Send Email
              </a>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
              <p>Listing ID: {listing.id}</p>
              <p>Posted: {new Date(listing.createdAt).toLocaleDateString()}</p>
              {listing.createdAt !== listing.updatedAt && (
                <p>Last Updated: {new Date(listing.updatedAt).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetailPage;
