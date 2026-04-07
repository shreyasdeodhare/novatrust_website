import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KidsLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock user credentials for demo
  const validUsers = [
    { username: 'timmy', password: 'piggybank', name: 'Timmy' },
    { username: 'sarah', password: 'unicorn', name: 'Sarah' },
    { username: 'demo', password: 'demo', name: 'Demo User' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple validation
    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Check credentials (in a real app, this would be an API call)
    setTimeout(() => {
      const user = validUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Store user info in localStorage (in a real app, use proper auth tokens)
        localStorage.setItem('chittyFundUser', JSON.stringify({
          username: user.username,
          name: user.name
        }));
        navigate('/kids-dashboard');
      } else {
        setError('Oops! Your username or password is incorrect. Try again!');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
        {/* Sun decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-70"></div>
        
        {/* Clouds */}
        <div className="absolute top-12 left-12 w-20 h-8 bg-white rounded-full"></div>
        <div className="absolute top-8 left-24 w-16 h-8 bg-white rounded-full"></div>
        
        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-600 mb-2">ChittyFund</h1>
            <p className="text-lg text-blue-500">Your Magical Money Adventure!</p>
          </div>
          
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2829/2829832.png" 
                alt="Piggy Bank" 
                className="w-20 h-20"
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Start Your Adventure!'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Demo login: <span className="font-semibold">username:</span> demo, <span className="font-semibold">password:</span> demo
            </p>
          </div>
        </div>
        
        {/* Bottom decorations */}
        <div className="h-16 bg-green-400 relative">
          <div className="absolute -top-4 left-0 right-0 h-8 bg-green-400 rounded-t-full"></div>
          <div className="absolute -top-8 left-1/4 w-4 h-12 bg-brown-500 rounded-t-sm"></div>
          <div className="absolute -top-12 left-1/4 w-8 h-8 bg-green-600 rounded-full"></div>
          <div className="absolute -top-8 right-1/3 w-4 h-12 bg-brown-500 rounded-t-sm"></div>
          <div className="absolute -top-12 right-1/3 w-10 h-8 bg-green-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default KidsLoginPage;
