import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <SignupForm />
        
        <div className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
