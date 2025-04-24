import React from 'react';

const ListingCard = ({ listing }) => {
  const { title, image, price, location } = listing;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{location}</p>
        <div className="flex justify-between items-center">
          <p className="text-blue-600 font-bold">{price}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
