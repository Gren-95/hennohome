import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const { id, title, image, price, location } = listing;

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
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/listings/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex justify-between items-center">
          <p className="text-blue-600 font-bold">{price}</p>
          <Link
            to={`/listings/${id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
