import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListingForm from '../components/ListingForm';
import { useListings } from '../context/ListingContext';
import { useAuth } from '../context/AuthContext';

const EditListingPage = () => {
  const { id } = useParams();
  const { getListingById, updateListing } = useListings();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchListing = () => {
      try {
        const foundListing = getListingById(id);
        
        if (!foundListing) {
          setError('Listing not found');
          return;
        }
        
        // Check if the current user is the owner
        if (foundListing.ownerId !== currentUser?.id) {
          setError('You do not have permission to edit this listing');
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
  }, [id, getListingById, currentUser]);
  
  const handleSubmit = async (formData) => {
    try {
      const updatedListing = await updateListing(id, formData);
      // Navigate to the listing's detail page
      navigate(`/listings/${updatedListing.id}`);
    } catch (err) {
      console.error('Error updating listing:', err);
      throw err;
    }
  };
  
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
            onClick={() => navigate('/my-listings')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to My Listings
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Your Property Listing</h1>
          <p className="text-gray-600 mt-2">
            Update the information for your property listing. All fields marked with * are required.
          </p>
        </div>
        
        <ListingForm 
          initialData={listing} 
          onSubmit={handleSubmit} 
          isEditing={true} 
        />
      </div>
    </div>
  );
};

export default EditListingPage;
