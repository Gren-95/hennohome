import React from 'react';
import ListingSection from '../components/ListingSection';
import { curatedListings, recentListings, recommendedListings } from '../data/mockListings';

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HennoHome Real Estate</h1>
        <p className="text-gray-600">Find your dream property in Estonia</p>
      </header>

      <main>
        <ListingSection title="Curated Listings" listings={curatedListings} />
        <ListingSection title="Recent Listings" listings={recentListings} />
        <ListingSection title="Recommended For You" listings={recommendedListings} />
      </main>
    </div>
  );
};

export default LandingPage;
