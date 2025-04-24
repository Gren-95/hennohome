import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import CreateListingPage from './pages/CreateListingPage'
import EditListingPage from './pages/EditListingPage'
import ListingDetailPage from './pages/ListingDetailPage'
import MyListingsPage from './pages/MyListingsPage'
import SearchPage from './pages/SearchPage'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { ListingProvider } from './context/ListingContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <ListingProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/create-listing" element={
                  <ProtectedRoute>
                    <CreateListingPage />
                  </ProtectedRoute>
                } />
                <Route path="/edit-listing/:id" element={
                  <ProtectedRoute>
                    <EditListingPage />
                  </ProtectedRoute>
                } />
                <Route path="/my-listings" element={
                  <ProtectedRoute>
                    <MyListingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/listings/:id" element={<ListingDetailPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ListingProvider>
    </AuthProvider>
  )
}

export default App
