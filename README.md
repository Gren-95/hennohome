# HennoHome Real Estate Platform

HennoHome is a modern real estate platform built with React and Vite that allows users to browse, list, and manage property listings.

## Features

### User Authentication
- User registration and login
- Protected routes for authenticated users
- User profile management

### Property Listings
- Browse property listings on the home page
- View detailed information about properties
- Filter properties by type (for sale/rent)

### Property Management for Registered Users
- Create new property listings with detailed information
- Upload multiple images for each property
- Edit existing property listings
- Remove property listings
- View all your property listings in one place

## Property Listing Details

Users can add the following information when creating a property listing:

- **Basic Information**
  - Title
  - Property type (apartment, house, cottage, commercial space, land)
  - Listing type (for sale or for rent)

- **Location**
  - Full address

- **Property Details**
  - Square meters
  - Number of rooms
  - Number of bedrooms
  - Floor (for apartments)
  - Total floors in building (for apartments)
  - Price

- **Description**
  - Detailed property description

- **Images**
  - Multiple property images
  - Support for adding images from your computer (via file upload, copy-paste)
  - Image preview and management

- **Contact Information**
  - Phone number (in addition to the user's email)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hennohome.git
cd hennohome
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Technology Stack

- **Frontend**: React, React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Data Storage**: localStorage (for demo purposes)

## Future Enhancements

- Backend integration with a real database
- Advanced search and filtering options
- User favorites and saved searches
- Messaging system between buyers and sellers
- Admin dashboard for content moderation
- Map integration for property locations
