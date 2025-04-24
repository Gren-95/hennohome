import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageModal from './ImageModal';

const ListingForm = ({ initialData, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    propertyType: '',
    squareMeters: '',
    rooms: '',
    bedrooms: '',
    price: '',
    description: '',
    listingType: 'sale',
    floor: '',
    totalFloors: '',
    contactPhone: '',
    images: [],
    ...initialData
  });

  // Error state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState(initialData?.images || []);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Property type options
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'cottage', label: 'Cottage' },
    { value: 'commercial', label: 'Commercial Space' },
    { value: 'land', label: 'Land' }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert numeric inputs to numbers
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle image URL input
  const handleImageUrlChange = (e) => {
    setCurrentImageUrl(e.target.value);
  };

  // Add image URL to the list
  const addImageUrl = () => {
    if (currentImageUrl.trim() === '') return;

    setImageUrls([...imageUrls, currentImageUrl]);
    setFormData({
      ...formData,
      images: [...imageUrls, currentImageUrl]
    });
    setCurrentImageUrl('');
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      if (!file.type.match('image.*')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImageUrls(prev => [...prev, imageUrl]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, imageUrl]
        }));
      };
      reader.readAsDataURL(file);
    });

    // Clear the input value so the same file can be selected again
    e.target.value = '';
  };

  // Handle paste from clipboard
  const handlePaste = (e) => {
    const items = (e.clipboardData || window.clipboardData).items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        const reader = new FileReader();

        reader.onload = (e) => {
          const imageUrl = e.target.result;
          setImageUrls(prev => [...prev, imageUrl]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        };

        reader.readAsDataURL(blob);
        e.preventDefault();
        break;
      }
    }
  };

  // Remove image URL from the list
  const removeImageUrl = (index) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
    setFormData({
      ...formData,
      images: updatedUrls
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.squareMeters) newErrors.squareMeters = 'Square meters is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';

    // Property type specific validations
    if (formData.propertyType === 'apartment') {
      if (!formData.floor) newErrors.floor = 'Floor is required for apartments';
      if (!formData.totalFloors) newErrors.totalFloors = 'Total floors is required for apartments';
    }

    if (formData.propertyType !== 'land') {
      if (!formData.rooms) newErrors.rooms = 'Number of rooms is required';
      if (!formData.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required';
    }

    // Validate at least one image
    if (imageUrls.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      setLoading(true);

      // Prepare final data with images
      const finalData = {
        ...formData,
        images: imageUrls
      };

      // Call the onSubmit function passed from parent
      await onSubmit(finalData);

      // Navigate back to listings page
      navigate('/my-listings');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Edit Your Property Listing' : 'Create a New Property Listing'}
      </h2>

      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Listing Title*
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Modern 2BR Apartment in City Center"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyType">
                Property Type*
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
            </div>

            {/* Listing Type (Sale/Rent) */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Listing Type*
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="listingType"
                    value="sale"
                    checked={formData.listingType === 'sale'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">For Sale</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="listingType"
                    value="rent"
                    checked={formData.listingType === 'rent'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">For Rent</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address*
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Street address, City, Postal Code"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
        </div>

        {/* Property Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Square Meters */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="squareMeters">
                Square Meters*
              </label>
              <input
                id="squareMeters"
                name="squareMeters"
                type="number"
                min="1"
                value={formData.squareMeters}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.squareMeters ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.squareMeters && <p className="text-red-500 text-xs mt-1">{errors.squareMeters}</p>}
            </div>

            {/* Number of Rooms */}
            {formData.propertyType !== 'land' && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rooms">
                  Number of Rooms*
                </label>
                <input
                  id="rooms"
                  name="rooms"
                  type="number"
                  min="1"
                  value={formData.rooms}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.rooms ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.rooms && <p className="text-red-500 text-xs mt-1">{errors.rooms}</p>}
              </div>
            )}

            {/* Number of Bedrooms */}
            {formData.propertyType !== 'land' && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
                  Number of Bedrooms*
                </label>
                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.bedrooms ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>}
              </div>
            )}

            {/* Floor (for apartments) */}
            {formData.propertyType === 'apartment' && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floor">
                  Floor*
                </label>
                <input
                  id="floor"
                  name="floor"
                  type="number"
                  min="0"
                  value={formData.floor}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.floor ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.floor && <p className="text-red-500 text-xs mt-1">{errors.floor}</p>}
              </div>
            )}

            {/* Total Floors (for apartments) */}
            {formData.propertyType === 'apartment' && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalFloors">
                  Total Floors in Building*
                </label>
                <input
                  id="totalFloors"
                  name="totalFloors"
                  type="number"
                  min="1"
                  value={formData.totalFloors}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.totalFloors ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.totalFloors && <p className="text-red-500 text-xs mt-1">{errors.totalFloors}</p>}
              </div>
            )}

            {/* Price */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price (€)*
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Property Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Describe your property in detail..."
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* Images Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Images</h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Add Images*
            </label>

            {/* Image URL Input */}
            <div className="flex mb-3">
              <input
                type="url"
                value={currentImageUrl}
                onChange={handleImageUrlChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Add URL
              </button>
            </div>

            {/* File Upload */}
            <div className="mb-3">
              <label
                htmlFor="image-upload"
                className="block w-full px-4 py-2 text-center border border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm text-gray-500">Click to upload images</span>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Paste Instructions */}
            <div
              className="p-3 border border-gray-300 rounded mb-3 bg-gray-50"
              onPaste={handlePaste}
              tabIndex="0"
            >
              <div className="flex items-center text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span className="text-sm">Click here and paste (Ctrl+V) images from clipboard</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Add images of your property by URL, file upload, or by pasting from clipboard.
            </p>
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
          </div>

          {/* Image Preview */}
          {imageUrls.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Added Images ({imageUrls.length}):</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-32 object-cover rounded cursor-pointer"
                      onClick={() => setSelectedImage(url)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => setSelectedImage(url)}
                        className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs mr-1"
                      >
                        View
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <ImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPhone">
              Phone Number*
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="+372 5555 5555"
            />
            {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Listing' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
