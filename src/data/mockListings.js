// Mock data for real estate listings
const listings = [
  {
    id: 1,
    title: "Modern 2BR Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€1,200/month",
    location: "Tallinn, Estonia"
  },
  {
    id: 2,
    title: "Spacious Family Home",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€350,000",
    location: "Tartu, Estonia"
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€800/month",
    location: "Tallinn, Estonia"
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€550,000",
    location: "Pärnu, Estonia"
  },
  {
    id: 5,
    title: "Charming Cottage",
    image: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€220,000",
    location: "Haapsalu, Estonia"
  },
  {
    id: 6,
    title: "Modern Office Space",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€2,500/month",
    location: "Tallinn, Estonia"
  },
  {
    id: 7,
    title: "Seaside Villa",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€750,000",
    location: "Pärnu, Estonia"
  },
  {
    id: 8,
    title: "Student Apartment",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€600/month",
    location: "Tartu, Estonia"
  },
  {
    id: 9,
    title: "Historic Townhouse",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "€420,000",
    location: "Tallinn, Estonia"
  }
];

// Separate listings into categories
export const curatedListings = listings.slice(0, 3);
export const recentListings = listings.slice(3, 6);
export const recommendedListings = listings.slice(6, 9);

export default listings;
