import { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = (email, password, name) => {
    // In a real app, this would make an API call to create a user
    // For this demo, we'll just create a user object and store it
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      // In a real app, you would NEVER store the password like this
      // This is just for demonstration purposes
      password
    };
    
    // Store user in localStorage (simulating a database)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user and store in localStorage
    setCurrentUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return newUser;
  };

  // Login function
  const login = (email, password) => {
    // In a real app, this would make an API call to authenticate
    // For this demo, we'll just check localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Set current user and store in localStorage
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
