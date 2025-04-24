import React, { useState, useEffect } from 'react';
import { useListings } from '../context/ListingContext';
import { Link, useSearchParams } from 'react-router-dom';
import SearchListingCard from '../components/SearchListingCard';

const SearchPage = () => {
  const { getAllListings } = useListings();
  const [searchParams, setSearchParams] = useSearchParams();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    minSize: searchParams.get('minSize') ? Number(searchParams.get('minSize')) : '',
    maxSize: searchParams.get('maxSize') ? Number(searchParams.get('maxSize')) : '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : '',
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '',
    purpose: searchParams.get('purpose') || '',
    floors: searchParams.get('floors') ? Number(searchParams.get('floors')) : '',
    rooms: searchParams.get('rooms') ? Number(searchParams.get('rooms')) : '',
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : '',
  });

  // State for results and UI
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;

  // Property type options
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'cottage', label: 'Cottage' },
    { value: 'commercial', label: 'Commercial Space' },
    { value: 'land', label: 'Land' }
  ];

  // Purpose options
  const purposeOptions = [
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ];

  // Update search params when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (searchTerm) newSearchParams.set('q', searchTerm);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        newSearchParams.set(key, value);
      }
    });

    setSearchParams(newSearchParams);
  }, [searchTerm, filters, setSearchParams]);

  // Perform search when search params change
  useEffect(() => {
    const performSearch = () => {
      setLoading(true);

      const allListings = getAllListings();

      // Filter listings based on search criteria
      const filteredListings = allListings.filter(listing => {
        // Search term filter (search in title, description, address)
        if (searchTerm && !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !listing.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !listing.address.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }

        // Location filter
        if (filters.location && !listing.address.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }

        // Size range filter
        if (filters.minSize && listing.squareMeters < filters.minSize) {
          return false;
        }
        if (filters.maxSize && listing.squareMeters > filters.maxSize) {
          return false;
        }

        // Property type filter
        if (filters.propertyType && listing.propertyType !== filters.propertyType) {
          return false;
        }

        // Price range filter
        if (filters.minPrice && listing.price < filters.minPrice) {
          return false;
        }
        if (filters.maxPrice && listing.price > filters.maxPrice) {
          return false;
        }

        // Purpose filter (sale/rent)
        if (filters.purpose && listing.listingType !== filters.purpose) {
          return false;
        }

        // Floor count filter (for apartments)
        if (filters.floors && listing.propertyType === 'apartment' && listing.totalFloors !== filters.floors) {
          return false;
        }

        // Room count filter
        if (filters.rooms && listing.rooms !== filters.rooms) {
          return false;
        }

        // Bedroom count filter
        if (filters.bedrooms && listing.bedrooms !== filters.bedrooms) {
          return false;
        }

        return true;
      });

      // Format listings for display
      const formattedResults = filteredListings.map(listing => ({
        id: listing.id,
        title: listing.title,
        image: listing.images[0] || 'https://via.placeholder.com/800x600?text=No+Image',
        price: listing.listingType === 'rent' ? `€${listing.price}/month` : `€${listing.price.toLocaleString()}`,
        location: listing.address,
        squareMeters: listing.squareMeters,
        rooms: listing.rooms,
        bedrooms: listing.bedrooms,
        propertyType: listing.propertyType
      }));

      setResults(formattedResults);
      setLoading(false);
    };

    performSearch();
  }, [searchParams, getAllListings]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;

    // Convert numeric inputs to numbers
    if (type === 'number') {
      setFilters({
        ...filters,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }

    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({
      location: '',
      minSize: '',
      maxSize: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      purpose: '',
      floors: '',
      rooms: '',
      bedrooms: '',
    });
    setCurrentPage(1);
  };

  // Toggle filter panel visibility (for mobile)
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Properties</h1>

      {/* Main Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by keywords, location, property type..."
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded flex justify-between items-center"
        >
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Panel */}
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              <button
                onClick={handleResetFilters}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Reset All
              </button>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="City, neighborhood, zip code..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Property Type Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyType">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Purpose Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Purpose
              </label>
              <select
                id="purpose"
                name="purpose"
                value={filters.purpose}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                {purposeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price Range (€)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Size Range Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Size Range (m²)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minSize"
                  value={filters.minSize}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxSize"
                  value={filters.maxSize}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Room Filters */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rooms">
                Rooms
              </label>
              <select
                id="rooms"
                name="rooms"
                value={filters.rooms}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}+ rooms</option>
                ))}
              </select>
            </div>

            {/* Bedroom Filters */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num}+ bedrooms</option>
                ))}
              </select>
            </div>

            {/* Floor Count Filter (for apartments) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floors">
                Total Floors (Apartments)
              </label>
              <select
                id="floors"
                name="floors"
                value={filters.floors}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25].map(num => (
                  <option key={num} value={num}>{num} floors</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="md:w-3/4">
          {/* Results Count and Sort */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
            <p className="text-gray-700">
              {loading ? 'Searching...' : `${results.length} properties found`}
            </p>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading properties...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">No properties found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more properties.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentResults.map(listing => (
                <SearchListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {results.length > resultsPerPage && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-l border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 border-t border-b border-gray-300 ${
                        currentPage === number
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-r border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
