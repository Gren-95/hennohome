import React, { useEffect } from 'react';

const ImageModal = ({ image, onClose }) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling of the body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  // Close modal when clicking outside the image
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-full max-h-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
        >
          ×
        </button>
        
        {/* Image */}
        <img
          src={image}
          alt="Full size preview"
          className="max-w-full max-h-[90vh] object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error';
          }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
