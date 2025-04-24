import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListingForm from '../components/ListingForm';
import { useListings } from '../context/ListingContext';

const CreateListingPage = () => {
  const { createListing } = useListings();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const newListing = await createListing(formData);
      // Navigate to the new listing's detail page
      navigate(`/listings/${newListing.id}`);
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
          <p className="text-gray-600 mt-2">
            Fill out the form below to list your property on HennoHome. All fields marked with * are required.
          </p>
        </div>
        
        <ListingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateListingPage;
