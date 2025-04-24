import React from 'react';
import { Link } from 'react-router-dom';

const SearchListingCard = ({ listing }) => {
  const { id, title, image, price, location, squareMeters, rooms, bedrooms, propertyType } = listing;

  // Format property type for display
  const formatPropertyType = (type) => {
    const types = {
      'apartment': 'Apartment',
      'house': 'House',
      'cottage': 'Cottage',
      'commercial': 'Commercial Space',
      'land': 'Land'
    };
    return types[type] || type;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/listings/${id}`} className="block">
        <div className="relative h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error';
            }}
          />
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
            {price}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/listings/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {location}
        </p>

        <div className="border-t border-gray-100 pt-2 mt-2">
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {formatPropertyType(propertyType)}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
              </svg>
              {squareMeters} m²
            </div>
          </div>

          {propertyType !== 'land' && (
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                {rooms} rooms
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
                {bedrooms} bedrooms
              </div>
            </div>
          )}
        </div>

        <Link 
          to={`/listings/${id}`} 
          className="mt-4 block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SearchListingCard;
