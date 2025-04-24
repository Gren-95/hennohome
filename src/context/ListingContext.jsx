import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create the listing context
const ListingContext = createContext();

// Custom hook to use the listing context
export const useListings = () => {
  return useContext(ListingContext);
};

// Provider component that wraps the app and makes listing object available to any child component
export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load listings from localStorage on component mount
  useEffect(() => {
    const storedListings = localStorage.getItem('listings');
    if (storedListings) {
      setListings(JSON.parse(storedListings));
    }
    setLoading(false);
  }, []);

  // Save listings to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('listings', JSON.stringify(listings));
    }
  }, [listings, loading]);

  // Create a new listing
  const createListing = (listingData) => {
    if (!currentUser) {
      throw new Error('You must be logged in to create a listing');
    }

    const newListing = {
      id: Date.now().toString(),
      ...listingData,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerEmail: currentUser.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setListings(prevListings => [...prevListings, newListing]);
    return newListing;
  };

  // Update an existing listing
  const updateListing = (id, listingData) => {
    if (!currentUser) {
      throw new Error('You must be logged in to update a listing');
    }

    const listingIndex = listings.findIndex(listing => listing.id === id);

    if (listingIndex === -1) {
      throw new Error('Listing not found');
    }

    const listing = listings[listingIndex];

    if (listing.ownerId !== currentUser.id) {
      throw new Error('You can only update your own listings');
    }

    const updatedListing = {
      ...listing,
      ...listingData,
      updatedAt: new Date().toISOString(),
    };

    const updatedListings = [...listings];
    updatedListings[listingIndex] = updatedListing;

    setListings(updatedListings);
    return updatedListing;
  };

  // Delete a listing
  const deleteListing = (id) => {
    if (!currentUser) {
      throw new Error('You must be logged in to delete a listing');
    }

    const listing = listings.find(listing => listing.id === id);

    if (!listing) {
      throw new Error('Listing not found');
    }

    if (listing.ownerId !== currentUser.id) {
      throw new Error('You can only delete your own listings');
    }

    setListings(prevListings => prevListings.filter(listing => listing.id !== id));
  };

  // Get all listings
  const getAllListings = () => {
    return listings;
  };

  // Get a specific listing by ID
  const getListingById = (id) => {
    return listings.find(listing => listing.id === id);
  };

  // Get listings by owner ID
  const getListingsByOwnerId = (ownerId) => {
    return listings.filter(listing => listing.ownerId === ownerId);
  };

  // Get current user's listings
  const getMyListings = () => {
    if (!currentUser) return [];
    return listings.filter(listing => listing.ownerId === currentUser.id);
  };

  // Search listings with multiple criteria
  const searchListings = (criteria) => {
    return listings.filter(listing => {
      // Search term filter (search in title, description, address)
      if (criteria.searchTerm && !listing.title.toLowerCase().includes(criteria.searchTerm.toLowerCase()) &&
          !listing.description.toLowerCase().includes(criteria.searchTerm.toLowerCase()) &&
          !listing.address.toLowerCase().includes(criteria.searchTerm.toLowerCase())) {
        return false;
      }

      // Location filter
      if (criteria.location && !listing.address.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false;
      }

      // Size range filter
      if (criteria.minSize && listing.squareMeters < criteria.minSize) {
        return false;
      }
      if (criteria.maxSize && listing.squareMeters > criteria.maxSize) {
        return false;
      }

      // Property type filter
      if (criteria.propertyType && listing.propertyType !== criteria.propertyType) {
        return false;
      }

      // Price range filter
      if (criteria.minPrice && listing.price < criteria.minPrice) {
        return false;
      }
      if (criteria.maxPrice && listing.price > criteria.maxPrice) {
        return false;
      }

      // Purpose filter (sale/rent)
      if (criteria.purpose && listing.listingType !== criteria.purpose) {
        return false;
      }

      // Floor count filter (for apartments)
      if (criteria.floors && listing.propertyType === 'apartment' && listing.totalFloors !== criteria.floors) {
        return false;
      }

      // Room count filter
      if (criteria.rooms && listing.rooms !== criteria.rooms) {
        return false;
      }

      // Bedroom count filter
      if (criteria.bedrooms && listing.bedrooms !== criteria.bedrooms) {
        return false;
      }

      return true;
    });
  };

  const value = {
    listings,
    loading,
    createListing,
    updateListing,
    deleteListing,
    getAllListings,
    getListingById,
    getListingsByOwnerId,
    getMyListings,
    searchListings,
  };

  return (
    <ListingContext.Provider value={value}>
      {!loading && children}
    </ListingContext.Provider>
  );
};
