import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <LoginForm />
        
        <div className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
