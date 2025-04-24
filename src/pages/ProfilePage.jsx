import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>
        
        <div className="mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl font-bold mb-4 mx-auto">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold text-center">{currentUser.name}</h2>
          <p className="text-gray-600 text-center">{currentUser.email}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-medium">{currentUser.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="font-medium">{currentUser.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Account Created</p>
              <p className="font-medium">Today</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="emailNotifications" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-gray-700">
                Receive email notifications about new listings
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="marketUpdates" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="marketUpdates" className="ml-2 block text-gray-700">
                Receive market updates and newsletters
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
